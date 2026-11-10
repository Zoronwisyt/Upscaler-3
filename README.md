# AnimeForge 🌸

> **100% Client-Side Anime Super-Resolution & Hair-Strand Background Removal**  
> Runs entirely in the browser using **WebGPU**, **WebAssembly**, and **ONNX Runtime Web**. Zero server uploads. Zero cloud dependencies.

[![Deploy to GitHub Pages](https://github.com/USERNAME/REPOSITORY/actions/workflows/deploy.yml/badge.svg)](https://github.com/USERNAME/REPOSITORY/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](./LICENSE)
[![Runs 100% Client-Side](https://img.shields.io/badge/Privacy-100%25%20Local-emerald.svg)](#privacy-guarantee)

---

## ✨ Features

### 1. 🔍 Anime Super-Resolution (2x & 4x)
- **Specialized Real-ESRGAN Anime Architecture**: Trained specifically on anime, manga, and digital illustration art. Preserves clean ink line-art and smooth cel-shaded flats without texture hallucinations or watercolor blur.
- **Tiled Seam Blending**: Splits large images into overlapping tiles (e.g., 256×256 with 16px padding) and reconstructs them using 2D cosine weight feathering. Eliminates seams and prevents browser out-of-memory tab crashes even on 4K files.
- **Progress & Estimation**: Shows real-time percentage, tile counter, estimated time remaining (ETA), and a cancel button.
- **Comparison & Inspector**: Interactive Before/After split slider (horizontal/vertical) plus a dedicated Zoom/Pan inspector with 1:1 pixel mode.

### 2. ✂️ Accurate Background Removal
- **IS-Net Anime Segmentation**: Neural model optimized for character silhouettes, fine floating hair strands, accessories, and ribbons.
- **Alpha Matting & Despill**: Bilateral edge refinement neutralizes halo artifacts and color bleeding from the old background.
- **Manual Refinement Brush**: Interactive in-browser brush featuring:
  - **Erase Mode** (cut away stray background elements)
  - **Keep Mode** (restore character details from original art)
  - Configurable brush size with live cursor outline
  - Full Undo/Redo history stack (with `Ctrl+Z` / `Ctrl+Y` shortcuts)
- **Backdrop Previews**: Preview cutouts over checkerboard, solid white, solid black, green screen, or a custom backdrop image.

### 3. ⚡ General & Workflow Power
- **Workflow Chaining**: Send a background cutout directly to the upscaler with one click, or send an upscaled piece directly to background removal.
- **Batch Processing**: Queue multiple illustrations, process them sequentially in Web Workers, and download all results packed into a `.zip` archive via JSZip.
- **Persistent Browser Cache**: Model weights download once via streaming fetch and are stored in the browser's persistent `CacheStorage`. Subsequent visits load instantly from disk.
- **Dedicated Web Workers**: Heavy tensor manipulations and tile blending run in background threads, keeping the UI at 60 FPS.
- **Responsive & Accessible**: Dark/Light mode, keyboard shortcuts, ARIA compliance, and high contrast styling.

---

## 🏗️ Architecture & Model Selection

```
┌────────────────────────────────────────────────────────┐
│                      AnimeForge                        │
│             React 18 + Vite + Tailwind CSS             │
└──────────────────────────┬─────────────────────────────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
   ┌───────────────────┐       ┌───────────────────┐
   │  upscaler.worker  │       │  bgremover.worker │
   └─────────┬─────────┘       └─────────┬─────────┘
             │                           │
  [Real-ESRGAN Anime ONNX]        [IS-Net Anime ONNX]
             │                           │
     Tile Slicing & Cosine          Bilinear Mask
         Seam Blending           & Alpha Matting Refine
             │                           │
             └─────────────┬─────────────┘
                           ▼
            ┌─────────────────────────────┐
            │   Cache Storage API / IDB   │
            │   (Persistent Model Cache)  │
            └─────────────────────────────┘
```

### Why ONNX Runtime Web?
- **WebGPU + WASM SIMD**: ONNX Runtime Web provides native WebGPU shader execution on modern browsers (Chrome, Edge, Safari 18+), achieving near-native GPU inference speeds directly inside the web browser. If WebGPU is not supported by the client hardware, it automatically falls back to single-threaded WebAssembly.
- **Memory Efficiency**: Running inference in dedicated Web Workers prevents main-thread jank and allows deterministic memory reclamation between tiles.

### Why Real-ESRGAN Anime & IS-Net Anime?
- Standard super-resolution models (e.g. standard ESRGAN or Bicubic) hallucinate photo grain and blur comic line-art. Real-ESRGAN Anime specifically preserves vector-sharp edges.
- General portrait background removers fail on stylized anime hair strands, ahoge, and translucency. IS-Net Anime (dis-entangled anime segmentation) was trained specifically on anime illustration datasets.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher

### Installation & Run

```bash
# 1. Clone repository
git clone https://github.com/USERNAME/animeforge.git
cd animeforge

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open your browser at `http://localhost:3000`.

### Build for Production

```bash
npm run build
```
This generates the optimized production bundle in `./dist` with relative paths (`base: './'`).

---

## 🌐 Deploy to GitHub Pages (Step-by-Step)

AnimeForge requires **zero backend servers** and is engineered specifically to run for free on **GitHub Pages**.

### Step 1: Create a GitHub Repository
1. Log in to [GitHub](https://github.com) and click **New Repository**.
2. Name the repository (e.g., `animeforge`).
3. Set the repository to **Public** (required for free GitHub Pages).
4. Do not initialize with a README (this project already includes one).

### Step 2: Initialize Git and Push

Run these commands inside your project directory:

```bash
git init
git add .
git commit -m "Initial release of AnimeForge"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git
git push -u origin main
```

### Step 3: Enable GitHub Pages with Actions
1. On GitHub, navigate to your repository's **Settings** tab.
2. In the left sidebar, click **Pages** (under the "Code and automation" section).
3. Under **Build and deployment > Source**, select:
   👉 **GitHub Actions** (do NOT choose "Deploy from a branch").
4. Click on the **Actions** tab at the top of your repository. You will see the workflow `Deploy AnimeForge to GitHub Pages` running.
5. Once the green checkmark appears (usually ~1 minute), return to **Settings > Pages** to view your live site URL:
   `https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPOSITORY_NAME>/`

---

## 📦 Neural Model Hosting & CDN Setup

AnimeForge supports two convenient ways to load ONNX model files:

### Option A: On-Demand Hugging Face CDN (Default)
By default, the application streams models directly from public Hugging Face mirrors:
- **Real-ESRGAN Upscaler**: `https://huggingface.co/Heliosoph/realesrgan-onnx/resolve/main/realesr-general-x4v3.onnx` (~4.8 MB) with fallback to `anakhiu/realesrgan-onnx` (~67 MB)
- **Neural Background Remover**: `https://huggingface.co/briaai/RMBG-1.4/resolve/main/onnx/model_quantized.onnx` (~44 MB) with fallback to `skytnt/anime-seg` (~176 MB)

Because files are downloaded with chunked streaming and open CORS, they cache permanently in the client's browser `CacheStorage` after the first download.

### Option B: Self-Host Inside Repository (Git LFS)
If you prefer to host models locally inside your repository:
1. Ensure [Git LFS](https://git-lfs.com/) is installed:
   ```bash
   git lfs install
   git lfs track "*.onnx"
   git add .gitattributes
   ```
2. Download the `.onnx` files and save them to `public/models/`.
3. In the AnimeForge app, open **Settings (gear icon)** and point the model URLs to:
   - `./models/realesr-general-x4v3.onnx`
   - `./models/model_quantized.onnx`

---

## 🛠️ Troubleshooting

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| **"WebGPU not supported" warning** | Browser or GPU driver does not support WebGPU | AnimeForge automatically falls back to WASM SIMD. Update Chrome/Edge to version 113+ or enable WebGPU flags in `chrome://flags`. |
| **Model download fails / stops** | Network disconnect or CORS restriction | Click "Use Fast Instant Mode Instead" in the download modal, or enter an alternate CDN mirror in Settings. |
| **Out of Memory on 4K image** | Tile size too large for mobile/integrated GPU | Open **Settings** and reduce Upscaler Tile Size to `128 x 128`. |
| **Blank page on GitHub Pages** | Absolute asset path mismatch | Ensure `vite.config.js` contains `base: './'`. AnimeForge is pre-configured with relative base paths. |

---

## ⚠️ Known Limitations

1. **Hardware Acceleration**: WebGPU performance depends on the user's local GPU. Dedicated GPUs (NVIDIA/AMD/Apple Silicon) process 256x256 tiles in ~100–300ms; low-power mobile GPUs or WASM CPU fallback may take 1–3s per tile.
2. **First Load Latency**: The deep neural models are ~60–90MB in size. On slow internet connections, initial model caching may take 15–30 seconds. AnimeForge provides an instant procedural mode for immediate zero-download testing.

---

## 📄 Licenses & Acknowledgements

- **Application Code**: Licensed under the [MIT License](./LICENSE).
- **Real-ESRGAN**: BSD-3-Clause License (Xintao Wang et al., Tencent ARC Lab & CUHK).
- **IS-Net Anime / DIS**: MIT / Apache-2.0 License (SkyTNT / Xuehai He).
- **ONNX Runtime Web**: MIT License (Microsoft Corporation).
