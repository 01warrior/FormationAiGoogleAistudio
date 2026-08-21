import React, { useState } from 'react';

export function Chat() {
  const [messages, setMessages] = useState<{sender: 'bot' | 'user', text: string}[]>([
    { sender: 'bot', text: 'Hi! Let\'s practice. Complete this sentence: Yesterday, I ___ (go) to the park.' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    
    setTimeout(() => {
      if (input.toLowerCase().includes('went')) {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Perfect! "went" is the correct past simple of "go". Now try this: I have never ___ (see) that movie.' }]);
      } else {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Not quite! The past simple of "go" is "went". Try again: Yesterday, I ___ to the park.' }]);
      }
    }, 1000);
    
    setInput('');
  };

  return (
    <main className="flex-grow w-full max-w-2xl mx-auto flex flex-col h-[calc(100vh-140px)]">
      <div className="flex-1 overflow-y-auto p-margin-mobile flex flex-col gap-4 pb-[80px]">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-4 font-body-md ${
              m.sender === 'user' 
                ? 'bg-primary text-on-primary rounded-br-sm' 
                : 'bg-surface-container-high text-on-surface rounded-bl-sm border border-surface-variant'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSend} className="fixed bottom-[80px] md:bottom-0 left-0 w-full bg-surface border-t border-surface-variant p-4 flex gap-2 max-w-2xl mx-auto md:relative">
        <input 
          type="text" 
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your answer..."
          className="flex-1 h-12 rounded-xl bg-surface-container-low border border-outline-variant px-4 focus:border-primary focus:ring-0 outline-none"
        />
        <button type="submit" className="h-12 px-6 bg-primary text-on-primary font-label-bold rounded-xl btn-physical border-on-primary-fixed-variant">
          Send
        </button>
      </form>
    </main>
  );
}
