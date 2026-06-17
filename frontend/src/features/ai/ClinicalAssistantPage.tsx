import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const aiChatApi = axios.create({ baseURL: 'http://localhost:8085/api/v1/ai', headers: { 'Content-Type': 'application/json' } });

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export default function ClinicalAssistantPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "How can I assist you today, Dr. Chen? I can analyze patient history, generate operational forecasts, or summarize clinical trials in seconds.",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await aiChatApi.post('/chat', { message: userMessage.text });
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: response.data.response || "Sorry, I couldn't process that request.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Chat Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "Error: Unable to reach the HAPMS Clinical Intelligence Engine. Please check if the backend is running.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 60px - 48px)' }}>
      <div className="flex flex-1 min-h-0">
        {/* Sidebar History (Static for now) */}
        <div className="w-72 border-r border-outline-variant flex flex-col bg-surface-container-lowest hidden md:flex">
          <div className="p-4 border-b border-outline-variant">
            <div className="flex p-1 bg-surface-container-low rounded-lg">
              <button className="flex-1 py-2 text-body-sm font-semibold bg-white shadow-sm rounded-md text-primary">Clinical</button>
              <button className="flex-1 py-2 text-body-sm font-medium text-on-surface-variant hover:text-on-surface">Operations</button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto chat-scroll p-4 space-y-4">
            <div>
              <h3 className="text-[10px] uppercase font-bold text-outline mb-2 px-2">Recent Queries</h3>
              <div className="space-y-1">
                <button className="w-full text-left p-3 rounded-lg hover:bg-surface-container-high transition-colors group">
                  <p className="text-body-sm font-medium text-on-surface truncate">Analyze diabetic trends Q3</p>
                </button>
              </div>
            </div>
          </div>
          <button className="m-4 p-3 border border-dashed border-outline rounded-lg text-body-sm text-on-surface-variant hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">add</span> New Conversation
          </button>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col relative h-full">
          <div className="flex-1 overflow-y-auto chat-scroll p-4 md:p-8 space-y-8 relative z-10" ref={scrollRef}>
            
            {messages.map((msg, idx) => (
              <div key={msg.id}>
                {msg.sender === 'user' ? (
                  <div className="flex justify-end">
                    <div className="bg-primary text-white p-4 rounded-2xl rounded-tr-none max-w-lg shadow-md">
                      <p className="text-body-md font-medium whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-container flex-shrink-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-xl">smart_toy</span>
                    </div>
                    <div className="flex-1 space-y-4 max-w-2xl">
                      <div className="glass-card p-6 rounded-2xl rounded-tl-none shadow-sm space-y-4 bg-white/60">
                        <p className="text-body-md text-on-surface whitespace-pre-wrap">{msg.text}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-container flex-shrink-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-xl animate-pulse">smart_toy</span>
                </div>
                <div className="glass-card p-6 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 md:p-6 bg-surface-bright border-t border-outline-variant relative z-20">
            <div className="max-w-4xl mx-auto flex items-end gap-3 glass-card p-2 rounded-2xl shadow-xl shadow-primary/5 bg-white">
              <button className="p-3 text-on-surface-variant hover:text-primary transition-colors hidden md:block">
                <span className="material-symbols-outlined">attach_file</span>
              </button>
              <div className="flex-1 relative">
                <textarea 
                  className="w-full border-none bg-transparent py-3 focus:ring-0 text-body-md resize-none overflow-hidden max-h-32 outline-none" 
                  placeholder="Ask AI anything..." 
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-primary disabled:bg-surface-container-highest text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-[0.98] transition-transform active:scale-95"
                >
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
            <div className="max-w-4xl mx-auto mt-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-outline flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> AI Online
                </span>
                <span className="text-[10px] text-outline flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">verified</span> HIPAA Compliant
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
