const fs = require('fs');

const content = fs.readFileSync('src/vocabData.ts', 'utf8');

const additionalTravel = `
  { id: 'boarding', english: 'boarding', french: 'embarquement', example: 'Boarding starts at gate 4 in ten minutes.', categoryId: 'travel' },
  { id: 'customs_officer', english: 'customs officer', french: 'douanier', example: 'The customs officer asked if I had anything to declare.', categoryId: 'travel' },
  { id: 'departure', english: 'departure', french: 'départ', example: 'Our departure is scheduled for 8:00 AM.', categoryId: 'travel' },
  { id: 'arrival', english: 'arrival', french: 'arrivée', example: 'Arrival time is estimated at noon.', categoryId: 'travel' },
  { id: 'itinerary', english: 'itinerary', french: 'itinéraire', example: 'We planned a detailed itinerary for our trip.', categoryId: 'travel' },
  { id: 'layover', english: 'layover', french: 'escale', example: 'We have a three-hour layover in Frankfurt.', categoryId: 'travel' },
  { id: 'boarding_pass', english: 'boarding pass', french: 'carte d\\'embarquement', example: 'Please have your boarding pass ready.', categoryId: 'travel' },
  { id: 'carry_on', english: 'carry-on luggage', french: 'bagage à main', example: 'You are allowed one carry-on luggage.', categoryId: 'travel' },
  { id: 'check_in', english: 'check-in desk', french: 'comptoir d\\'enregistrement', example: 'Where is the check-in desk for Air France?', categoryId: 'travel' },
  { id: 'concourse', english: 'concourse', french: 'hall', example: 'Proceed to concourse B for your flight.', categoryId: 'travel' },
  { id: 'baggage_claim', english: 'baggage claim', french: 'retrait des bagages', example: 'Follow the signs to baggage claim.', categoryId: 'travel' },
  { id: 'security_check', english: 'security check', french: 'contrôle de sécurité', example: 'The security check line is quite long.', categoryId: 'travel' },
  { id: 'aisle_seat', english: 'aisle seat', french: 'siège côté couloir', example: 'I prefer an aisle seat for long flights.', categoryId: 'travel' },
  { id: 'window_seat', english: 'window seat', french: 'siège côté hublot', example: 'She requested a window seat to enjoy the view.', categoryId: 'travel' },
  { id: 'turbulence', english: 'turbulence', french: 'turbulences', example: 'We experienced some heavy turbulence.', categoryId: 'travel' },
  { id: 'flight_attendant', english: 'flight attendant', french: 'agent de bord / hôtesse', example: 'The flight attendant brought us some water.', categoryId: 'travel' },
  { id: 'direct_flight', english: 'direct flight', french: 'vol direct', example: 'It is a direct flight from New York to Paris.', categoryId: 'travel' },
  { id: 'overbooked', english: 'overbooked', french: 'surréservé', example: 'The flight was overbooked, so they asked for volunteers.', categoryId: 'travel' },
  { id: 'duty_free', english: 'duty-free shop', french: 'boutique hors taxes', example: 'I bought some perfume at the duty-free shop.', categoryId: 'travel' },
  { id: 'currency', english: 'currency', french: 'monnaie / devise', example: 'What is the local currency here?', categoryId: 'travel' },
`;

const additionalBusiness = `
  { id: 'agenda', english: 'agenda', french: 'ordre du jour', example: 'The first item on the agenda is the budget.', categoryId: 'business' },
  { id: 'brainstorming', english: 'brainstorming', french: 'remue-méninges', example: 'We had a productive brainstorming session.', categoryId: 'business' },
  { id: 'competitor', english: 'competitor', french: 'concurrent', example: 'Our main competitor just launched a new product.', categoryId: 'business' },
  { id: 'corporate', english: 'corporate', french: 'd\\'entreprise', example: 'He works in the corporate headquarters.', categoryId: 'business' },
  { id: 'entrepreneur', english: 'entrepreneur', french: 'entrepreneur', example: 'She is a successful tech entrepreneur.', categoryId: 'business' },
  { id: 'headquarters', english: 'headquarters', french: 'siège social', example: 'The company headquarters are in London.', categoryId: 'business' },
  { id: 'human_resources', english: 'human resources', french: 'ressources humaines', example: 'Contact human resources for your benefits.', categoryId: 'business' },
  { id: 'investment', english: 'investment', french: 'investissement', example: 'Buying new software is a smart investment.', categoryId: 'business' },
  { id: 'leadership', english: 'leadership', french: 'leadership / direction', example: 'The team showed strong leadership skills.', categoryId: 'business' },
  { id: 'management', english: 'management', french: 'gestion / direction', example: 'The management decided to expand the team.', categoryId: 'business' },
  { id: 'marketing', english: 'marketing', french: 'marketing', example: 'Our marketing campaign was very successful.', categoryId: 'business' },
  { id: 'networking', english: 'networking', french: 'réseautage', example: 'Networking is important for career growth.', categoryId: 'business' },
  { id: 'partnership', english: 'partnership', french: 'partenariat', example: 'We signed a new partnership agreement.', categoryId: 'business' },
  { id: 'pitch', english: 'pitch', french: 'argumentaire', example: 'He delivered a great sales pitch to the client.', categoryId: 'business' },
  { id: 'portfolio', english: 'portfolio', french: 'portefeuille (de projets/clients)', example: 'She presented her design portfolio.', categoryId: 'business' },
  { id: 'quarter', english: 'quarter (Q1, Q2)', french: 'trimestre', example: 'Sales were up in the first quarter.', categoryId: 'business' },
  { id: 'recruitment', english: 'recruitment', french: 'recrutement', example: 'The recruitment process takes about three weeks.', categoryId: 'business' },
  { id: 'stakeholder', english: 'stakeholder', french: 'partie prenante', example: 'We need to update all the stakeholders.', categoryId: 'business' },
  { id: 'turnover', english: 'turnover / revenue', french: 'chiffre d\\'affaires', example: 'The annual turnover exceeded 1 million euros.', categoryId: 'business' },
  { id: 'wholesale', english: 'wholesale', french: 'vente en gros', example: 'We buy our materials wholesale.', categoryId: 'business' },
`;

const additionalAdjectives = `
  { id: 'brilliant', english: 'brilliant', french: 'brillant / génial', example: 'That is a brilliant idea!', categoryId: 'adjectives' },
  { id: 'crucial', english: 'crucial', french: 'crucial / essentiel', example: 'It is crucial to back up your data.', categoryId: 'adjectives' },
  { id: 'devastated', english: 'devastated', french: 'dévasté / effondré', example: 'She was devastated by the bad news.', categoryId: 'adjectives' },
  { id: 'ecstatic', english: 'ecstatic', french: 'extatique / fou de joie', example: 'He was ecstatic when he won the prize.', categoryId: 'adjectives' },
  { id: 'filthy', english: 'filthy', french: 'crasseux / très sale', example: 'Wash your hands, they are filthy.', categoryId: 'adjectives' },
  { id: 'spotless', english: 'spotless', french: 'impeccable', example: 'She kept the kitchen spotless.', categoryId: 'adjectives' },
  { id: 'freezing', english: 'freezing', french: 'glacial', example: 'Put on a coat, it is freezing outside.', categoryId: 'adjectives' },
  { id: 'boiling', english: 'boiling', french: 'bouillant', example: 'It is boiling in this room, open a window.', categoryId: 'adjectives' },
  { id: 'packed', english: 'packed', french: 'bondé', example: 'The train was packed this morning.', categoryId: 'adjectives' },
  { id: 'terrified', english: 'terrified', french: 'terrifié', example: 'I am terrified of spiders.', categoryId: 'adjectives' },
  { id: 'delighted', english: 'delighted', french: 'ravi', example: 'We are delighted to invite you.', categoryId: 'adjectives' },
  { id: 'miserable', english: 'miserable', french: 'malheureux / misérable', example: 'He felt miserable after catching a cold.', categoryId: 'adjectives' },
  { id: 'thrilled', english: 'thrilled', french: 'ravi / excité', example: 'I was thrilled to see her again.', categoryId: 'adjectives' },
  { id: 'astonishing', english: 'astonishing', french: 'étonnant', example: 'The magic trick was astonishing.', categoryId: 'adjectives' },
  { id: 'breathtaking', english: 'breathtaking', french: 'à couper le souffle', example: 'The view from the top is breathtaking.', categoryId: 'adjectives' },
  { id: 'deafening', english: 'deafening', french: 'assourdissant', example: 'The music at the concert was deafening.', categoryId: 'adjectives' },
  { id: 'mind_blowing', english: 'mind-blowing', french: 'hallucinant', example: 'The special effects were mind-blowing.', categoryId: 'adjectives' },
  { id: 'heartbreaking', english: 'heartbreaking', french: 'déchirant', example: 'It was a heartbreaking story.', categoryId: 'adjectives' },
  { id: 'outstanding', english: 'outstanding', french: 'exceptionnel', example: 'She gave an outstanding performance.', categoryId: 'adjectives' },
  { id: 'worthless', english: 'worthless', french: 'sans valeur', example: 'This old coin is completely worthless.', categoryId: 'adjectives' },
`;


let newContent = content.replace("// Travel", "// Travel" + additionalTravel);
newContent = newContent.replace("// Business", "// Business" + additionalBusiness);
newContent = newContent.replace("// Adjectives", "// Adjectives" + additionalAdjectives);

fs.writeFileSync('src/vocabData.ts', newContent);
console.log('done');
