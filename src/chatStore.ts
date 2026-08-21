import { useState } from 'react';

export function useChat() {
  const [messages, setMessages] = useState<{sender: 'bot' | 'user', text: string}[]>([
    { sender: 'bot', text: 'Hi there! Ready to practice some irregular verbs? 🚀' },
  ]);

  const addMessage = (sender: 'bot' | 'user', text: string) => {
    setMessages(prev => [...prev, { sender, text }]);
  };

  return { messages, addMessage };
}
