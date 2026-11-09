import React, { useState } from 'react';
import { 
  Archive, 
  Trash2, 
  Play, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Loader2, 
  Sparkles,
  Scissors
} from 'lucide-react';
import { formatBytes } from '../utils/canvasUtils';
import { createBatchZip } from '../utils/imageUtils';

export function BatchProcessor({
  queue,
  onRemoveItem,
  onClearQueue,
  onStartBatch,
  isProcessing,
  currentProcessingIndex,
  activeMode,
  scale,
}) {
  const [zipProgress, setZipProgress] = useState(null);

  const completedItems = queue.filter(item => item.status === 'done');
  const allCompleted = queue.length > 0 && queue.every(item => item.status === 'done');

  const handleDownloadZip = async () => {
    if (completedItems.length === 0) return;
    setZipProgress(1);
    try {
      const zipBlob = await createBatchZip(
        completedItems.map(item => ({
          name: item.file.name,
          canvas: item.processedCanvas,
          suffix: activeMode === 'upscale' ? `${scale}x` : 'nobg',
        })),
        (pct) => setZipProgress(pct)
      );

      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `animeforge_batch_${activeMode}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    } catch (err) {
      console.error('Batch ZIP creation failed:', err);
    } finally {
      setZipProgress(null);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Batch Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <span>Batch Queue</span>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono border border-cyan-500/20">
              {queue.length} {queue.length === 1 ? 'file' : 'files'}
            </span>
          </h3>
          <p className="text-xs text-slate-400">
            {completedItems.length} of {queue.length} completed
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Clear Queue */}
          <button
            onClick={onClearQueue}
            disabled={isProcessing || queue.length === 0}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 transition-colors"
          >
            Clear All
          </button>

          {/* Start Processing */}
          {!allCompleted && (
            <button
              onClick={onStartBatch}
              disabled={isProcessing || queue.length === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-95 text-white disabled:opacity-40 shadow-lg shadow-purple-500/25 transition-all"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing {currentProcessingIndex + 1}/{queue.length}...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Batch</span>
                </>
              )}
            </button>
          )}

          {/* Download ZIP */}
          {completedItems.length > 0 && (
            <button
              onClick={handleDownloadZip}
              disabled={zipProgress !== null}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/25 transition-all"
            >
              <Archive className="w-4 h-4" />
              <span>{zipProgress ? `Zipping (${zipProgress}%)` : `Download All (.ZIP)`}</span>
            </button>
          )}
        </div>
      </div>

      {/* Queue Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {queue.map((item, idx) => (
          <div
            key={item.id || idx}
            className={`relative rounded-2xl border p-4 flex flex-col gap-3 transition-all ${
              idx === currentProcessingIndex
                ? 'border-purple-500 bg-purple-500/10 ring-2 ring-purple-500/30'
                : item.status === 'done'
                ? 'border-emerald-500/30 bg-slate-900/50'
                : 'border-slate-800 bg-slate-900/30'
            }`}
          >
            {/* Thumbnail Preview */}
            <div className="relative w-full h-36 rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center bg-checkerboard">
              <img
                src={item.previewUrl}
                alt={item.file.name}
                className="max-w-full max-h-full object-contain"
              />

              {/* Status Badge */}
              <div className="absolute top-2 right-2">
                {item.status === 'pending' && (
                  <span className="px-2 py-0.5 rounded-md bg-slate-800/90 text-slate-300 text-[10px] font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Queued
                  </span>
                )}
                {item.status === 'processing' && (
                  <span className="px-2 py-0.5 rounded-md bg-purple-500/90 text-white text-[10px] font-semibold flex items-center gap-1 animate-pulse">
                    <Loader2 className="w-3 h-3 animate-spin" /> Processing
                  </span>
                )}
                {item.status === 'done' && (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/90 text-white text-[10px] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Done
                  </span>
                )}
                {item.status === 'error' && (
                  <span className="px-2 py-0.5 rounded-md bg-red-500/90 text-white text-[10px] font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Failed
                  </span>
                )}
              </div>
            </div>

            {/* File Info */}
            <div className="flex items-center justify-between text-xs">
              <div className="truncate max-w-[200px]">
                <p className="font-semibold text-slate-200 truncate">{item.file.name}</p>
                <p className="text-[11px] text-slate-500 font-mono">
                  {formatBytes(item.file.size)}
                  {item.width && ` • ${item.width}×${item.height}`}
                </p>
              </div>

              {!isProcessing && (
                <button
                  onClick={() => onRemoveItem(idx)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
                  title="Remove from queue"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
