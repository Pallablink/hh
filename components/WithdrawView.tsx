
import React, { useState } from 'react';
import { Icon } from './Icons';
import { ToastType } from './ToastContainer';

interface WithdrawViewProps {
  onBack: () => void;
  // Added missing onNotify prop to match App.tsx usage
  onNotify: (type: ToastType, title: string, message: string) => void;
}

const WithdrawView: React.FC<WithdrawViewProps> = ({ onBack, onNotify }) => {
  const [amount, setAmount] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);

  // Handler for withdrawal execution
  const handleWithdrawal = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      onNotify('error', 'Protocol Error', 'Enter a valid liquidity volume for payout.');
      return;
    }
    onNotify('success', 'Payout Initialized', `Withdrawal request for ₹${Number(amount).toLocaleString()} committed to IMPS node.`);
    onBack();
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex items-center gap-4 bg-white p-3 rounded shadow-sm border border-slate-200">
        <button onClick={onBack} className="bg-winbuzz-gold text-white px-4 py-1.5 rounded font-black text-[10px] uppercase italic shadow-sm hover:brightness-110">❮ Back</button>
        <h2 className="text-xs font-black uppercase italic tracking-tighter">Fast-Payout Terminal</h2>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200 p-10 max-w-2xl mx-auto text-center space-y-8 animate-in zoom-in duration-400 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-32 h-32 bg-winbuzz-gold/5 rounded-full blur-[50px] -ml-16 -mt-16"></div>
         
         <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-winbuzz-gold mb-6 shadow-sm border border-slate-100 rotate-2 hover:rotate-0 transition-transform">
              <Icon.Bank className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black uppercase italic text-slate-900 tracking-tighter leading-none">Bank Mirroring Config</h3>
            <p className="text-[10px] text-slate-400 mt-2 font-black uppercase tracking-widest italic opacity-80">Withdrawal channel requires node synchronization</p>
         </div>

         {!isConfigured ? (
           <div className="space-y-4 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 <input type="text" placeholder="HOLDER NAME" className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-[10px] font-black text-slate-900 focus:border-winbuzz-gold transition-all outline-none italic uppercase tracking-tighter" />
                 <input type="text" placeholder="ACCOUNT NUMBER" className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-[10px] font-black text-slate-900 focus:border-winbuzz-gold transition-all outline-none italic uppercase tracking-tighter" />
                 <input type="text" placeholder="IFSC CODE" className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-[10px] font-black text-slate-900 focus:border-winbuzz-gold transition-all outline-none italic uppercase tracking-tighter" />
                 <input type="text" placeholder="BANK NAME" className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-[10px] font-black text-slate-900 focus:border-winbuzz-gold transition-all outline-none italic uppercase tracking-tighter" />
              </div>
              <button 
                onClick={() => {
                  setIsConfigured(true);
                  onNotify('info', 'Node Mirrored', 'Banking target successfully synchronized with exchange gateway.');
                }}
                className="w-full bg-[#d4af37] text-white py-4 rounded-xl font-black uppercase text-xs shadow-md hover:brightness-110 active:scale-95 transition-all tracking-widest italic"
              >
                Mirror Payout Node
              </button>
           </div>
         ) : (
           <div className="space-y-8 animate-in fade-in duration-500 relative z-10">
              <div className="text-center">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Target Payout Volume</span>
                 <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="₹0.00"
                  className="bg-transparent w-full text-center text-5xl font-black text-slate-900 italic outline-none mt-2 placeholder:text-slate-100"
                 />
              </div>
              <div className="flex gap-2 justify-center">
                 {['500', '1000', '5000', 'MAX'].map(q => (
                   <button key={q} onClick={() => setAmount(q === 'MAX' ? '15000' : q)} className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[9px] font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-tighter italic">{q}</button>
                 ))}
              </div>
              <button 
                onClick={handleWithdrawal}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-black uppercase text-xs shadow-lg hover:brightness-110 tracking-widest italic">
                 Execute Withdrawal Request
              </button>
              <button onClick={() => setIsConfigured(false)} className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic underline underline-offset-4 decoration-slate-200">Re-configure Bank Node</button>
           </div>
         )}

         <div className="pt-8 border-t border-slate-100 text-left space-y-4 relative z-10">
            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic">Security Clearance Protocols</h4>
            <ul className="text-[9px] font-black text-slate-500 space-y-3 leading-relaxed uppercase tracking-tighter italic opacity-80">
              <li className="flex gap-3 items-start"><span className="text-winbuzz-gold">▶</span> Verified KYC node status is mandatory for high-volume payouts.</li>
              <li className="flex gap-3 items-start"><span className="text-winbuzz-gold">▶</span> Mirror node sync takes 2-4 hours for initial configuration.</li>
              <li className="flex gap-3 items-start"><span className="text-winbuzz-gold">▶</span> Credits pushed via IMPS High-Priority gateway (Instant after audit).</li>
            </ul>
         </div>
      </div>
    </div>
  );
};

export default WithdrawView;
