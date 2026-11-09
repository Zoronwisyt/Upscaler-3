import React, { useState } from 'react';
import { X, Cpu, HardDrive, Trash2, CheckCircle2, RefreshCw } from 'lucide-react';
import { clearModelCache } from '../utils/modelCache';

export function SettingsDrawer({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
}) {
  const [provider, setProvider] = useState(settings.provider || 'webgpu');
  const [tileSize, setTileSize] = useState(settings.tileSize || 256);
  const [padding, setPadding] = useState(settings.padding || 16);
  const [upscalerUrl, setUpscalerUrl] = useState(settings.upscalerUrl);
  const [bgRemoverUrl, setBgRemoverUrl] = useState(settings.bgRemoverUrl);
  const [cacheCleared, setCacheCleared] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveSettings({
      provider,
      tileSize: parseInt(tileSize, 10),
      padding: parseInt(padding, 10),
      upscalerUrl,
      bgRemoverUrl,
    });
    onClose();
  };

  const handleClearCache = async () => {
    await clearModelCache();
    setCacheCleared(true);
    setTimeout(() => setCacheCleared(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md h-full bg-[#0c1220] border-l border-slate-800 p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-y-auto">
        
        {/* Top */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-400" />
              <span>Inference & Engine Settings</span>
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Execution Provider */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">
              Hardware Execution Provider
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setProvider('webgpu')}
                className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                  provider === 'webgpu'
                    ? 'border-purple-500 bg-purple-500/10 text-purple-300 ring-2 ring-purple-500/20'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-slate-200">WebGPU (Default)</div>
                <div className="text-[11px] text-slate-500 mt-1">GPU Accelerated • Ultra fast</div>
              </button>

              <button
                type="button"
                onClick={() => setProvider('wasm')}
                className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                  provider === 'wasm'
                    ? 'border-purple-500 bg-purple-500/10 text-purple-300 ring-2 ring-purple-500/20'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-slate-200">WASM (Fallback)</div>
                <div className="text-[11px] text-slate-500 mt-1">Universal CPU compatibility</div>
              </button>
            </div>
          </div>

          {/* Tile Size */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-300">Upscaler Tile Size</label>
              <span className="font-mono text-purple-400">{tileSize} &times; {tileSize} px</span>
            </div>
            <select
              value={tileSize}
              onChange={(e) => setTileSize(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="128">128 &times; 128 (Safe for low-end / mobile)</option>
              <option value="256">256 &times; 256 (Recommended balance)</option>
              <option value="512">512 &times; 512 (High VRAM GPUs only)</option>
            </select>
          </div>

          {/* Overlap Padding */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-300">Seam Overlap Padding</label>
              <span className="font-mono text-purple-400">{padding} px</span>
            </div>
            <select
              value={padding}
              onChange={(e) => setPadding(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="16">16 px (Standard cosine blending)</option>
              <option value="32">32 px (Ultra-wide seam blending)</option>
            </select>
          </div>

          {/* Model CDN URLs */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-300">Model Weights URLs</label>
            <div>
              <span className="text-[11px] text-slate-400 block mb-1">Real-ESRGAN Anime ONNX:</span>
              <input
                type="text"
                value={upscalerUrl}
                onChange={(e) => setUpscalerUrl(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs font-mono text-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <span className="text-[11px] text-slate-400 block mb-1">IS-Net Anime Segmentation ONNX:</span>
              <input
                type="text"
                value={bgRemoverUrl}
                onChange={(e) => setBgRemoverUrl(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs font-mono text-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Cache Management */}
          <div className="pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-semibold text-slate-300">Model Cache Storage</h4>
                <p className="text-[11px] text-slate-500">Free up local browser disk space</p>
              </div>

              <button
                type="button"
                onClick={handleClearCache}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
              >
                {cacheCleared ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Trash2 className="w-3.5 h-3.5" />}
                <span>{cacheCleared ? 'Cleared!' : 'Clear Cache'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="pt-6 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transition-all"
          >
            Save Preferences
          </button>
        </div>

      </div>
    </div>
  );
}
