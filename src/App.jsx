import React, { useState, useRef, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Scissors, 
  Layers, 
  Zap, 
  Cpu, 
  Sliders, 
  DownloadCloud, 
  AlertTriangle,
  Loader2,
  RefreshCw,
  XCircle
} from 'lucide-react';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FileUploader } from './components/FileUploader';
import { ComparisonViewer } from './components/ComparisonViewer';
import { ZoomPanViewer } from './components/ZoomPanViewer';
import { RefineBrushModal } from './components/RefineBrushModal';
import { BatchProcessor } from './components/BatchProcessor';
import { ModelDownloadModal } from './components/ModelDownloadModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { SettingsDrawer } from './components/SettingsDrawer';
import { Toast } from './components/Toast';

import { useTheme } from './hooks/useTheme';
import { loadImage, getImageDataFromImage, imageDataToCanvas, downsampleCanvas } from './utils/canvasUtils';
import { downloadAndCacheModel, isModelCached } from './utils/modelCache';

// Default model URLs (Public Hugging Face CDN)
const DEFAULT_UPSCALER_URL = 'https://huggingface.co/OpenSynthetics/real-esrgan-anime/resolve/main/RealESRGAN_x4plus_anime_6B.onnx';
const DEFAULT_BGREMOVER_URL = 'https://huggingface.co/SkyTNT/anime-segmentation/resolve/main/isnet-anime.onnx';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  // Navigation & View State
  const [activeTab, setActiveTab] = useState('upscale'); // 'upscale' or 'bgremove'
  const [isBatchMode, setIsBatchMode] = useState(false);

  // Settings
  const [settings, setSettings] = useState({
    provider: 'webgpu',
    tileSize: 256,
    padding: 16,
    upscalerUrl: DEFAULT_UPSCALER_URL,
    bgRemoverUrl: DEFAULT_BGREMOVER_URL,
  });

  // Current Active Image State
  const [originalFile, setOriginalFile] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [originalDims, setOriginalDims] = useState({ w: 0, h: 0 });
  const [originalSize, setOriginalSize] = useState(0);

  // Processed Output State
  const [processedCanvas, setProcessedCanvas] = useState(null);
  const [processedDims, setProcessedDims] = useState({ w: 0, h: 0 });
  const [processedSize, setProcessedSize] = useState(0);

  // Processing Controls
  const [scaleFactor, setScaleFactor] = useState(4); // 2 or 4
  const [engineMode, setEngineMode] = useState('ai'); // 'ai' or 'procedural'
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressInfo, setProgressInfo] = useState({ percent: 0, message: '', etaSeconds: 0, tileIndex: 0, totalTiles: 0 });

  // Batch Queue
  const [batchQueue, setBatchQueue] = useState([]);
  const [batchIndex, setBatchIndex] = useState(0);

  // Modals
  const [isZoomPanOpen, setIsZoomPanOpen] = useState(false);
  const [isRefineOpen, setIsRefineOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [modelDownloadState, setModelDownloadState] = useState({
    isOpen: false,
    modelName: '',
    progress: null,
  });

  // Toast
  const [toast, setToast] = useState(null);

  // Workers
  const upscalerWorkerRef = useRef(null);
  const bgWorkerRef = useRef(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Initialize Web Workers
  useEffect(() => {
    upscalerWorkerRef.current = new Worker(
      new URL('./workers/upscaler.worker.js', import.meta.url),
      { type: 'module' }
    );
    bgWorkerRef.current = new Worker(
      new URL('./workers/bgremover.worker.js', import.meta.url),
      { type: 'module' }
    );

    return () => {
      upscalerWorkerRef.current?.terminate();
      bgWorkerRef.current?.terminate();
    };
  }, []);

  // Handle single file upload
  const handleFileSelected = async (file) => {
    try {
      const img = await loadImage(file);
      setOriginalFile(file);
      setOriginalImage(img);
      setOriginalDims({ w: img.width, h: img.height });
      setOriginalSize(file.size);
      setProcessedCanvas(null);
    } catch (err) {
      showToast('Failed to load image file.', 'error');
    }
  };

  // Handle batch selection
  const handleBatchSelected = async (files) => {
    const newItems = [];
    for (const file of files) {
      try {
        const img = await loadImage(file);
        newItems.push({
          id: Math.random().toString(36).substring(7),
          file,
          previewUrl: img.src,
          width: img.width,
          height: img.height,
          status: 'pending',
          processedCanvas: null,
        });
      } catch (e) {
        console.error(e);
      }
    }
    setBatchQueue(prev => [...prev, ...newItems]);
  };

  // Trigger Model Download & Worker Initialization
  const ensureModelReady = async (modelType) => {
    const isUpscaler = modelType === 'upscale';
    const worker = isUpscaler ? upscalerWorkerRef.current : bgWorkerRef.current;
    const modelUrl = isUpscaler ? settings.upscalerUrl : settings.bgRemoverUrl;
    const modelFileName = isUpscaler ? 'RealESRGAN_x4plus_anime_6B.onnx' : 'isnet-anime.onnx';

    const cached = await isModelCached(modelUrl);
    if (!cached) {
      setModelDownloadState({
        isOpen: true,
        modelName: modelFileName,
        progress: { percent: 0, loaded: 0, total: 0 },
      });
    }

    const buffer = await downloadAndCacheModel(modelUrl, (progress) => {
      setModelDownloadState(prev => ({
        ...prev,
        isOpen: true,
        modelName: modelFileName,
        progress,
      }));
    });

    setModelDownloadState({ isOpen: false, modelName: '', progress: null });

    // Send buffer to worker
    return new Promise((resolve, reject) => {
      const handler = (e) => {
        if (e.data.type === 'MODEL_LOADED') {
          worker.removeEventListener('message', handler);
          resolve(true);
        } else if (e.data.type === 'ERROR') {
          worker.removeEventListener('message', handler);
          reject(new Error(e.data.error));
        }
      };
      worker.addEventListener('message', handler);
      worker.postMessage({
        type: 'LOAD_MODEL',
        payload: {
          modelBuffer: buffer,
          modelUrl,
          provider: settings.provider,
        },
      });
    });
  };

  // Start Processing Current Image
  const handleProcessImage = async () => {
    if (!originalImage) return;
    setIsProcessing(true);
    setProgressInfo({ percent: 0, message: 'Preparing execution...', etaSeconds: 0, tileIndex: 0, totalTiles: 0 });

    try {
      if (engineMode === 'ai') {
        await ensureModelReady(activeTab);
      }

      const inputImageData = getImageDataFromImage(originalImage);

      if (activeTab === 'upscale') {
        const worker = upscalerWorkerRef.current;

        const onWorkerMsg = (e) => {
          const { type, percent, etaSeconds, tileIndex, totalTiles, result, error } = e.data;

          if (type === 'PROGRESS') {
            setProgressInfo({
              percent,
              etaSeconds,
              tileIndex,
              totalTiles,
              message: `Upscaling tile ${tileIndex} of ${totalTiles}...`,
            });
          } else if (type === 'COMPLETE') {
            worker.removeEventListener('message', onWorkerMsg);

            let finalCanvas = imageDataToCanvas(result);

            // If user selected 2x scale and model ran at 4x, smoothly downsample
            if (scaleFactor === 2) {
              finalCanvas = downsampleCanvas(finalCanvas, originalDims.w * 2, originalDims.h * 2);
            }

            setProcessedCanvas(finalCanvas);
            setProcessedDims({ w: finalCanvas.width, h: finalCanvas.height });
            setProcessedSize(Math.round(originalSize * (scaleFactor * 1.5)));
            setIsProcessing(false);

            confetti({ particleCount: 75, spread: 60, origin: { y: 0.8 } });
            showToast('Anime upscaled successfully!', 'success');
          } else if (type === 'ERROR') {
            worker.removeEventListener('message', onWorkerMsg);
            setIsProcessing(false);
            showToast(error || 'Upscaling failed.', 'error');
          } else if (type === 'CANCELLED') {
            worker.removeEventListener('message', onWorkerMsg);
            setIsProcessing(false);
            showToast('Processing cancelled.', 'info');
          }
        };

        worker.addEventListener('message', onWorkerMsg);
        worker.postMessage({
          type: 'UPSCALE',
          payload: {
            imageData: inputImageData,
            scale: 4, // Run ESRGAN at native 4x
            tileSize: settings.tileSize,
            padding: settings.padding,
            mode: engineMode,
          },
        });

      } else {
        // Background Removal
        const worker = bgWorkerRef.current;

        const onWorkerMsg = (e) => {
          const { type, percent, message, result, error } = e.data;

          if (type === 'PROGRESS') {
            setProgressInfo(prev => ({
              ...prev,
              percent,
              message: message || 'Analyzing edges...',
            }));
          } else if (type === 'COMPLETE') {
            worker.removeEventListener('message', onWorkerMsg);
            const finalCanvas = imageDataToCanvas(result);
            setProcessedCanvas(finalCanvas);
            setProcessedDims({ w: finalCanvas.width, h: finalCanvas.height });
            setProcessedSize(Math.round(originalSize * 0.9));
            setIsProcessing(false);

            confetti({ particleCount: 75, spread: 60, origin: { y: 0.8 } });
            showToast('Background removed successfully!', 'success');
          } else if (type === 'ERROR') {
            worker.removeEventListener('message', onWorkerMsg);
            setIsProcessing(false);
            showToast(error || 'Background removal failed.', 'error');
          } else if (type === 'CANCELLED') {
            worker.removeEventListener('message', onWorkerMsg);
            setIsProcessing(false);
            showToast('Processing cancelled.', 'info');
          }
        };

        worker.addEventListener('message', onWorkerMsg);
        worker.postMessage({
          type: 'REMOVE_BG',
          payload: {
            imageData: inputImageData,
            mode: engineMode,
          },
        });
      }

    } catch (err) {
      console.error(err);
      setIsProcessing(false);
      showToast(err.message || 'Error occurred during processing.', 'error');
    }
  };

  // Cancel current processing job
  const handleCancel = () => {
    if (activeTab === 'upscale') {
      upscalerWorkerRef.current?.postMessage({ type: 'CANCEL' });
    } else {
      bgWorkerRef.current?.postMessage({ type: 'CANCEL' });
    }
  };

  // Chaining: Upscale output -> Background Removal
  const handleChainBgRemove = async () => {
    if (!processedCanvas) return;
    const url = processedCanvas.toDataURL('image/png');
    const img = await loadImage(url);
    setOriginalImage(img);
    setOriginalDims({ w: img.width, h: img.height });
    setProcessedCanvas(null);
    setActiveTab('bgremove');
    showToast('Cutout sent to Background Remover.', 'info');
  };

  // Chaining: Background Removal output -> Upscaler
  const handleChainUpscale = async () => {
    if (!processedCanvas) return;
    const url = processedCanvas.toDataURL('image/png');
    const img = await loadImage(url);
    setOriginalImage(img);
    setOriginalDims({ w: img.width, h: img.height });
    setProcessedCanvas(null);
    setActiveTab('upscale');
    showToast('Cutout sent to AI Upscaler.', 'info');
  };

  // Process Batch Queue
  const handleStartBatch = async () => {
    if (batchQueue.length === 0 || isProcessing) return;
    setIsProcessing(true);

    try {
      if (engineMode === 'ai') {
        await ensureModelReady(activeTab);
      }

      for (let i = 0; i < batchQueue.length; i++) {
        if (batchQueue[i].status === 'done') continue;
        setBatchIndex(i);

        setBatchQueue(prev => prev.map((item, idx) => idx === i ? { ...item, status: 'processing' } : item));

        const item = batchQueue[i];
        const img = await loadImage(item.file);
        const inputData = getImageDataFromImage(img);

        const worker = activeTab === 'upscale' ? upscalerWorkerRef.current : bgWorkerRef.current;

        await new Promise((resolve) => {
          const handler = (e) => {
            if (e.data.type === 'COMPLETE') {
              worker.removeEventListener('message', handler);
              let canvas = imageDataToCanvas(e.data.result);
              if (activeTab === 'upscale' && scaleFactor === 2) {
                canvas = downsampleCanvas(canvas, img.width * 2, img.height * 2);
              }
              setBatchQueue(prev => prev.map((q, idx) => idx === i ? { ...q, status: 'done', processedCanvas: canvas } : q));
              resolve();
            } else if (e.data.type === 'ERROR') {
              worker.removeEventListener('message', handler);
              setBatchQueue(prev => prev.map((q, idx) => idx === i ? { ...q, status: 'error' } : q));
              resolve();
            }
          };
          worker.addEventListener('message', handler);

          if (activeTab === 'upscale') {
            worker.postMessage({
              type: 'UPSCALE',
              payload: {
                imageData: inputData,
                scale: 4,
                tileSize: settings.tileSize,
                padding: settings.padding,
                mode: engineMode,
              },
            });
          } else {
            worker.postMessage({
              type: 'REMOVE_BG',
              payload: {
                imageData: inputData,
                mode: engineMode,
              },
            });
          }
        });
      }

      confetti({ particleCount: 100, spread: 70, origin: { y: 0.8 } });
      showToast('Batch processing complete!', 'success');
    } catch (err) {
      showToast(err.message || 'Batch failed.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-purple-500 selection:text-white">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isBatchMode={isBatchMode}
        setIsBatchMode={setIsBatchMode}
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Real-ESRGAN Anime &amp; IS-Net WebGPU Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {activeTab === 'upscale' ? (
              <>
                Super-Resolution for{' '}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Anime Artwork
                </span>
              </>
            ) : (
              <>
                Hair-Strand Precision{' '}
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Background Removal
                </span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-xl">
            {activeTab === 'upscale'
              ? 'Enlarge anime art 2x or 4x with clean lines and flat colors. Processed locally in overlapping tiles to prevent browser memory crashes.'
              : 'Extract anime characters with clean alpha transparency, fine hair contours, and interactive brush refinement.'}
          </p>
        </div>

        {/* Batch Mode View */}
        {isBatchMode ? (
          <div className="w-full flex flex-col gap-6">
            <FileUploader
              onBatchSelected={handleBatchSelected}
              isBatchMode={true}
            />
            {batchQueue.length > 0 && (
              <BatchProcessor
                queue={batchQueue}
                onRemoveItem={(idx) => setBatchQueue(q => q.filter((_, i) => i !== idx))}
                onClearQueue={() => setBatchQueue([])}
                onStartBatch={handleStartBatch}
                isProcessing={isProcessing}
                currentProcessingIndex={batchIndex}
                activeMode={activeTab}
                scale={scaleFactor}
              />
            )}
          </div>
        ) : (
          /* Single Image Mode View */
          <div className="w-full flex flex-col gap-8">
            
            {/* If no image selected, show File Uploader */}
            {!originalImage ? (
              <FileUploader
                onFileSelected={handleFileSelected}
                isBatchMode={false}
              />
            ) : (
              /* If image loaded, show Control Bar & Viewer */
              <div className="flex flex-col gap-6">
                
                {/* Control Panel Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl bg-slate-900/50 border border-slate-800">
                  
                  {/* Left Controls: Scale or Tool Selection */}
                  <div className="flex flex-wrap items-center gap-3">
                    {activeTab === 'upscale' && (
                      <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
                        <span className="text-xs text-slate-400 font-semibold px-2">Scale:</span>
                        <button
                          onClick={() => setScaleFactor(2)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            scaleFactor === 2
                              ? 'bg-purple-600 text-white shadow-md'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          2&times;
                        </button>
                        <button
                          onClick={() => setScaleFactor(4)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            scaleFactor === 4
                              ? 'bg-purple-600 text-white shadow-md'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          4&times;
                        </button>
                      </div>
                    )}

                    {/* Engine Mode: AI Neural vs Fast Procedural */}
                    <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
                      <button
                        onClick={() => setEngineMode('ai')}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                          engineMode === 'ai'
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                            : 'text-slate-400 hover:text-white'
                        }`}
                        title="Deep Learning Neural Network (Real-ESRGAN / IS-Net)"
                      >
                        <Cpu className="w-3.5 h-3.5" />
                        <span>AI Neural ({settings.provider.toUpperCase()})</span>
                      </button>

                      <button
                        onClick={() => setEngineMode('procedural')}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                          engineMode === 'procedural'
                            ? 'bg-amber-600 text-white shadow-md'
                            : 'text-slate-400 hover:text-white'
                        }`}
                        title="Zero-download instant edge-enhancement algorithm"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Instant Mode</span>
                      </button>
                    </div>
                  </div>

                  {/* Right: Execute or Cancel Button */}
                  <div className="flex items-center gap-3">
                    {isProcessing ? (
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 transition-all"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleProcessImage}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:opacity-95 text-white shadow-lg shadow-purple-500/25 transition-all"
                      >
                        <Sparkles className="w-4 h-4 text-white" />
                        <span>{processedCanvas ? 'Re-Process' : activeTab === 'upscale' ? `Upscale ${scaleFactor}x` : 'Remove Background'}</span>
                      </button>
                    )}
                  </div>

                </div>

                {/* Progress Bar (Visible during processing) */}
                {isProcessing && (
                  <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 flex flex-col gap-2 animate-fadeIn">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-purple-300 flex items-center gap-2">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        {progressInfo.message || 'Processing...'}
                      </span>
                      <span className="text-purple-400 font-bold">{progressInfo.percent}%</span>
                    </div>

                    <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 rounded-full transition-all duration-300"
                        style={{ width: `${progressInfo.percent}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span>{progressInfo.totalTiles > 0 ? `Tile ${progressInfo.tileIndex} of ${progressInfo.totalTiles}` : 'Inference running'}</span>
                      {progressInfo.etaSeconds > 0 && <span>ETA: ~{progressInfo.etaSeconds}s</span>}
                    </div>
                  </div>
                )}

                {/* Interactive Comparison Viewer */}
                {processedCanvas ? (
                  <ComparisonViewer
                    originalImage={originalImage}
                    originalDims={originalDims}
                    originalSize={originalSize}
                    processedCanvas={processedCanvas}
                    processedDims={processedDims}
                    processedSize={processedSize}
                    activeMode={activeTab}
                    onChainUpscale={handleChainUpscale}
                    onChainBgRemove={handleChainBgRemove}
                    onOpenRefineBrush={() => setIsRefineOpen(true)}
                    onOpenZoomPan={() => setIsZoomPanOpen(true)}
                    onReset={() => {
                      setOriginalImage(null);
                      setProcessedCanvas(null);
                    }}
                  />
                ) : (
                  /* Original Preview Before Processing */
                  <div className="relative w-full h-[450px] rounded-3xl overflow-hidden border border-slate-800 flex items-center justify-center bg-slate-900/30 bg-checkerboard">
                    <img
                      src={originalImage.src}
                      alt="Selected artwork"
                      className="max-w-full max-h-full object-contain p-4"
                    />
                    <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md text-slate-300 text-xs font-mono border border-slate-800">
                      {originalDims.w} &times; {originalDims.h} px
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>
        )}

      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <ZoomPanViewer
        isOpen={isZoomPanOpen}
        onClose={() => setIsZoomPanOpen(false)}
        originalImage={originalImage}
        processedCanvas={processedCanvas}
        activeMode={activeTab}
      />

      <RefineBrushModal
        isOpen={isRefineOpen}
        onClose={() => setIsRefineOpen(false)}
        originalImage={originalImage}
        initialProcessedCanvas={processedCanvas}
        onApply={(updatedCanvas) => {
          setProcessedCanvas(updatedCanvas);
          showToast('Alpha refinements applied!', 'success');
        }}
      />

      <ModelDownloadModal
        isOpen={modelDownloadState.isOpen}
        modelName={modelDownloadState.modelName}
        progress={modelDownloadState.progress}
        onCancel={() => {
          setModelDownloadState({ isOpen: false, modelName: '', progress: null });
          setIsProcessing(false);
        }}
        onUseProceduralFallback={() => {
          setModelDownloadState({ isOpen: false, modelName: '', progress: null });
          setEngineMode('procedural');
          handleProcessImage();
        }}
      />

      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />

      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={(newSettings) => {
          setSettings(newSettings);
          showToast('Preferences updated successfully.', 'success');
        }}
      />

      <Toast
        toast={toast}
        onClose={() => setToast(null)}
      />

    </div>
  );
}
