const fs = require('fs');
let code = fs.readFileSync('src/store.ts', 'utf8');

const actionStr = `  const updateChallengeProgress = (type: ChallengeType, amount: number = 1) => {
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

  const addXp =`;

code = code.replace(/  const addXp =/m, actionStr);

// Now hook into updateVerbMastery, updateVocabMastery, completeLesson
code = code.replace(/xp: \(s\.verbProgress\[base\]\?\.xp \|\| 0\) \+ \(level === 'mastered' \? 10 : 5\)\n\s*\}\n\s*\}\n\s*\}\)\);/m,
`xp: (s.verbProgress[base]?.xp || 0) + (level === 'mastered' ? 10 : 5)
        }
      }
    }));
    if (level === 'mastered') {
      updateChallengeProgress('master_items', 1);
    }`);

code = code.replace(/xp: \(s\.vocabProgress\[id\]\?\.xp \|\| 0\) \+ \(level === 'mastered' \? 10 : 5\)\n\s*\}\n\s*\}\n\s*\}\)\);/m,
`xp: (s.vocabProgress[id]?.xp || 0) + (level === 'mastered' ? 10 : 5)
        }
      }
    }));
    if (level === 'mastered') {
      updateChallengeProgress('master_items', 1);
    }`);

code = code.replace(/const completeLesson = \(id: string\) => \{\n\s*setGlobalState\(s => \{/m,
`const completeLesson = (id: string) => {
    updateChallengeProgress('complete_lessons', 1);
    setGlobalState(s => {`);

code = code.replace(/return \{ state, addXp, updateVerbMastery, updateVocabMastery, completeLesson, setDailyGoal, setActiveCategory, setAudioSpeed \};/m,
`return { state, addXp, updateVerbMastery, updateVocabMastery, completeLesson, setDailyGoal, setActiveCategory, setAudioSpeed, updateChallengeProgress };`);

fs.writeFileSync('src/store.ts', code);
console.log('patched actions');
