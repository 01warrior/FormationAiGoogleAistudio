import React, { useState } from 'react';
import { useAppStore, allVerbs } from './store';

export function Home({ onStartLearning }: { onStartLearning?: () => void }) {
  const { state, setDailyGoal } = useAppStore();
  const [showGoalDialog, setShowGoalDialog] = useState(false);
  const [tempGoal, setTempGoal] = useState(state.dailyGoal);
  
  const totalMastered = Object.values(state.verbProgress || {}).filter((v: any) => v.level === 'mastered').length;
  const totalVerbs = allVerbs.length;
  const progressPercent = Math.round((totalMastered / totalVerbs) * 100) || 0;

  const dailyProgressPercent = Math.min(100, Math.round((state.lessonsCompletedToday / state.dailyGoal) * 100)) || 0;

  const recentMasteredVerbs = Object.entries(state.verbProgress || {})
    .filter(([_, data]: [string, any]) => data.level === 'mastered')
    .slice(-3)
    .map(([base]) => allVerbs.find(v => v.base === base))
    .filter(Boolean);

  const openGoalDialog = () => {
    setTempGoal(state.dailyGoal);
    setShowGoalDialog(true);
  };

  const saveGoal = () => {
    setDailyGoal(tempGoal);
    setShowGoalDialog(false);
  };

  return (
    <div className="flex-grow flex flex-col md:flex-row md:max-w-6xl md:mx-auto w-full gap-stack-lg p-margin-mobile pb-[100px]">
      
      {showGoalDialog && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-pop-in">
          <div className="bg-surface-container-lowest w-full max-w-sm rounded-[32px] border-4 border-surface-variant p-stack-lg shadow-xl flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mb-4 text-primary">
              <span className="material-symbols-outlined text-[32px]" style={{fontVariationSettings: "'FILL' 1"}}>flag</span>
            </div>
            <h2 className="font-headline-lg-mobile text-on-surface mb-2">Set Daily Goal</h2>
            <p className="font-body-md text-on-surface-variant mb-6">
              How many lessons do you want to complete each day?
            </p>

            <div className="flex items-center gap-6 mb-8">
              <button 
                onClick={() => setTempGoal(Math.max(1, tempGoal - 1))}
                className="w-12 h-12 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-surface-variant active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[28px]">remove</span>
              </button>
              <span className="font-display-verb text-[40px] text-on-surface w-12 text-center">{tempGoal}</span>
              <button 
                onClick={() => setTempGoal(Math.min(10, tempGoal + 1))}
                className="w-12 h-12 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-surface-variant active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[28px]">add</span>
              </button>
            </div>

            <div className="flex gap-4 w-full">
              <button 
                onClick={() => setShowGoalDialog(false)}
                className="flex-1 h-12 bg-surface-container-low border-2 border-surface-variant border-b-4 text-on-surface font-label-bold rounded-xl active:translate-y-[2px] active:border-b-2 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={saveGoal}
                className="flex-1 h-12 bg-primary border-b-4 border-primary-fixed-dim text-on-primary font-label-bold rounded-xl active:translate-y-[2px] active:border-b-2 transition-all"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

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
          
          <button onClick={onStartLearning} className="w-full md:w-auto h-14 bg-primary text-on-primary font-label-bold text-label-bold px-8 rounded-xl border-primary-fixed-dim shadow-md hover:brightness-110 active:brightness-95 btn-physical mt-stack-sm flex items-center justify-center gap-2">
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>play_arrow</span>
            Start Learning
          </button>
        </section>

        {/* Daily Goal Section */}
        <section className="plate rounded-xl p-stack-md flex flex-col gap-stack-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-label-bold text-label-bold text-on-surface uppercase tracking-wider">Daily Goal</h3>
            <button 
              onClick={openGoalDialog}
              className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center hover:bg-surface-variant active:scale-95 transition-transform"
              aria-label="Edit daily goal"
            >
              <span className="material-symbols-outlined text-[20px]">edit</span>
            </button>
          </div>
          
          <div className="flex items-center justify-between text-sm mt-2 mb-1">
            <span className="font-label-bold text-on-surface-variant">{state.lessonsCompletedToday} / {state.dailyGoal} lessons completed</span>
            <span className="font-label-bold text-primary">{dailyProgressPercent}%</span>
          </div>
          
          <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${dailyProgressPercent}%` }}
            >
              {dailyProgressPercent >= 100 && (
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              )}
            </div>
          </div>
          {dailyProgressPercent >= 100 && (
            <p className="text-center font-label-bold text-secondary text-sm mt-2 animate-pop-in">
              Goal reached! Great job today! 🌟
            </p>
          )}
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
