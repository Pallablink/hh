
import React, { useState } from 'react';
import { Icon } from './Icons';
import { ToastType } from './ToastContainer';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
  onNotify: (type: ToastType, title: string, message: string) => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onLoginClick, onNotify }) => {
  const [phone, setPhone] = useState('');
  
  if (!isOpen) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      onNotify('error', 'Protocol Error', 'Mobile credentials must be at least 10 digits.');
      return;
    }
    onNotify('success', 'Node Initialized', `Verification packet broadcasted to +91 ${phone}. Terminal activation pending.`);
    onLoginClick();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-winbuzz-blue/30 backdrop-blur-sm animate-in zoom-in duration-300">
      <div 
        className="bg-white w-full max-w-sm rounded-[3rem] overflow-hidden shadow-[0_0_80px_rgba(37,99,235,0.2)] relative border border-winbuzz-blue/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 text-slate-400 hover:text-winbuzz-blue transition-colors z-10 p-2 bg-slate-100 rounded-full"
        >
          <Icon.Close className="w-4 h-4" />
        </button>

        <div className="header-gradient p-12 text-center relative overflow-hidden text-white">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full blur-3xl -ml-16 -mt-16"></div>
          <span className="font-black italic text-4xl tracking-tighter drop-shadow-lg">
            WB <span className="opacity-60 text-winbuzz-accent-blue">ID</span>
          </span>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-winbuzz-accent-blue mt-2 italic">CREATE TERMINAL NODE</p>
        </div>

        <form onSubmit={handleRegister} className="p-10 space-y-6 bg-white">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Mobile Credentials</label>
            <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-inner focus-within:border-winbuzz-blue transition-colors">
               <span className="text-winbuzz-blue text-xs font-black italic">🇮🇳 +91</span>
               <input 
                  type="tel" 
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="Phone Number" 
                  className="bg-transparent w-full text-slate-900 text-sm outline-none placeholder:text-slate-300 font-black italic"
               />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Access Token</label>
            <input 
              type="password" 
              required
              placeholder="Create Strong Token" 
              className="bg-slate-50 border border-slate-200 rounded-2xl p-4 w-full text-slate-900 text-sm outline-none placeholder:text-slate-300 font-black italic shadow-inner focus:border-winbuzz-blue transition-colors"
            />
          </div>

          <div className="space-y-2">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Promo Code</label>
             <input 
                type="text" 
                placeholder="Optional: WB_BLUE" 
                className="bg-slate-50 border border-slate-200 rounded-2xl p-4 w-full text-slate-900 text-sm outline-none placeholder:text-slate-300 font-black italic shadow-inner focus:border-winbuzz-blue transition-colors"
             />
          </div>

          <p className="text-[9px] text-slate-400 text-center leading-relaxed font-black uppercase tracking-tighter opacity-70 italic">
            Verification packets will be broadcast <br/> to your terminal mobile number.
          </p>

          <button 
            type="submit"
            className="w-full bg-winbuzz-blue text-white py-5 rounded-2xl font-black uppercase text-xs shadow-xl hover:brightness-110 active:scale-95 transition-all tracking-widest italic border-b-4 border-winbuzz-dark-blue"
          >
            INITIALIZE NODE
          </button>

          <div className="relative flex items-center justify-center py-2">
             <div className="absolute inset-x-0 h-px bg-slate-100"></div>
             <span className="relative bg-white px-4 text-[9px] font-black text-slate-400 uppercase italic tracking-[0.2em]">INSTANT CONNECT</span>
          </div>

          <button 
            type="button" 
            className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-black uppercase text-[10px] flex items-center justify-center gap-3 hover:brightness-110 shadow-lg tracking-widest italic active:translate-y-0.5 transition-all border-b-4 border-green-700"
          >
            <img src="https://img.icons8.com/color/48/whatsapp.png" className="w-5 h-5 brightness-200 contrast-200" alt="whatsapp" /> 
            GET INSTANT ID
          </button>

          <p className="text-center text-[11px] font-black text-slate-500 italic">
            Already Synced? <button type="button" onClick={onLoginClick} className="text-winbuzz-blue hover:underline font-black ml-1">Log In Node</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
