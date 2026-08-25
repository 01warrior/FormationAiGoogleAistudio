import React, { useEffect } from 'react';
import { useAppStore } from './store';

export function SettingsSheet({ onClose }: { onClose: () => void }) {
  const { state, setAudioSpeed, setDailyGoal } = useAppStore();

  useEffect(() => {
    // Prevent scrolling on the body when the sheet is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-6 animate-pop-in">
      <div className="bg-surface-container-lowest w-full max-w-sm sm:rounded-[32px] rounded-t-[32px] border-t-4 sm:border-4 border-surface-variant p-stack-lg shadow-xl flex flex-col gap-6 animate-slide-up sm:animate-none">
        
        <div className="flex items-center justify-between">
          <h2 className="font-headline-lg-mobile text-on-surface">Settings</h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center hover:bg-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-label-bold text-label-bold text-on-surface uppercase tracking-wider">Audio Speed</h3>
          <div className="flex bg-surface-container-low border-2 border-surface-variant rounded-xl overflow-hidden p-1 shadow-sm">
            {[0.5, 0.75, 1.0, 1.25].map((speed) => {
              const isActive = state.audioSpeed === speed;
              return (
                <button
                  key={speed}
                  onClick={() => setAudioSpeed(speed)}
                  className={`flex-1 py-2 font-label-bold text-sm rounded-lg transition-all ${
                    isActive 
                      ? 'bg-primary text-on-primary shadow-sm' 
                      : 'text-on-surface-variant hover:bg-surface-variant'
                  }`}
                >
                  {speed}x
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-label-bold text-label-bold text-on-surface uppercase tracking-wider">Daily Goal</h3>
          <p className="text-sm text-on-surface-variant leading-snug mb-1">
            How many lessons do you want to complete each day?
          </p>
          <div className="flex items-center gap-6 justify-center bg-surface-container-low border-2 border-surface-variant rounded-2xl py-4">
            <button 
              onClick={() => setDailyGoal(Math.max(1, state.dailyGoal - 1))}
              className="w-12 h-12 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-surface-variant active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[28px]">remove</span>
            </button>
            <span className="font-display-verb text-[40px] text-on-surface w-12 text-center">{state.dailyGoal}</span>
            <button 
              onClick={() => setDailyGoal(Math.min(10, state.dailyGoal + 1))}
              className="w-12 h-12 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-surface-variant active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[28px]">add</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 mt-4 pt-6 border-t-2 border-surface-variant">
          <p className="text-xs text-on-surface-variant text-center max-w-[280px] leading-relaxed">
            Réalisé dans le cadre d'une formation en vibe coding par <span className="font-label-bold text-on-surface">SAVADOGO</span>
          </p>
          <a 
            href="https://soumaila-savadogo.omnia-elearning.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 bg-primary-container text-on-primary-container font-label-bold rounded-xl active:scale-95 transition-all shadow-sm border-2 border-transparent hover:border-primary-fixed-dim"
          >
            Je veux créer des apps sans coder aussi
          </a>
        </div>

      </div>
    </div>
  );
}
