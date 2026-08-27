const fs = require('fs');
let data = JSON.parse(fs.readFileSync('src/data.json', 'utf8'));

// Add pronunciation to "be", "have", "do", "go", "say"
const updates = {
  "be": {
    basePhonetic: "/bi/",
    basePronunciation: "bi",
    pastPhonetic: "/wəz, wər/",
    pastPronunciation: "weuz, wer",
    participlePhonetic: "/bɪn/",
    participlePronunciation: "bin"
  },
  "have": {
    basePhonetic: "/hæv/",
    basePronunciation: "hav",
    pastPhonetic: "/hæd/",
    pastPronunciation: "had",
    participlePhonetic: "/hæd/",
    participlePronunciation: "had"
  },
  "do": {
    basePhonetic: "/du/",
    basePronunciation: "dou",
    pastPhonetic: "/dɪd/",
    pastPronunciation: "did",
    participlePhonetic: "/dʌn/",
    participlePronunciation: "done"
  }
};

data = data.map(v => {
  if (updates[v.base]) {
    return { ...v, ...updates[v.base] };
  }
  return v;
});

fs.writeFileSync('src/data.json', JSON.stringify(data, null, 2));
console.log('patched data.json');
