# AnimeForge Model Storage

By default, AnimeForge downloads optimized ONNX models on-demand directly from public Hugging Face repositories and stores them in your browser's persistent Cache API (`caches`).

If you prefer to host models directly within your GitHub repository or custom web server:

1. **Upscaler Model (`realesr-general-x4v3.onnx`)**:
   - Download the ONNX file from:
     `https://huggingface.co/Heliosoph/realesrgan-onnx/resolve/main/realesr-general-x4v3.onnx`
   - Place it in this folder: `public/models/realesr-general-x4v3.onnx`
   - Note: If hosting on GitHub, make sure any file over 100MB uses Git LFS or external CDN hosting.

2. **Background Removal Model (`model_quantized.onnx`)**:
   - Download the ONNX file from:
     `https://huggingface.co/briaai/RMBG-1.4/resolve/main/onnx/model_quantized.onnx`
   - Place it in this folder: `public/models/model_quantized.onnx`

When files are placed here, the app can be configured in Settings to point to `./models/realesr-general-x4v3.onnx` and `./models/model_quantized.onnx`.
