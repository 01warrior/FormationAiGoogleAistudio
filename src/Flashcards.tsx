import React, { useState } from 'react';
import { allVerbs } from './store';

export function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const verbs = allVerbs.slice(0, 50); // Just use the first 50 for now or filter by 'toLearn'
  const currentVerb = verbs[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % verbs.length);
    }, 150); // Wait for unflip
  };

  if (!currentVerb) return null;

  return (
    <main className="flex-grow flex flex-col items-center justify-center p-margin-mobile pb-[100px] md:pb-margin-mobile relative w-full max-w-2xl mx-auto">
      <div className="w-full flex gap-2 mb-stack-lg px-4 justify-center">
        <div className="h-2 flex-1 bg-surface-variant rounded-full overflow-hidden">
          <div className="h-full bg-tertiary-container w-full rounded-full" style={{width: `${((currentIndex+1)/verbs.length)*100}%`}}></div>
        </div>
      </div>

      <div 
        className={`perspective-1000 w-full aspect-[3/4] max-h-[530px] max-w-sm mx-auto mb-stack-lg cursor-pointer ${isFlipped ? 'flipped' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="card-inner preserve-3d w-full h-full relative card-transition shadow-lg rounded-[32px]">
          {/* Front */}
          <div className="absolute inset-0 w-full h-full backface-hidden bg-surface-container-lowest border-4 border-surface-variant rounded-[32px] flex flex-col items-center justify-center p-8 border-b-8 shadow-sm active:border-b-4 active:translate-y-1 transition-all">
            <span className="font-display-verb text-display-verb text-primary mb-4 text-center capitalize">{currentVerb.base}</span>
            <span className="font-label-bold text-label-bold text-outline rounded-full bg-surface px-4 py-2 mt-4">Verb (Irregular)</span>
          </div>

          {/* Back */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-surface-container-lowest border-4 border-primary rounded-[32px] flex flex-col items-center justify-center p-8 border-b-8 shadow-sm">
            <div className="flex flex-col items-center gap-stack-md w-full">
              <div className="bg-primary-container text-on-primary-container font-mono-verb text-mono-verb py-3 px-6 rounded-xl w-full text-center border-b-4 border-primary capitalize">
                  {currentVerb.base}
              </div>
              <div className="bg-surface-variant text-on-surface font-mono-verb text-mono-verb py-3 px-6 rounded-xl w-full text-center border-b-4 border-outline-variant capitalize">
                  {currentVerb.pastSimple}
              </div>
              <div className="bg-surface-variant text-on-surface font-mono-verb text-mono-verb py-3 px-6 rounded-xl w-full text-center border-b-4 border-outline-variant capitalize">
                  {currentVerb.pastParticiple}
              </div>
            </div>
            
            <div className="mt-stack-lg text-center w-full pt-stack-md border-t-2 border-surface-variant">
              <span className="block font-label-bold text-label-bold text-outline mb-1">Translation (French)</span>
              <span className="font-headline-lg-mobile text-headline-lg-mobile text-secondary-container capitalize">{currentVerb.translation}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-stack-md">
        <div className="flex gap-gutter w-full">
          <button 
            onClick={(e) => { e.stopPropagation(); setIsFlipped(!isFlipped); }}
            className="flex-1 bg-surface-container-lowest border-2 border-outline-variant border-b-[6px] text-primary font-label-bold text-label-bold h-touch-target-min rounded-xl active:border-b-2 active:translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">sync</span>
            Flip Card
          </button>
          <button 
            onClick={handleNext}
            className="flex-1 bg-primary border-b-[6px] border-on-primary-fixed-variant text-on-primary font-label-bold text-label-bold h-touch-target-min rounded-xl active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            Next
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>

        {isFlipped && (
          <div className="flex gap-gutter w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <button onClick={handleNext} className="flex-1 bg-surface border-2 border-secondary-container border-b-4 text-on-surface font-label-bold text-label-bold h-touch-target-min rounded-xl active:border-b-2 active:translate-y-1 transition-all flex flex-col items-center justify-center py-2">
              <span className="material-symbols-outlined text-secondary-container" style={{fontVariationSettings: "'FILL' 1"}}>history</span>
              Review Later
            </button>
            <button onClick={handleNext} className="flex-1 bg-surface border-2 border-tertiary border-b-4 text-on-surface font-label-bold text-label-bold h-touch-target-min rounded-xl active:border-b-2 active:translate-y-1 transition-all flex flex-col items-center justify-center py-2">
              <span className="material-symbols-outlined text-tertiary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              I Know It
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
