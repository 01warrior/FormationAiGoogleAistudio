const fs = require('fs');
let code = fs.readFileSync('src/store.ts', 'utf8');

if (!code.includes('} else {\\n  globalState.challenges = generateDailyChallenges();')) {
  code = code.replace(/} catch \(e\) \{\n\s*globalState = DEFAULT_STATE;\n\s*globalState\.challenges = generateDailyChallenges\(\);\n\s*globalState\.lastChallengeDate = new Date\(\)\.toISOString\(\);\n\s*\}\n\}/m, 
`} catch (e) {
    globalState = DEFAULT_STATE;
    globalState.challenges = generateDailyChallenges();
    globalState.lastChallengeDate = new Date().toISOString();
  }
} else {
  globalState.challenges = generateDailyChallenges();
  globalState.lastChallengeDate = new Date().toISOString();
}`);
  fs.writeFileSync('src/store.ts', code);
  console.log('patched else');
}
