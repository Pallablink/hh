
import React, { useState, useEffect, useRef } from 'react';

const LiveChat: React.FC = () => {
  const [messages, setMessages] = useState<{ id: number; user: string; text: string; time: string }[]>([
    { id: 1, user: 'Blue_Gamer', text: 'Australia looking solid for a 350+ score!', time: '14:45' },
    { id: 2, user: 'Terminator_WB', text: 'Lay them now, pitch is slowing down.', time: '14:46' },
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const mockUsers = ['ExchangeElite', 'MarketMaker', 'BlueChipBet', 'WB_Racer'];
  const mockMessages = [
    'Boundary! 🏏',
    'Matched @ 1.85, locking profit.',
    'Is the 16th over session open?',
    'System synced. Instant credit received!',
    'Crazy odds on the draw right now.',
    'Withdrawal pushed via IMPS, received in 5 mins! 🚀',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const newMessage = {
        id: Date.now(),
        user: mockUsers[Math.floor(Math.random() * mockUsers.length)],
        text: mockMessages[Math.floor(Math.random() * mockMessages.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev.slice(-19), newMessage]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const myMsg = {
      id: Date.now(),
      user: 'Me',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, myMsg]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-white border border-winbuzz-blue/10 rounded-2xl overflow-hidden shadow-md">
      <div className="bg-winbuzz-accent-blue p-3.5 border-b border-winbuzz-blue/10 flex items-center justify-between">
        <span className="text-[10px] font-black text-winbuzz-blue uppercase tracking-widest italic">Node Community Stream</span>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></span>
          <span className="text-[9px] text-slate-400 font-black uppercase italic">1.8k ACTIVE</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-[#fcfdfe]">
        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-black uppercase italic ${msg.user === 'Me' ? 'text-winbuzz-blue' : 'text-slate-400'}`}>
                {msg.user}
              </span>
              <span className="text-[8px] text-slate-300 font-bold">{msg.time}</span>
            </div>
            <p className={`text-[11px] p-2.5 rounded-2xl border ${msg.user === 'Me' ? 'bg-winbuzz-blue text-white border-winbuzz-blue/10' : 'bg-slate-50 text-slate-700 border-slate-100'}`}>
              {msg.text}
            </p>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-50 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Sync message..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-2 px-4 text-xs text-slate-800 focus:ring-1 focus:ring-winbuzz-blue focus:border-winbuzz-blue focus:outline-none placeholder:text-slate-300 shadow-inner italic"
        />
        <button type="submit" className="bg-winbuzz-blue text-white px-4 py-2 rounded-xl font-black text-[10px] uppercase shadow-md hover:brightness-110 active:translate-y-0.5 transition-all italic">
          PUSH
        </button>
      </form>
    </div>
  );
};

export default LiveChat;
