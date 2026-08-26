const fs = require('fs');
let code = fs.readFileSync('src/Home.tsx', 'utf8');

const challengesSection = `
        {/* Daily Challenges Section */}
        <section className="plate rounded-xl p-stack-md flex flex-col gap-stack-md">
          <div className="flex items-center justify-between">
            <h3 className="font-label-bold text-label-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#9c27b0]">emoji_events</span>
              Daily Challenges
            </h3>
          </div>
          <div className="flex flex-col gap-3">
            {state.challenges && state.challenges.length > 0 ? (
              state.challenges.map(chal => {
                const percent = Math.min(100, Math.round((chal.progress / chal.target) * 100));
                return (
                  <div key={chal.id} className={\`p-3 rounded-xl border-2 transition-all \${chal.completed ? 'bg-success-container border-success text-on-success-container' : 'bg-surface-container border-surface-variant'}\`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-label-bold text-sm">{chal.title}</span>
                      <div className="flex items-center gap-1 font-label-bold text-xs bg-surface-container-highest px-2 py-1 rounded-full">
                        <span className="material-symbols-outlined text-[14px] text-tertiary">diamond</span>
                        +{chal.rewardXP} XP
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs mb-1 opacity-80">
                      <span>{chal.progress} / {chal.target}</span>
                      <span>{percent}%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                      <div 
                        className={\`h-full rounded-full transition-all duration-500 ease-out \${chal.completed ? 'bg-success' : 'bg-[#9c27b0]'}\`}
                        style={{ width: \`\${percent}%\` }}
                      ></div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-on-surface-variant py-2 font-body-md text-sm">
                No active challenges.
              </div>
            )}
          </div>
        </section>
`;

code = code.replace(/<\/section>\n\n\s*<button onClick=\{onStartLearning\}/m, `</section>\n${challengesSection}\n        <button onClick={onStartLearning}`);

fs.writeFileSync('src/Home.tsx', code);
console.log('patched home');
