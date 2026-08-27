const fs = require('fs');
let code = fs.readFileSync('src/vocabData.ts', 'utf8');

const pronunciationDict = {
  'corporate': { phonetic: '/ˈkɔːrpərət/', pronunciation: 'Kor-peu-reut' },
  'entrepreneur': { phonetic: '/ˌɑːntrəprəˈnɜːr/', pronunciation: 'An-treu-preu-neur' },
  'headquarters': { phonetic: '/ˈhedˌkwɔːrtərz/', pronunciation: 'Hed-kwo-teurz' },
  'human resources': { phonetic: '/ˈhjuːmən rɪˈsɔːrsɪz/', pronunciation: 'Hiou-meun ri-sor-siz' },
  'investment': { phonetic: '/ɪnˈvestmənt/', pronunciation: 'In-vest-meunt' },
  'leadership': { phonetic: '/ˈliːdərʃɪp/', pronunciation: 'Li-deur-chip' },
  'management': { phonetic: '/ˈmænɪdʒmənt/', pronunciation: 'Ma-nidj-meunt' },
  'marketing': { phonetic: '/ˈmɑːrkɪtɪŋ/', pronunciation: 'Mar-ki-ting' },
  'networking': { phonetic: '/ˈnetwɜːrkɪŋ/', pronunciation: 'Net-weur-king' },
  'partnership': { phonetic: '/ˈpɑːrtnərʃɪp/', pronunciation: 'Part-neur-chip' },
  'pitch': { phonetic: '/pɪtʃ/', pronunciation: 'Pitch' },
  'portfolio': { phonetic: '/pɔːrtˈfoʊlioʊ/', pronunciation: 'Port-fo-li-o' },
  'quarter (Q1, Q2)': { phonetic: '/ˈkwɔːrtər/', pronunciation: 'Kwor-teur' },
  'recruitment': { phonetic: '/rɪˈkruːtmənt/', pronunciation: 'Ri-krout-meunt' },
  'stakeholder': { phonetic: '/ˈsteɪkˌhoʊldər/', pronunciation: 'Steik-hol-deur' },
  'turnover / revenue': { phonetic: '/ˈtɜːrnoʊvər/', pronunciation: 'Teur-no-veur' },
  'wholesale': { phonetic: '/ˈhoʊlseɪl/', pronunciation: 'Hol-seil' },
  'meeting': { phonetic: '/ˈmiːtɪŋ/', pronunciation: 'Mi-ting' },
  'deadline': { phonetic: '/ˈdedlaɪn/', pronunciation: 'Ded-lain' },
  'schedule': { phonetic: '/ˈskedʒuːl/', pronunciation: 'Ske-djioul' },
  'budget': { phonetic: '/ˈbʌdʒɪt/', pronunciation: 'Beu-djet' },
  'feedback': { phonetic: '/ˈfiːdbæk/', pronunciation: 'Fid-bak' },
  'invoice': { phonetic: '/ˈɪnvɔɪs/', pronunciation: 'In-vois' },
  'negotiate': { phonetic: '/nɪˈɡoʊʃieɪt/', pronunciation: 'Ni-go-chi-eit' },
  'presentation': { phonetic: '/ˌprezənˈteɪʃən/', pronunciation: 'Pre-zeun-tei-chone' },
  'profit': { phonetic: '/ˈprɑːfɪt/', pronunciation: 'Pra-fit' },
  'strategy': { phonetic: '/ˈstrætədʒi/', pronunciation: 'Stra-te-dji' },
  'brilliant': { phonetic: '/ˈbrɪliənt/', pronunciation: 'Bri-li-eunt' },
  'crucial': { phonetic: '/ˈkruːʃəl/', pronunciation: 'Krou-cheul' },
  'devastated': { phonetic: '/ˈdevəsteɪtɪd/', pronunciation: 'De-vas-tei-tid' },
  'ecstatic': { phonetic: '/ɪkˈstætɪk/', pronunciation: 'Ik-sta-tik' },
  'filthy': { phonetic: '/ˈfɪlθi/', pronunciation: 'Fil-thi' },
  'spotless': { phonetic: '/ˈspɑːtləs/', pronunciation: 'Spat-leuss' },
  'freezing': { phonetic: '/ˈfriːzɪŋ/', pronunciation: 'Fri-zing' },
  'boiling': { phonetic: '/ˈbɔɪlɪŋ/', pronunciation: 'Boi-ling' },
  'packed': { phonetic: '/pækt/', pronunciation: 'Pakt' },
  'terrified': { phonetic: '/ˈterɪfaɪd/', pronunciation: 'Te-ri-faid' },
  'delighted': { phonetic: '/dɪˈlaɪtɪd/', pronunciation: 'Di-lai-tid' },
  'miserable': { phonetic: '/ˈmɪzərəbəl/', pronunciation: 'Mi-zeu-reu-beul' },
  'thrilled': { phonetic: '/θrɪld/', pronunciation: 'Thrild' },
  'astonishing': { phonetic: '/əˈstɑːnɪʃɪŋ/', pronunciation: 'As-ta-ni-ching' },
  'breathtaking': { phonetic: '/ˈbreθˌteɪkɪŋ/', pronunciation: 'Breth-tei-king' },
  'deafening': { phonetic: '/ˈdefənɪŋ/', pronunciation: 'De-feu-ning' },
  'mind-blowing': { phonetic: '/ˈmaɪndˌbloʊɪŋ/', pronunciation: 'Maind-blo-wing' },
  'heartbreaking': { phonetic: '/ˈhɑːrtˌbreɪkɪŋ/', pronunciation: 'Hart-brei-king' },
  'outstanding': { phonetic: '/aʊtˈstændɪŋ/', pronunciation: 'Aut-stan-ding' },
  'worthless': { phonetic: '/ˈwɜːrθləs/', pronunciation: 'Weurth-leuss' },
  'amazing': { phonetic: '/əˈmeɪzɪŋ/', pronunciation: 'Eu-mei-zing' },
  'awful': { phonetic: '/ˈɔːfəl/', pronunciation: 'O-feul' },
  'gorgeous': { phonetic: '/ˈɡɔːrdʒəs/', pronunciation: 'Gor-djeuss' },
  'exhausted': { phonetic: '/ɪɡˈzɔːstɪd/', pronunciation: 'Ig-zos-tid' },
  'starving': { phonetic: '/ˈstɑːrvɪŋ/', pronunciation: 'Star-ving' },
  'hilarious': { phonetic: '/hɪˈleriəs/', pronunciation: 'Hi-le-ri-euss' },
  'tiny': { phonetic: '/ˈtaɪni/', pronunciation: 'Tai-ni' },
  'massive': { phonetic: '/ˈmæsɪv/', pronunciation: 'Ma-siv' },
  'furious': { phonetic: '/ˈfjʊriəs/', pronunciation: 'Fiou-ri-euss' },
  'fascinating': { phonetic: '/ˈfæsɪneɪtɪŋ/', pronunciation: 'Fa-si-nei-ting' }
};

let regex = /{ id: '([^']+)', english: '([^']+)', french: '([^']+)', example: '([^']+)', categoryId: '([^']+)' }/g;
code = code.replace(regex, (match, id, english, french, example, categoryId) => {
  const dict = pronunciationDict[english];
  if (dict) {
    return `{ id: '${id}', english: '${english}', french: '${french}', example: '${example}', categoryId: '${categoryId}', phonetic: '${dict.phonetic}', pronunciation: '${dict.pronunciation}' }`;
  }
  return match;
});

fs.writeFileSync('src/vocabData.ts', code);
console.log("patched vocabData 3");
