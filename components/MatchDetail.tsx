
import React, { useState } from 'react';
import { Match, Bet, ViewState, CurrencyCode } from '../types';
import LiveChat from './LiveChat';
import { Icon } from './Icons';

interface MatchDetailProps {
  match: Match;
  onClose: () => void;
  onPlaceBet: (bet: Omit<Bet, 'id' | 'status' | 'date'>) => void;
  onNavigate: (view: ViewState) => void;
  currency: CurrencyCode;
  formatValue: (val: number) => string;
}

const MatchDetail: React.FC<MatchDetailProps> = ({ match, onClose, onPlaceBet, onNavigate, formatValue }) => {
  const [activeTab, setActiveTab] = useState('MAIN MARKET');
  const [betAmount, setBetAmount] = useState(100);

  const renderMarket = () => {
    switch (activeTab) {
      case 'SESSION WAGERS':
      case 'FANCY PROPS':
        return (
          <div className="bg-white rounded-2xl border border-winbuzz-blue/10 shadow-md overflow-hidden">
             <div className="bg-slate-800 px-6 py-4 flex items-center justify-between">
                <span className="text-white font-black text-[12px] uppercase italic tracking-tighter">Fancy Markets (Live Odds)</span>
                <div className="flex gap-16 text-[10px] font-black text-slate-400 mr-24 uppercase italic tracking-widest">
                  <span className="text-blue-400">Yes (Back)</span>
                  <span className="text-red-400">No (Lay)</span>
                </div>
             </div>
             <div className="divide-y divide-slate-100">
                {(match.fancyMarkets || []).map(m => (
                  <div key={m.id} className="grid grid-cols-[1fr,280px] items-center p-4 hover:bg-slate-50 transition-all group">
                     <span className="text-[12px] font-black text-slate-800 uppercase italic tracking-tighter">{m.name}</span>
                     <div className="grid grid-cols-2 gap-3">
                        <button 
                          onClick={() => onPlaceBet({ matchId: match.id, matchTitle: match.title, runnerName: `${m.name} (YES)`, type: 'Back', odds: m.yes.price, stake: betAmount, potentialProfit: betAmount * (m.yes.price - 1) })}
                          className="bg-back-blue odds-box shadow-sm border-white/50"
                        >
                          <span className="text-slate-900 font-black">{m.yes.price}</span>
                          <span className="text-[8px] text-slate-600">{m.yes.size}</span>
                        </button>
                        <button 
                          onClick={() => onPlaceBet({ matchId: match.id, matchTitle: match.title, runnerName: `${m.name} (NO)`, type: 'Lay', odds: m.no.price, stake: betAmount, potentialProfit: betAmount })}
                          className="bg-lay-pink odds-box shadow-sm border-white/50"
                        >
                          <span className="text-slate-900 font-black">{m.no.price}</span>
                          <span className="text-[8px] text-slate-600">{m.no.size}</span>
                        </button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        );
      case 'BOOKMAKER':
        return (
          <div className="bg-white rounded-2xl border border-winbuzz-blue/10 shadow-md overflow-hidden">
             <div className="bg-[#2563eb] px-6 py-4 flex items-center justify-between">
                <span className="text-white font-black text-[12px] uppercase italic tracking-tighter">Bookmaker Marketplace</span>
                <div className="flex gap-12 text-[10px] font-black text-white/80 mr-32 uppercase italic tracking-widest">
                  <span>Back</span>
                  <span>Lay</span>
                </div>
             </div>
             <div className="divide-y divide-slate-100">
                {match.runners.map(runner => (
                  <div key={runner.id} className="grid grid-cols-[1fr,280px] items-center p-4 hover:bg-slate-50 transition-all group">
                     <span className="text-[13px] font-black text-slate-900 uppercase italic tracking-tighter">{runner.name}</span>
                     <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => onPlaceBet({ matchId: match.id, matchTitle: match.title, runnerName: runner.name, type: 'Back', odds: runner.back[0].price, stake: betAmount, potentialProfit: betAmount * (runner.back[0].price - 1) })} className="bg-back-blue odds-box border-slate-300 font-black">{runner.back[0].price}</button>
                        <button onClick={() => onPlaceBet({ matchId: match.id, matchTitle: match.title, runnerName: runner.name, type: 'Lay', odds: runner.lay[0].price, stake: betAmount, potentialProfit: betAmount })} className="bg-lay-pink odds-box border-slate-300 font-black">{runner.lay[0].price}</button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-2xl border border-winbuzz-blue/10 shadow-md overflow-hidden">
            <div className="bg-winbuzz-accent-blue/30 px-6 py-4 flex items-center justify-between border-b border-winbuzz-blue/10">
               <span className="text-winbuzz-dark-blue font-black text-[12px] uppercase italic tracking-tighter">Exchange Market Depth (Level 2)</span>
               <div className="flex gap-12 text-[10px] font-black text-slate-500 mr-32 uppercase italic tracking-widest">
                 <span className="text-blue-700">Back</span>
                 <span className="text-red-700">Lay</span>
               </div>
            </div>
            <div className="divide-y divide-slate-100">
              {match.runners.map(runner => (
                <div key={runner.id} className="grid grid-cols-[1fr,280px] items-center p-4 hover:bg-slate-50 transition-all group">
                   <div className="flex flex-col">
                     <span className="text-[14px] font-black text-slate-900 uppercase italic tracking-tighter group-hover:text-winbuzz-blue transition-colors">{runner.name}</span>
                     <span className="text-[9px] font-bold text-slate-500 uppercase opacity-60">Node Sync: 100% active</span>
                   </div>
                   <div className="grid grid-cols-2 gap-3">
                      <div className="flex gap-1">
                         <button className="bg-slate-100 odds-box opacity-40 text-[9px] cursor-not-allowed border-transparent">-</button>
                         <button 
                          onClick={() => onPlaceBet({ matchId: match.id, matchTitle: match.title, runnerName: runner.name, type: 'Back', odds: runner.back[0].price, stake: betAmount, potentialProfit: betAmount * (runner.back[0].price - 1) })}
                          className="bg-back-blue odds-box shadow-sm border-white/50"
                         >
                           <span className="text-slate-900 font-black">{runner.back[0].price}</span>
                           <span className="text-[8px] text-slate-600">{runner.back[0].size}</span>
                         </button>
                      </div>
                      <div className="flex gap-1">
                         <button 
                          onClick={() => onPlaceBet({ matchId: match.id, matchTitle: match.title, runnerName: runner.name, type: 'Lay', odds: runner.lay[0].price, stake: betAmount, potentialProfit: betAmount })}
                          className="bg-lay-pink odds-box shadow-sm border-white/50"
                         >
                           <span className="text-slate-900 font-black">{runner.lay[0].price}</span>
                           <span className="text-[8px] text-slate-600">{runner.lay[0].size}</span>
                         </button>
                         <button className="bg-slate-100 odds-box opacity-40 text-[9px] cursor-not-allowed border-transparent">-</button>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-4 animate-in fade-in duration-300">
      <div className="space-y-4">
        {/* Scoreboard Terminal with Stadium Background */}
        <div className="relative h-72 rounded-[2.5rem] bg-[#001529] overflow-hidden shadow-2xl border border-winbuzz-blue/20">
           {/* Stadium Background Image */}
           <div className="absolute inset-0 opacity-50">
             <img 
               src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1200" 
               className="w-full h-full object-cover" 
               alt="Stadium Background" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#001529] via-transparent to-[#001529]/60"></div>
           </div>

           <div className="absolute inset-0 p-8 flex flex-col justify-between text-white z-10">
             <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                   <button onClick={onClose} className="bg-white/20 p-2.5 rounded-full text-white hover:bg-winbuzz-blue transition-all shadow-lg backdrop-blur-md border border-white/20">❮</button>
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase italic tracking-[0.3em] text-winbuzz-accent-blue opacity-90">{match.league}</span>
                      <span className="text-lg font-black uppercase italic tracking-tighter drop-shadow-md">{match.title}</span>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="bg-red-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.5)]">LIVE FEED</div>
                   <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
                      <Icon.TV className="w-3.5 h-3.5 text-winbuzz-blue" />
                      <span className="text-[9px] font-black uppercase tracking-widest">ULTRA HD</span>
                   </div>
                </div>
             </div>

             <div className="flex justify-around items-center">
                <div className="text-center group">
                   <h3 className="text-3xl font-black italic uppercase tracking-tighter drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 text-white">
                     {match.runners[0].name.split(' ')[0]}
                   </h3>
                   <div className="mt-4 py-3 px-8 bg-winbuzz-blue/30 rounded-3xl backdrop-blur-md border border-winbuzz-blue/40 shadow-2xl">
                      <p className="text-5xl font-black text-white italic drop-shadow-lg">142/3</p>
                      <p className="text-[11px] font-bold text-winbuzz-accent-blue uppercase tracking-widest mt-1">16.4 Overs</p>
                   </div>
                </div>
                
                <div className="flex flex-col items-center gap-3">
                   <div className="w-px h-16 bg-white/30" />
                   <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center bg-black/50 backdrop-blur-md shadow-xl">
                      <span className="text-[10px] font-black italic opacity-80">VS</span>
                   </div>
                   <div className="w-px h-16 bg-white/30" />
                </div>

                <div className="text-center group">
                   <h3 className="text-3xl font-black italic uppercase tracking-tighter opacity-50 group-hover:scale-110 transition-transform duration-500 text-white">
                     {match.runners[1].name.split(' ')[0]}
                   </h3>
                   <div className="mt-4 py-3 px-8 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-md">
                      <p className="text-4xl font-black text-white/20 italic">WAITING</p>
                      <p className="text-[11px] font-bold text-white/10 uppercase tracking-widest mt-1">INNING 2</p>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-3 bg-black/60 backdrop-blur-xl p-4 rounded-2xl text-[11px] font-black text-white/95 border border-white/10 shadow-2xl">
                <div className="flex items-center gap-3 border-r border-white/10 px-3 justify-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_12px_#22c55e]"></div> 
                  CRR: 8.52
                </div>
                <div className="flex items-center gap-3 border-r border-white/10 px-3 justify-center text-winbuzz-accent-blue">
                   PROJECTED: 178
                </div>
                <div className="flex items-center gap-3 px-3 justify-center opacity-70">
                   PARTNERSHIP: 42 (28)
                </div>
             </div>
           </div>
        </div>

        {/* Market Filter */}
        <div className="bg-white p-2 rounded-2xl border border-winbuzz-blue/10 flex overflow-x-auto no-scrollbar gap-2 shadow-md">
          {['MAIN MARKET', 'SESSION WAGERS', 'FANCY PROPS', 'BOOKMAKER'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-[11px] font-black uppercase rounded-xl transition-all whitespace-nowrap shadow-sm border ${
                activeTab === tab 
                ? 'bg-winbuzz-blue text-white border-winbuzz-blue' 
                : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-winbuzz-accent-blue hover:text-winbuzz-blue'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {renderMarket()}

        {/* Stake Control Matrix */}
        <div className="bg-white p-6 rounded-3xl border border-winbuzz-blue/10 shadow-lg">
           <div className="flex justify-between items-center mb-4">
              <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest italic">Fast-Select Stake Node</p>
              <button 
                onClick={() => onNavigate('StakeSettings')} 
                className="text-[10px] font-black text-winbuzz-blue uppercase italic underline decoration-winbuzz-blue/30 hover:text-winbuzz-dark-blue transition-colors px-3 py-1.5 bg-winbuzz-light-blue rounded-lg"
              >
                Edit Stake Buttons
              </button>
           </div>
           <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
              {[100, 500, 1000, 2000, 5000, 10000, 25000, 50000].map(val => (
                <button 
                  key={val} 
                  onClick={() => setBetAmount(val)}
                  className={`py-3 rounded-2xl text-[11px] font-black uppercase transition-all border shadow-sm ${betAmount === val ? 'bg-winbuzz-blue border-winbuzz-blue text-white shadow-xl scale-105' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-winbuzz-blue hover:bg-winbuzz-light-blue'}`}
                >
                  {formatValue(val).replace('.00', '')}
                </button>
              ))}
           </div>
        </div>

        {/* Additional Stats Section */}
        <div className="bg-white p-6 rounded-3xl border border-winbuzz-blue/10 shadow-md grid grid-cols-2 md:grid-cols-4 gap-6">
           <div className="space-y-2">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Last 5 Overs Traffic</span>
              <p className="text-sm font-black italic text-slate-900">42 Runs / 1 Wkt</p>
           </div>
           <div className="space-y-2">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">AI Win Probability</span>
              <div className="flex items-center gap-3">
                 <span className="text-sm font-black italic text-winbuzz-blue">AUS 82%</span>
                 <div className="h-2 flex-1 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-winbuzz-blue" style={{ width: '82%' }}></div>
                 </div>
              </div>
           </div>
           <div className="space-y-2">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Ground Environment</span>
              <p className="text-sm font-black italic text-slate-900">Clear • 24°C</p>
           </div>
           <div className="space-y-2">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Mirror Liquidity</span>
              <p className="text-sm font-black italic text-winbuzz-blue">{formatValue(12000000)}</p>
           </div>
        </div>
      </div>

      {/* Community Stream */}
      <div className="hidden lg:block h-full">
        <LiveChat />
      </div>
    </div>
  );
};

export default MatchDetail;
