import React, { useState } from 'react';
import { useAppStore, allVerbs } from './store';
import { categories, CategoryId } from './vocabData';

export function Home({ onStartLearning }: { onStartLearning?: () => void }) {
  const { state, setDailyGoal, setActiveCategory, setAudioSpeed } = useAppStore();
  
  const totalMastered = Object.values(state.verbProgress || {}).filter((v: any) => v.level === 'mastered').length;
  const totalVerbs = allVerbs.length;
  const progressPercent = Math.round((totalMastered / totalVerbs) * 100) || 0;

  const dailyProgressPercent = Math.min(100, Math.round((state.lessonsCompletedToday / state.dailyGoal) * 100)) || 0;

  const recentMasteredVerbs = Object.entries(state.verbProgress || {})
    .filter(([_, data]: [string, any]) => data.level === 'mastered')
    .slice(-3)
    .map(([base]) => allVerbs.find(v => v.base === base))
    .filter(Boolean);

  return (
    <div className="flex-grow flex flex-col max-w-4xl mx-auto w-full gap-stack-lg p-margin-mobile pb-[100px]">
      
      <div className="flex flex-col gap-stack-lg w-full">
        {/* Categories Section */}
        <section className="flex flex-col gap-3">
          <h2 className="font-label-bold text-label-bold text-on-surface uppercase tracking-wider pl-1">Decks / Themes</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map((cat) => {
              const isActive = state.activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`p-3 sm:p-4 rounded-2xl border-4 text-left transition-all active:scale-95 flex flex-col gap-2 ${
                    isActive
                      ? `border-primary bg-primary-container text-on-primary-container shadow-md`
                      : `border-surface-variant bg-surface-container hover:bg-surface-container-high`
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${cat.colorClass}`}>
                    <span className="material-symbols-outlined">{cat.icon}</span>
                  </div>
                  <h3 className="font-label-bold text-sm mt-1 leading-tight">{cat.title}</h3>
                  <p className="text-[11px] opacity-80 leading-snug">{cat.description}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Overall Mastery Progress */}
        <section className="plate rounded-xl p-stack-md flex flex-col gap-stack-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-label-bold text-label-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-primary">school</span>
              Your Mastery Progress
            </h3>
          </div>
          
          <div className="flex items-center justify-between text-sm mt-2 mb-1">
            <span className="font-label-bold text-on-surface-variant">{totalMastered} / {totalVerbs} verbs mastered</span>
            <span className="font-label-bold text-primary">{progressPercent}%</span>
          </div>
          
          <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          
          <p className="font-body-md text-on-surface-variant text-sm mt-1">
            You are {progressPercent}% of the way to mastering irregular verbs!
          </p>
        </section>

        {/* Daily Goal Section */}
        <section className="plate rounded-xl p-stack-md flex flex-col gap-stack-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-label-bold text-label-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-secondary">flag</span>
              Daily Goal
            </h3>
          </div>
          
          <div className="flex items-center justify-between text-sm mt-2 mb-1">
            <span className="font-label-bold text-on-surface-variant">{state.lessonsCompletedToday} / {state.dailyGoal} lessons completed</span>
            <span className="font-label-bold text-secondary">{dailyProgressPercent}%</span>
          </div>
          
          <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
            <div 
              className="h-full bg-secondary rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${dailyProgressPercent}%` }}
            >
              {dailyProgressPercent >= 100 && (
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              )}
            </div>
          </div>
          {dailyProgressPercent >= 100 && (
            <p className="font-label-bold text-secondary text-sm mt-1 animate-pop-in">
              Goal reached! Great job today! 🌟
            </p>
          )}
        </section>

        {/* Daily Challenges Section */}
        <section className="plate rounded-xl p-stack-md flex flex-col gap-stack-md">
          <div className="flex items-center justify-between">
            <h3 className="font-label-bold text-label-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#9c27b0]">emoji_events</span>
              Daily Challenges
            </h3>
          </div>
          <div className="flex flex-col gap-3">
            {state.challenges && state.challenges.length > 0 ? (
              state.challenges.map(chal => {
                const percent = Math.min(100, Math.round((chal.progress / chal.target) * 100));
                return (
                  <div key={chal.id} className={`p-3 rounded-xl border-2 transition-all ${chal.completed ? 'bg-success-container border-success text-on-success-container' : 'bg-surface-container border-surface-variant'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-label-bold text-sm">{chal.title}</span>
                      <div className="flex items-center gap-1 font-label-bold text-xs bg-surface-container-highest px-2 py-1 rounded-full">
                        <span className="material-symbols-outlined text-[14px] text-tertiary">diamond</span>
                        +{chal.rewardXP} XP
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs mb-1 opacity-80">
                      <span>{chal.progress} / {chal.target}</span>
                      <span>{percent}%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ease-out ${chal.completed ? 'bg-success' : 'bg-[#9c27b0]'}`}
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-on-surface-variant py-2 font-body-md text-sm">
                No active challenges.
              </div>
            )}
          </div>
        </section>

        <button onClick={onStartLearning} className="w-full h-14 bg-primary border-b-4 border-primary-fixed-dim text-on-primary font-label-bold text-label-bold px-8 rounded-xl active:translate-y-[2px] active:border-b-2 transition-all shadow-sm hover:brightness-110 flex items-center justify-center gap-2">
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>play_arrow</span>
          Start Learning
        </button>

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

        {/* Recent Mastery Section */}
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
