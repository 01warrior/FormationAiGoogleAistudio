const fs = require('fs');
let code = fs.readFileSync('src/vocabData.ts', 'utf8');

// Remove mindset from CategoryId
code = code.replace(
  "export type CategoryId = 'irregular_verbs' | 'travel' | 'business' | 'adjectives' | 'mindset';",
  "export type CategoryId = 'irregular_verbs' | 'travel' | 'business' | 'adjectives';"
);

// Remove mindset category from categories array
code = code.replace(
  "  { id: 'mindset', title: 'Mindset & Wellbeing', description: 'Emotions and mental health', icon: 'psychology', colorClass: 'bg-[#e91e63]' },\n",
  ""
);

// Change categoryId of the 6 new words to 'business' (or 'adjectives' for toxic)
code = code.replace(/categoryId: 'mindset'/g, "categoryId: 'business'");
// Let's make toxic an adjective
code = code.replace(/id: 'toxic',([\s\S]*?)categoryId: 'business'/, "id: 'toxic',$1categoryId: 'adjectives'");

fs.writeFileSync('src/vocabData.ts', code);
console.log("patched vocabData 2");
