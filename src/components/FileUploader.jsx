import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, Image as ImageIcon, Sparkles, AlertCircle, FileCheck } from 'lucide-react';

export function FileUploader({
  onFileSelected,
  onBatchSelected,
  isBatchMode = false,
  sampleImageUrl = './sample-anime.svg',
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [warning, setWarning] = useState(null);
  const fileInputRef = useRef(null);

  // Paste from clipboard listener
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            validateAndPassFile(file);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [isBatchMode]);

  const validateAndPassFile = (file) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      setWarning('Please upload a valid PNG, JPG, or WebP image.');
      return;
    }

    // Check size (> 25MB check)
    if (file.size > 25 * 1024 * 1024) {
      setWarning('Large image detected (>25MB). Tiled processing will be used to ensure browser stability.');
    } else {
      setWarning(null);
    }

    if (isBatchMode && onBatchSelected) {
      onBatchSelected([file]);
    } else if (onFileSelected) {
      onFileSelected(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    if (files.length === 0) return;

    if (isBatchMode && onBatchSelected) {
      onBatchSelected(files);
    } else {
      validateAndPassFile(files[0]);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    if (isBatchMode && onBatchSelected) {
      onBatchSelected(files);
    } else {
      validateAndPassFile(files[0]);
    }
    // Reset input
    e.target.value = '';
  };

  const handleLoadSample = async () => {
    try {
      const res = await fetch(sampleImageUrl);
      const blob = await res.blob();
      const file = new File([blob], 'sample-anime.svg', { type: 'image/svg+xml' });
      validateAndPassFile(file);
    } catch (err) {
      console.error('Failed to load sample image:', err);
    }
  };

  return (
    <div className="w-full">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative cursor-pointer rounded-3xl border-2 border-dashed p-8 sm:p-12 text-center transition-all duration-300 ${
          isDragging
            ? 'border-purple-500 bg-purple-500/10 scale-[1.01] shadow-xl shadow-purple-500/20'
            : 'border-slate-800 bg-slate-900/40 hover:border-purple-500/50 hover:bg-slate-900/70 dark:border-slate-800 dark:bg-slate-900/40 light:border-slate-300 light:bg-slate-50 light:hover:bg-purple-50/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          multiple={isBatchMode}
          onChange={handleFileChange}
          className="hidden"
          aria-label="Upload anime artwork"
        />

        <div className="flex flex-col items-center justify-center gap-4">
          {/* Animated upload icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600/20 via-pink-600/20 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-8 h-8 animate-bounce" />
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-100 light:text-slate-900">
              {isBatchMode ? 'Drop multiple anime images here' : 'Drop your anime artwork here'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600 mt-1">
              or <span className="text-purple-400 font-semibold underline underline-offset-4">browse files</span> from your device
            </p>
          </div>

          {/* Quick paste hint */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span className="px-2 py-1 rounded bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-200 text-slate-400 font-mono">
              Ctrl + V to paste
            </span>
            <span>•</span>
            <span>PNG, JPG, WebP</span>
            <span>•</span>
            <span>Up to 4K resolution</span>
          </div>

          {/* Sample Artwork Trigger */}
          <div className="mt-2" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={handleLoadSample}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-500/40 transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>Or click here to try sample anime artwork</span>
            </button>
          </div>
        </div>
      </div>

      {/* Warning Alert */}
      {warning && (
        <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{warning}</span>
        </div>
      )}
    </div>
  );
}
