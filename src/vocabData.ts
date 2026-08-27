export type CategoryId = 'irregular_verbs' | 'travel' | 'business' | 'adjectives';

export interface CategoryDef {
  id: CategoryId;
  title: string;
  description: string;
  icon: string;
  colorClass: string;
}

export const categories: CategoryDef[] = [
  { id: 'irregular_verbs', title: 'Irregular Verbs', description: 'The classic list', icon: 'menu_book', colorClass: 'bg-primary' },
  { id: 'travel', title: 'Travel & Airport', description: 'Navigate your trips', icon: 'flight', colorClass: 'bg-tertiary' },
  { id: 'business', title: 'Business English', description: 'Professional context', icon: 'work', colorClass: 'bg-secondary' },
  { id: 'adjectives', title: 'Essential Adjectives', description: 'Describe everything', icon: 'palette', colorClass: 'bg-[#9c27b0]' },
];

export interface VocabWord {
  id: string; // english word usually
  english: string;
  french: string;
  example: string;
  categoryId: CategoryId;
  phonetic?: string;
  pronunciation?: string;
}

export const vocabData: VocabWord[] = [
  // Mindset & Wellbeing
  { id: 'toxic', english: 'toxic', french: 'toxique', example: 'It is important to avoid toxic relationships.', categoryId: 'adjectives', phonetic: '/ˈtɑːksɪk/', pronunciation: 'Tak-sik' },
  { id: 'positivity', english: 'positivity', french: 'positivité', example: 'She spreads positivity wherever she goes.', categoryId: 'business', phonetic: '/ˌpɑːzəˈtɪvəti/', pronunciation: 'Pa-zeu-ti-veu-ti' },
  { id: 'validation', english: 'validation', french: 'validation / reconnaissance', example: 'People often seek validation from others.', categoryId: 'business', phonetic: '/ˌvælɪˈdeɪʃən/', pronunciation: 'Va-li-dei-chone' },
  { id: 'compassion', english: 'compassion', french: 'compassion', example: 'We should treat everyone with compassion.', categoryId: 'business', phonetic: '/kəmˈpæʃən/', pronunciation: 'Kem-pa-chone' },
  { id: 'authenticity', english: 'authenticity', french: 'authenticité', example: 'Authenticity is key to building trust.', categoryId: 'business', phonetic: '/ˌɔːθenˈtɪsəti/', pronunciation: 'O-ten-ti-si-ti' },
  { id: 'dismiss', english: 'dismiss', french: 'rejeter / balayer', example: 'Do not dismiss her feelings.', categoryId: 'business', phonetic: '/dɪsˈmɪs/', pronunciation: 'Dis-miss' },

  // Travel
  { id: 'boarding', english: 'boarding', french: 'embarquement', example: 'Boarding starts at gate 4 in ten minutes.', categoryId: 'travel', phonetic: '/ˈbɔːrdɪŋ/', pronunciation: 'bor-ding' },
  { id: 'customs_officer', english: 'customs officer', french: 'douanier', example: 'The customs officer asked if I had anything to declare.', categoryId: 'travel', phonetic: '/ˈkʌstəmz ˈɔːfɪsər/', pronunciation: 'keus-teumz o-fi-seur' },
  { id: 'departure', english: 'departure', french: 'départ', example: 'Our departure is scheduled for 8:00 AM.', categoryId: 'travel', phonetic: '/dɪˈpɑːrtʃər/', pronunciation: 'di-par-tcheur' },
  { id: 'arrival', english: 'arrival', french: 'arrivée', example: 'Arrival time is estimated at noon.', categoryId: 'travel', phonetic: '/əˈraɪvəl/', pronunciation: 'eu-raï-veul' },
  { id: 'itinerary', english: 'itinerary', french: 'itinéraire', example: 'We planned a detailed itinerary for our trip.', categoryId: 'travel', phonetic: '/aɪˈtɪnəreri/', pronunciation: 'aï-ti-neu-re-ri' },
  { id: 'layover', english: 'layover', french: 'escale', example: 'We have a three-hour layover in Frankfurt.', categoryId: 'travel', phonetic: '/ˈleɪoʊvər/', pronunciation: 'lei-o-veur' },
  { id: 'boarding_pass', english: 'boarding pass', french: 'carte d\'embarquement', example: 'Please have your boarding pass ready.', categoryId: 'travel', phonetic: '/ˈbɔːrdɪŋ pæs/', pronunciation: 'bor-ding pass' },
  { id: 'carry_on', english: 'carry-on luggage', french: 'bagage à main', example: 'You are allowed one carry-on luggage.', categoryId: 'travel', phonetic: '/ˈkæri ɒn ˈlʌɡɪdʒ/', pronunciation: 'ka-ri-on leu-guidj' },
  { id: 'check_in', english: 'check-in desk', french: 'comptoir d\'enregistrement', example: 'Where is the check-in desk for Air France?', categoryId: 'travel', phonetic: '/ˈtʃek ɪn desk/', pronunciation: 'tchek-in desk' },
  { id: 'concourse', english: 'concourse', french: 'hall', example: 'Proceed to concourse B for your flight.', categoryId: 'travel', phonetic: '/ˈkɑːnkɔːrs/', pronunciation: 'kan-kors' },
  { id: 'baggage_claim', english: 'baggage claim', french: 'retrait des bagages', example: 'Follow the signs to baggage claim.', categoryId: 'travel', phonetic: '/ˈbæɡɪdʒ kleɪm/', pronunciation: 'ba-guidj kleim' },
  { id: 'security_check', english: 'security check', french: 'contrôle de sécurité', example: 'The security check line is quite long.', categoryId: 'travel', phonetic: '/sɪˈkjʊrəti tʃek/', pronunciation: 'si-kiou-ri-ti tchek' },
  { id: 'aisle_seat', english: 'aisle seat', french: 'siège côté couloir', example: 'I prefer an aisle seat for long flights.', categoryId: 'travel', phonetic: '/aɪl siːt/', pronunciation: 'aïl sit' },
  { id: 'window_seat', english: 'window seat', french: 'siège côté hublot', example: 'She requested a window seat to enjoy the view.', categoryId: 'travel', phonetic: '/ˈwɪndoʊ siːt/', pronunciation: 'win-do sit' },
  { id: 'turbulence', english: 'turbulence', french: 'turbulences', example: 'We experienced some heavy turbulence.', categoryId: 'travel', phonetic: '/ˈtɜːrbjələns/', pronunciation: 'teur-biou-leuns' },
  { id: 'flight_attendant', english: 'flight attendant', french: 'agent de bord / hôtesse', example: 'The flight attendant brought us some water.', categoryId: 'travel', phonetic: '/flaɪt əˈtendənt/', pronunciation: 'flaït eu-ten-deunt' },
  { id: 'direct_flight', english: 'direct flight', french: 'vol direct', example: 'It is a direct flight from New York to Paris.', categoryId: 'travel', phonetic: '/dəˈrekt flaɪt/', pronunciation: 'di-rekt flaït' },
  { id: 'overbooked', english: 'overbooked', french: 'surréservé', example: 'The flight was overbooked, so they asked for volunteers.', categoryId: 'travel', phonetic: '/ˌoʊvərˈbʊkt/', pronunciation: 'o-veur-boukt' },
  { id: 'duty_free', english: 'duty-free shop', french: 'boutique hors taxes', example: 'I bought some perfume at the duty-free shop.', categoryId: 'travel', phonetic: '/ˈduːti friː ʃɑːp/', pronunciation: 'diou-ti fri chap' },
  { id: 'currency', english: 'currency', french: 'monnaie / devise', example: 'What is the local currency here?', categoryId: 'travel', phonetic: '/ˈkɜːrənsi/', pronunciation: 'keur-reun-si' },

  { id: 'airport', english: 'airport', french: 'aéroport', example: 'We arrived at the airport two hours early.', categoryId: 'travel', phonetic: '/ˈerpɔːrt/', pronunciation: 'er-port' },
  { id: 'luggage', english: 'luggage', french: 'bagages', example: 'Where can I claim my luggage?', categoryId: 'travel', phonetic: '/ˈlʌɡɪdʒ/', pronunciation: 'leu-guidj' },
  { id: 'flight', english: 'flight', french: 'vol', example: 'The flight is delayed due to weather.', categoryId: 'travel', phonetic: '/flaɪt/', pronunciation: 'flaït' },
  { id: 'passport', english: 'passport', french: 'passeport', example: 'Please show your passport at the gate.', categoryId: 'travel', phonetic: '/ˈpæspɔːrt/', pronunciation: 'pass-port' },
  { id: 'ticket', english: 'ticket', french: 'billet', example: 'I bought a round-trip ticket to London.', categoryId: 'travel', phonetic: '/ˈtɪkɪt/', pronunciation: 'ti-kit' },
  { id: 'accommodation', english: 'accommodation', french: 'hébergement', example: 'Have you booked your accommodation yet?', categoryId: 'travel', phonetic: '/əˌkɑːməˈdeɪʃən/', pronunciation: 'eu-ka-mo-dei-chone' },
  { id: 'sightseeing', english: 'sightseeing', french: 'tourisme', example: 'We went sightseeing in Rome all day.', categoryId: 'travel', phonetic: '/ˈsaɪtsiːɪŋ/', pronunciation: 'saït-si-ing' },
  { id: 'delay', english: 'delay', french: 'retard', example: 'There is a delay on the train line.', categoryId: 'travel', phonetic: '/dɪˈleɪ/', pronunciation: 'di-lei' },
  { id: 'customs', english: 'customs', french: 'douane', example: 'We have to pass through customs.', categoryId: 'travel', phonetic: '/ˈkʌstəmz/', pronunciation: 'keus-teumz' },
  { id: 'passenger', english: 'passenger', french: 'passager', example: 'The passenger is waiting for their flight.', categoryId: 'travel', phonetic: '/ˈpæsɪndʒər/', pronunciation: 'pa-sin-djeur' },
  
  // Business
  { id: 'agenda', english: 'agenda', french: 'ordre du jour', example: 'The first item on the agenda is the budget.', categoryId: 'business', phonetic: '/əˈdʒendə/', pronunciation: 'eu-djen-da' },
  { id: 'brainstorming', english: 'brainstorming', french: 'remue-méninges', example: 'We had a productive brainstorming session.', categoryId: 'business', phonetic: '/ˈbreɪnstɔːrmɪŋ/', pronunciation: 'brein-stor-ming' },
  { id: 'competitor', english: 'competitor', french: 'concurrent', example: 'Our main competitor just launched a new product.', categoryId: 'business', phonetic: '/kəmˈpetɪtər/', pronunciation: 'keum-pe-ti-teur' },
  { id: 'corporate', english: 'corporate', french: 'd\'entreprise', example: 'He works in the corporate headquarters.', categoryId: 'business', phonetic: '/ˈkɔːrpərət/', pronunciation: 'kor-peu-reut' },
  { id: 'entrepreneur', english: 'entrepreneur', french: 'entrepreneur', example: 'She is a successful tech entrepreneur.', categoryId: 'business', phonetic: '/ˌɑːntrəprəˈnɜːr/', pronunciation: 'An-treu-preu-neur' },
  { id: 'headquarters', english: 'headquarters', french: 'siège social', example: 'The company headquarters are in London.', categoryId: 'business', phonetic: '/ˈhedˌkwɔːrtərz/', pronunciation: 'Hed-kwo-teurz' },
  { id: 'human_resources', english: 'human resources', french: 'ressources humaines', example: 'Contact human resources for your benefits.', categoryId: 'business', phonetic: '/ˈhjuːmən rɪˈsɔːrsɪz/', pronunciation: 'Hiou-meun ri-sor-siz' },
  { id: 'investment', english: 'investment', french: 'investissement', example: 'Buying new software is a smart investment.', categoryId: 'business', phonetic: '/ɪnˈvestmənt/', pronunciation: 'In-vest-meunt' },
  { id: 'leadership', english: 'leadership', french: 'leadership / direction', example: 'The team showed strong leadership skills.', categoryId: 'business', phonetic: '/ˈliːdərʃɪp/', pronunciation: 'Li-deur-chip' },
  { id: 'management', english: 'management', french: 'gestion / direction', example: 'The management decided to expand the team.', categoryId: 'business', phonetic: '/ˈmænɪdʒmənt/', pronunciation: 'Ma-nidj-meunt' },
  { id: 'marketing', english: 'marketing', french: 'marketing', example: 'Our marketing campaign was very successful.', categoryId: 'business', phonetic: '/ˈmɑːrkɪtɪŋ/', pronunciation: 'Mar-ki-ting' },
  { id: 'networking', english: 'networking', french: 'réseautage', example: 'Networking is important for career growth.', categoryId: 'business', phonetic: '/ˈnetwɜːrkɪŋ/', pronunciation: 'Net-weur-king' },
  { id: 'partnership', english: 'partnership', french: 'partenariat', example: 'We signed a new partnership agreement.', categoryId: 'business', phonetic: '/ˈpɑːrtnərʃɪp/', pronunciation: 'Part-neur-chip' },
  { id: 'pitch', english: 'pitch', french: 'argumentaire', example: 'He delivered a great sales pitch to the client.', categoryId: 'business', phonetic: '/pɪtʃ/', pronunciation: 'Pitch' },
  { id: 'portfolio', english: 'portfolio', french: 'portefeuille (de projets/clients)', example: 'She presented her design portfolio.', categoryId: 'business', phonetic: '/pɔːrtˈfoʊlioʊ/', pronunciation: 'Port-fo-li-o' },
  { id: 'quarter', english: 'quarter (Q1, Q2)', french: 'trimestre', example: 'Sales were up in the first quarter.', categoryId: 'business', phonetic: '/ˈkwɔːrtər/', pronunciation: 'Kwor-teur' },
  { id: 'recruitment', english: 'recruitment', french: 'recrutement', example: 'The recruitment process takes about three weeks.', categoryId: 'business', phonetic: '/rɪˈkruːtmənt/', pronunciation: 'Ri-krout-meunt' },
  { id: 'stakeholder', english: 'stakeholder', french: 'partie prenante', example: 'We need to update all the stakeholders.', categoryId: 'business', phonetic: '/ˈsteɪkˌhoʊldər/', pronunciation: 'Steik-hol-deur' },
  { id: 'turnover', english: 'turnover / revenue', french: 'chiffre d\'affaires', example: 'The annual turnover exceeded 1 million euros.', categoryId: 'business', phonetic: '/ˈtɜːrnoʊvər ˈrevənuː/', pronunciation: 'teur-no-veur re-veu-niou' },
  { id: 'wholesale', english: 'wholesale', french: 'vente en gros', example: 'We buy our materials wholesale.', categoryId: 'business', phonetic: '/ˈhoʊlseɪl/', pronunciation: 'Hol-seil' },

  { id: 'meeting', english: 'meeting', french: 'réunion', example: 'The meeting will start at 10 AM.', categoryId: 'business', phonetic: '/ˈmiːtɪŋ/', pronunciation: 'Mi-ting' },
  { id: 'deadline', english: 'deadline', french: 'date limite', example: 'We must meet the deadline on Friday.', categoryId: 'business', phonetic: '/ˈdedlaɪn/', pronunciation: 'Ded-lain' },
  { id: 'schedule', english: 'schedule', french: 'emploi du temps', example: 'Let me check my schedule for next week.', categoryId: 'business', phonetic: '/ˈskedʒuːl/', pronunciation: 'Ske-djioul' },
  { id: 'budget', english: 'budget', french: 'budget', example: 'The project budget was approved.', categoryId: 'business', phonetic: '/ˈbʌdʒɪt/', pronunciation: 'Beu-djet' },
  { id: 'feedback', english: 'feedback', french: 'retour', example: 'Thank you for your constructive feedback.', categoryId: 'business', phonetic: '/ˈfiːdbæk/', pronunciation: 'Fid-bak' },
  { id: 'invoice', english: 'invoice', french: 'facture', example: 'Please send the invoice to the accounting department.', categoryId: 'business', phonetic: '/ˈɪnvɔɪs/', pronunciation: 'In-vois' },
  { id: 'negotiate', english: 'negotiate', french: 'négocier', example: 'We need to negotiate the terms of the contract.', categoryId: 'business', phonetic: '/nɪˈɡoʊʃieɪt/', pronunciation: 'Ni-go-chi-eit' },
  { id: 'presentation', english: 'presentation', french: 'présentation', example: 'She gave an excellent presentation.', categoryId: 'business', phonetic: '/ˌprezənˈteɪʃən/', pronunciation: 'Pre-zeun-tei-chone' },
  { id: 'profit', english: 'profit', french: 'bénéfice', example: 'The company made a large profit this year.', categoryId: 'business', phonetic: '/ˈprɑːfɪt/', pronunciation: 'Pra-fit' },
  { id: 'strategy', english: 'strategy', french: 'stratégie', example: 'Our marketing strategy needs an update.', categoryId: 'business', phonetic: '/ˈstrætədʒi/', pronunciation: 'Stra-te-dji' },

  // Adjectives
  { id: 'brilliant', english: 'brilliant', french: 'brillant / génial', example: 'That is a brilliant idea!', categoryId: 'adjectives', phonetic: '/ˈbrɪliənt/', pronunciation: 'Bri-li-eunt' },
  { id: 'crucial', english: 'crucial', french: 'crucial / essentiel', example: 'It is crucial to back up your data.', categoryId: 'adjectives', phonetic: '/ˈkruːʃəl/', pronunciation: 'Krou-cheul' },
  { id: 'devastated', english: 'devastated', french: 'dévasté / effondré', example: 'She was devastated by the bad news.', categoryId: 'adjectives', phonetic: '/ˈdevəsteɪtɪd/', pronunciation: 'De-vas-tei-tid' },
  { id: 'ecstatic', english: 'ecstatic', french: 'extatique / fou de joie', example: 'He was ecstatic when he won the prize.', categoryId: 'adjectives', phonetic: '/ɪkˈstætɪk/', pronunciation: 'Ik-sta-tik' },
  { id: 'filthy', english: 'filthy', french: 'crasseux / très sale', example: 'Wash your hands, they are filthy.', categoryId: 'adjectives', phonetic: '/ˈfɪlθi/', pronunciation: 'Fil-thi' },
  { id: 'spotless', english: 'spotless', french: 'impeccable', example: 'She kept the kitchen spotless.', categoryId: 'adjectives', phonetic: '/ˈspɑːtləs/', pronunciation: 'Spat-leuss' },
  { id: 'freezing', english: 'freezing', french: 'glacial', example: 'Put on a coat, it is freezing outside.', categoryId: 'adjectives', phonetic: '/ˈfriːzɪŋ/', pronunciation: 'Fri-zing' },
  { id: 'boiling', english: 'boiling', french: 'bouillant', example: 'It is boiling in this room, open a window.', categoryId: 'adjectives', phonetic: '/ˈbɔɪlɪŋ/', pronunciation: 'Boi-ling' },
  { id: 'packed', english: 'packed', french: 'bondé', example: 'The train was packed this morning.', categoryId: 'adjectives', phonetic: '/pækt/', pronunciation: 'Pakt' },
  { id: 'terrified', english: 'terrified', french: 'terrifié', example: 'I am terrified of spiders.', categoryId: 'adjectives', phonetic: '/ˈterɪfaɪd/', pronunciation: 'Te-ri-faid' },
  { id: 'delighted', english: 'delighted', french: 'ravi', example: 'We are delighted to invite you.', categoryId: 'adjectives', phonetic: '/dɪˈlaɪtɪd/', pronunciation: 'Di-lai-tid' },
  { id: 'miserable', english: 'miserable', french: 'malheureux / misérable', example: 'He felt miserable after catching a cold.', categoryId: 'adjectives', phonetic: '/ˈmɪzərəbəl/', pronunciation: 'Mi-zeu-reu-beul' },
  { id: 'thrilled', english: 'thrilled', french: 'ravi / excité', example: 'I was thrilled to see her again.', categoryId: 'adjectives', phonetic: '/θrɪld/', pronunciation: 'Thrild' },
  { id: 'astonishing', english: 'astonishing', french: 'étonnant', example: 'The magic trick was astonishing.', categoryId: 'adjectives', phonetic: '/əˈstɑːnɪʃɪŋ/', pronunciation: 'As-ta-ni-ching' },
  { id: 'breathtaking', english: 'breathtaking', french: 'à couper le souffle', example: 'The view from the top is breathtaking.', categoryId: 'adjectives', phonetic: '/ˈbreθˌteɪkɪŋ/', pronunciation: 'Breth-tei-king' },
  { id: 'deafening', english: 'deafening', french: 'assourdissant', example: 'The music at the concert was deafening.', categoryId: 'adjectives', phonetic: '/ˈdefənɪŋ/', pronunciation: 'De-feu-ning' },
  { id: 'mind_blowing', english: 'mind-blowing', french: 'hallucinant', example: 'The special effects were mind-blowing.', categoryId: 'adjectives', phonetic: '/ˈmaɪndˌbloʊɪŋ/', pronunciation: 'Maind-blo-wing' },
  { id: 'heartbreaking', english: 'heartbreaking', french: 'déchirant', example: 'It was a heartbreaking story.', categoryId: 'adjectives', phonetic: '/ˈhɑːrtˌbreɪkɪŋ/', pronunciation: 'Hart-brei-king' },
  { id: 'outstanding', english: 'outstanding', french: 'exceptionnel', example: 'She gave an outstanding performance.', categoryId: 'adjectives', phonetic: '/aʊtˈstændɪŋ/', pronunciation: 'Aut-stan-ding' },
  { id: 'worthless', english: 'worthless', french: 'sans valeur', example: 'This old coin is completely worthless.', categoryId: 'adjectives', phonetic: '/ˈwɜːrθləs/', pronunciation: 'Weurth-leuss' },

  { id: 'amazing', english: 'amazing', french: 'incroyable', example: 'The view from the mountain is amazing.', categoryId: 'adjectives', phonetic: '/əˈmeɪzɪŋ/', pronunciation: 'Eu-mei-zing' },
  { id: 'awful', english: 'awful', french: 'horrible', example: 'The weather was awful yesterday.', categoryId: 'adjectives', phonetic: '/ˈɔːfəl/', pronunciation: 'O-feul' },
  { id: 'gorgeous', english: 'gorgeous', french: 'magnifique', example: 'She is wearing a gorgeous dress.', categoryId: 'adjectives', phonetic: '/ˈɡɔːrdʒəs/', pronunciation: 'Gor-djeuss' },
  { id: 'exhausted', english: 'exhausted', french: 'épuisé', example: 'I was exhausted after the long trip.', categoryId: 'adjectives', phonetic: '/ɪɡˈzɔːstɪd/', pronunciation: 'Ig-zos-tid' },
  { id: 'starving', english: 'starving', french: 'affamé', example: 'Let\'s eat, I am starving!', categoryId: 'adjectives', phonetic: '/ˈstɑːrvɪŋ/', pronunciation: 'star-ving' },
  { id: 'hilarious', english: 'hilarious', french: 'hilarant', example: 'That movie was hilarious.', categoryId: 'adjectives', phonetic: '/hɪˈleriəs/', pronunciation: 'Hi-le-ri-euss' },
  { id: 'tiny', english: 'tiny', french: 'minuscule', example: 'The kitten is so tiny.', categoryId: 'adjectives', phonetic: '/ˈtaɪni/', pronunciation: 'Tai-ni' },
  { id: 'massive', english: 'massive', french: 'massif', example: 'There is a massive tree in the garden.', categoryId: 'adjectives', phonetic: '/ˈmæsɪv/', pronunciation: 'Ma-siv' },
  { id: 'furious', english: 'furious', french: 'furieux', example: 'He was furious about the mistake.', categoryId: 'adjectives', phonetic: '/ˈfjʊriəs/', pronunciation: 'Fiou-ri-euss' },
  { id: 'fascinating', english: 'fascinating', french: 'fascinant', example: 'The book was absolutely fascinating.', categoryId: 'adjectives', phonetic: '/ˈfæsɪneɪtɪŋ/', pronunciation: 'Fa-si-nei-ting' },
];
