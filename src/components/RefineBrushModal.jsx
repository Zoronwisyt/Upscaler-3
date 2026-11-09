import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Check, 
  Undo2, 
  Redo2, 
  Paintbrush, 
  Eraser, 
  Eye, 
  Sliders, 
  Palette,
  RotateCcw
} from 'lucide-react';
import { getImageDataFromImage } from '../utils/canvasUtils';

export function RefineBrushModal({
  isOpen,
  onClose,
  originalImage,
  initialProcessedCanvas,
  onApply,
}) {
  const [mode, setMode] = useState('erase'); // 'erase' or 'keep'
  const [brushSize, setBrushSize] = useState(25);
  const [brushHardness, setBrushHardness] = useState(0.8);
  const [bgType, setBgType] = useState('checkerboard');
  const [customBgColor, setCustomBgColor] = useState('#00ff00');
  
  // History stack for Undo / Redo
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isDrawing, setIsDrawing] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100, visible: false });

  const canvasRef = useRef(null);
  const origDataRef = useRef(null);

  // Initialize canvas when modal opens
  useEffect(() => {
    if (isOpen && initialProcessedCanvas && originalImage) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = initialProcessedCanvas.width;
      canvas.height = initialProcessedCanvas.height;

      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(initialProcessedCanvas, 0, 0);

      // Cache original image data for "Keep" mode restoration
      const origData = getImageDataFromImage(originalImage, canvas.width, canvas.height);
      origDataRef.current = origData;

      // Push initial state to history
      const initialSnapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory([initialSnapshot]);
      setHistoryIndex(0);
    }
  }, [isOpen, initialProcessedCanvas, originalImage]);

  // Keyboard shortcuts (Ctrl+Z, Ctrl+Y, [, ])
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) handleRedo();
        else handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        handleRedo();
      } else if (e.key === '[') {
        setBrushSize(s => Math.max(5, s - 5));
      } else if (e.key === ']') {
        setBrushSize(s => Math.min(150, s + 5));
      } else if (e.key === 'e' || e.key === 'E') {
        setMode('erase');
      } else if (e.key === 'b' || e.key === 'B' || e.key === 'k') {
        setMode('keep');
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, historyIndex, history]);

  if (!isOpen) return null;

  const pushHistorySnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const newHistory = history.slice(0, historyIndex + 1);
    if (newHistory.length >= 20) newHistory.shift(); // Limit to 20 snapshots
    newHistory.push(snapshot);

    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIdx = historyIndex - 1;
      const snapshot = history[newIdx];
      const canvas = canvasRef.current;
      if (canvas && snapshot) {
        const ctx = canvas.getContext('2d');
        ctx.putImageData(snapshot, 0, 0);
        setHistoryIndex(newIdx);
      }
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIdx = historyIndex + 1;
      const snapshot = history[newIdx];
      const canvas = canvasRef.current;
      if (canvas && snapshot) {
        const ctx = canvas.getContext('2d');
        ctx.putImageData(snapshot, 0, 0);
        setHistoryIndex(newIdx);
      }
    }
  };

  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const applyBrush = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const radius = brushSize / 2;
    const minX = Math.max(0, Math.floor(x - radius));
    const minY = Math.max(0, Math.floor(y - radius));
    const maxX = Math.min(canvas.width, Math.ceil(x + radius));
    const maxY = Math.min(canvas.height, Math.ceil(y + radius));
    const w = maxX - minX;
    const h = maxY - minY;

    if (w <= 0 || h <= 0) return;

    const imgData = ctx.getImageData(minX, minY, w, h);
    const data = imgData.data;
    const origData = origDataRef.current?.data;

    for (let py = 0; py < h; py++) {
      const curY = minY + py;
      for (let px = 0; px < w; px++) {
        const curX = minX + px;
        const dist = Math.sqrt(Math.pow(curX - x, 2) + Math.pow(curY - y, 2));

        if (dist <= radius) {
          const factor = Math.max(0, 1 - (dist / radius) * (1 - brushHardness));
          const idx = (py * w + px) * 4;

          if (mode === 'erase') {
            // Cut out / make transparent
            data[idx + 3] = Math.round(data[idx + 3] * (1 - factor));
          } else {
            // Keep / restore original pixel from source image
            if (origData) {
              const oIdx = (curY * canvas.width + curX) * 4;
              data[idx] = origData[oIdx];
              data[idx + 1] = origData[oIdx + 1];
              data[idx + 2] = origData[oIdx + 2];
              data[idx + 3] = Math.max(data[idx + 3], Math.round(255 * factor));
            }
          }
        }
      }
    }

    ctx.putImageData(imgData, minX, minY);
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const { x, y } = getCanvasCoords(e);
    applyBrush(x, y);
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setCursorPos({
        x: e.clientX,
        y: e.clientY,
        visible: true,
      });
    }

    if (isDrawing) {
      const { x, y } = getCanvasCoords(e);
      applyBrush(x, y);
    }
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      setIsDrawing(false);
      pushHistorySnapshot();
    }
  };

  const handleMouseLeave = () => {
    setCursorPos(p => ({ ...p, visible: false }));
    if (isDrawing) {
      setIsDrawing(false);
      pushHistorySnapshot();
    }
  };

  const handleSaveAndApply = () => {
    const canvas = canvasRef.current;
    if (canvas && onApply) {
      // Create clone canvas
      const clone = document.createElement('canvas');
      clone.width = canvas.width;
      clone.height = canvas.height;
      const ctx = clone.getContext('2d');
      ctx.drawImage(canvas, 0, 0);
      onApply(clone);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 animate-fadeIn select-none">
      <div className="relative w-full max-w-6xl h-[90vh] bg-[#0c1220] border border-slate-800 rounded-3xl flex flex-col overflow-hidden shadow-2xl">
        
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between px-6 py-3.5 border-b border-slate-800 bg-slate-900/70 gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
              <Paintbrush className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">Manual Alpha Refinement</h3>
              <p className="text-[11px] text-slate-400">Brush over fine hair strands or stray edges</p>
            </div>
          </div>

          {/* Mode Switch (Erase vs Keep) */}
          <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700/60">
            <button
              onClick={() => setMode('erase')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mode === 'erase' ? 'bg-red-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eraser className="w-3.5 h-3.5" />
              <span>Erase Background [E]</span>
            </button>

            <button
              onClick={() => setMode('keep')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mode === 'keep' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Paintbrush className="w-3.5 h-3.5" />
              <span>Restore Character [B]</span>
            </button>
          </div>

          {/* Undo / Redo */}
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700/60">
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white disabled:opacity-40 disabled:hover:text-slate-300 transition-colors"
              title="Undo (Ctrl+Z)"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white disabled:opacity-40 disabled:hover:text-slate-300 transition-colors"
              title="Redo (Ctrl+Y)"
            >
              <Redo2 className="w-4 h-4" />
            </button>
          </div>

          {/* Controls: Brush Size & Backdrop */}
          <div className="flex items-center gap-4">
            {/* Brush Size Slider */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Size: {brushSize}px</span>
              <input
                type="range"
                min="5"
                max="100"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value, 10))}
                className="w-24 sm:w-32 cursor-pointer"
                title="Brush Size ([ or ])"
              />
            </div>

            {/* Backdrop preview */}
            <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-lg border border-slate-700/60">
              <button
                onClick={() => setBgType('checkerboard')}
                className={`w-4 h-4 rounded ${bgType === 'checkerboard' ? 'ring-2 ring-purple-400' : ''} bg-checkerboard`}
                title="Checkerboard"
              />
              <button
                onClick={() => setBgType('white')}
                className={`w-4 h-4 rounded ${bgType === 'white' ? 'ring-2 ring-purple-400' : ''} bg-white`}
                title="White"
              />
              <button
                onClick={() => setBgType('black')}
                className={`w-4 h-4 rounded ${bgType === 'black' ? 'ring-2 ring-purple-400' : ''} bg-black`}
                title="Black"
              />
              <button
                onClick={() => setBgType('green')}
                className={`w-4 h-4 rounded ${bgType === 'green' ? 'ring-2 ring-purple-400' : ''} bg-[#00ff00]`}
                title="Green Screen"
              />
            </div>
          </div>

          {/* Close / Apply */}
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAndApply}
              className="flex items-center gap-1 px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white shadow-lg transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Apply Changes</span>
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`flex-1 relative overflow-auto flex items-center justify-center p-6 ${
            bgType === 'checkerboard' ? 'bg-checkerboard' : bgType === 'white' ? 'bg-white' : bgType === 'black' ? 'bg-black' : 'bg-[#00ff00]'
          }`}
          style={{ cursor: 'none' }}
        >
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className="max-w-full max-h-full object-contain shadow-2xl"
          />

          {/* Circular Brush Cursor Preview */}
          {cursorPos.visible && (
            <div
              className={`pointer-events-none fixed rounded-full border transform -translate-x-1/2 -translate-y-1/2 transition-none z-50 ${
                mode === 'erase' ? 'border-red-400 bg-red-500/20' : 'border-emerald-400 bg-emerald-500/20'
              }`}
              style={{
                left: `${cursorPos.x}px`,
                top: `${cursorPos.y}px`,
                width: `${brushSize}px`,
                height: `${brushSize}px`,
              }}
            />
          )}
        </div>

      </div>
    </div>
  );
}
