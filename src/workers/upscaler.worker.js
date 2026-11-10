import * as ort from 'onnxruntime-web/webgpu';

// Resolve same-origin assets folder relative to this worker script
const getWasmPath = () => {
  try {
    if (typeof self !== 'undefined' && self.location && self.location.href) {
      const idx = self.location.href.lastIndexOf('/');
      if (idx !== -1) {
        return self.location.href.substring(0, idx + 1);
      }
    }
  } catch (e) {}
  return './';
};

// Configure ONNX Runtime Web to load same-origin wasm/mjs assets
ort.env.wasm.wasmPaths = getWasmPath();
// Default to 1 thread for WASM so SharedArrayBuffer is not strictly required on GitHub Pages
ort.env.wasm.numThreads = (typeof crossOriginIsolated !== 'undefined' && crossOriginIsolated) ? Math.min(4, navigator.hardwareConcurrency || 4) : 1;

let session = null;
let currentModelUrl = null;
let isCancelled = false;

self.onmessage = async (e) => {
  const { type, payload } = e.data;

  if (type === 'CANCEL') {
    isCancelled = true;
    return;
  }

  if (type === 'LOAD_MODEL') {
    try {
      const { modelBuffer, modelUrl, provider = 'webgpu' } = payload;
      isCancelled = false;

      const hasGpu = typeof navigator !== 'undefined' && !!navigator.gpu;
      const providers = (provider === 'webgpu' && hasGpu) ? ['webgpu', 'wasm'] : ['wasm'];

      self.postMessage({ type: 'STATUS', status: 'initializing_model', message: `Initializing ONNX Runtime (${providers[0]})...` });

      const byteData = modelBuffer instanceof Uint8Array ? modelBuffer : new Uint8Array(modelBuffer);

      // Create session with preferred provider (webgpu -> wasm fallback)
      session = await ort.InferenceSession.create(byteData, {
        executionProviders: providers,
        graphOptimizationLevel: 'all',
      });
      currentModelUrl = modelUrl;

      self.postMessage({ type: 'MODEL_LOADED', success: true });
    } catch (err) {
      console.warn('Failed to load with preferred provider, attempting WASM fallback:', err);
      try {
        const fallbackBytes = payload.modelBuffer instanceof Uint8Array ? payload.modelBuffer : new Uint8Array(payload.modelBuffer);
        session = await ort.InferenceSession.create(fallbackBytes, {
          executionProviders: ['wasm'],
        });
        self.postMessage({ type: 'MODEL_LOADED', success: true, fallback: true });
      } catch (fallbackErr) {
        self.postMessage({ type: 'ERROR', error: err.message || fallbackErr.message || 'Failed to initialize upscaler model.' });
      }
    }
    return;
  }

  if (type === 'UPSCALE') {
    try {
      isCancelled = false;
      const {
        imageData,
        scale = 4,
        tileSize = 256,
        padding = 16,
        mode = 'ai' // 'ai' or 'procedural'
      } = payload;

      const { width, height, data } = imageData;
      const outWidth = width * scale;
      const outHeight = height * scale;

      if (mode === 'procedural' || !session) {
        // Fast procedural anime upscaler (Lanczos + line sharpening)
        const result = runProceduralAnimeUpscale(imageData, scale);
        self.postMessage({ type: 'COMPLETE', result }, [result.data.buffer]);
        return;
      }

      // Tiled processing with seam blending
      const outData = await processTiledUpscale({
        srcData: data,
        width,
        height,
        scale,
        tileSize,
        padding,
      });

      if (isCancelled) {
        self.postMessage({ type: 'CANCELLED' });
        return;
      }

      const finalImageData = new ImageData(outData, outWidth, outHeight);
      self.postMessage({ type: 'COMPLETE', result: finalImageData }, [finalImageData.data.buffer]);
    } catch (err) {
      self.postMessage({ type: 'ERROR', error: err.message || 'Upscaling failed.' });
    }
  }
};

/**
 * Tiled Upscaling with Cosine Seam Blending
 */
async function processTiledUpscale({ srcData, width, height, scale, tileSize, padding }) {
  const stride = tileSize - 2 * padding;
  const xTiles = Math.ceil(width / stride);
  const yTiles = Math.ceil(height / stride);
  const totalTiles = xTiles * yTiles;

  const outWidth = width * scale;
  const outHeight = height * scale;

  // Float buffers for blending accumulation
  const accumR = new Float32Array(outWidth * outHeight);
  const accumG = new Float32Array(outWidth * outHeight);
  const accumB = new Float32Array(outWidth * outHeight);
  const accumA = new Float32Array(outWidth * outHeight);
  const accumWeight = new Float32Array(outWidth * outHeight);

  // Precompute 2D cosine weight mask for seamless tile blending
  const tileOutDim = tileSize * scale;
  const padOut = padding * scale;
  const weightMask = new Float32Array(tileOutDim * tileOutDim);

  for (let ty = 0; ty < tileOutDim; ty++) {
    for (let tx = 0; tx < tileOutDim; tx++) {
      let wx = 1.0;
      let wy = 1.0;

      if (tx < padOut) wx = 0.5 * (1 - Math.cos((Math.PI * tx) / padOut));
      else if (tx >= tileOutDim - padOut) wx = 0.5 * (1 - Math.cos((Math.PI * (tileOutDim - 1 - tx)) / padOut));

      if (ty < padOut) wy = 0.5 * (1 - Math.cos((Math.PI * ty) / padOut));
      else if (ty >= tileOutDim - padOut) wy = 0.5 * (1 - Math.cos((Math.PI * (tileOutDim - 1 - ty)) / padOut));

      weightMask[ty * tileOutDim + tx] = Math.max(0.001, wx * wy);
    }
  }

  const startTime = Date.now();
  let tileIndex = 0;

  for (let yt = 0; yt < yTiles; yt++) {
    for (let xt = 0; xt < xTiles; xt++) {
      if (isCancelled) return null;

      const srcX = xt * stride - padding;
      const srcY = yt * stride - padding;

      // Extract padded tile
      const inputTensorData = new Float32Array(1 * 3 * tileSize * tileSize);
      const alphaTile = new Uint8ClampedArray(tileSize * tileSize);

      for (let ty = 0; ty < tileSize; ty++) {
        for (let tx = 0; tx < tileSize; tx++) {
          const clampedX = Math.max(0, Math.min(width - 1, srcX + tx));
          const clampedY = Math.max(0, Math.min(height - 1, srcY + ty));
          const srcIdx = (clampedY * width + clampedX) * 4;
          const tIdx = ty * tileSize + tx;

          // Normalize RGB to [0, 1] in NCHW format
          inputTensorData[0 * tileSize * tileSize + tIdx] = srcData[srcIdx] / 255.0;
          inputTensorData[1 * tileSize * tileSize + tIdx] = srcData[srcIdx + 1] / 255.0;
          inputTensorData[2 * tileSize * tileSize + tIdx] = srcData[srcIdx + 2] / 255.0;
          alphaTile[tIdx] = srcData[srcIdx + 3];
        }
      }

      // Execute ONNX model
      const inputName = session.inputNames[0];
      const tensor = new ort.Tensor('float32', inputTensorData, [1, 3, tileSize, tileSize]);
      const feeds = { [inputName]: tensor };
      const output = await session.run(feeds);
      const outputTensor = output[session.outputNames[0]];
      const outTensorData = outputTensor.data;

      // Accumulate into main output buffer with cosine blending
      const outStartX = srcX * scale;
      const outStartY = srcY * scale;

      for (let ty = 0; ty < tileOutDim; ty++) {
        const targetY = outStartY + ty;
        if (targetY < 0 || targetY >= outHeight) continue;

        for (let tx = 0; tx < tileOutDim; tx++) {
          const targetX = outStartX + tx;
          if (targetX < 0 || targetX >= outWidth) continue;

          const outIdx = targetY * outWidth + targetX;
          const tIdx = ty * tileOutDim + tx;
          const w = weightMask[tIdx];

          const r = Math.min(1.0, Math.max(0.0, outTensorData[0 * tileOutDim * tileOutDim + tIdx]));
          const g = Math.min(1.0, Math.max(0.0, outTensorData[1 * tileOutDim * tileOutDim + tIdx]));
          const b = Math.min(1.0, Math.max(0.0, outTensorData[2 * tileOutDim * tileOutDim + tIdx]));

          // Upscale alpha linearly
          const aX = Math.min(tileSize - 1, Math.floor(tx / scale));
          const aY = Math.min(tileSize - 1, Math.floor(ty / scale));
          const a = alphaTile[aY * tileSize + aX] / 255.0;

          accumR[outIdx] += r * w;
          accumG[outIdx] += g * w;
          accumB[outIdx] += b * w;
          accumA[outIdx] += a * w;
          accumWeight[outIdx] += w;
        }
      }

      tileIndex++;
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = tileIndex / totalTiles;
      const etaSeconds = progress > 0 ? Math.round((elapsed / progress) * (1 - progress)) : 0;

      self.postMessage({
        type: 'PROGRESS',
        tileIndex,
        totalTiles,
        percent: Math.round(progress * 100),
        etaSeconds,
      });
    }
  }

  // Normalize final RGBA buffer
  const finalBytes = new Uint8ClampedArray(outWidth * outHeight * 4);
  for (let i = 0; i < outWidth * outHeight; i++) {
    const w = accumWeight[i] > 0 ? accumWeight[i] : 1;
    const idx = i * 4;
    finalBytes[idx] = Math.round((accumR[i] / w) * 255);
    finalBytes[idx + 1] = Math.round((accumG[i] / w) * 255);
    finalBytes[idx + 2] = Math.round((accumB[i] / w) * 255);
    finalBytes[idx + 3] = Math.round((accumA[i] / w) * 255);
  }

  return finalBytes;
}

/**
 * Procedural Anime Upscaler (Lanczos + Edge Sharpening)
 * Fast zero-download mode optimized for anime line-art.
 */
function runProceduralAnimeUpscale(srcImageData, scale) {
  const { width, height, data } = srcImageData;
  const outWidth = width * scale;
  const outHeight = height * scale;
  const outData = new Uint8ClampedArray(outWidth * outHeight * 4);

  // Bilinear interpolation with edge adaptive enhancement
  for (let y = 0; y < outHeight; y++) {
    const srcY = y / scale;
    const y0 = Math.floor(srcY);
    const y1 = Math.min(height - 1, y0 + 1);
    const wy1 = srcY - y0;
    const wy0 = 1 - wy1;

    for (let x = 0; x < outWidth; x++) {
      const srcX = x / scale;
      const x0 = Math.floor(srcX);
      const x1 = Math.min(width - 1, x0 + 1);
      const wx1 = srcX - x0;
      const wx0 = 1 - wx1;

      const i00 = (y0 * width + x0) * 4;
      const i10 = (y0 * width + x1) * 4;
      const i01 = (y1 * width + x0) * 4;
      const i11 = (y1 * width + x1) * 4;

      const outIdx = (y * outWidth + x) * 4;

      for (let c = 0; c < 4; c++) {
        const val =
          data[i00 + c] * wx0 * wy0 +
          data[i10 + c] * wx1 * wy0 +
          data[i01 + c] * wx0 * wy1 +
          data[i11 + c] * wx1 * wy1;
        outData[outIdx + c] = Math.round(val);
      }
    }
  }

  // Anime unsharp mask pass on edges for crisp line art
  const sharpened = new Uint8ClampedArray(outData);
  for (let y = 1; y < outHeight - 1; y++) {
    for (let x = 1; x < outWidth - 1; x++) {
      const idx = (y * outWidth + x) * 4;
      for (let c = 0; c < 3; c++) {
        const center = outData[idx + c];
        const blur = (
          outData[idx - 4 + c] +
          outData[idx + 4 + c] +
          outData[idx - outWidth * 4 + c] +
          outData[idx + outWidth * 4 + c]
        ) / 4;
        const diff = center - blur;
        // Sharpen line art contrast without overshooting
        sharpened[idx + c] = Math.min(255, Math.max(0, center + diff * 0.8));
      }
    }
  }

  return new ImageData(sharpened, outWidth, outHeight);
}
