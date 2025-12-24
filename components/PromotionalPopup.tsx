
import React from 'react';
import { Icon } from './Icons';

interface PromotionalPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: () => void;
}

const PromotionalPopup: React.FC<PromotionalPopupProps> = ({ isOpen, onClose, onAction }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="relative bg-slate-900 w-full max-w-lg rounded-[2.5rem] overflow-hidden border border-winbuzz-gold/30 shadow-[0_0_100px_rgba(212,167,66,0.2)]">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-winbuzz-gold hover:text-slate-900 transition-all shadow-xl"
        >
          <Icon.Close className="w-5 h-5" />
        </button>

        <div className="relative aspect-video">
           <img 
            src="https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?auto=format&fit=crop&q=80&w=800" 
            className="w-full h-full object-cover brightness-75 scale-110 animate-pulse" 
            alt="Promotion" 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
           <div className="absolute top-10 left-10">
              <span className="bg-winbuzz-gold text-slate-900 px-4 py-1 rounded-full text-[10px] font-black uppercase shadow-2xl">Daily Jackpot</span>
           </div>
        </div>

        <div className="p-10 text-center space-y-6">
           <h2 className="text-3xl md:text-4xl font-black italic uppercase text-white leading-tight tracking-tighter">
             MEGA WIN <br/> <span className="text-winbuzz-gold">₹50,00,000</span>
           </h2>
           <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
             Try your luck on our new live casino <br/> tables and win massive daily drops!
           </p>
           
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800 p-4 rounded-3xl border border-slate-700">
                 <p className="text-xs font-black text-slate-500 uppercase">Cashback</p>
                 <p className="text-xl font-black text-winbuzz-gold">20%</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-3xl border border-slate-700">
                 <p className="text-xs font-black text-slate-500 uppercase">Wagering</p>
                 <p className="text-xl font-black text-winbuzz-gold">1x</p>
              </div>
           </div>

           <button 
            onClick={onAction}
            className="w-full bg-winbuzz-gold text-slate-900 py-5 rounded-[2rem] font-black uppercase text-sm shadow-[0_0_40px_rgba(212,167,66,0.4)] hover:scale-[1.02] transition-all border-b-4 border-yellow-600 active:translate-y-1"
           >
             Join The Lobby Now
           </button>
           
           <button 
            onClick={onClose}
            className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] hover:text-slate-400 transition-colors"
           >
             Maybe Later
           </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionalPopup;
