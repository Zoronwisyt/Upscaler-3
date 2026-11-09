import React, { useState, useRef, useEffect } from 'react';
import { 
  Split, 
  Maximize2, 
  Download, 
  Copy, 
  Sparkles, 
  Scissors, 
  Brush, 
  RefreshCw,
  Check,
  ChevronDown,
  Layers,
  Palette
} from 'lucide-react';
import { formatBytes } from '../utils/canvasUtils';
import { downloadImage, copyImageToClipboard } from '../utils/imageUtils';

export function ComparisonViewer({
  originalImage,
  originalDims,
  originalSize,
  processedCanvas,
  processedDims,
  processedSize,
  activeMode, // 'upscale' or 'bgremove'
  onChainUpscale,
  onChainBgRemove,
  onOpenRefineBrush,
  onOpenZoomPan,
  onReset,
}) {
  const [sliderPos, setSliderPos] = useState(50); // 0 to 100%
  const [orientation, setOrientation] = useState('vertical'); // 'vertical' or 'horizontal'
  const [isDragging, setIsDragging] = useState(false);
  const [bgType, setBgType] = useState('checkerboard'); // 'checkerboard', 'black', 'white', 'green', 'custom'
  const [customBgColor, setCustomBgColor] = useState('#1e1b4b');
  const [customBgImage, setCustomBgImage] = useState(null);
  const [downloadFormat, setDownloadFormat] = useState('png');
  const [downloadQuality, setDownloadQuality] = useState(0.95);
  const [copied, setCopied] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const containerRef = useRef(null);
  const fileBgInputRef = useRef(null);

  // Drag handlers
  const handleMove = (clientX, clientY) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (orientation === 'vertical') {
      const x = clientX - rect.left;
      const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPos(pct);
    } else {
      const y = clientY - rect.top;
      const pct = Math.max(0, Math.min(100, (y / rect.height) * 100));
      setSliderPos(pct);
    }
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleTouchStart = () => setIsDragging(true);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e) => {
      if (isDragging) handleMove(e.clientX, e.clientY);
    };
    const handleTouchMove = (e) => {
      if (isDragging && e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging, orientation]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      setSliderPos(p => Math.max(0, p - 5));
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      setSliderPos(p => Math.min(100, p + 5));
    }
  };

  const handleCustomBgUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomBgImage(url);
      setBgType('customImage');
    }
  };

  const handleCopy = async () => {
    if (!processedCanvas) return;
    try {
      await copyImageToClipboard(processedCanvas);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = () => {
    if (!processedCanvas) return;
    downloadImage(processedCanvas, `animeforge_${activeMode}`, downloadFormat, {
      quality: downloadQuality,
      backgroundColor: bgType === 'white' ? '#ffffff' : bgType === 'black' ? '#000000' : customBgColor,
    });
  };

  // Background style helper
  const getBackgroundStyle = () => {
    if (bgType === 'checkerboard') return '';
    if (bgType === 'black') return 'bg-black';
    if (bgType === 'white') return 'bg-white';
    if (bgType === 'green') return 'bg-[#00ff00]';
    if (bgType === 'customColor') return '';
    if (bgType === 'customImage' && customBgImage) {
      return '';
    }
    return '';
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200">
        
        {/* Left: Resolution & Details */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="px-3 py-1.5 rounded-lg bg-slate-800/80 dark:bg-slate-800/80 light:bg-white text-slate-300 light:text-slate-700 font-medium border border-slate-700/50">
            <span className="text-slate-500 mr-1.5">Original:</span>
            {originalDims.w} &times; {originalDims.h}
            {originalSize > 0 && <span className="ml-1 text-slate-500">({formatBytes(originalSize)})</span>}
          </div>

          <div className="text-purple-400 font-bold">&rarr;</div>

          <div className="px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-300 font-medium border border-purple-500/20">
            <span className="text-purple-400 mr-1.5">Output:</span>
            {processedDims.w} &times; {processedDims.h}
            {processedSize > 0 && <span className="ml-1 text-purple-400/80">({formatBytes(processedSize)})</span>}
          </div>
        </div>

        {/* Center/Right: View Options & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Orientation Toggle */}
          <button
            onClick={() => setOrientation(o => (o === 'vertical' ? 'horizontal' : 'vertical'))}
            className="p-2 rounded-lg bg-slate-800 dark:bg-slate-800 light:bg-white text-slate-300 light:text-slate-700 hover:text-white border border-slate-700/50 transition-colors"
            title={`Switch to ${orientation === 'vertical' ? 'Horizontal' : 'Vertical'} Split`}
            aria-label="Toggle split orientation"
          >
            <Split className={`w-4 h-4 ${orientation === 'horizontal' ? 'rotate-90' : ''}`} />
          </button>

          {/* Zoom/Pan Modal */}
          <button
            onClick={onOpenZoomPan}
            className="p-2 rounded-lg bg-slate-800 dark:bg-slate-800 light:bg-white text-slate-300 light:text-slate-700 hover:text-white border border-slate-700/50 transition-colors"
            title="Inspect with Zoom & Pan"
            aria-label="Inspect with Zoom and Pan"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Background selector (for transparent cutouts) */}
          {activeMode === 'bgremove' && (
            <div className="flex items-center gap-1 bg-slate-800 dark:bg-slate-800 light:bg-white px-2 py-1 rounded-lg border border-slate-700/50">
              <span className="text-[11px] text-slate-400 mr-1">Backdrop:</span>
              <button
                onClick={() => setBgType('checkerboard')}
                className={`w-5 h-5 rounded border ${bgType === 'checkerboard' ? 'border-purple-400 ring-2 ring-purple-500/30' : 'border-slate-600'} bg-checkerboard`}
                title="Checkerboard (Transparent)"
              />
              <button
                onClick={() => setBgType('white')}
                className={`w-5 h-5 rounded border ${bgType === 'white' ? 'border-purple-400 ring-2 ring-purple-500/30' : 'border-slate-600'} bg-white`}
                title="Solid White"
              />
              <button
                onClick={() => setBgType('black')}
                className={`w-5 h-5 rounded border ${bgType === 'black' ? 'border-purple-400 ring-2 ring-purple-500/30' : 'border-slate-600'} bg-black`}
                title="Solid Black"
              />
              <button
                onClick={() => setBgType('green')}
                className={`w-5 h-5 rounded border ${bgType === 'green' ? 'border-purple-400 ring-2 ring-purple-500/30' : 'border-slate-600'} bg-[#00ff00]`}
                title="Green Screen"
              />
              <button
                onClick={() => fileBgInputRef.current?.click()}
                className={`p-1 rounded text-xs ${bgType === 'customImage' ? 'text-purple-400 font-bold' : 'text-slate-400'} hover:text-white`}
                title="Upload Custom Background Image"
              >
                <Palette className="w-3.5 h-3.5" />
              </button>
              <input
                ref={fileBgInputRef}
                type="file"
                accept="image/*"
                onChange={handleCustomBgUpload}
                className="hidden"
              />
            </div>
          )}

          {/* Refine Cutout Brush Button (Only for BG Remover) */}
          {activeMode === 'bgremove' && onOpenRefineBrush && (
            <button
              onClick={onOpenRefineBrush}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-pink-500/10 text-pink-300 hover:bg-pink-500/20 border border-pink-500/30 transition-all"
            >
              <Brush className="w-3.5 h-3.5" />
              <span>Refine Brush</span>
            </button>
          )}

          {/* Reset Image */}
          <button
            onClick={onReset}
            className="p-2 rounded-lg bg-slate-800 dark:bg-slate-800 light:bg-white text-slate-400 hover:text-red-400 border border-slate-700/50 transition-colors"
            title="Upload another image"
            aria-label="Upload another image"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interactive Comparison Viewport */}
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className={`relative w-full h-[520px] sm:h-[600px] rounded-3xl overflow-hidden select-none border border-slate-800 shadow-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 ${
          bgType === 'checkerboard' ? 'bg-checkerboard' : getBackgroundStyle()
        }`}
        style={
          bgType === 'customColor'
            ? { backgroundColor: customBgColor }
            : bgType === 'customImage' && customBgImage
            ? { backgroundImage: `url(${customBgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : {}
        }
      >
        {/* Layer 1: Processed (Right / Bottom) */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <canvas
            ref={(canvas) => {
              if (canvas && processedCanvas) {
                canvas.width = processedCanvas.width;
                canvas.height = processedCanvas.height;
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(processedCanvas, 0, 0);
              }
            }}
            className="max-w-full max-h-full object-contain"
          />
          <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-purple-600/80 backdrop-blur-md text-white font-bold text-xs tracking-wider shadow-lg">
            {activeMode === 'upscale' ? 'AI UPSCALED' : 'BACKGROUND REMOVED'}
          </div>
        </div>

        {/* Layer 2: Original (Left / Top) clipped by slider */}
        <div
          className="absolute inset-0 overflow-hidden flex items-center justify-center p-4 pointer-events-none"
          style={{
            clipPath:
              orientation === 'vertical'
                ? `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
                : `polygon(0 0, 100% 0, 100% ${sliderPos}%, 0 ${sliderPos}%)`,
          }}
        >
          {originalImage && (
            <img
              src={originalImage.src}
              alt="Original artwork"
              className="max-w-full max-h-full object-contain"
            />
          )}
          <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-300 font-bold text-xs tracking-wider border border-slate-700 shadow-lg">
            ORIGINAL
          </div>
        </div>

        {/* Slider Divider Bar */}
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className={`absolute z-20 cursor-ew-resize flex items-center justify-center ${
            orientation === 'vertical'
              ? 'top-0 bottom-0 w-1 -ml-0.5 bg-gradient-to-b from-purple-400 via-pink-400 to-cyan-400'
              : 'left-0 right-0 h-1 -mt-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 cursor-ns-resize'
          }`}
          style={
            orientation === 'vertical'
              ? { left: `${sliderPos}%` }
              : { top: `${sliderPos}%` }
          }
        >
          {/* Circular Slider Knob */}
          <div className="w-9 h-9 rounded-full bg-[#0b0f19] border-2 border-white/90 shadow-xl flex items-center justify-center text-white cursor-pointer hover:scale-110 active:scale-95 transition-transform">
            <Split className={`w-4 h-4 ${orientation === 'horizontal' ? 'rotate-90' : ''}`} />
          </div>
        </div>
      </div>

      {/* Bottom Action Bar: Chaining, Copy & Export */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
        
        {/* Chaining Feature Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {activeMode === 'bgremove' && onChainUpscale && (
            <button
              onClick={onChainUpscale}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/20 transition-all"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>Upscale This Cutout &rarr;</span>
            </button>
          )}

          {activeMode === 'upscale' && onChainBgRemove && (
            <button
              onClick={onChainBgRemove}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white shadow-lg shadow-pink-500/20 transition-all"
            >
              <Scissors className="w-4 h-4 text-pink-200" />
              <span>Remove Background &rarr;</span>
            </button>
          )}
        </div>

        {/* Export & Copy Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {/* Copy to Clipboard */}
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60 transition-colors"
            title="Copy image to clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          {/* Format Select */}
          <select
            value={downloadFormat}
            onChange={(e) => setDownloadFormat(e.target.value)}
            className="bg-slate-800 text-slate-200 text-xs sm:text-sm font-medium px-3 py-2.5 rounded-xl border border-slate-700/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="png">PNG (Lossless / Alpha)</option>
            <option value="webp">WebP (Compressed)</option>
            <option value="jpg">JPG (Standard)</option>
          </select>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:opacity-95 text-white shadow-lg shadow-purple-500/25 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>

      </div>
    </div>
  );
}
