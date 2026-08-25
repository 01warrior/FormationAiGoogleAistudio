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
}

export const vocabData: VocabWord[] = [
  // Travel
  { id: 'airport', english: 'airport', french: 'aéroport', example: 'We arrived at the airport two hours early.', categoryId: 'travel' },
  { id: 'luggage', english: 'luggage', french: 'bagages', example: 'Where can I claim my luggage?', categoryId: 'travel' },
  { id: 'flight', english: 'flight', french: 'vol', example: 'The flight is delayed due to weather.', categoryId: 'travel' },
  { id: 'passport', english: 'passport', french: 'passeport', example: 'Please show your passport at the gate.', categoryId: 'travel' },
  { id: 'ticket', english: 'ticket', french: 'billet', example: 'I bought a round-trip ticket to London.', categoryId: 'travel' },
  { id: 'accommodation', english: 'accommodation', french: 'hébergement', example: 'Have you booked your accommodation yet?', categoryId: 'travel' },
  { id: 'sightseeing', english: 'sightseeing', french: 'tourisme', example: 'We went sightseeing in Rome all day.', categoryId: 'travel' },
  { id: 'delay', english: 'delay', french: 'retard', example: 'There is a delay on the train line.', categoryId: 'travel' },
  { id: 'customs', english: 'customs', french: 'douane', example: 'We have to pass through customs.', categoryId: 'travel' },
  { id: 'passenger', english: 'passenger', french: 'passager', example: 'The passenger is waiting for their flight.', categoryId: 'travel' },
  
  // Business
  { id: 'meeting', english: 'meeting', french: 'réunion', example: 'The meeting will start at 10 AM.', categoryId: 'business' },
  { id: 'deadline', english: 'deadline', french: 'date limite', example: 'We must meet the deadline on Friday.', categoryId: 'business' },
  { id: 'schedule', english: 'schedule', french: 'emploi du temps', example: 'Let me check my schedule for next week.', categoryId: 'business' },
  { id: 'budget', english: 'budget', french: 'budget', example: 'The project budget was approved.', categoryId: 'business' },
  { id: 'feedback', english: 'feedback', french: 'retour', example: 'Thank you for your constructive feedback.', categoryId: 'business' },
  { id: 'invoice', english: 'invoice', french: 'facture', example: 'Please send the invoice to the accounting department.', categoryId: 'business' },
  { id: 'negotiate', english: 'negotiate', french: 'négocier', example: 'We need to negotiate the terms of the contract.', categoryId: 'business' },
  { id: 'presentation', english: 'presentation', french: 'présentation', example: 'She gave an excellent presentation.', categoryId: 'business' },
  { id: 'profit', english: 'profit', french: 'bénéfice', example: 'The company made a large profit this year.', categoryId: 'business' },
  { id: 'strategy', english: 'strategy', french: 'stratégie', example: 'Our marketing strategy needs an update.', categoryId: 'business' },

  // Adjectives
  { id: 'amazing', english: 'amazing', french: 'incroyable', example: 'The view from the mountain is amazing.', categoryId: 'adjectives' },
  { id: 'awful', english: 'awful', french: 'horrible', example: 'The weather was awful yesterday.', categoryId: 'adjectives' },
  { id: 'gorgeous', english: 'gorgeous', french: 'magnifique', example: 'She is wearing a gorgeous dress.', categoryId: 'adjectives' },
  { id: 'exhausted', english: 'exhausted', french: 'épuisé', example: 'I was exhausted after the long trip.', categoryId: 'adjectives' },
  { id: 'starving', english: 'starving', french: 'affamé', example: 'Let\'s eat, I am starving!', categoryId: 'adjectives' },
  { id: 'hilarious', english: 'hilarious', french: 'hilarant', example: 'That movie was hilarious.', categoryId: 'adjectives' },
  { id: 'tiny', english: 'tiny', french: 'minuscule', example: 'The kitten is so tiny.', categoryId: 'adjectives' },
  { id: 'massive', english: 'massive', french: 'massif', example: 'There is a massive tree in the garden.', categoryId: 'adjectives' },
  { id: 'furious', english: 'furious', french: 'furieux', example: 'He was furious about the mistake.', categoryId: 'adjectives' },
  { id: 'fascinating', english: 'fascinating', french: 'fascinant', example: 'The book was absolutely fascinating.', categoryId: 'adjectives' },
];
