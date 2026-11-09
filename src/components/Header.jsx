import React from 'react';
import { Sparkles, Scissors, Layers, Sun, Moon, HelpCircle, Settings, ShieldCheck } from 'lucide-react';

function GithubIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export function Header({
  activeTab,
  setActiveTab,
  isBatchMode,
  setIsBatchMode,
  theme,
  toggleTheme,
  onOpenHowItWorks,
  onOpenSettings,
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b0f19]/80 backdrop-blur-md transition-colors dark:border-slate-800/80 dark:bg-[#0b0f19]/80 light:border-slate-200 light:bg-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-600 to-cyan-400 p-[2px] shadow-lg shadow-purple-500/20">
            <div className="w-full h-full bg-[#0b0f19] dark:bg-[#0b0f19] light:bg-white rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-400 light:text-purple-600 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                AnimeForge
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                100% Client-Side
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Browser AI Studio • Zero Server Uploads
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 p-1 rounded-xl border border-slate-800/60 dark:border-slate-800/60 light:border-slate-200" aria-label="Tool selection">
          <button
            onClick={() => { setActiveTab('upscale'); setIsBatchMode(false); }}
            className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'upscale' && !isBatchMode
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/25'
                : 'text-slate-400 hover:text-slate-200 light:text-slate-600 light:hover:text-slate-900'
            }`}
            aria-selected={activeTab === 'upscale' && !isBatchMode}
            role="tab"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Upscale</span>
          </button>

          <button
            onClick={() => { setActiveTab('bgremove'); setIsBatchMode(false); }}
            className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'bgremove' && !isBatchMode
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/25'
                : 'text-slate-400 hover:text-slate-200 light:text-slate-600 light:hover:text-slate-900'
            }`}
            aria-selected={activeTab === 'bgremove' && !isBatchMode}
            role="tab"
          >
            <Scissors className="w-4 h-4" />
            <span>Remove BG</span>
          </button>

          <button
            onClick={() => setIsBatchMode(prev => !prev)}
            className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              isBatchMode
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/25'
                : 'text-slate-400 hover:text-slate-200 light:text-slate-600 light:hover:text-slate-900'
            }`}
            aria-label="Toggle batch processing mode"
          >
            <Layers className="w-4 h-4" />
            <span className="hidden md:inline">Batch Mode</span>
          </button>
        </nav>

        {/* Right utility buttons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Privacy Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Client Private</span>
          </div>

          {/* How it works */}
          <button
            onClick={onOpenHowItWorks}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 light:text-slate-600 light:hover:text-slate-900 light:hover:bg-slate-100 transition-colors"
            title="How it works & Architecture"
            aria-label="How it works"
          >
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 light:text-slate-600 light:hover:text-slate-900 light:hover:bg-slate-100 transition-colors"
            title="Model & Engine Settings"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 light:text-slate-600 light:hover:text-slate-900 light:hover:bg-slate-100 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label="Toggle color theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-purple-600" />}
          </button>

          {/* GitHub link */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 light:text-slate-600 light:hover:text-slate-900 light:hover:bg-slate-100 transition-colors hidden sm:block"
            title="View on GitHub"
            aria-label="GitHub Repository"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
        </div>

      </div>
    </header>
  );
}
