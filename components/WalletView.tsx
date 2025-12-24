
import React from 'react';
import { User } from '../types';
import AnalyticsGraph from './AnalyticsGraph';

interface WalletViewProps {
  user: User;
  onBack: () => void;
  // Added formatValue prop for dynamic currency rendering
  formatValue: (val: number) => string;
}

const WalletView: React.FC<WalletViewProps> = ({ user, onBack, formatValue }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-winbuzz-blue/10">
        <button onClick={onBack} className="bg-winbuzz-blue text-white px-4 py-1.5 rounded-xl font-black text-xs uppercase italic shadow-sm hover:brightness-110">❮ Back</button>
        <h2 className="text-sm font-black uppercase italic tracking-tighter">Financial Mirror Terminal</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-6">
         <div className="bg-white rounded-[2.5rem] p-10 border border-winbuzz-blue/10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#f0f7ff] rounded-full blur-[80px] -mr-32 -mt-32"></div>
            <div className="relative z-10 space-y-10">
               <div className="text-center">
                  <span className="text-[10px] font-black text-winbuzz-blue uppercase tracking-[0.4em] italic mb-4 block">Current Liquidity Pool</span>
                  <h3 className="text-6xl font-black italic uppercase text-slate-900 tracking-tighter">{formatValue(user.balance)}</h3>
                  <div className="flex justify-center gap-3 mt-6">
                     <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-xl text-[9px] font-black uppercase shadow-sm">MIRROR SYNCED</span>
                     <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-xl text-[9px] font-black uppercase shadow-sm">TLS 1.3 SECURE</span>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#fcfdfe] p-6 rounded-3xl border border-slate-100 shadow-sm">
                     <p className="text-[9px] font-black text-slate-400 uppercase italic mb-1">Exposure Node</p>
                     <p className="text-xl font-black text-red-600">{formatValue(user.exposure)}</p>
                  </div>
                  <div className="bg-[#fcfdfe] p-6 rounded-3xl border border-slate-100 shadow-sm">
                     <p className="text-[9px] font-black text-slate-400 uppercase italic mb-1">Pending Credits</p>
                     <p className="text-xl font-black text-winbuzz-blue">{formatValue(0)}</p>
                  </div>
               </div>

               <div className="bg-slate-900 p-8 rounded-[2rem] text-white flex justify-between items-center shadow-2xl">
                  <div className="space-y-1">
                     <p className="text-[9px] font-black text-winbuzz-accent-blue/40 uppercase tracking-widest italic">Bonus Wallet</p>
                     <p className="text-2xl font-black italic">{formatValue(2450.00)}</p>
                  </div>
                  <button className="bg-winbuzz-blue text-white px-8 py-2.5 rounded-2xl text-[9px] font-black uppercase hover:brightness-110 transition-all italic tracking-widest">TRANSFER</button>
               </div>
            </div>
         </div>

         <div className="flex flex-col gap-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-winbuzz-blue/10 shadow-lg flex-1">
               <h4 className="text-[10px] font-black uppercase italic tracking-widest text-winbuzz-blue mb-4">Deposit Velocity</h4>
               <AnalyticsGraph />
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] border border-winbuzz-blue/10 shadow-lg">
               <h4 className="text-[10px] font-black uppercase italic tracking-widest text-slate-800 mb-6">Recent Node Traffic</h4>
               <div className="space-y-4">
                  {[
                     { date: '12 Dec', type: 'Deposit', amt: 5000, status: 'MATCHED' },
                     { date: '11 Dec', type: 'Wager', amt: -2100, status: 'SETTLED' },
                     { date: '10 Dec', type: 'Promo', amt: 300, status: 'APPLIED' }
                  ].map((t, i) => (
                     <div key={i} className="flex justify-between items-center border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                        <div className="flex flex-col">
                           <span className="text-[10px] font-black uppercase text-slate-800 italic">{t.type}</span>
                           <span className="text-[8px] font-bold text-slate-300">{t.date}</span>
                        </div>
                        <div className="text-right">
                           <span className={`text-[10px] font-black ${t.amt > 0 ? 'text-green-600' : 'text-slate-800'}`}>
                             {t.amt > 0 ? '+' : ''}{formatValue(t.amt)}
                           </span>
                           <p className="text-[7px] font-black text-slate-400 uppercase tracking-tighter">{t.status}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default WalletView;
