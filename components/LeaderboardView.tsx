
import React from 'react';
import { MOCK_LEADERBOARD } from '../constants';

interface LeaderboardViewProps {
  onBack: () => void;
  // Added formatValue prop for dynamic currency rendering
  formatValue: (val: number) => string;
}

const LeaderboardView: React.FC<LeaderboardViewProps> = ({ onBack, formatValue }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-winbuzz-blue/10">
        <button onClick={onBack} className="bg-winbuzz-blue text-white px-4 py-1.5 rounded-xl font-black text-xs uppercase italic shadow-sm hover:brightness-110">❮ Back</button>
        <h2 className="text-sm font-black uppercase italic tracking-tighter text-winbuzz-blue">Elite Profit Leaderboard</h2>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-winbuzz-blue/10 overflow-hidden">
         <div className="bg-[#121b28] p-12 text-center relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
               <div className="grid grid-cols-6 h-full gap-2">
                  {[...Array(24)].map((_, i) => <div key={i} className="border-r border-winbuzz-accent-blue/20 transform rotate-12"></div>)}
               </div>
            </div>
            <h3 className="text-4xl font-black italic uppercase text-white tracking-tighter relative z-10">THE <span className="text-winbuzz-accent-blue">CHAMPIONS</span> CIRCLE</h3>
            <p className="text-[10px] font-black text-winbuzz-accent-blue/40 uppercase tracking-[0.5em] mt-4 relative z-10">Updated Every 60 Minutes</p>
         </div>

         <div className="p-8">
            <div className="space-y-3">
               {MOCK_LEADERBOARD.map((entry, i) => (
                  <div key={entry.username} className={`flex items-center gap-5 p-5 rounded-3xl border transition-all hover:translate-x-2 cursor-pointer ${i === 0 ? 'bg-winbuzz-blue text-white border-winbuzz-blue shadow-xl' : 'bg-slate-50 border-slate-100 text-slate-800'}`}>
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner ${i === 0 ? 'bg-white text-winbuzz-blue' : 'bg-slate-200 text-slate-500'}`}>
                        {entry.rank}
                     </div>
                     <img src={entry.avatar} className="w-14 h-14 rounded-2xl bg-white/10 p-1 border border-white/20" alt="Avatar" />
                     <div className="flex-1">
                        <p className={`text-sm font-black uppercase italic tracking-tighter ${i === 0 ? 'text-white' : 'text-slate-900'}`}>{entry.username}</p>
                        <p className={`text-[9px] font-black uppercase tracking-widest ${i === 0 ? 'text-white/60' : 'text-slate-400'}`}>Node ID: {entry.username.slice(0, 4).toUpperCase()}_X</p>
                     </div>
                     <div className="text-right">
                        <p className={`text-lg font-black italic ${i === 0 ? 'text-white' : 'text-green-600'}`}>{formatValue(entry.profit)}</p>
                        <p className={`text-[8px] font-bold uppercase ${i === 0 ? 'text-white/40' : 'text-slate-300'}`}>WIN RATE: {entry.winRate}%</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default LeaderboardView;
