const fs = require('fs');
let code = fs.readFileSync('src/store.ts', 'utf8');

const oldVerb = `export interface Verb {
  base: string;
  pastSimple: string;
  pastParticiple: string;
  translation: string;
}`;

const newVerb = `export interface Verb {
  base: string;
  pastSimple: string;
  pastParticiple: string;
  translation: string;
  basePhonetic?: string;
  basePronunciation?: string;
  pastPhonetic?: string;
  pastPronunciation?: string;
  participlePhonetic?: string;
  participlePronunciation?: string;
}`;

code = code.replace(oldVerb, newVerb);
fs.writeFileSync('src/store.ts', code);
console.log('patched store.ts');
