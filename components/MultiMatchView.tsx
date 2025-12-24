
import React, { useState } from 'react';
import { MOCK_MATCHES } from '../constants';
import { Match, Bet } from '../types';

interface MultiMatchViewProps {
  onBack: () => void;
  onOddsClick: (bet: Omit<Bet, 'id' | 'status' | 'date'>) => void;
  // Added formatValue prop for consistency with other views
  formatValue: (val: number) => string;
}

const MultiMatchView: React.FC<MultiMatchViewProps> = ({ onBack, onOddsClick }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(MOCK_MATCHES.slice(0, 4).map(m => m.id));

  const toggleMatch = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else if (selectedIds.length < 4) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const activeMatches = MOCK_MATCHES.filter(m => selectedIds.includes(m.id));

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between bg-white p-3 rounded-2xl shadow-sm border border-winbuzz-blue/10">
        <div className="flex items-center gap-4">
           <button onClick={onBack} className="bg-winbuzz-blue text-white px-4 py-1.5 rounded-xl font-black text-xs uppercase italic shadow-sm hover:brightness-110">❮ Back</button>
           <h2 className="text-sm font-black uppercase italic tracking-tighter">Multi-Market Terminal</h2>
        </div>
        <div className="flex gap-2">
           {MOCK_MATCHES.slice(0, 6).map(m => (
             <button 
               key={m.id}
               onClick={() => toggleMatch(m.id)}
               className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black border transition-all ${selectedIds.includes(m.id) ? 'bg-winbuzz-blue text-white border-winbuzz-blue' : 'bg-white text-slate-400 border-slate-200'}`}
             >
               {m.sport[0]}
             </button>
           ))}
        </div>
      </div>

      <div className={`grid gap-3 ${selectedIds.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
         {activeMatches.map(match => (
            <div key={match.id} className="bg-white rounded-2xl border border-winbuzz-blue/10 shadow-lg overflow-hidden flex flex-col h-[300px]">
               <div className="bg-[#121b28] p-3 flex justify-between items-center text-white">
                  <div className="flex flex-col">
                     <span className="text-[8px] font-black uppercase tracking-widest text-winbuzz-accent-blue/60">{match.league}</span>
                     <span className="text-[10px] font-black uppercase italic tracking-tighter truncate max-w-[150px]">{match.title}</span>
                  </div>
                  <div className="bg-red-500 text-[8px] font-black px-2 py-0.5 rounded-full animate-pulse">LIVE</div>
               </div>
               
               <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-[#fcfdfe] no-scrollbar">
                  <div className="grid grid-cols-2 gap-2 text-[8px] font-black text-slate-400 uppercase italic tracking-widest border-b border-slate-100 pb-1">
                     <span>Selection</span>
                     <div className="flex justify-around">
                        <span>Back</span>
                        <span>Lay</span>
                     </div>
                  </div>
                  {match.runners.map(runner => (
                     <div key={runner.id} className="flex items-center justify-between group">
                        <span className="text-[10px] font-black text-slate-700 uppercase italic truncate max-w-[100px]">{runner.name}</span>
                        <div className="flex gap-1.5">
                           <button onClick={() => onOddsClick({ matchId: match.id, matchTitle: match.title, runnerName: runner.name, type: 'Back', odds: runner.back[0].price, stake: 100, potentialProfit: 100 * (runner.back[0].price - 1) })} className="w-12 h-9 bg-back-blue rounded-lg font-black text-xs flex flex-col items-center justify-center shadow-sm hover:scale-105 transition-all">
                              {runner.back[0].price}
                           </button>
                           <button onClick={() => onOddsClick({ matchId: match.id, matchTitle: match.title, runnerName: runner.name, type: 'Lay', odds: runner.lay[0].price, stake: 100, potentialProfit: 100 })} className="w-12 h-9 bg-lay-pink rounded-lg font-black text-xs flex flex-col items-center justify-center shadow-sm hover:scale-105 transition-all">
                              {runner.lay[0].price}
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
               <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                  <button className="text-[9px] font-black text-winbuzz-blue uppercase italic hover:underline">Full Market View ❯</button>
               </div>
            </div>
         ))}
      </div>
      
      {selectedIds.length === 0 && (
         <div className="bg-white p-20 rounded-[3rem] border border-winbuzz-blue/5 text-center flex flex-col items-center gap-4 opacity-40">
            <span className="text-4xl">📺</span>
            <p className="text-xs font-black uppercase italic tracking-widest">Select up to 4 markets to sync terminal</p>
         </div>
      )}
    </div>
  );
};

export default MultiMatchView;
