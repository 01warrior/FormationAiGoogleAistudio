const fs = require('fs');
let code = fs.readFileSync('src/vocabData.ts', 'utf8');

const pronunciationDict = {
  'boarding': { phonetic: '/ˈbɔːrdɪŋ/', pronunciation: 'bor-ding' },
  'customs officer': { phonetic: '/ˈkʌstəmz ˈɔːfɪsər/', pronunciation: 'keus-teumz o-fi-seur' },
  'departure': { phonetic: '/dɪˈpɑːrtʃər/', pronunciation: 'di-par-tcheur' },
  'arrival': { phonetic: '/əˈraɪvəl/', pronunciation: 'eu-raï-veul' },
  'itinerary': { phonetic: '/aɪˈtɪnəreri/', pronunciation: 'aï-ti-neu-re-ri' },
  'layover': { phonetic: '/ˈleɪoʊvər/', pronunciation: 'lei-o-veur' },
  'boarding pass': { phonetic: '/ˈbɔːrdɪŋ pæs/', pronunciation: 'bor-ding pass' },
  'carry-on luggage': { phonetic: '/ˈkæri ɒn ˈlʌɡɪdʒ/', pronunciation: 'ka-ri-on leu-guidj' },
  'check-in desk': { phonetic: '/ˈtʃek ɪn desk/', pronunciation: 'tchek-in desk' },
  'concourse': { phonetic: '/ˈkɑːnkɔːrs/', pronunciation: 'kan-kors' },
  'baggage claim': { phonetic: '/ˈbæɡɪdʒ kleɪm/', pronunciation: 'ba-guidj kleim' },
  'security check': { phonetic: '/sɪˈkjʊrəti tʃek/', pronunciation: 'si-kiou-ri-ti tchek' },
  'aisle seat': { phonetic: '/aɪl siːt/', pronunciation: 'aïl sit' },
  'window seat': { phonetic: '/ˈwɪndoʊ siːt/', pronunciation: 'win-do sit' },
  'turbulence': { phonetic: '/ˈtɜːrbjələns/', pronunciation: 'teur-biou-leuns' },
  'flight attendant': { phonetic: '/flaɪt əˈtendənt/', pronunciation: 'flaït eu-ten-deunt' },
  'direct flight': { phonetic: '/dəˈrekt flaɪt/', pronunciation: 'di-rekt flaït' },
  'overbooked': { phonetic: '/ˌoʊvərˈbʊkt/', pronunciation: 'o-veur-boukt' },
  'duty-free shop': { phonetic: '/ˈduːti friː ʃɑːp/', pronunciation: 'diou-ti fri chap' },
  'currency': { phonetic: '/ˈkɜːrənsi/', pronunciation: 'keur-reun-si' },
  'airport': { phonetic: '/ˈerpɔːrt/', pronunciation: 'er-port' },
  'luggage': { phonetic: '/ˈlʌɡɪdʒ/', pronunciation: 'leu-guidj' },
  'flight': { phonetic: '/flaɪt/', pronunciation: 'flaït' },
  'passport': { phonetic: '/ˈpæspɔːrt/', pronunciation: 'pass-port' },
  'ticket': { phonetic: '/ˈtɪkɪt/', pronunciation: 'ti-kit' },
  'accommodation': { phonetic: '/əˌkɑːməˈdeɪʃən/', pronunciation: 'eu-ka-mo-dei-chone' },
  'sightseeing': { phonetic: '/ˈsaɪtsiːɪŋ/', pronunciation: 'saït-si-ing' },
  'delay': { phonetic: '/dɪˈleɪ/', pronunciation: 'di-lei' },
  'customs': { phonetic: '/ˈkʌstəmz/', pronunciation: 'keus-teumz' },
  'passenger': { phonetic: '/ˈpæsɪndʒər/', pronunciation: 'pa-sin-djeur' },
  'agenda': { phonetic: '/əˈdʒendə/', pronunciation: 'eu-djen-da' },
  'brainstorming': { phonetic: '/ˈbreɪnstɔːrmɪŋ/', pronunciation: 'brein-stor-ming' },
  'competitor': { phonetic: '/kəmˈpetɪtər/', pronunciation: 'keum-pe-ti-teur' },
  'corporate': { phonetic: '/ˈkɔːrpərət/', pronunciation: 'kor-peu-reut' },
  'turnover / revenue': { phonetic: '/ˈtɜːrnoʊvər ˈrevənuː/', pronunciation: 'teur-no-veur re-veu-niou' },
  'starving': { phonetic: '/ˈstɑːrvɪŋ/', pronunciation: 'star-ving' },
};

// Split code into lines for easier processing
let lines = code.split('\n');
let modified = false;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  if (line.includes('{ id:') && line.includes('english:')) {
    // Check if it already has phonetic
    if (!line.includes('phonetic:')) {
      // Extract english word
      let match = line.match(/english:\s*'([^']+)'/);
      if (match && match[1]) {
        let englishWord = match[1];
        let dict = pronunciationDict[englishWord];
        if (dict) {
          // insert before the closing brace
          lines[i] = line.replace(' }', `, phonetic: '${dict.phonetic}', pronunciation: '${dict.pronunciation}' }`);
          modified = true;
        }
      }
    }
  }
}

if (modified) {
  fs.writeFileSync('src/vocabData.ts', lines.join('\n'));
  console.log("patched remaining vocabData");
} else {
  console.log("No modifications made");
}
