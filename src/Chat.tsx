import React, { useState, useEffect, useRef } from 'react';
import { useAppStore, allVerbs } from './store';

export function Chat() {
  const { addXp, updateVerbMastery } = useAppStore();
  const [messages, setMessages] = useState<{sender: 'bot' | 'user', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [currentVerb, setCurrentVerb] = useState<any>(null);
  const [targetForm, setTargetForm] = useState<'pastSimple'|'pastParticiple'>('pastSimple');
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const startNewQuestion = () => {
    const randomVerb = allVerbs[Math.floor(Math.random() * allVerbs.length)];
    const form = Math.random() > 0.5 ? 'pastSimple' : 'pastParticiple';
    setCurrentVerb(randomVerb);
    setTargetForm(form);
    
    setMessages(prev => [
      ...prev, 
      { sender: 'bot', text: `What is the ${form === 'pastSimple' ? 'past simple' : 'past participle'} of "${randomVerb.base}" (${randomVerb.translation})?` }
    ]);
  };

  useEffect(() => {
    // Initial load
    setMessages([{ sender: 'bot', text: 'Hi! Let\'s practice some verbs together. 🚀' }]);
    setTimeout(() => {
      startNewQuestion();
    }, 1000);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !currentVerb) return;
    
    const userText = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    
    const expectedStr = targetForm === 'pastSimple' ? currentVerb.pastSimple : currentVerb.pastParticiple;
    const acceptedAnswers = expectedStr.split(',').map((s: string) => s.trim().toLowerCase());
    
    setTimeout(() => {
      if (acceptedAnswers.includes(userText.toLowerCase())) {
        updateVerbMastery(currentVerb.base, 'mastered');
        addXp(5);
        setMessages(prev => [...prev, { sender: 'bot', text: `Spot on! "${expectedStr}" is correct. (+5 XP)` }]);
        setTimeout(() => startNewQuestion(), 1000);
      } else {
        updateVerbMastery(currentVerb.base, 'learning');
        setMessages(prev => [...prev, { sender: 'bot', text: `Not quite! The correct answer was "${expectedStr}". Let's try another one.` }]);
        setTimeout(() => startNewQuestion(), 1500);
      }
    }, 600);
  };

  return (
    <main className="flex-grow w-full max-w-2xl mx-auto flex flex-col h-[calc(100vh-140px)] relative">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-margin-mobile flex flex-col gap-4 pb-[100px] scroll-smooth">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-4 font-body-md shadow-sm ${
              m.sender === 'user' 
                ? 'bg-primary text-on-primary rounded-br-sm' 
                : 'bg-surface-container-high text-on-surface rounded-bl-sm border border-surface-variant'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSend} className="absolute bottom-[80px] md:bottom-0 left-0 w-full bg-surface/90 backdrop-blur-sm border-t border-surface-variant p-4 flex gap-2 max-w-2xl mx-auto">
        <input 
          type="text" 
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your answer..."
          className="flex-1 h-12 rounded-xl bg-surface-container-lowest border-2 border-outline-variant px-4 focus:border-primary focus:ring-0 outline-none"
          autoFocus
          autoComplete="off"
        />
        <button type="submit" disabled={!currentVerb} className="h-12 px-6 bg-primary text-on-primary font-label-bold rounded-xl btn-physical border-on-primary-fixed-variant disabled:opacity-50">
          Send
        </button>
      </form>
    </main>
  );
}
