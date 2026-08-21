import React, { useState } from 'react';
import { useAppStore, allVerbs, lessons } from './store';

export function LessonSession({ lessonId, onBack }: { lessonId: string, onBack: () => void }) {
  const { addXp, updateVerbMastery, completeLesson } = useAppStore();
  const lesson = lessons.find(l => l.id === lessonId);
  const verbs = allVerbs.filter(v => lesson?.verbList.includes(v.base));
  
  const [currentVerbIdx, setCurrentVerbIdx] = useState(0);
  const [input, setInput] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  if (!lesson || verbs.length === 0) return <div onClick={onBack}>Error loading lesson</div>;

  const currentVerb = verbs[currentVerbIdx];
  const isFinished = currentVerbIdx >= verbs.length;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isCorrect !== null) {
      // Move to next
      if (currentVerbIdx < verbs.length - 1) {
        setCurrentVerbIdx(prev => prev + 1);
        setInput('');
        setIsCorrect(null);
      } else {
        // Finish lesson
        completeLesson(lessonId);
        addXp(50);
        onBack();
      }
      return;
    }

    if (input.toLowerCase().trim() === currentVerb.pastSimple.toLowerCase()) {
      setIsCorrect(true);
      updateVerbMastery(currentVerb.base, 'mastered');
    } else {
      setIsCorrect(false);
      updateVerbMastery(currentVerb.base, 'learning');
    }
  };

  if (isFinished) return null;

  return (
    <div className="absolute inset-0 bg-background z-50 flex flex-col">
      <header className="flex items-center px-margin-mobile h-[64px] shrink-0 gap-4 mt-2">
        <button onClick={onBack} aria-label="Close session" className="w-[48px] h-[48px] flex items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest transition-colors active:scale-95 touch-manipulation flex-shrink-0">
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0, 'wght' 600"}}>close</span>
        </button>
        <div className="flex-1 h-3 bg-surface-container-highest rounded-full overflow-hidden flex items-center p-0.5">
          <div className="h-full bg-secondary-container rounded-full relative transition-all duration-300" style={{ width: `${(currentVerbIdx / verbs.length) * 100}%` }}>
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30 rounded-t-full"></div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-margin-mobile flex flex-col pb-[120px]">
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mt-stack-md mb-stack-lg">
          Complete with the past simple form.
        </h1>
        
        <div className="bg-surface-container-low border border-surface-variant card-plate rounded-xl p-stack-md mb-stack-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">school</span>
            </div>
            <div>
              <div className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-wider text-xs">Verb to use</div>
              <div className="font-headline-lg-mobile text-headline-lg-mobile text-primary capitalize">{currentVerb.base} <span className="font-body-md text-body-md text-outline font-normal">({currentVerb.translation})</span></div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-surface border border-surface-variant card-plate rounded-2xl p-stack-lg shadow-sm flex flex-col gap-stack-lg flex-1">
          <div className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
            Write the past simple of <span className="font-bold text-primary">{currentVerb.base}</span>:
          </div>
          
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isCorrect !== null}
            className="w-full h-16 rounded-xl bg-surface-container-low border-2 border-surface-variant focus:border-primary focus:ring-0 text-center font-display-verb text-[32px] lowercase outline-none"
            autoFocus
          />
        </form>
      </main>

      {isCorrect !== null && (
        <div className={`fixed bottom-0 left-0 w-full z-50 border-t-2 animate-slide-up shadow-[0_-8px_16px_rgba(0,0,0,0.05)] pt-stack-md pb-safe-bottom px-margin-mobile pb-6 ${isCorrect ? 'bg-success-container border-success/20' : 'bg-error-container border-error/20'}`}>
          <div className="flex items-start justify-between mb-stack-md">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCorrect ? 'bg-success text-on-success' : 'bg-error text-on-error'}`}>
                <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1, 'wght' 700"}}>{isCorrect ? 'check' : 'close'}</span>
              </div>
              <div>
                <h2 className={`font-headline-lg-mobile text-headline-lg-mobile ${isCorrect ? 'text-on-success-container' : 'text-on-error-container'}`}>
                  {isCorrect ? 'Excellent!' : 'Not quite.'}
                </h2>
                <p className={`font-body-md text-body-md text-sm ${isCorrect ? 'text-on-success-container/80' : 'text-on-error-container/80'}`}>
                  The correct answer is '{currentVerb.pastSimple}'.
                </p>
              </div>
            </div>
          </div>
          
          <button onClick={() => handleSubmit()} className={`w-full h-14 rounded-xl font-label-bold text-label-bold text-lg flex items-center justify-center gap-2 btn-physical touch-manipulation ${isCorrect ? 'bg-success text-on-success border-green-700 hover:brightness-105' : 'bg-error text-on-error border-red-700 hover:brightness-105'}`}>
            Continue
          </button>
        </div>
      )}

      {isCorrect === null && (
        <div className="fixed bottom-0 left-0 w-full z-40 bg-surface border-t-4 border-surface-variant p-margin-mobile pb-8">
           <button onClick={() => handleSubmit()} className="w-full h-14 bg-primary text-on-primary rounded-xl font-label-bold text-label-bold text-lg flex items-center justify-center gap-2 btn-physical border-on-primary-fixed-variant touch-manipulation hover:bg-surface-tint">
            Check
          </button>
        </div>
      )}
    </div>
  );
}
