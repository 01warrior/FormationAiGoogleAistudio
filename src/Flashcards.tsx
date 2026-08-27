import React, { useState, useEffect } from 'react';
import { allVerbs, useAppStore } from './store';
import { vocabData } from './vocabData';
import { speakWord, speakVerbTrio } from './audio';

export function Flashcards() {
  const { state, updateVerbMastery, updateVocabMastery, addXp } = useAppStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [speakingField, setSpeakingField] = useState<string | null>(null);

  const isVocabMode = state.activeCategory !== 'irregular_verbs';

  // Get items based on mode
  let itemsToLearn: any[] = [];
  if (isVocabMode) {
    itemsToLearn = vocabData.filter(v => v.categoryId === state.activeCategory);
    itemsToLearn = itemsToLearn.filter(v => (state.vocabProgress || {})[v.id]?.level !== 'mastered');
    if (itemsToLearn.length === 0) {
      itemsToLearn = vocabData.filter(v => v.categoryId === state.activeCategory);
    }
  } else {
    itemsToLearn = allVerbs.filter(v => (state.verbProgress || {})[v.base]?.level !== 'mastered');
    if (itemsToLearn.length === 0) {
      itemsToLearn = allVerbs;
    }
  }

  const currentItem = itemsToLearn[currentIndex % itemsToLearn.length];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, 150); // Wait for unflip
  };

  const handleSpeak = (text: string, fieldId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSpeakingField(fieldId);
    speakWord(text, 'en-US', state.audioSpeed);
    setTimeout(() => {
      setSpeakingField(null);
    }, 1200);
  };

  const handleSpeakAll = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!currentItem || isVocabMode) return;
    setSpeakingField('all');
    speakVerbTrio(currentItem.base, currentItem.pastSimple, currentItem.pastParticiple, state.audioSpeed);
    setTimeout(() => {
      setSpeakingField(null);
    }, 2500);
  };

  const handleKnowIt = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentItem) {
      if (isVocabMode) {
        updateVocabMastery(currentItem.id, 'mastered');
      } else {
        updateVerbMastery(currentItem.base, 'mastered');
      }
      addXp(5);
    }
    handleNext();
  };

  const handleReviewLater = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentItem) {
      if (isVocabMode) {
        updateVocabMastery(currentItem.id, 'learning');
      } else {
        updateVerbMastery(currentItem.base, 'learning');
      }
    }
    handleNext();
  };

  if (!currentItem) return (
    <div className="flex-grow flex items-center justify-center">
      <p className="text-on-surface-variant font-label-bold">No cards available for this category.</p>
    </div>
  );

  return (
    <main className="flex-grow flex flex-col items-center justify-center p-margin-mobile pb-[100px] md:pb-margin-mobile relative w-full max-w-2xl mx-auto">
      <div className="w-full flex flex-col items-center mb-stack-lg px-4 justify-center">
        <h2 className="font-label-bold text-on-surface-variant mb-2">Card {currentIndex + 1}</h2>
        <div className="h-2 w-full max-w-xs bg-surface-variant rounded-full overflow-hidden">
          <div className="h-full bg-tertiary-container rounded-full transition-all duration-300" style={{width: `${((currentIndex % itemsToLearn.length + 1) / itemsToLearn.length) * 100}%`}}></div>
        </div>
      </div>

      <div 
        className={`perspective-1000 w-full aspect-[3/4] max-h-[530px] max-w-sm mx-auto mb-stack-lg cursor-pointer ${isFlipped ? 'flipped' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="card-inner preserve-3d w-full h-full relative card-transition shadow-lg rounded-[32px]">
          {/* Front */}
          <div className="absolute inset-0 w-full h-full backface-hidden bg-surface-container-lowest border-4 border-surface-variant rounded-[32px] flex flex-col items-center justify-between p-8 border-b-8 shadow-sm active:border-b-4 active:translate-y-1 transition-all">
            <div className="w-full flex justify-between items-center">
              <span className="font-label-bold text-label-bold text-outline rounded-full bg-surface px-3.5 py-1.5 text-xs">
                {isVocabMode ? 'English' : 'Infinitive'}
              </span>
              <button
                type="button"
                onClick={(e) => handleSpeak(isVocabMode ? currentItem.english : currentItem.base, 'front-base', e)}
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-surface-variant transition-all ${
                  speakingField === 'front-base' 
                    ? 'bg-primary text-on-primary scale-110 shadow-md' 
                    : 'bg-surface-container hover:bg-primary-container hover:text-on-primary-container text-primary'
                }`}
                title="Pronounce"
                aria-label="Pronounce"
              >
                <span className="material-symbols-outlined text-[22px]">volume_up</span>
              </button>
            </div>

            <div className="flex flex-col items-center justify-center my-auto text-center">
              <span className="font-display-verb text-[36px] text-primary capitalize mb-2 leading-tight">
                {isVocabMode ? currentItem.english : currentItem.base}
              </span>
              <button
                type="button"
                onClick={(e) => handleSpeak(isVocabMode ? currentItem.english : currentItem.base, 'front-listen-btn', e)}
                className="mt-3 flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary-container/15 text-primary text-sm font-label-bold hover:bg-primary-container/25 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">volume_up</span>
                Listen Pronunciation
              </button>
            </div>

            <span className="font-label-bold text-xs text-outline-variant text-center">
              Tap card to flip
            </span>
          </div>

          {/* Back */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-surface-container-lowest border-4 border-primary rounded-[32px] flex flex-col items-center justify-between p-6 border-b-8 shadow-sm">
            {isVocabMode ? (
              // Vocab Back Side
              <div className="flex flex-col items-center w-full h-full justify-between">
                <span className="font-label-bold text-xs text-primary rounded-full bg-primary-fixed px-3 py-1 self-start">
                  Translation
                </span>
                
                <div className="flex flex-col items-center justify-center text-center w-full flex-grow">
                  <span className="font-display-verb text-[32px] text-secondary-container capitalize mb-2">
                    {currentItem.french}
                  </span>
                  
                  {(currentItem.phonetic || currentItem.pronunciation) && (
                    <div className="flex flex-col items-center gap-1 mb-2 bg-primary-container/20 px-4 py-2 rounded-xl">
                      <span className="font-label-bold text-on-surface text-sm capitalize">{currentItem.english}</span>
                      <div className="flex items-center gap-2 text-primary text-sm">
                        {currentItem.phonetic && <span className="font-mono">{currentItem.phonetic}</span>}
                        {currentItem.phonetic && currentItem.pronunciation && <span className="text-on-surface-variant opacity-50">•</span>}
                        {currentItem.pronunciation && <span className="italic">"{currentItem.pronunciation}"</span>}
                      </div>
                    </div>
                  )}
                  
                  <div className="w-full bg-surface-variant rounded-xl p-4 mt-2 border-l-4 border-primary text-left flex flex-col gap-2">
                    <span className="text-[10px] uppercase font-label-bold text-on-surface-variant">Example (English)</span>
                    <p className="font-body-md text-on-surface leading-snug">"{currentItem.example}"</p>
                    <button
                      type="button"
                      onClick={(e) => handleSpeak(currentItem.example, 'back-example', e)}
                      className="self-end mt-1 text-primary flex items-center gap-1 text-xs font-label-bold hover:underline"
                    >
                      <span className="material-symbols-outlined text-[16px]">volume_up</span> Listen
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Verbs Back Side
              <>
                <div className="w-full flex justify-between items-center">
                  <span className="font-label-bold text-xs text-primary rounded-full bg-primary-fixed px-3 py-1">
                    Conjugations
                  </span>
                  <button
                    type="button"
                    onClick={handleSpeakAll}
                    className={`flex items-center gap-1.5 text-xs font-label-bold px-3 py-1.5 rounded-full border-2 transition-all ${
                      speakingField === 'all'
                        ? 'bg-primary text-on-primary border-primary shadow-sm scale-105'
                        : 'bg-surface border-surface-variant text-primary hover:bg-primary-container hover:text-on-primary-container'
                    }`}
                    title="Listen to all 3 forms in sequence"
                  >
                    <span className="material-symbols-outlined text-[16px]">record_voice_over</span>
                    Listen All (3)
                  </button>
                </div>

                <div className="flex flex-col items-center gap-2.5 w-full my-auto">
                  {/* Base */}
                  <div className="flex items-center justify-between bg-primary-container text-on-primary-container font-mono-verb text-mono-verb py-2.5 px-4 rounded-xl w-full border-b-4 border-primary capitalize">
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] uppercase opacity-80 font-sans tracking-wider">Infinitive</span>
                      <div className="flex items-baseline gap-2">
                        <span>{currentItem.base}</span>
                        {(currentItem.basePhonetic || currentItem.basePronunciation) && (
                          <span className="text-[10px] opacity-70 font-sans font-normal lowercase tracking-normal">
                            [{currentItem.basePhonetic || currentItem.basePronunciation}]
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => handleSpeak(currentItem.base, 'back-base', e)}
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-on-primary-container flex items-center justify-center transition-colors"
                      title="Pronounce infinitive"
                    >
                      <span className="material-symbols-outlined text-[18px]">volume_up</span>
                    </button>
                  </div>

                  {/* Past Simple */}
                  <div className="flex items-center justify-between bg-surface-variant text-on-surface font-mono-verb text-mono-verb py-2.5 px-4 rounded-xl w-full border-b-4 border-outline-variant capitalize">
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] uppercase opacity-70 font-sans tracking-wider">Past Simple (Prétérit)</span>
                      <div className="flex items-baseline gap-2">
                        <span>{currentItem.pastSimple}</span>
                        {(currentItem.pastPhonetic || currentItem.pastPronunciation) && (
                          <span className="text-[10px] opacity-70 font-sans font-normal lowercase tracking-normal">
                            [{currentItem.pastPhonetic || currentItem.pastPronunciation}]
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => handleSpeak(currentItem.pastSimple, 'back-past', e)}
                      className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface flex items-center justify-center transition-colors"
                      title="Pronounce past simple"
                    >
                      <span className="material-symbols-outlined text-[18px]">volume_up</span>
                    </button>
                  </div>

                  {/* Past Participle */}
                  <div className="flex items-center justify-between bg-surface-variant text-on-surface font-mono-verb text-mono-verb py-2.5 px-4 rounded-xl w-full border-b-4 border-outline-variant capitalize">
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] uppercase opacity-70 font-sans tracking-wider">Past Participle</span>
                      <div className="flex items-baseline gap-2">
                        <span>{currentItem.pastParticiple}</span>
                        {(currentItem.participlePhonetic || currentItem.participlePronunciation) && (
                          <span className="text-[10px] opacity-70 font-sans font-normal lowercase tracking-normal">
                            [{currentItem.participlePhonetic || currentItem.participlePronunciation}]
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => handleSpeak(currentItem.pastParticiple, 'back-participle', e)}
                      className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface flex items-center justify-center transition-colors"
                      title="Pronounce past participle"
                    >
                      <span className="material-symbols-outlined text-[18px]">volume_up</span>
                    </button>
                  </div>
                </div>
                
                <div className="text-center w-full pt-2 border-t-2 border-surface-variant">
                  <span className="block font-label-bold text-xs text-outline mb-0.5">Translation (French)</span>
                  <span className="font-headline-lg-mobile text-headline-lg-mobile text-secondary-container capitalize">{currentItem.translation}</span>
                </div>
              </>
            )}
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
          {!isFlipped && (
            <button 
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="flex-1 bg-primary border-b-[6px] border-on-primary-fixed-variant text-on-primary font-label-bold text-label-bold h-touch-target-min rounded-xl active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              Next
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          )}
        </div>

        {isFlipped && (
          <div className="flex gap-gutter w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <button onClick={handleReviewLater} className="flex-1 bg-surface border-2 border-secondary-container border-b-4 text-on-surface font-label-bold text-label-bold h-touch-target-min rounded-xl active:border-b-2 active:translate-y-1 transition-all flex flex-col items-center justify-center py-2">
              <span className="material-symbols-outlined text-secondary-container" style={{fontVariationSettings: "'FILL' 1"}}>history</span>
              Review Later
            </button>
            <button onClick={handleKnowIt} className="flex-1 bg-surface border-2 border-tertiary border-b-4 text-on-surface font-label-bold text-label-bold h-touch-target-min rounded-xl active:border-b-2 active:translate-y-1 transition-all flex flex-col items-center justify-center py-2">
              <span className="material-symbols-outlined text-tertiary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              I Know It
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

