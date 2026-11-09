import React from 'react';
import { DownloadCloud, Zap, HardDrive, ShieldCheck, X } from 'lucide-react';
import { formatBytes } from '../utils/canvasUtils';

export function ModelDownloadModal({
  isOpen,
  modelName,
  progress, // { loaded, total, percent, speedMBps, etaSeconds, cached }
  onCancel,
  onUseProceduralFallback,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0e1424] border border-purple-500/30 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-2xl shadow-purple-500/10">
        
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-600 to-cyan-500 p-[2px]">
            <div className="w-full h-full bg-[#0e1424] rounded-[14px] flex items-center justify-center">
              <DownloadCloud className="w-6 h-6 text-purple-400 animate-bounce" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">
              Downloading Neural Model
            </h3>
            <p className="text-xs text-purple-400 font-mono">
              {modelName}
            </p>
          </div>
        </div>

        {/* Cache Storage Note */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
          <HardDrive className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <span>
            This model downloads directly to your browser's persistent <strong>Cache Storage</strong>. Once downloaded, it will load instantly offline from disk.
          </span>
        </div>

        {/* Progress Bar & Stats */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">
              {progress?.loaded ? formatBytes(progress.loaded) : '0 MB'} / {progress?.total ? formatBytes(progress.total) : '...'}
            </span>
            <span className="text-purple-400 font-bold">
              {progress?.percent !== undefined && progress.percent >= 0 ? `${progress.percent}%` : 'Connecting...'}
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 rounded-full transition-all duration-200"
              style={{ width: `${Math.max(5, progress?.percent || 0)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono mt-1">
            <span>Speed: {progress?.speedMBps ? `${progress.speedMBps} MB/s` : 'Calculating...'}</span>
            <span>ETA: {progress?.etaSeconds !== undefined ? `${progress.etaSeconds}s remaining` : '...'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
          <button
            onClick={onUseProceduralFallback}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Use Fast Instant Mode Instead</span>
          </button>

          <button
            onClick={onCancel}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
