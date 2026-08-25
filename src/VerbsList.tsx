import React, { useState } from 'react';
import { allVerbs, useAppStore } from './store';
import { vocabData } from './vocabData';
import { speakVerbTrio, speakWord } from './audio';

export function VerbsList() {
  const { state } = useAppStore();
  const [filter, setFilter] = useState<'all' | 'toLearn' | 'mastered'>('all');
  const [search, setSearch] = useState('');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const isVocabMode = state.activeCategory !== 'irregular_verbs';

  let itemsToDisplay: any[] = [];

  if (isVocabMode) {
    itemsToDisplay = vocabData.filter(v => v.categoryId === state.activeCategory);
  } else {
    itemsToDisplay = allVerbs;
  }

  const handlePlayVocab = (v: any, e: React.MouseEvent) => {
    e.stopPropagation();
    const idToPlay = isVocabMode ? v.id : v.base;
    setPlayingId(idToPlay);
    if (isVocabMode) {
      speakWord(v.english, 'en-US', state.audioSpeed);
      setTimeout(() => setPlayingId(null), 1500);
    } else {
      speakVerbTrio(v.base, v.pastSimple, v.pastParticiple, state.audioSpeed);
      setTimeout(() => setPlayingId(null), 2500);
    }
  };

  const filteredItems = itemsToDisplay.filter(v => {
    const isMatch = isVocabMode 
      ? v.english.includes(search.toLowerCase()) || v.french.includes(search.toLowerCase())
      : v.base.includes(search.toLowerCase()) || v.translation.includes(search.toLowerCase());
    
    if (!isMatch) return false;
    
    const progressId = isVocabMode ? v.id : v.base;
    const progressMap = isVocabMode ? state.vocabProgress : state.verbProgress;
    const progress = (progressMap || {})[progressId]?.level || 'unseen';
    
    if (filter === 'mastered') return progress === 'mastered';
    if (filter === 'toLearn') return progress !== 'mastered';
    return true;
  });

  return (
    <main className="flex-grow w-full max-w-2xl mx-auto px-margin-mobile pt-stack-md pb-[100px] flex flex-col gap-stack-lg">
      <section className="flex flex-col gap-stack-sm sticky top-[72px] bg-background pt-base z-30 pb-base">
        <div className="relative w-full h-touch-target-min">
          <span className="material-symbols-outlined absolute left-gutter top-1/2 -translate-y-1/2 text-outline">search</span>
          <input 
            className="w-full h-full pl-[48px] pr-gutter rounded-xl bg-surface-container-low border-2 border-surface-variant focus:border-primary focus:outline-none focus:ring-0 font-body-md text-body-md text-on-surface placeholder:text-outline transition-colors shadow-sm" 
            placeholder={isVocabMode ? "Search words..." : "Search verbs..."}
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-gutter overflow-x-auto no-scrollbar py-base">
          {(['all', 'toLearn', 'mastered'] as const).map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-shrink-0 h-[40px] px-stack-md rounded-full font-label-bold text-label-bold active:translate-y-[2px] transition-all capitalize
                ${filter === f 
                  ? 'bg-primary-container text-on-primary-container border-b-4 border-primary active:border-b-2' 
                  : 'bg-surface text-on-surface-variant border-2 border-surface-variant border-b-4 active:border-b-2 hover:bg-surface-container-low'}`}
            >
              {f === 'toLearn' ? 'To Learn' : f}
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-stack-md">
        {filteredItems.map(v => {
          const progressId = isVocabMode ? v.id : v.base;
          const progressMap = isVocabMode ? state.vocabProgress : state.verbProgress;
          const level = (progressMap || {})[progressId]?.level || 'unseen';
          
          return (
            <article 
              key={progressId} 
              onClick={(e) => handlePlayVocab(v, e)}
              className="w-full bg-surface-container-lowest rounded-xl border-2 border-surface-variant border-b-4 shadow-sm p-stack-md flex flex-col gap-gutter active:translate-y-[2px] active:border-b-2 transition-all cursor-pointer relative overflow-hidden group"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-base z-10 w-4/5">
                  <div className="flex items-center gap-gutter">
                    <h2 className={`text-on-surface capitalize ${isVocabMode ? 'font-display-verb text-[20px]' : 'font-mono-verb text-mono-verb'}`}>
                      {isVocabMode ? v.english : `${v.base} / ${v.pastSimple} / ${v.pastParticiple}`}
                    </h2>
                    {level === 'mastered' && (
                      <span className="material-symbols-outlined text-tertiary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                    )}
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant italic">
                    {isVocabMode ? v.french : v.translation}
                  </p>
                  {isVocabMode && (
                    <p className="text-xs text-on-surface-variant/70 mt-1 line-clamp-1">{v.example}</p>
                  )}
                </div>
                
                <div className="flex items-center gap-2 z-10">
                  <button
                    type="button"
                    onClick={(e) => handlePlayVocab(v, e)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all shrink-0 ${
                      playingId === progressId
                        ? 'bg-primary text-on-primary border-primary scale-110 shadow-sm'
                        : 'bg-surface-container hover:bg-primary-container hover:text-on-primary-container border-surface-variant text-on-surface-variant'
                    }`}
                    title="Pronounce"
                    aria-label="Pronounce"
                  >
                    <span className="material-symbols-outlined text-[18px]">volume_up</span>
                  </button>

                  {level === 'learning' && (
                    <div className="w-10 h-2.5 bg-surface-variant rounded-full overflow-hidden self-center">
                      <div className="h-full bg-secondary-container w-[50%] rounded-full"></div>
                    </div>
                  )}
                  {level === 'unseen' && (
                    <div className="w-10 h-2.5 bg-surface-variant rounded-full overflow-hidden self-center"></div>
                  )}
                </div>
              </div>
              
              {level === 'mastered' && (
                <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full border-8 border-tertiary/10 group-hover:scale-110 transition-transform duration-300"></div>
              )}
            </article>
          );
        })}
        {filteredItems.length === 0 && (
          <div className="text-center p-8 text-on-surface-variant font-body-md">
            No items found.
          </div>
        )}
      </section>
    </main>
  );
}
