import React, { useState, useRef, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Maximize, Move } from 'lucide-react';

export function ZoomPanViewer({
  isOpen,
  onClose,
  originalImage,
  processedCanvas,
  activeMode,
}) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [viewLayer, setViewLayer] = useState('processed'); // 'processed', 'original'

  const containerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen]);

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

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.2 : 0.8;
    setScale((prev) => Math.min(10, Math.max(0.2, prev * zoomFactor)));
  };

  const handleMouseDown = (e) => {
    setIsPanning(true);
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (!isPanning) return;
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y,
    });
  };

  const handleMouseUp = () => setIsPanning(false);

  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const setOneToOne = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-6xl h-[85vh] bg-[#0d1322] border border-slate-800 rounded-3xl flex flex-col overflow-hidden shadow-2xl">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-bold text-slate-100">
              High-Precision Inspector
            </h3>
            {/* View layer switch */}
            <div className="flex items-center bg-slate-800 p-1 rounded-lg border border-slate-700/60">
              <button
                onClick={() => setViewLayer('processed')}
                className={`px-3 py-1 rounded text-xs font-semibold ${
                  viewLayer === 'processed' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Output Result
              </button>
              <button
                onClick={() => setViewLayer('original')}
                className={`px-3 py-1 rounded text-xs font-semibold ${
                  viewLayer === 'original' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Original
              </button>
            </div>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">
              {Math.round(scale * 100)}%
            </span>

            <button
              onClick={() => setScale(s => Math.min(10, s * 1.25))}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <button
              onClick={() => setScale(s => Math.max(0.2, s * 0.8))}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <button
              onClick={setOneToOne}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
              title="100% 1:1 Pixel Scale"
            >
              1:1
            </button>

            <button
              onClick={resetView}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="ml-2 p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewport Canvas Container */}
        <div
          ref={containerRef}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`flex-1 relative overflow-hidden bg-checkerboard flex items-center justify-center select-none ${
            isPanning ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          <div
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: 'center center',
              transition: isPanning ? 'none' : 'transform 0.05s ease-out',
            }}
            className="pointer-events-none"
          >
            {viewLayer === 'processed' && processedCanvas && (
              <canvas
                ref={(canvas) => {
                  if (canvas) {
                    canvas.width = processedCanvas.width;
                    canvas.height = processedCanvas.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(processedCanvas, 0, 0);
                  }
                }}
                className="max-w-none shadow-2xl"
                style={{ imageRendering: 'pixelated' }}
              />
            )}

            {viewLayer === 'original' && originalImage && (
              <img
                src={originalImage.src}
                alt="Original artwork"
                className="max-w-none shadow-2xl"
                style={{ imageRendering: 'pixelated' }}
              />
            )}
          </div>

          {/* Hint Overlay */}
          <div className="absolute bottom-4 left-4 z-10 px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-800 text-slate-400 text-xs flex items-center gap-2 pointer-events-none">
            <Move className="w-3.5 h-3.5 text-purple-400" />
            <span>Click & drag to pan • Scroll wheel to zoom</span>
          </div>
        </div>

      </div>
    </div>
  );
}
