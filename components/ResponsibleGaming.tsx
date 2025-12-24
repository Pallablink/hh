
import React, { useState } from 'react';
import { User } from '../types';
import { ToastType } from './ToastContainer';

interface ResponsibleGamingProps {
  onBack: () => void;
  user: User;
  onUpdate: (limits: { dailyDeposit: number; betLimit: number }) => void;
  // Added missing onNotify prop to match App.tsx usage
  onNotify: (type: ToastType, title: string, message: string) => void;
}

const ResponsibleGaming: React.FC<ResponsibleGamingProps> = ({ onBack, user, onUpdate, onNotify }) => {
  const [dailyDeposit, setDailyDeposit] = useState(user.limits?.dailyDeposit || 50000);
  const [betLimit, setBetLimit] = useState(user.limits?.betLimit || 5000);

  const handleSave = () => {
    onUpdate({ dailyDeposit, betLimit });
    onNotify('success', 'Security Protocol Sync', 'Financial safety limits successfully committed to terminal cache.');
    onBack();
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex items-center gap-4 bg-white p-3 rounded shadow-sm border border-slate-200">
        <button onClick={onBack} className="bg-winbuzz-blue text-white px-4 py-1.5 rounded font-black text-[10px] uppercase italic shadow-sm hover:brightness-110">❮ Back</button>
        <h2 className="text-sm font-black uppercase italic tracking-tighter">Responsible Gaming Hub</h2>
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-winbuzz-blue p-10 text-center text-white">
           <span className="text-4xl mb-4 block">⚖️</span>
           <h3 className="text-2xl font-black uppercase italic tracking-tighter">Account Safety Controls</h3>
           <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mt-2 italic">Ensure healthy wagering patterns</p>
        </div>

        <div className="p-10 space-y-8">
           <div className="space-y-4">
              <div className="flex justify-between items-center">
                 <label className="text-[11px] font-black uppercase italic tracking-tight text-slate-800">Daily Deposit Limit (₹)</label>
                 <span className="text-xs font-black text-winbuzz-blue">₹{dailyDeposit.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="500000" 
                step="5000"
                value={dailyDeposit}
                onChange={(e) => setDailyDeposit(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-winbuzz-blue"
              />
              <p className="text-[9px] text-slate-400 font-bold uppercase italic">Maximum refill volume permitted per 24 hour cycle.</p>
           </div>

           <div className="space-y-4">
              <div className="flex justify-between items-center">
                 <label className="text-[11px] font-black uppercase italic tracking-tight text-slate-800">Single Bet Limit (₹)</label>
                 <span className="text-xs font-black text-winbuzz-blue">₹{betLimit.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="100" 
                max="50000" 
                step="500"
                value={betLimit}
                onChange={(e) => setBetLimit(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-winbuzz-blue"
              />
              <p className="text-[9px] text-slate-400 font-bold uppercase italic">Maximum exposure allowed for any single exchange order.</p>
           </div>

           <div className="bg-[#f0f7ff] p-4 rounded-xl border border-winbuzz-blue/10">
              <h5 className="text-[10px] font-black uppercase text-winbuzz-blue italic mb-2">Cool-off Protocol</h5>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter leading-relaxed">
                If you feel you need a break, you can temporarily disable your terminal access for 24h, 1 week, or 1 month.
              </p>
              <button 
                onClick={() => onNotify('info', 'Self-Exclusion Node', 'Access restriction protocol initiated. Awaiting confirmation signal.')}
                className="mt-4 bg-white border border-red-200 text-red-500 w-full py-2 rounded-lg text-[9px] font-black uppercase hover:bg-red-50">Request Self-Exclusion</button>
           </div>

           <button onClick={handleSave} className="w-full bg-winbuzz-blue text-white py-4 rounded-xl font-black uppercase tracking-widest shadow-lg italic">Update Safety Protocol</button>
        </div>
      </div>
    </div>
  );
};

export default ResponsibleGaming;
