
import React from 'react';
import { ToastType } from './ToastContainer';

interface ChangePasswordProps {
  onBack: () => void;
  onNotify: (type: ToastType, title: string, message: string) => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ onBack, onNotify }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNotify('success', 'Security Protocol Updated', 'Your access credentials have been re-encrypted successfully.');
    onBack();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 bg-white p-3 rounded shadow-sm border border-slate-200">
        <button onClick={onBack} className="bg-winbuzz-gold text-slate-900 px-4 py-1.5 rounded font-black text-xs uppercase italic shadow-sm">Back</button>
        <h2 className="text-lg font-black uppercase italic tracking-tighter">Security Settings</h2>
      </div>

      <div className="bg-slate-950 p-12 rounded-[2.5rem] shadow-2xl border border-winbuzz-gold/20 max-w-md mx-auto text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-b from-winbuzz-gold/5 to-transparent"></div>
         <div className="relative z-10">
            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center text-3xl mx-auto mb-8 border border-winbuzz-gold shadow-[0_0_20px_rgba(212,167,66,0.2)]">
               <span className="text-winbuzz-gold">🔒</span>
            </div>
            <h3 className="text-xl font-black uppercase italic mb-8 text-white tracking-widest">Re-Encrypt Credentials</h3>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
               <input type="password" placeholder="Current Token" required className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs font-black text-white focus:ring-2 focus:ring-winbuzz-gold outline-none" />
               <input type="password" placeholder="New Secret String" required className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs font-black text-white focus:ring-2 focus:ring-winbuzz-gold outline-none" />
               <input type="password" placeholder="Confirm Secret" required className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs font-black text-white focus:ring-2 focus:ring-winbuzz-gold outline-none" />
               
               <button type="submit" className="w-full bg-winbuzz-gold text-slate-900 py-5 rounded-[2rem] shadow-2xl font-black uppercase tracking-widest mt-6 hover:brightness-110 transition-all border-b-4 border-yellow-600 active:translate-y-1">
                 Apply Encryption
               </button>
            </form>
         </div>
      </div>
    </div>
  );
};

export default ChangePassword;
