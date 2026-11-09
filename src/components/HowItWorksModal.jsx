import React, { useEffect } from 'react';
import { X, Cpu, Layers, ShieldCheck, Zap, Sparkles, CheckCircle2 } from 'lucide-react';

export function HowItWorksModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#0c1220] border border-slate-800 rounded-3xl p-6 sm:p-8 overflow-y-auto shadow-2xl flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Cpu className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">How AnimeForge Works</h3>
              <p className="text-xs text-slate-400">100% In-Browser Client-Side Machine Learning</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core Pillars */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          
          {/* Pillar 1 */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex gap-3.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-slate-100 mb-1">Total Privacy Guarantee</h4>
              <p className="text-slate-400">
                Traditional AI tools upload your original art to cloud servers. AnimeForge runs completely inside your browser sandbox via WebGPU and WebAssembly. No servers, no accounts, and zero telemetry.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex gap-3.5">
            <Layers className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-slate-100 mb-1">Tiled Execution & Seam Blending</h4>
              <p className="text-slate-400">
                Feeding high-resolution anime art directly into deep neural networks would quickly exceed GPU VRAM and crash the tab. AnimeForge slices the artwork into overlapping tiles, runs neural inference tile-by-tile, and stitches them back together with 2D cosine weight blending for artifact-free seams.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex gap-3.5">
            <Sparkles className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-slate-100 mb-1">Illustration Matting & Despill</h4>
              <p className="text-slate-400">
                The segmentation engine utilizes IS-Net Anime weights trained specifically on manga and illustration line-art. An integrated bilateral alpha refinement pass smooths semi-transparent hair tips and neutralizes background color spill without losing crisp line-work.
              </p>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex gap-3.5">
            <Zap className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-slate-100 mb-1">Persistent Browser Caching</h4>
              <p className="text-slate-400">
                Neural weights are cached in your browser's Cache Storage. After the first load, models boot in milliseconds directly from local disk, functioning completely offline without consuming additional bandwidth.
              </p>
            </div>
          </div>

        </div>

        {/* Close Button */}
        <div className="pt-2 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20 transition-all"
          >
            Got it
          </button>
        </div>

      </div>
    </div>
  );
}
