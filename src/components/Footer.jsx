import React from 'react';
import { Shield, Cpu, Lock, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#080c14] dark:border-slate-800/80 dark:bg-[#080c14] light:border-slate-200 light:bg-slate-50 py-10 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Privacy Highlight Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-cyan-950/40 border border-purple-500/20 dark:from-purple-950/40 dark:via-slate-900 dark:to-cyan-950/40 light:from-purple-50 light:via-white light:to-cyan-50 light:border-purple-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Lock className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-100 light:text-slate-900">
                Guaranteed Client-Side Privacy
              </h4>
              <p className="text-xs text-slate-400 light:text-slate-600">
                Your artwork is processed exclusively within your device's memory using WebGPU & WASM. Nothing is ever uploaded.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-purple-300 light:text-purple-700 bg-purple-500/10 px-3 py-1.5 rounded-lg border border-purple-500/20 whitespace-nowrap">
            <Cpu className="w-4 h-4" />
            <span>WebGPU / WASM Local Engine</span>
          </div>
        </div>

        {/* Links & Attributions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 light:text-slate-500 border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-200 pt-6">
          <div className="flex items-center gap-2">
            <span>AnimeForge &copy; {new Date().getFullYear()}</span>
            <span>•</span>
            <span>MIT License</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Crafted for anime artists & creators
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/xinntao/Real-ESRGAN"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors"
            >
              Real-ESRGAN
            </a>
            <a
              href="https://github.com/SkyTNT/anime-segmentation"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors"
            >
              IS-Net Anime
            </a>
            <a
              href="https://onnxruntime.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors"
            >
              ONNX Runtime Web
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
