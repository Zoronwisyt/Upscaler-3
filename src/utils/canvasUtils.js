/**
 * Canvas and image manipulation utilities
 */

export function formatBytes(bytes, decimals = 2) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export async function loadImage(source) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => resolve(img);
    img.onerror = (e) => reject(new Error('Failed to load image.'));

    if (typeof source === 'string') {
      img.src = source;
    } else if (source instanceof Blob || source instanceof File) {
      img.src = URL.createObjectURL(source);
    } else {
      reject(new Error('Unsupported image source type.'));
    }
  });
}

export function getImageDataFromImage(img, targetWidth = img.width, targetHeight = img.height) {
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
  return ctx.getImageData(0, 0, targetWidth, targetHeight);
}

export function imageDataToCanvas(imageData) {
  const canvas = document.createElement('canvas');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const ctx = canvas.getContext('2d');
  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

export function imageDataToDataUrl(imageData, format = 'image/png', quality = 0.95) {
  const canvas = imageDataToCanvas(imageData);
  return canvas.toDataURL(format, quality);
}

export async function canvasToBlob(canvas, format = 'image/png', quality = 0.95) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), format, quality);
  });
}

/**
 * High-quality multi-step downsampler (e.g. from 4x down to 2x)
 */
export function downsampleCanvas(sourceCanvas, targetWidth, targetHeight) {
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(sourceCanvas, 0, 0, targetWidth, targetHeight);
  return canvas;
}
