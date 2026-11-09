import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function Toast({ toast, onClose }) {
  if (!toast) return null;

  const { type = 'info', message } = toast;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900/95 border border-purple-500/30 text-slate-100 shadow-2xl backdrop-blur-md animate-fadeIn">
      {type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
      {type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
      {type === 'info' && <Info className="w-4 h-4 text-cyan-400 shrink-0" />}

      <span className="text-xs font-medium">{message}</span>

      <button
        onClick={onClose}
        className="ml-2 p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
