const fs = require('fs');
const { GoogleGenAI } = require('@google/genai');

async function run() {
  console.log("Starting verb phonetic update...");
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  let data = JSON.parse(fs.readFileSync('src/data.json', 'utf8'));
  
  // We'll process them in chunks of 40 to avoid massive prompt issues
  const chunkSize = 40;
  for (let i = 0; i < data.length; i += chunkSize) {
    console.log(`Processing chunk ${i/chunkSize + 1}...`);
    const chunk = data.slice(i, i + chunkSize);
    const prompt = `
For the following JSON array of English irregular verbs, add 6 new fields to each object:
- basePhonetic: exact IPA phonetic for the base verb (e.g. "/bi/")
- basePronunciation: french-friendly simplified pronunciation (e.g. "bi")
- pastPhonetic: exact IPA for pastSimple
- pastPronunciation: simplified for pastSimple
- participlePhonetic: exact IPA for pastParticiple
- participlePronunciation: simplified for pastParticiple

Return ONLY the updated JSON array. Do not include markdown code blocks like \`\`\`json. Just the raw array.

Input:
${JSON.stringify(chunk, null, 2)}
`;
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: prompt,
        config: { temperature: 0.1 }
      });
      let text = response.text.trim();
      if (text.startsWith('\`\`\`json')) text = text.replace(/^\`\`\`json/, '');
      if (text.startsWith('\`\`\`')) text = text.replace(/^\`\`\`/, '');
      if (text.endsWith('\`\`\`')) text = text.replace(/\`\`\`$/, '');
      
      const updatedChunk = JSON.parse(text);
      for (let j = 0; j < updatedChunk.length; j++) {
        data[i + j] = { ...data[i + j], ...updatedChunk[j] };
      }
    } catch(err) {
      console.error("Error on chunk", i, err);
    }
  }
  
  fs.writeFileSync('src/data.json', JSON.stringify(data, null, 2));
  console.log("Done updating verbs!");
}

run();
