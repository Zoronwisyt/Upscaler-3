/**
 * ModelCache: Manages downloading, progress tracking, and caching of ONNX models
 * using the browser's Cache Storage API (with IndexedDB / memory fallback).
 */

const CACHE_NAME = 'animeforge-models-v1';

export async function isModelCached(url) {
  try {
    if (!('caches' in window)) return false;
    const cache = await caches.open(CACHE_NAME);
    const match = await cache.match(url);
    return !!match;
  } catch (err) {
    console.warn('Cache check failed:', err);
    return false;
  }
}

export async function getCachedModelBuffer(url) {
  try {
    if (!('caches' in window)) return null;
    const cache = await caches.open(CACHE_NAME);
    const match = await cache.match(url);
    if (match) {
      return await match.arrayBuffer();
    }
  } catch (err) {
    console.warn('Cache read error:', err);
  }
  return null;
}

export async function downloadAndCacheModel(url, onProgress) {
  // 1. Check if already cached
  const existing = await getCachedModelBuffer(url);
  if (existing) {
    if (onProgress) {
      onProgress({
        loaded: existing.byteLength,
        total: existing.byteLength,
        percent: 100,
        cached: true,
      });
    }
    return existing;
  }

  // 2. Fetch with streaming progress
  const response = await fetch(url, { mode: 'cors' });
  if (!response.ok) {
    throw new Error(`Failed to download model from ${url} (HTTP ${response.status} ${response.statusText})`);
  }

  const contentLength = response.headers.get('content-length');
  const total = contentLength ? parseInt(contentLength, 10) : 0;
  let loaded = 0;
  const startTime = Date.now();

  const reader = response.body.getReader();
  const chunks = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    loaded += value.length;

    if (onProgress) {
      const elapsedSec = (Date.now() - startTime) / 1000;
      const speedMBps = elapsedSec > 0 ? (loaded / (1024 * 1024)) / elapsedSec : 0;
      const percent = total > 0 ? Math.min(100, Math.round((loaded / total) * 100)) : -1;
      const remainingBytes = total > 0 ? total - loaded : 0;
      const etaSeconds = speedMBps > 0 && remainingBytes > 0 ? Math.round((remainingBytes / (1024 * 1024)) / speedMBps) : 0;

      onProgress({
        loaded,
        total,
        percent,
        speedMBps: speedMBps.toFixed(2),
        etaSeconds,
        cached: false,
      });
    }
  }

  // Assemble full buffer
  const buffer = new Uint8Array(loaded);
  let offset = 0;
  for (const chunk of chunks) {
    buffer.set(chunk, offset);
    offset += chunk.length;
  }

  // 3. Store into Cache API
  try {
    if ('caches' in window) {
      const cache = await caches.open(CACHE_NAME);
      const headers = new Headers({
        'Content-Type': 'application/octet-stream',
        'Content-Length': buffer.byteLength.toString(),
      });
      const responseToCache = new Response(buffer.buffer, { headers });
      await cache.put(url, responseToCache);
    }
  } catch (cacheErr) {
    console.warn('Could not store model in Cache API:', cacheErr);
  }

  return buffer.buffer;
}

export async function clearModelCache() {
  if ('caches' in window) {
    return await caches.delete(CACHE_NAME);
  }
  return false;
}
