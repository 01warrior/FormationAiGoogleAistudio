const fs = require('fs');
let code = fs.readFileSync('src/vocabData.ts', 'utf8');

// Update CategoryId
code = code.replace(
  "export type CategoryId = 'irregular_verbs' | 'travel' | 'business' | 'adjectives';",
  "export type CategoryId = 'irregular_verbs' | 'travel' | 'business' | 'adjectives' | 'mindset';"
);

// Add category to categories list
code = code.replace(
  "};\n\nexport const categories: CategoryDef[] = [",
  "};\n\nexport const categories: CategoryDef[] = [\n  { id: 'mindset', title: 'Mindset & Wellbeing', description: 'Emotions and mental health', icon: 'psychology', colorClass: 'bg-[#e91e63]' },"
);

// Add optional fields to VocabWord
code = code.replace(
  "  categoryId: CategoryId;\n}",
  "  categoryId: CategoryId;\n  phonetic?: string;\n  pronunciation?: string;\n}"
);

// Add the new words to vocabData array
const newWords = `
  // Mindset & Wellbeing
  { id: 'toxic', english: 'toxic', french: 'toxique', example: 'It is important to avoid toxic relationships.', categoryId: 'mindset', phonetic: '/ˈtɑːksɪk/', pronunciation: 'Tak-sik' },
  { id: 'positivity', english: 'positivity', french: 'positivité', example: 'She spreads positivity wherever she goes.', categoryId: 'mindset', phonetic: '/ˌpɑːzəˈtɪvəti/', pronunciation: 'Pa-zeu-ti-veu-ti' },
  { id: 'validation', english: 'validation', french: 'validation / reconnaissance', example: 'People often seek validation from others.', categoryId: 'mindset', phonetic: '/ˌvælɪˈdeɪʃən/', pronunciation: 'Va-li-dei-chone' },
  { id: 'compassion', english: 'compassion', french: 'compassion', example: 'We should treat everyone with compassion.', categoryId: 'mindset', phonetic: '/kəmˈpæʃən/', pronunciation: 'Kem-pa-chone' },
  { id: 'authenticity', english: 'authenticity', french: 'authenticité', example: 'Authenticity is key to building trust.', categoryId: 'mindset', phonetic: '/ˌɔːθenˈtɪsəti/', pronunciation: 'O-ten-ti-si-ti' },
  { id: 'dismiss', english: 'dismiss', french: 'rejeter / balayer', example: 'Do not dismiss her feelings.', categoryId: 'mindset', phonetic: '/dɪsˈmɪs/', pronunciation: 'Dis-miss' },
`;

code = code.replace(
  "export const vocabData: VocabWord[] = [",
  "export const vocabData: VocabWord[] = [" + newWords
);

fs.writeFileSync('src/vocabData.ts', code);
console.log("patched vocabData");
