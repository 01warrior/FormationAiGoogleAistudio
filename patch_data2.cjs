const fs = require('fs');

let data = JSON.parse(fs.readFileSync('src/data.json', 'utf8'));

// Adding phonetics to some common missing ones to make it look better during testing
const moreManualPhonetics = {
  "catch": { basePhonetic: "/kætʃ/", basePronunciation: "katch", pastPhonetic: "/kɔːt/", pastPronunciation: "kot", participlePhonetic: "/kɔːt/", participlePronunciation: "kot" },
  "choose": { basePhonetic: "/tʃuːz/", basePronunciation: "tchouz", pastPhonetic: "/tʃoʊz/", pastPronunciation: "tchoz", participlePhonetic: "/ˈtʃoʊzən/", participlePronunciation: "tcho-zeun" },
  "come": { basePhonetic: "/kʌm/", basePronunciation: "keum", pastPhonetic: "/keɪm/", pastPronunciation: "keim", participlePhonetic: "/kʌm/", participlePronunciation: "keum" },
  "cost": { basePhonetic: "/kɔːst/", basePronunciation: "kost", pastPhonetic: "/kɔːst/", pastPronunciation: "kost", participlePhonetic: "/kɔːst/", participlePronunciation: "kost" },
  "cut": { basePhonetic: "/kʌt/", basePronunciation: "keut", pastPhonetic: "/kʌt/", pastPronunciation: "keut", participlePhonetic: "/kʌt/", participlePronunciation: "keut" },
  "dig": { basePhonetic: "/dɪɡ/", basePronunciation: "dig", pastPhonetic: "/dʌɡ/", pastPronunciation: "deug", participlePhonetic: "/dʌɡ/", participlePronunciation: "deug" },
  "draw": { basePhonetic: "/drɔː/", basePronunciation: "dro", pastPhonetic: "/druː/", pastPronunciation: "drou", participlePhonetic: "/drɔːn/", participlePronunciation: "dron" },
  "dream": { basePhonetic: "/driːm/", basePronunciation: "drim", pastPhonetic: "/dremt, driːmd/", pastPronunciation: "dremt, drimd", participlePhonetic: "/dremt, driːmd/", participlePronunciation: "dremt, drimd" },
  "drink": { basePhonetic: "/drɪŋk/", basePronunciation: "drink", pastPhonetic: "/dræŋk/", pastPronunciation: "drank", participlePhonetic: "/drʌŋk/", participlePronunciation: "dreunk" },
  "drive": { basePhonetic: "/draɪv/", basePronunciation: "draïv", pastPhonetic: "/droʊv/", pastPronunciation: "drov", participlePhonetic: "/ˈdrɪvən/", participlePronunciation: "dri-veun" },
  "eat": { basePhonetic: "/iːt/", basePronunciation: "it", pastPhonetic: "/eɪt/", pastPronunciation: "eit", participlePhonetic: "/ˈiːtən/", participlePronunciation: "i-teun" },
  "fall": { basePhonetic: "/fɔːl/", basePronunciation: "fol", pastPhonetic: "/fel/", pastPronunciation: "fel", participlePhonetic: "/ˈfɔːlən/", participlePronunciation: "fo-leun" },
  "feel": { basePhonetic: "/fiːl/", basePronunciation: "fil", pastPhonetic: "/felt/", pastPronunciation: "felt", participlePhonetic: "/felt/", participlePronunciation: "felt" },
  "fight": { basePhonetic: "/faɪt/", basePronunciation: "faït", pastPhonetic: "/fɔːt/", pastPronunciation: "fot", participlePhonetic: "/fɔːt/", participlePronunciation: "fot" },
  "find": { basePhonetic: "/faɪnd/", basePronunciation: "faïnd", pastPhonetic: "/faʊnd/", pastPronunciation: "faʊnd", participlePhonetic: "/faʊnd/", participlePronunciation: "faʊnd" },
  "fly": { basePhonetic: "/flaɪ/", basePronunciation: "flaï", pastPhonetic: "/fluː/", pastPronunciation: "flou", participlePhonetic: "/floʊn/", participlePronunciation: "flon" },
  "forget": { basePhonetic: "/fərˈɡet/", basePronunciation: "feur-get", pastPhonetic: "/fərˈɡɑːt/", pastPronunciation: "feur-gat", participlePhonetic: "/fərˈɡɑːtən/", participlePronunciation: "feur-ga-teun" },
  "forgive": { basePhonetic: "/fərˈɡɪv/", basePronunciation: "feur-giv", pastPhonetic: "/fərˈɡeɪv/", pastPronunciation: "feur-geiv", participlePhonetic: "/fərˈɡɪvən/", participlePronunciation: "feur-gi-veun" },
  "freeze": { basePhonetic: "/friːz/", basePronunciation: "friz", pastPhonetic: "/froʊz/", pastPronunciation: "froz", participlePhonetic: "/ˈfroʊzən/", participlePronunciation: "fro-zeun" },
  "get": { basePhonetic: "/ɡet/", basePronunciation: "get", pastPhonetic: "/ɡɑːt/", pastPronunciation: "gat", participlePhonetic: "/ɡɑːtən/", participlePronunciation: "ga-teun" }
};

data = data.map(v => {
  if (moreManualPhonetics[v.base]) {
    return { ...v, ...moreManualPhonetics[v.base] };
  }
  return v;
});

fs.writeFileSync('src/data.json', JSON.stringify(data, null, 2));
console.log("Mock updated next 20 verbs");
