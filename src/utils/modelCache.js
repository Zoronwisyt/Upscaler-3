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

/**
 * Downloads a model with live streaming progress, fallback URL support, and persistent caching.
 * @param {string|string[]} urlOrUrls - A single URL or an array of URLs to try in order.
 * @param {Function} onProgress - Progress callback ({ loaded, total, percent, speedMBps, etaSeconds, cached })
 */
export async function downloadAndCacheModel(urlOrUrls, onProgress) {
  const urls = Array.isArray(urlOrUrls) ? urlOrUrls : [urlOrUrls];

  // 1. Check if any candidate is already in Cache API
  for (const url of urls) {
    const cached = await getCachedModelBuffer(url);
    if (cached) {
      if (onProgress) {
        onProgress({
          loaded: cached.byteLength,
          total: cached.byteLength,
          percent: 100,
          cached: true,
        });
      }
      return cached;
    }
  }

  // 2. Try fetching each candidate in order until one succeeds
  let lastError = null;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      console.log(`[ModelCache] Fetching model from candidate URL (${i + 1}/${urls.length}): ${url}`);
      
      const response = await fetch(url, {
        mode: 'cors',
        headers: {
          'Accept': '*/*',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
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

      // 3. Store into Cache API under all candidate URLs so future checks hit cache immediately
      try {
        if ('caches' in window) {
          const cache = await caches.open(CACHE_NAME);
          const headers = new Headers({
            'Content-Type': 'application/octet-stream',
            'Content-Length': buffer.byteLength.toString(),
          });
          const responseToCache = new Response(buffer.buffer, { headers });
          await cache.put(url, responseToCache);
          if (urls[0] !== url) {
            await cache.put(urls[0], new Response(buffer.buffer, { headers }));
          }
        }
      } catch (cacheErr) {
        console.warn('Could not store model in Cache API:', cacheErr);
      }

      return buffer.buffer;
    } catch (err) {
      console.warn(`[ModelCache] Candidate URL failed (${url}):`, err.message);
      lastError = err;
    }
  }

  throw new Error(`Failed to download model weights: ${lastError?.message || 'Network error'}. You can switch to Instant Mode or configure a custom model URL in Settings.`);
}

export async function clearModelCache() {
  if ('caches' in window) {
    return await caches.delete(CACHE_NAME);
  }
  return false;
}
