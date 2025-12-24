
import React from 'react';
import { Icon } from './Icons';
import AnalyticsGraph from './AnalyticsGraph';

interface VIPViewProps {
  onBack: () => void;
  userLevel: number;
  // Added formatValue prop for dynamic currency rendering
  formatValue: (val: number) => string;
}

const VIPView: React.FC<VIPViewProps> = ({ onBack, userLevel, formatValue }) => {
  const levels = [
    { level: 1, name: 'Bronze', color: '#cd7f32', perk: '2% Cashback' },
    { level: 2, name: 'Silver', color: '#c0c0c0', perk: '5% Cashback' },
    { level: 3, name: 'Gold', color: '#ffd700', perk: '10% Cashback + Priority Support' },
    { level: 4, name: 'Platinum', color: '#e5e4e2', perk: '15% Cashback + Personal Manager' },
    { level: 5, name: 'Diamond', color: '#b9f2ff', perk: '20% Cashback + Luxury Gifts' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-winbuzz-blue/10">
        <button onClick={onBack} className="bg-winbuzz-blue text-white px-4 py-1.5 rounded-xl font-black text-xs uppercase italic shadow-sm hover:brightness-110">❮ Back</button>
        <h2 className="text-sm font-black uppercase italic tracking-tighter">VIP Elite Node & Analytics</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-6">
        <div className="bg-[#121b28] rounded-[2.5rem] p-10 text-center border border-winbuzz-blue/20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-winbuzz-blue/5 rounded-full blur-[100px] -mr-40 -mt-40"></div>
          <div className="relative z-10">
            <span className="bg-winbuzz-blue text-white px-5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest italic mb-6 inline-block">Active Status</span>
            <h3 className="text-5xl font-black text-white italic uppercase tracking-tighter">Level {userLevel} Operator</h3>
            <p className="text-winbuzz-accent-blue font-black uppercase tracking-[0.5em] mt-3 text-[10px] opacity-60">Exchange Priority: High</p>
            
            <div className="mt-12 max-w-xl mx-auto space-y-6">
              <div className="h-5 bg-black/40 rounded-full border border-white/10 p-1 shadow-inner overflow-hidden">
                 <div className="h-full bg-gradient-to-r from-winbuzz-blue to-winbuzz-accent-blue rounded-full shadow-[0_0_20px_rgba(0,123,255,0.6)] animate-pulse" style={{ width: '65%' }}></div>
              </div>
              <div className="flex justify-between text-[10px] font-black text-winbuzz-accent-blue/50 uppercase tracking-widest italic">
                 <span>Current Power: 6,500 XP</span>
                 <span>Next Status: Silver (10,000 XP)</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-12">
               <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <p className="text-[8px] font-black text-slate-500 uppercase italic">Cashback Rate</p>
                  <p className="text-xl font-black text-white">12.5%</p>
               </div>
               <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <p className="text-[8px] font-black text-slate-500 uppercase italic">Withdraw Speed</p>
                  <p className="text-xl font-black text-green-400">FAST</p>
               </div>
               <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <p className="text-[8px] font-black text-slate-500 uppercase italic">Daily Bonus</p>
                  <p className="text-xl font-black text-winbuzz-blue">{formatValue(300)}</p>
               </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 border border-winbuzz-blue/10 shadow-xl flex flex-col justify-between">
           <div>
              <h4 className="text-xs font-black uppercase italic tracking-widest text-winbuzz-blue mb-2">Performance Analytics</h4>
              <p className="text-[9px] font-bold text-slate-400 uppercase italic mb-6">Wager P/L Mirroring (Last 7 Days)</p>
              <AnalyticsGraph />
           </div>
           <div className="mt-8 pt-8 border-t border-slate-50 space-y-4">
              <div className="flex justify-between items-center">
                 <span className="text-[10px] font-black text-slate-800 uppercase italic">Exchange Yield:</span>
                 <span className="text-winbuzz-blue font-black">+24.5%</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-[10px] font-black text-slate-800 uppercase italic">Market Accuracy:</span>
                 <span className="text-winbuzz-blue font-black">78.2%</span>
              </div>
           </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-winbuzz-blue/10 shadow-lg">
        <h4 className="text-xs font-black uppercase italic tracking-widest text-slate-800 mb-8 text-center">Reward Tiers Matrix</h4>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {levels.map((l) => (
            <div key={l.level} className={`relative p-6 rounded-[2rem] border transition-all duration-700 group ${userLevel >= l.level ? 'bg-winbuzz-blue text-white shadow-2xl scale-105' : 'bg-slate-50 border-slate-100 opacity-40 grayscale'}`}>
               <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg border-2 border-white/20 group-hover:rotate-12 transition-transform" style={{ backgroundColor: l.color }}>
                  <Icon.Trophy className="w-6 h-6 text-slate-900" />
               </div>
               <h4 className="text-center font-black uppercase italic text-xs">{l.name}</h4>
               <p className={`text-center text-[9px] font-bold mt-2 leading-relaxed uppercase tracking-tighter ${userLevel >= l.level ? 'text-white/60' : 'text-slate-400'}`}>{l.perk}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VIPView;
