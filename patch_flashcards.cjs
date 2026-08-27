const fs = require('fs');
let code = fs.readFileSync('src/Flashcards.tsx', 'utf8');

// For Base Verb
const oldBase = `<div className="flex flex-col text-left">
                      <span className="text-[10px] uppercase opacity-80 font-sans tracking-wider">Infinitive</span>
                      <span>{currentItem.base}</span>
                    </div>`;
const newBase = `<div className="flex flex-col text-left">
                      <span className="text-[10px] uppercase opacity-80 font-sans tracking-wider">Infinitive</span>
                      <div className="flex items-baseline gap-2">
                        <span>{currentItem.base}</span>
                        {(currentItem.basePhonetic || currentItem.basePronunciation) && (
                          <span className="text-[10px] opacity-70 font-sans font-normal lowercase tracking-normal">
                            [{currentItem.basePhonetic || currentItem.basePronunciation}]
                          </span>
                        )}
                      </div>
                    </div>`;
code = code.replace(oldBase, newBase);

// For Past Simple
const oldPast = `<div className="flex flex-col text-left">
                      <span className="text-[10px] uppercase opacity-70 font-sans tracking-wider">Past Simple (Prétérit)</span>
                      <span>{currentItem.pastSimple}</span>
                    </div>`;
const newPast = `<div className="flex flex-col text-left">
                      <span className="text-[10px] uppercase opacity-70 font-sans tracking-wider">Past Simple (Prétérit)</span>
                      <div className="flex items-baseline gap-2">
                        <span>{currentItem.pastSimple}</span>
                        {(currentItem.pastPhonetic || currentItem.pastPronunciation) && (
                          <span className="text-[10px] opacity-70 font-sans font-normal lowercase tracking-normal">
                            [{currentItem.pastPhonetic || currentItem.pastPronunciation}]
                          </span>
                        )}
                      </div>
                    </div>`;
code = code.replace(oldPast, newPast);

// For Past Participle
const oldPart = `<div className="flex flex-col text-left">
                      <span className="text-[10px] uppercase opacity-70 font-sans tracking-wider">Past Participle</span>
                      <span>{currentItem.pastParticiple}</span>
                    </div>`;
const newPart = `<div className="flex flex-col text-left">
                      <span className="text-[10px] uppercase opacity-70 font-sans tracking-wider">Past Participle</span>
                      <div className="flex items-baseline gap-2">
                        <span>{currentItem.pastParticiple}</span>
                        {(currentItem.participlePhonetic || currentItem.participlePronunciation) && (
                          <span className="text-[10px] opacity-70 font-sans font-normal lowercase tracking-normal">
                            [{currentItem.participlePhonetic || currentItem.participlePronunciation}]
                          </span>
                        )}
                      </div>
                    </div>`;
code = code.replace(oldPart, newPart);

fs.writeFileSync('src/Flashcards.tsx', code);
console.log('patched flashcards');
