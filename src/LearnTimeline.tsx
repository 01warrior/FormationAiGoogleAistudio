import React, { useState } from 'react';
import { useAppStore, allVerbs, Lesson } from './store';
import { vocabData } from './vocabData';
import { LessonSession } from './LessonSession';

export function LearnTimeline() {
  const { state } = useAppStore();
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  const isVocabMode = state.activeCategory !== 'irregular_verbs';

  let itemsForLessons: any[] = [];
  if (isVocabMode) {
    itemsForLessons = vocabData.filter(v => v.categoryId === state.activeCategory);
  } else {
    itemsForLessons = allVerbs;
  }

  const generatedLessons: Lesson[] = [];
  const CHUNK_SIZE = isVocabMode ? 5 : 10;
  for (let i = 0; i < itemsForLessons.length; i += CHUNK_SIZE) {
    const chunk = itemsForLessons.slice(i, i + CHUNK_SIZE);
    generatedLessons.push({
      id: `${state.activeCategory}_lesson_${Math.floor(i / CHUNK_SIZE) + 1}`,
      title: `Group ${Math.floor(i / CHUNK_SIZE) + 1}`,
      description: isVocabMode 
        ? `${chunk.length} words` 
        : `${chunk[0].base} to ${chunk[chunk.length - 1].base}`,
      type: 'lesson',
      verbList: chunk.map(v => isVocabMode ? v.id : v.base)
    });
  }

  if (activeLesson) {
    return <LessonSession lesson={activeLesson} onBack={() => setActiveLesson(null)} />;
  }

  return (
    <main className="max-w-md mx-auto px-margin-mobile py-stack-lg flex flex-col items-center relative min-h-[800px] w-full pb-[100px]">
      <div className="absolute top-stack-lg bottom-0 w-4 path-line left-1/2 -translate-x-1/2 z-0"></div>
      
      {generatedLessons.map((lesson, idx) => {
        const completedLessons = state.completedLessons || [];
        const isCompleted = completedLessons.includes(lesson.id);
        const isNext = !isCompleted && (idx === 0 || completedLessons.includes(generatedLessons[idx-1].id));
        const isLocked = !isCompleted && !isNext;
        
        return (
          <div key={lesson.id} className={`w-full flex flex-col items-center mb-stack-lg z-10 relative ${isLocked ? 'opacity-70' : ''}`}>
            
            <div className="flex flex-col items-center mb-8 w-full">
              <div className={`px-stack-md py-stack-sm rounded-xl border-b-4 font-headline-lg-mobile text-headline-lg-mobile shadow-md mb-2 w-full max-w-[280px] text-center transition-transform ${isLocked ? 'bg-surface-variant text-on-surface-variant border-outline-variant' : 'bg-primary-container text-on-primary-container border-primary hover:scale-[1.02]'}`}>
                {lesson.title}
              </div>
              <div className="text-sm font-label-bold text-outline uppercase tracking-wider">
                {lesson.description}
              </div>
            </div>

            <button 
              disabled={isLocked}
              onClick={() => setActiveLesson(lesson)}
              className={`relative rounded-full flex items-center justify-center mb-12 press-effect z-10 focus:outline-none focus:ring-4 ring-offset-2 ring-offset-background group
                ${isCompleted ? 'w-20 h-20 bg-secondary-container border-b-[6px] border-secondary-fixed-dim shadow-lg focus:ring-secondary-container' : ''}
                ${isNext ? 'w-24 h-24 bg-primary text-on-primary border-b-[8px] border-on-primary-fixed-variant shadow-[0_0_20px_rgba(33,112,228,0.4)] focus:ring-primary animate-pulse hover:animate-none' : ''}
                ${isLocked ? 'w-20 h-20 bg-surface-container text-outline border-b-[6px] border-surface-variant cursor-not-allowed' : ''}
              `}
            >
              {isNext && <div className="absolute inset-0 bg-white opacity-20 rounded-full animate-ping"></div>}
              
              <span className={`material-symbols-outlined transition-transform relative z-10 ${isNext || isCompleted ? 'group-hover:scale-110' : ''} ${isCompleted ? 'text-on-secondary-container text-4xl' : 'text-4xl'}`} style={{fontVariationSettings: "'FILL' 1"}}>
                {isCompleted ? 'star' : isLocked ? 'lock' : 'book'}
              </span>
              
              {!isLocked && (
                <div className={`absolute -bottom-10 font-label-bold text-label-bold px-4 py-2 rounded-full shadow-md whitespace-nowrap ${isNext ? 'bg-inverse-surface text-inverse-on-surface' : 'bg-surface-container text-on-surface border border-surface-variant'}`}>
                  {isCompleted ? 'Completed' : 'Start Lesson'}
                </div>
              )}
            </button>
          </div>
        )
      })}
    </main>
  );
}
