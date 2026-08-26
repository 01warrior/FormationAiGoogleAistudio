const fs = require('fs');
let code = fs.readFileSync('src/store.ts', 'utf8');

// Replace DEFAULT_STATE
code = code.replace(/const DEFAULT_STATE: UserState = {[\s\S]*?audioSpeed: 1\.0,\n};/m, 
`const DEFAULT_STATE: UserState = {
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
      id: \`chal_lessons_\${Date.now()}\`,
      type: 'complete_lessons',
      title: 'Complete 3 lessons',
      target: 3,
      progress: 0,
      rewardXP: 50,
      completed: false
    },
    {
      id: \`chal_master_\${Date.now()}\`,
      type: 'master_items',
      title: 'Master 5 words or verbs',
      target: 5,
      progress: 0,
      rewardXP: 100,
      completed: false
    }
  ];
}`);

// Replace parsed globalState init
code = code.replace(/globalState = {\s*\.\.\.DEFAULT_STATE,\s*\.\.\.parsed,[\s\S]*?audioSpeed: parsed\.audioSpeed \|\| 1\.0\n\s*};/m, 
`globalState = { 
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
    };`);

// Append logic to reset challenges if it's a new day
code = code.replace(/if \(\!isToday\(globalState\.lastLessonDate\)\) \{\n\s*globalState\.lessonsCompletedToday = 0;\n\s*\}/m, 
`if (!isToday(globalState.lastLessonDate)) {
      globalState.lessonsCompletedToday = 0;
    }

    if (!isToday(globalState.lastChallengeDate)) {
      globalState.challenges = generateDailyChallenges();
      globalState.lastChallengeDate = new Date().toISOString();
    }`);

// Also initialize if no save
code = code.replace(/} catch \(e\) \{\n\s*globalState = DEFAULT_STATE;\n\s*\}/m, 
`} catch (e) {
    globalState = DEFAULT_STATE;
    globalState.challenges = generateDailyChallenges();
    globalState.lastChallengeDate = new Date().toISOString();
  }`);
  
code = code.replace(/const saved = localStorage\.getItem\('verbmaster_state'\);\n\nif \(saved\) \{/m,
`const saved = localStorage.getItem('verbmaster_state');

if (saved) {`);

fs.writeFileSync('src/store.ts', code);
console.log('patched store');
