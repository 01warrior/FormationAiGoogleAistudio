import React from 'react';
import { useAppStore, allVerbs } from './store';

export function Home() {
  const { state } = useAppStore();
  
  const totalMastered = Object.values(state.verbProgress).filter(v => v.level === 'mastered').length;
  const totalVerbs = allVerbs.length;
  const progressPercent = Math.round((totalMastered / totalVerbs) * 100) || 0;

  const recentMasteredVerbs = Object.entries(state.verbProgress)
    .filter(([_, data]) => data.level === 'mastered')
    .slice(-3)
    .map(([base]) => allVerbs.find(v => v.base === base))
    .filter(Boolean);

  return (
    <div className="flex-grow flex flex-col md:flex-row md:max-w-6xl md:mx-auto w-full gap-stack-lg p-margin-mobile pb-[100px]">
      <div className="flex flex-col gap-stack-lg w-full md:w-2/3">
        <section className="plate rounded-xl p-stack-lg flex flex-col items-center text-center gap-stack-md shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary-fixed opacity-30 rounded-full blur-3xl -z-10"></div>
          
          <h2 className="font-headline-lg-mobile md:text-headline-lg text-on-surface">Your Mastery Progress</h2>
          
          <div className="relative w-48 h-48 flex items-center justify-center rounded-full bg-surface-variant">
            {/* Simple CSS circle progress representation */}
            <div 
              className="absolute inset-0 rounded-full bg-secondary-container" 
              style={{
                background: `conic-gradient(var(--color-secondary-container) ${progressPercent}%, transparent 0)`
              }}
            ></div>
            <div className="absolute inset-[12px] bg-white rounded-full flex flex-col items-center justify-center">
              <span className="font-display-verb text-display-verb text-primary">{totalMastered}</span>
              <span className="font-label-bold text-label-bold text-on-surface-variant">/ {totalVerbs} Verbs</span>
            </div>
          </div>
          
          <p className="font-body-md text-on-surface-variant mt-stack-sm">
            You are {progressPercent}% of the way to mastering irregular verbs!
          </p>
          
          <button className="w-full md:w-auto min-h-touch-target-min bg-primary text-on-primary font-label-bold text-label-bold px-8 py-3 rounded-xl border-b-4 border-surface-tint hover:bg-surface-tint transition-colors press-effect mt-stack-sm flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">play_arrow</span>
            Start Learning
          </button>
        </section>

        <div className="grid grid-cols-2 gap-gutter">
          <div className="plate rounded-xl p-stack-md flex flex-col items-center justify-center text-center gap-base">
            <span className="material-symbols-outlined text-4xl text-secondary-fixed-dim mb-2">local_fire_department</span>
            <span className="font-headline-lg-mobile md:text-headline-lg text-on-surface">{state.streak || 1} Days</span>
            <span className="font-label-bold text-label-bold text-on-surface-variant">Current Streak</span>
          </div>
          <div className="plate rounded-xl p-stack-md flex flex-col items-center justify-center text-center gap-base">
            <span className="material-symbols-outlined text-4xl text-tertiary-fixed-dim mb-2">military_tech</span>
            <span className="font-headline-lg-mobile md:text-headline-lg text-on-surface">{state.xp} XP</span>
            <span className="font-label-bold text-label-bold text-on-surface-variant">Earned Today</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-stack-lg w-full md:w-1/3">
        <section className="plate rounded-xl p-stack-md flex flex-col gap-stack-md">
          <div className="flex items-center justify-between">
            <h3 className="font-headline-lg-mobile text-on-surface">Recent Mastery</h3>
            <span className="material-symbols-outlined text-on-surface-variant">history</span>
          </div>
          
          <div className="flex flex-col gap-gutter">
            {recentMasteredVerbs.length > 0 ? recentMasteredVerbs.map(v => v && (
              <div key={v.base} className="flex items-center justify-between p-stack-sm bg-surface-container rounded-lg border border-surface-variant">
                <div className="flex items-center gap-stack-sm">
                  <div className="w-10 h-10 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center font-mono-verb text-mono-verb capitalize">
                    {v.base.substring(0, 2)}
                  </div>
                  <span className="font-label-bold text-label-bold text-on-surface">{v.pastSimple}, {v.pastParticiple}</span>
                </div>
                <span className="material-symbols-outlined text-secondary-fixed-dim" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
              </div>
            )) : (
              <div className="text-center text-on-surface-variant py-4 font-body-md text-sm">
                Complete lessons to master verbs!
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
