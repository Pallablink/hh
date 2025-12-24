
import React from 'react';
import { Match, Bet, CurrencyCode } from '../types';
import { Icon } from './Icons';

interface MatchListProps {
  matches: Match[];
  onSelectMatch: (m: Match) => void;
  onOddsClick: (bet: Omit<Bet, 'id' | 'status' | 'date'>) => void;
  currency: CurrencyCode;
  formatValue: (val: number) => string;
}

const MatchList: React.FC<MatchListProps> = ({ matches, onSelectMatch, onOddsClick, formatValue }) => {
  return (
    <div className="bg-white border border-winbuzz-blue/10 rounded-2xl shadow-lg overflow-hidden animate-in fade-in duration-700">
      {/* Dynamic Header with Scanline */}
      <div className="bg-winbuzz-blue h-[48px] flex items-center px-6 gap-3 relative overflow-hidden">
         <div className="scanline animate-scan"></div>
         <div className="bg-white text-winbuzz-blue rounded-full p-1.5 shadow-inner z-10 animate-pulse">
           <Icon.Play className="w-3.5 h-3.5" />
         </div>
         <span className="text-white font-black text-[13px] uppercase tracking-widest italic z-10 drop-shadow-sm">LIVE EXCHANGE TERMINAL</span>
         <div className="flex-1 ml-4 overflow-hidden h-4 hidden md:block">
            <div className="whitespace-nowrap animate-mini-marquee text-[9px] font-black text-white/50 uppercase italic tracking-widest">
               Syncing Global Odds Nodes ... Liquidity injection successful ... Market latency: 12ms ... Network Protocol: WB-X-0.9 ...
            </div>
         </div>
      </div>

      <div className="bg-winbuzz-accent-blue/50 py-3 px-5 flex items-center justify-between border-b border-winbuzz-blue/10">
        <div className="flex items-center gap-3">
           <div className="animate-bounce">
             <Icon.Cricket className="w-4 h-4 text-winbuzz-blue" />
           </div>
           <span className="text-[11px] font-black uppercase text-winbuzz-dark-blue tracking-tighter italic">Featured Marketplace</span>
        </div>
        <div className="flex gap-2">
           {['LIVE', 'VIRTUAL', 'PLATINUM'].map(tag => (
             <button 
               key={tag} 
               className="bg-white px-3 py-1.5 rounded-full text-[9px] font-black border border-winbuzz-blue/20 uppercase text-slate-600 hover:text-winbuzz-blue hover:scale-105 hover:border-winbuzz-blue transition-all shadow-sm"
             >
               +{tag}
             </button>
           ))}
        </div>
      </div>

      {/* Grid Headers */}
      <div className="grid grid-cols-[1fr,300px] bg-slate-50 text-slate-500 text-[9px] font-black uppercase border-b border-slate-200">
         <div className="p-3 px-6 italic">Active Market Node</div>
         <div className="grid grid-cols-3">
            <div className="p-3 text-center border-r border-slate-200 text-winbuzz-blue">1 (Back)</div>
            <div className="p-3 text-center border-r border-slate-200">X (Draw)</div>
            <div className="p-3 text-center text-winbuzz-blue">2 (Back)</div>
         </div>
      </div>

      <div className="divide-y divide-slate-100">
        {matches.map((match, index) => (
          <div 
            key={match.id} 
            className="grid grid-cols-[1fr,300px] items-center compact-row group border-b border-slate-100 last:border-0 staggered-row"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            {/* Summary */}
            <div className="flex p-2 px-6 gap-6 cursor-pointer items-center h-full" onClick={() => onSelectMatch(match)}>
               <div className="min-w-[140px] flex flex-col border-r border-slate-200 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-red-600 block italic">{match.startTime}</span>
                    {match.status === 'Live' && (
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping"></span>
                    )}
                  </div>
                  <span className="text-[12px] font-black text-slate-900 uppercase block leading-tight truncate tracking-tighter italic group-hover:text-winbuzz-blue transition-colors">
                    {match.title}
                  </span>
               </div>
               <div className="flex-1 flex items-center gap-5">
                  {match.hasTv && <Icon.TV className="w-4 h-4 text-slate-400 group-hover:text-winbuzz-blue transition-all group-hover:scale-125" />}
                  <div className="flex gap-1.5">
                      {match.hasFancy && <span className="bg-blue-50 text-winbuzz-blue text-[8px] font-black px-2 py-0.5 border border-winbuzz-blue/30 rounded-md shadow-sm">FANCY</span>}
                      {match.hasBookmaker && <span className="bg-purple-50 text-purple-600 text-[8px] font-black px-2 py-0.5 border border-purple-200 rounded-md shadow-sm">BM</span>}
                  </div>
               </div>
            </div>

            {/* Odds Table */}
            <div className="grid grid-cols-3 h-full items-center border-l border-slate-100 bg-[#f8fafc]">
               {/* Selection 1 */}
               <div className="flex items-center justify-center gap-px">
                  <button onClick={() => onOddsClick({matchId: match.id, matchTitle: match.title, runnerName: match.runners[0].name, type: 'Back', odds: match.runners[0].back[0].price, stake: 100, potentialProfit: 100 * (match.runners[0].back[0].price-1)})} className="bg-back-blue odds-box">
                     <span className="leading-none text-slate-900 font-black">{match.runners[0].back[0].price}</span>
                     <span className="text-[8px] text-slate-600 font-bold leading-none mt-1">{match.runners[0].back[0].size}</span>
                  </button>
                  <button onClick={() => onOddsClick({matchId: match.id, matchTitle: match.title, runnerName: match.runners[0].name, type: 'Lay', odds: match.runners[0].lay[0].price, stake: 100, potentialProfit: 100})} className="bg-lay-pink odds-box">
                     <span className="leading-none text-slate-900 font-black">{match.runners[0].lay[0].price}</span>
                     <span className="text-[8px] text-slate-600 font-bold leading-none mt-1">{match.runners[0].lay[0].size}</span>
                  </button>
               </div>
               {/* Selection X */}
               <div className="flex items-center justify-center opacity-20 grayscale cursor-not-allowed">
                  <div className="bg-back-blue odds-box">-</div>
                  <div className="bg-lay-pink odds-box">-</div>
               </div>
               {/* Selection 2 */}
               <div className="flex items-center justify-center gap-px">
                  <button onClick={() => onOddsClick({matchId: match.id, matchTitle: match.title, runnerName: match.runners[1].name, type: 'Back', odds: match.runners[1].back[0].price, stake: 100, potentialProfit: 100 * (match.runners[1].back[0].price-1)})} className="bg-back-blue odds-box">
                     <span className="leading-none text-slate-900 font-black">{match.runners[1].back[0].price}</span>
                     <span className="text-[8px] text-slate-600 font-bold leading-none mt-1">{match.runners[1].back[0].size}</span>
                  </button>
                  <button onClick={() => onOddsClick({matchId: match.id, matchTitle: match.title, runnerName: match.runners[1].name, type: 'Lay', odds: match.runners[1].lay[0].price, stake: 100, potentialProfit: 100})} className="bg-lay-pink odds-box">
                     <span className="leading-none text-slate-900 font-black">{match.runners[1].lay[0].price}</span>
                     <span className="text-[8px] text-slate-600 font-bold leading-none mt-1">{match.runners[1].lay[0].size}</span>
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-slate-50 p-4 text-center border-t border-slate-200">
        <button 
          onClick={() => window.location.reload()} 
          className="text-[11px] font-black text-winbuzz-blue uppercase hover:underline hover:scale-105 transition-all italic tracking-widest bg-white border border-winbuzz-blue/20 px-8 py-2 rounded-full shadow-sm"
        >
          Resync Marketplace Data Node
        </button>
      </div>
    </div>
  );
};

export default MatchList;
