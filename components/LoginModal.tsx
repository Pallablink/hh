
import React, { useState } from 'react';
import { Icon } from './Icons';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string) => void;
  onForgotPassword: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin, onForgotPassword }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-winbuzz-blue/30 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="bg-white w-full max-w-sm rounded-[2rem] overflow-hidden shadow-2xl relative border border-winbuzz-blue/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-slate-400 hover:text-winbuzz-blue transition-colors z-10 p-2 bg-slate-100 rounded-full"
        >
          <Icon.Close className="w-4 h-4" />
        </button>

        <div className="header-gradient p-10 text-center text-white relative">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
           <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-5 backdrop-blur-md border border-white/30 transform rotate-6 shadow-xl">
              <span className="text-3xl font-black italic tracking-tighter">WB</span>
           </div>
           <h2 className="text-2xl font-black italic uppercase tracking-tighter drop-shadow-md">WINBUZZ EXCHANGE</h2>
           <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mt-1 italic">Secure Operator Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6 bg-white">
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Operator ID</label>
              <input 
                type="text" 
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ex: WB_OPERATOR"
                className="w-full bg-[#f0f7ff] border border-slate-200 rounded-2xl p-4 text-xs font-black text-slate-800 focus:border-winbuzz-blue focus:ring-1 focus:ring-winbuzz-blue/10 focus:outline-none transition-all placeholder:text-slate-300"
              />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Secure Token</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#f0f7ff] border border-slate-200 rounded-2xl p-4 text-xs font-black text-slate-800 focus:border-winbuzz-blue focus:ring-1 focus:ring-winbuzz-blue/10 focus:outline-none transition-all placeholder:text-slate-300"
              />
           </div>
           
           <button 
             type="submit" 
             className="w-full bg-winbuzz-blue text-white py-5 rounded-2xl font-black uppercase text-xs shadow-xl hover:brightness-110 active:scale-95 transition-all tracking-widest italic mt-4 border-b-4 border-winbuzz-dark-blue"
           >
             AUTHENTICATE
           </button>
           
           <div className="text-center">
             <button 
                type="button" 
                onClick={() => { onClose(); onForgotPassword(); }}
                className="text-[10px] font-black text-slate-400 uppercase hover:text-winbuzz-blue transition-colors underline underline-offset-8 decoration-winbuzz-blue/20 decoration-2"
              >
                TOKEN RECOVERY
              </button>
           </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
