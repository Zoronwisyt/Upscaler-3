# AnimeForge Model Storage

By default, AnimeForge downloads optimized ONNX models on-demand directly from public Hugging Face repositories and stores them in your browser's persistent Cache API (`caches`).

If you prefer to host models directly within your GitHub repository or custom web server:

1. **Upscaler Model (`RealESRGAN_x4plus_anime_6B.onnx` or `realesrgan512.onnx`)**:
   - Download the ONNX file from:
     `https://huggingface.co/OpenSynthetics/real-esrgan-anime/resolve/main/RealESRGAN_x4plus_anime_6B.onnx`
   - Place it in this folder: `public/models/RealESRGAN_x4plus_anime_6B.onnx`
   - Note: If hosting on GitHub, make sure any file over 100MB uses Git LFS or external CDN hosting.

2. **Background Removal Model (`isnet-anime.onnx`)**:
   - Download the ONNX file from:
     `https://huggingface.co/SkyTNT/anime-segmentation/resolve/main/isnet-anime.onnx`
   - Place it in this folder: `public/models/isnet-anime.onnx`

When files are placed here, the app can be configured in Settings to point to `./models/RealESRGAN_x4plus_anime_6B.onnx` and `./models/isnet-anime.onnx`.
