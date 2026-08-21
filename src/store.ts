import { useState, useEffect } from 'react';
import verbsData from './data.json';

export interface Verb {
  base: string;
  pastSimple: string;
  pastParticiple: string;
  translation: string;
}

export type MasteryLevel = 'unseen' | 'learning' | 'mastered';

export interface UserVerbProgress {
  level: MasteryLevel;
  xp: number;
}

export interface UserState {
  streak: number;
  lastActive: string | null;
  xp: number;
  verbProgress: Record<string, UserVerbProgress>; // key is base verb
  completedLessons: string[];
}

const DEFAULT_STATE: UserState = {
  streak: 0,
  lastActive: null,
  xp: 0,
  verbProgress: {},
  completedLessons: [],
};

// Lessons logic
export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'lesson' | 'review' | 'bonus';
  verbList: string[]; // base verbs
}

export const lessons: Lesson[] = [
  { id: 'l1', title: 'Group 1: Common Verbs', description: 'Basics', type: 'lesson', verbList: ['be', 'have', 'do', 'go', 'say'] },
  { id: 'l2', title: 'Group 2: Communication', description: 'Speaking & Telling', type: 'lesson', verbList: ['tell', 'speak', 'write', 'read', 'hear'] },
  { id: 'l3', title: 'Group 3: Movement', description: 'Moving around', type: 'lesson', verbList: ['come', 'run', 'walk', 'fly', 'swim'] },
  { id: 'l4', title: 'Review 1', description: 'Past Participles', type: 'review', verbList: ['be', 'have', 'do', 'go', 'say', 'tell', 'speak'] },
  { id: 'l5', title: 'Group 4: Actions', description: 'Physical actions', type: 'lesson', verbList: ['make', 'take', 'get', 'give', 'know'] },
];

export const allVerbs: Verb[] = verbsData as Verb[];

export function useAppStore() {
  const [state, setState] = useState<UserState>(() => {
    const saved = localStorage.getItem('verbmaster_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_STATE;
      }
    }
    return DEFAULT_STATE;
  });

  useEffect(() => {
    localStorage.setItem('verbmaster_state', JSON.stringify(state));
  }, [state]);

  const addXp = (amount: number) => {
    setState(s => ({ ...s, xp: s.xp + amount }));
  };

  const updateVerbMastery = (base: string, level: MasteryLevel) => {
    setState(s => ({
      ...s,
      verbProgress: {
        ...s.verbProgress,
        [base]: {
          ...s.verbProgress[base],
          level,
          xp: (s.verbProgress[base]?.xp || 0) + (level === 'mastered' ? 10 : 5)
        }
      }
    }));
  };
  
  const completeLesson = (id: string) => {
    setState(s => {
      if (!s.completedLessons.includes(id)) {
        return { ...s, completedLessons: [...s.completedLessons, id] };
      }
      return s;
    });
  }

  return { state, addXp, updateVerbMastery, completeLesson };
}
