import React, { useState, useEffect } from 'react';
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

import { CategoryId } from './vocabData';

export type ChallengeType = 'complete_lessons' | 'master_items';

export interface Challenge {
  id: string;
  type: ChallengeType;
  title: string;
  target: number;
  progress: number;
  rewardXP: number;
  completed: boolean;
}

export interface UserState {
  streak: number;
  lastActive: string | null;
  xp: number;
  verbProgress: Record<string, UserVerbProgress>; // key is base verb
  vocabProgress: Record<string, UserVerbProgress>; // key is vocab id
  activeCategory: CategoryId;
  completedLessons: string[];
  dailyGoal: number;
  lessonsCompletedToday: number;
  lastLessonDate: string | null;
  audioSpeed: number;
  challenges: Challenge[];
  lastChallengeDate: string | null;
}

export interface Lesson {

  id: string;
  title: string;
  description: string;
  type: 'lesson' | 'review' | 'bonus';
  verbList: string[]; // base verbs
}

export const allVerbs: Verb[] = verbsData as Verb[];

// Dynamically generate lessons covering all verbs
export const lessons: Lesson[] = [];
const CHUNK_SIZE = 10;
for (let i = 0; i < allVerbs.length; i += CHUNK_SIZE) {
  const chunk = allVerbs.slice(i, i + CHUNK_SIZE);
  lessons.push({
    id: `lesson_${Math.floor(i / CHUNK_SIZE) + 1}`,
    title: `Group ${Math.floor(i / CHUNK_SIZE) + 1}`,
    description: `${chunk[0].base} to ${chunk[chunk.length - 1].base}`,
    type: 'lesson',
    verbList: chunk.map(v => v.base)
  });
}

const DEFAULT_STATE: UserState = {
  streak: 1,
  lastActive: new Date().toISOString(),
  xp: 0,
  verbProgress: {},
  vocabProgress: {},
  activeCategory: 'irregular_verbs',
  completedLessons: [],
  dailyGoal: 1,
  lessonsCompletedToday: 0,
  lastLessonDate: null,
  audioSpeed: 1.0,
  challenges: [],
  lastChallengeDate: null,
};

function generateDailyChallenges(): Challenge[] {
  return [
    {
      id: `chal_lessons_${Date.now()}`,
      type: 'complete_lessons',
      title: 'Complete 3 lessons',
      target: 3,
      progress: 0,
      rewardXP: 50,
      completed: false
    },
    {
      id: `chal_master_${Date.now()}`,
      type: 'master_items',
      title: 'Master 5 words or verbs',
      target: 5,
      progress: 0,
      rewardXP: 100,
      completed: false
    }
  ];
}

function isToday(dateString: string | null) {
  if (!dateString) return false;
  const d = new Date(dateString);
  const today = new Date();
  return d.getDate() === today.getDate() && 
         d.getMonth() === today.getMonth() && 
         d.getFullYear() === today.getFullYear();
}

// Global State Management
let globalState: UserState = DEFAULT_STATE;

const saved = localStorage.getItem('verbmaster_state');

if (saved) {
  try {
    const parsed = JSON.parse(saved);
    globalState = { 
      ...DEFAULT_STATE, 
      ...parsed,
      verbProgress: parsed.verbProgress || {},
      vocabProgress: parsed.vocabProgress || {},
      activeCategory: parsed.activeCategory || 'irregular_verbs',
      completedLessons: parsed.completedLessons || [],
      xp: parsed.xp || 0,
      dailyGoal: parsed.dailyGoal || 1,
      lessonsCompletedToday: parsed.lessonsCompletedToday || 0,
      lastLessonDate: parsed.lastLessonDate || null,
      audioSpeed: parsed.audioSpeed || 1.0,
      challenges: parsed.challenges || [],
      lastChallengeDate: parsed.lastChallengeDate || null,
    };
    // Calculate streak
    const lastActiveDate = new Date(globalState.lastActive || new Date());
    const today = new Date();
    // Normalize to midnight to check day differences
    lastActiveDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = today.getTime() - lastActiveDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      globalState.streak += 1;
    } else if (diffDays > 1) {
      globalState.streak = 1;
    }
    
    globalState.lastActive = new Date().toISOString();

    // Reset daily lessons completed if last lesson wasn't today
    if (!isToday(globalState.lastLessonDate)) {
      globalState.lessonsCompletedToday = 0;
    }

    if (!isToday(globalState.lastChallengeDate)) {
      globalState.challenges = generateDailyChallenges();
      globalState.lastChallengeDate = new Date().toISOString();
    }

    localStorage.setItem('verbmaster_state', JSON.stringify(globalState));
  } catch (e) {
    globalState = DEFAULT_STATE;
    globalState.challenges = generateDailyChallenges();
    globalState.lastChallengeDate = new Date().toISOString();
  }
} else {
  globalState.challenges = generateDailyChallenges();
  globalState.lastChallengeDate = new Date().toISOString();
}

const listeners = new Set<React.Dispatch<React.SetStateAction<UserState>>>();

function setGlobalState(updater: (s: UserState) => UserState) {
  globalState = updater(globalState);
  localStorage.setItem('verbmaster_state', JSON.stringify(globalState));
  listeners.forEach(listener => listener(globalState));
}

export function useAppStore() {
  const [state, setState] = useState<UserState>(globalState);

  useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  const updateChallengeProgress = (type: ChallengeType, amount: number = 1) => {
    setGlobalState(s => {
      let earnedXP = 0;
      const newChallenges = s.challenges.map(chal => {
        if (chal.type === type && !chal.completed) {
          const newProgress = Math.min(chal.progress + amount, chal.target);
          if (newProgress >= chal.target && !chal.completed) {
            earnedXP += chal.rewardXP;
            return { ...chal, progress: newProgress, completed: true };
          }
          return { ...chal, progress: newProgress };
        }
        return chal;
      });
      return { ...s, challenges: newChallenges, xp: s.xp + earnedXP };
    });
  };

  const addXp = (amount: number) => {
    setGlobalState(s => ({ ...s, xp: s.xp + amount }));
  };

  const updateVerbMastery = (base: string, level: MasteryLevel) => {
    setGlobalState(s => ({
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
    if (level === 'mastered') {
      updateChallengeProgress('master_items', 1);
    }
  };
  
  const updateVocabMastery = (id: string, level: MasteryLevel) => {
    setGlobalState(s => ({
      ...s,
      vocabProgress: {
        ...s.vocabProgress,
        [id]: {
          ...s.vocabProgress[id],
          level,
          xp: (s.vocabProgress[id]?.xp || 0) + (level === 'mastered' ? 10 : 5)
        }
      }
    }));
    if (level === 'mastered') {
      updateChallengeProgress('master_items', 1);
    }
  };

  const setActiveCategory = (categoryId: import('./vocabData').CategoryId) => {
    setGlobalState(s => ({ ...s, activeCategory: categoryId }));
  };
  
  const setDailyGoal = (goal: number) => {
    setGlobalState(s => ({ ...s, dailyGoal: Math.max(1, goal) }));
  };

  const setAudioSpeed = (audioSpeed: number) => {
    setGlobalState(s => ({ ...s, audioSpeed }));
  };

  const completeLesson = (id: string) => {
    updateChallengeProgress('complete_lessons', 1);
    setGlobalState(s => {
      // Handle daily goal increment
      const isStillToday = isToday(s.lastLessonDate);
      const newLessonsCompleted = isStillToday ? s.lessonsCompletedToday + 1 : 1;
      
      const newState = {
        ...s,
        lessonsCompletedToday: newLessonsCompleted,
        lastLessonDate: new Date().toISOString()
      };

      if (!s.completedLessons.includes(id)) {
        return { ...newState, completedLessons: [...s.completedLessons, id] };
      }
      return newState;
    });
  }

  return { state, addXp, updateVerbMastery, updateVocabMastery, completeLesson, setDailyGoal, setActiveCategory, setAudioSpeed, updateChallengeProgress };
}
