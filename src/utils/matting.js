/**
 * Alpha matting and edge refinement algorithms for clean cutouts without fringes or halos.
 */

export function refineAlphaMask(sourceImageData, maskData, options = {}) {
  const {
    threshold = 0.5,
    featherRadius = 1.5,
    despill = true,
  } = options;

  const width = sourceImageData.width;
  const height = sourceImageData.height;
  const totalPixels = width * height;

  const src = sourceImageData.data;
  const output = new ImageData(width, height);
  const out = output.data;

  // 1. Copy RGB and apply initial mask to Alpha
  for (let i = 0; i < totalPixels; i++) {
    const idx = i * 4;
    out[idx] = src[idx];         // R
    out[idx + 1] = src[idx + 1]; // G
    out[idx + 2] = src[idx + 2]; // B

    let alphaVal = maskData[i]; // Normalized 0.0 to 1.0 or 0 to 255
    if (alphaVal <= 1.0) alphaVal *= 255;

    // Soft step around threshold to preserve hair strands
    let alpha = 0;
    if (alphaVal > 245) {
      alpha = 255;
    } else if (alphaVal < 10) {
      alpha = 0;
    } else {
      // Smooth sigmoid transition for translucent hair tips
      const normalized = alphaVal / 255;
      const smooth = 1 / (1 + Math.exp(-12 * (normalized - threshold)));
      alpha = Math.round(smooth * 255);
    }

    out[idx + 3] = alpha;
  }

  // 2. Despill / Defringe color bleeding on translucent edges
  if (despill) {
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;
        const a = out[idx + 3];

        // Only process semi-transparent border pixels
        if (a > 10 && a < 240) {
          let neighborR = 0;
          let neighborG = 0;
          let neighborB = 0;
          let opaqueCount = 0;

          // Sample 8-neighbors
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (dx === 0 && dy === 0) continue;
              const nIdx = ((y + dy) * width + (x + dx)) * 4;
              if (out[nIdx + 3] > 200) {
                neighborR += out[nIdx];
                neighborG += out[nIdx + 1];
                neighborB += out[nIdx + 2];
                opaqueCount++;
              }
            }
          }

          if (opaqueCount > 0) {
            // Blend edge pixel color towards the solid character interior
            const blendFactor = (255 - a) / 255 * 0.6;
            out[idx] = Math.round(out[idx] * (1 - blendFactor) + (neighborR / opaqueCount) * blendFactor);
            out[idx + 1] = Math.round(out[idx + 1] * (1 - blendFactor) + (neighborG / opaqueCount) * blendFactor);
            out[idx + 2] = Math.round(out[idx + 2] * (1 - blendFactor) + (neighborB / opaqueCount) * blendFactor);
          }
        }
      }
    }
  }

  return output;
}
