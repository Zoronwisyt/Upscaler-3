import JSZip from 'jszip';
import { canvasToBlob } from './canvasUtils';

export async function downloadImage(canvas, filename, format = 'png', options = {}) {
  const { quality = 0.95, backgroundColor = '#ffffff' } = options;

  let mimeType = 'image/png';
  let ext = 'png';

  if (format === 'jpg' || format === 'jpeg') {
    mimeType = 'image/jpeg';
    ext = 'jpg';
  } else if (format === 'webp') {
    mimeType = 'image/webp';
    ext = 'webp';
  }

  let finalCanvas = canvas;

  // If JPG, render over background color because JPG does not support alpha
  if (ext === 'jpg') {
    finalCanvas = document.createElement('canvas');
    finalCanvas.width = canvas.width;
    finalCanvas.height = canvas.height;
    const ctx = finalCanvas.getContext('2d');
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
    ctx.drawImage(canvas, 0, 0);
  }

  const blob = await canvasToBlob(finalCanvas, mimeType, quality);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.${ext}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export async function copyImageToClipboard(canvas) {
  try {
    const blob = await canvasToBlob(canvas, 'image/png');
    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob })
    ]);
    return true;
  } catch (err) {
    console.error('Failed to copy image to clipboard:', err);
    throw err;
  }
}

export async function createBatchZip(items, onProgress) {
  const zip = new JSZip();
  const folder = zip.folder('animeforge_export');

  let processed = 0;
  for (const item of items) {
    if (item.canvas) {
      const blob = await canvasToBlob(item.canvas, 'image/png');
      const safeName = item.name.replace(/\.[^/.]+$/, "") + `_${item.suffix || 'processed'}.png`;
      folder.file(safeName, blob);
    }
    processed++;
    if (onProgress) {
      onProgress(Math.round((processed / items.length) * 50));
    }
  }

  const zipBlob = await zip.generateAsync(
    { type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } },
    (metadata) => {
      if (onProgress) {
        onProgress(50 + Math.round(metadata.percent / 2));
      }
    }
  );

  return zipBlob;
}
