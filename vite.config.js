import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative base allows seamless hosting on GitHub Pages under any repository name
  base: './',
  worker: {
    format: 'es',
  },
  server: {
    port: 3000,
    headers: {
      // Cross-origin headers for WebAssembly multi-threading when supported
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'credentialless',
    },
  },
  optimizeDeps: {
    exclude: ['onnxruntime-web'],
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
  },
});
