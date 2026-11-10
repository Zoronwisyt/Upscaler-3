import * as ort from 'onnxruntime-web/webgpu';
import { refineAlphaMask } from '../utils/matting';

// Configure ONNX Runtime Web - exact matching version 1.31.1
ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.31.1/dist/';
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

      self.postMessage({ type: 'STATUS', status: 'initializing_model', message: `Initializing Segmentation Model (${providers[0]})...` });

      const byteData = modelBuffer instanceof Uint8Array ? modelBuffer : new Uint8Array(modelBuffer);

      session = await ort.InferenceSession.create(byteData, {
        executionProviders: providers,
        graphOptimizationLevel: 'all',
      });
      currentModelUrl = modelUrl;

      self.postMessage({ type: 'MODEL_LOADED', success: true });
    } catch (err) {
      console.warn('Segmentation model WebGPU failed, attempting WASM fallback:', err);
      try {
        const fallbackBytes = payload.modelBuffer instanceof Uint8Array ? payload.modelBuffer : new Uint8Array(payload.modelBuffer);
        session = await ort.InferenceSession.create(fallbackBytes, {
          executionProviders: ['wasm'],
        });
        self.postMessage({ type: 'MODEL_LOADED', success: true, fallback: true });
      } catch (fallbackErr) {
        self.postMessage({ type: 'ERROR', error: fallbackErr.message || err.message || 'Failed to initialize background removal model.' });
      }
    }
    return;
  }

  if (type === 'REMOVE_BG') {
    try {
      isCancelled = false;
      const {
        imageData,
        mode = 'ai', // 'ai' or 'procedural'
        options = { threshold: 0.5, featherRadius: 1.5, despill: true },
      } = payload;

      const { width, height, data } = imageData;

      if (mode === 'procedural' || !session) {
        // Fast procedural anime segmentation
        self.postMessage({ type: 'PROGRESS', percent: 30, message: 'Analyzing image contours...' });
        const mask = runProceduralAnimeMask(imageData);
        self.postMessage({ type: 'PROGRESS', percent: 70, message: 'Refining alpha edges...' });
        const refined = refineAlphaMask(imageData, mask, options);
        self.postMessage({ type: 'COMPLETE', result: refined }, [refined.data.buffer]);
        return;
      }

      self.postMessage({ type: 'PROGRESS', percent: 15, message: 'Preparing image tensor (1024x1024)...' });

      // IS-Net standard input is 1024x1024
      const modelDim = 1024;
      const inputTensorData = prepareInputTensor(imageData, modelDim);

      if (isCancelled) {
        self.postMessage({ type: 'CANCELLED' });
        return;
      }

      self.postMessage({ type: 'PROGRESS', percent: 40, message: 'Running anime neural segmentation...' });

      const inputName = session.inputNames[0];
      const tensor = new ort.Tensor('float32', inputTensorData, [1, 3, modelDim, modelDim]);
      const feeds = { [inputName]: tensor };
      const output = await session.run(feeds);

      if (isCancelled) {
        self.postMessage({ type: 'CANCELLED' });
        return;
      }

      self.postMessage({ type: 'PROGRESS', percent: 75, message: 'Rescaling mask & refining hair strands...' });

      const outputTensor = output[session.outputNames[0]];
      const rawMask = outputTensor.data;

      // Rescale 1024x1024 mask back to original width x height
      const fullMask = rescaleMask(rawMask, modelDim, modelDim, width, height);

      // Apply matting, despill and alpha edge refinement
      const finalImageData = refineAlphaMask(imageData, fullMask, options);

      self.postMessage({ type: 'COMPLETE', result: finalImageData }, [finalImageData.data.buffer]);
    } catch (err) {
      self.postMessage({ type: 'ERROR', error: err.message || 'Background removal failed.' });
    }
  }
};

/**
 * Resizes input image to 1024x1024 Float32 NCHW tensor normalized to [0, 1] or [-1, 1]
 */
function prepareInputTensor(srcImageData, targetDim) {
  const { width, height, data } = srcImageData;
  const tensor = new Float32Array(1 * 3 * targetDim * targetDim);

  for (let ty = 0; ty < targetDim; ty++) {
    const srcY = Math.min(height - 1, Math.floor((ty / targetDim) * height));
    for (let tx = 0; tx < targetDim; tx++) {
      const srcX = Math.min(width - 1, Math.floor((tx / targetDim) * width));
      const srcIdx = (srcY * width + srcX) * 4;
      const tIdx = ty * targetDim + tx;

      // Normalize: (val / 255.0 - 0.5) / 0.5 -> [-1, 1]
      const r = (srcDataNorm(data[srcIdx]) - 0.5) / 0.5;
      const g = (srcDataNorm(data[srcIdx + 1]) - 0.5) / 0.5;
      const b = (srcDataNorm(data[srcIdx + 2]) - 0.5) / 0.5;

      tensor[0 * targetDim * targetDim + tIdx] = r;
      tensor[1 * targetDim * targetDim + tIdx] = g;
      tensor[2 * targetDim * targetDim + tIdx] = b;
    }
  }

  return tensor;
}

function srcDataNorm(val) {
  return val / 255.0;
}

/**
 * Bilinear rescaling of float mask
 */
function rescaleMask(srcMask, sw, sh, dw, dh) {
  const outMask = new Float32Array(dw * dh);
  const xRatio = sw / dw;
  const yRatio = sh / dh;

  for (let dy = 0; dy < dh; dy++) {
    const sy = dy * yRatio;
    const y0 = Math.floor(sy);
    const y1 = Math.min(sh - 1, y0 + 1);
    const wy = sy - y0;

    for (let dx = 0; dx < dw; dx++) {
      const sx = dx * xRatio;
      const x0 = Math.floor(sx);
      const x1 = Math.min(sw - 1, x0 + 1);
      const wx = sx - x0;

      const v00 = sigmoid(srcMask[y0 * sw + x0]);
      const v10 = sigmoid(srcMask[y0 * sw + x1]);
      const v01 = sigmoid(srcMask[y1 * sw + x0]);
      const v11 = sigmoid(srcMask[y1 * sw + x1]);

      const val =
        v00 * (1 - wx) * (1 - wy) +
        v10 * wx * (1 - wy) +
        v01 * (1 - wx) * wy +
        v11 * wx * wy;

      outMask[dy * dw + dx] = val;
    }
  }

  return outMask;
}

function sigmoid(x) {
  if (x > 15) return 1;
  if (x < -15) return 0;
  return 1 / (1 + Math.exp(-x));
}

/**
 * Procedural fallback mask: Corner background flood analysis & center saliency
 */
function runProceduralAnimeMask(imageData) {
  const { width, height, data } = imageData;
  const mask = new Float32Array(width * height);

  // Sample corner background colors
  const cornerIndices = [0, (width - 1) * 4, ((height - 1) * width) * 4, (height * width - 1) * 4];
  let bgR = 0, bgG = 0, bgB = 0;
  for (const c of cornerIndices) {
    bgR += data[c];
    bgG += data[c + 1];
    bgB += data[c + 2];
  }
  bgR /= 4; bgG /= 4; bgB /= 4;

  const cx = width / 2;
  const cy = height / 2;
  const maxDist = Math.sqrt(cx * cx + cy * cy);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // Color distance from sample background
      const colorDist = Math.sqrt(
        Math.pow(r - bgR, 2) + Math.pow(g - bgG, 2) + Math.pow(b - bgB, 2)
      );

      // Distance from center
      const distFromCenter = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2)) / maxDist;
      const centerBias = Math.max(0, 1 - distFromCenter * 0.9);

      let prob = colorDist / 120.0 * (0.5 + centerBias * 0.7);
      prob = Math.min(1.0, Math.max(0.0, prob));

      mask[y * width + x] = prob;
    }
  }

  return mask;
}
