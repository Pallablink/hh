
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Icon } from './Icons';
import { ToastType } from './ToastContainer';

interface BuzBotProps {
  onNotify: (type: ToastType, title: string, message: string) => void;
}

const BuzBot: React.FC<BuzBotProps> = ({ onNotify }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Hello Operator! I am BuzBot, your AI Exchange Assistant. How can I help you navigate the terminal today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: "You are 'BuzBot', the helpful AI assistant for WinBuzz Elite Exchange. WinBuzz is a premium betting exchange. You help users with: how to bet (back/lay), deposit methods, withdrawal times (IMPS fast), and general site features. Be professional, concise, and use sports-trader lingo (terminal, node, liquidity). Do not give financial advice or predict match winners.",
        }
      });

      const botText = response.text || "My terminal connection is currently fluctuating. Please try again or connect to a live support node.";
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      onNotify('error', 'AI Node Latency', 'Terminal failed to sync with AI node. Re-routing to local cache.');
      setMessages(prev => [...prev, { role: 'bot', text: "Connectivity error detected. Please try your request again in a few seconds." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-[300]">
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-winbuzz-blue rounded-full shadow-[0_0_40px_rgba(37,99,235,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all group relative border-4 border-white"
      >
        {isOpen ? <Icon.Close className="w-6 h-6 text-white" /> : <span className="text-2xl animate-bounce">🤖</span>}
        {!isOpen && <span className="absolute -top-1 -right-1 bg-red-600 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-black text-white shadow-lg">1</span>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[380px] h-[550px] bg-white rounded-[3rem] shadow-2xl border border-winbuzz-blue/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-400">
           <div className="header-gradient p-8 text-white flex items-center gap-5">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl shadow-xl border border-white/30 backdrop-blur-md">🤖</div>
              <div className="flex-1">
                 <h4 className="text-[14px] font-black uppercase italic tracking-tighter">BuzBot Assistant</h4>
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_#4ade80]"></span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-winbuzz-accent-blue opacity-70">AI NODE ONLINE</span>
                 </div>
              </div>
           </div>

           <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-slate-50/30">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[85%] p-5 rounded-[2rem] text-[11px] font-bold leading-relaxed shadow-sm border ${m.role === 'user' ? 'bg-winbuzz-blue text-white border-winbuzz-blue/10 rounded-br-none' : 'bg-white text-slate-800 border-slate-100 rounded-bl-none italic'}`}>
                      {m.text}
                   </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                   <div className="bg-white border border-slate-100 p-5 rounded-[2rem] rounded-bl-none shadow-sm flex gap-1.5 items-center">
                      <div className="w-1.5 h-1.5 bg-winbuzz-blue rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-winbuzz-blue rounded-full animate-bounce delay-100"></div>
                      <div className="w-1.5 h-1.5 bg-winbuzz-blue rounded-full animate-bounce delay-200"></div>
                   </div>
                </div>
              )}
              <div ref={chatEndRef} />
           </div>

           <form onSubmit={handleSend} className="p-6 border-t border-slate-100 bg-white flex gap-3">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about betting nodes..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-[11px] font-black italic focus:ring-2 focus:ring-winbuzz-blue/20 focus:border-winbuzz-blue focus:outline-none placeholder:text-slate-300 shadow-inner"
              />
              <button 
                type="submit" 
                disabled={isTyping}
                className="bg-winbuzz-blue text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-30 border-b-4 border-winbuzz-dark-blue"
              >
                <span className="text-lg">❯</span>
              </button>
           </form>
        </div>
      )}
    </div>
  );
};

export default BuzBot;
