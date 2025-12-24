
import React, { useState } from 'react';
import { ToastType } from './ToastContainer';

interface DepositViewProps {
  onBack: () => void;
  // Added missing onNotify prop to match App.tsx usage
  onNotify: (type: ToastType, title: string, message: string) => void;
}

const DepositView: React.FC<DepositViewProps> = ({ onBack, onNotify }) => {
  const [utr, setUtr] = useState('');
  const [amount, setAmount] = useState('500');

  const quickAmounts = ['100', '500', '1000', '5000', '10000', '25000'];

  // Handler for deposit initialization
  const handleDeposit = () => {
    if (utr.length === 12) {
      onNotify('success', 'Terminal Refill', `Deposit request for ₹${parseInt(amount).toLocaleString()} broadcasted to audit node.`);
      onBack();
    } else {
      onNotify('error', 'Protocol Error', 'Invalid UTR format. Mirror node requires a 12-digit sequence.');
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-winbuzz-blue/10">
        <button onClick={onBack} className="bg-winbuzz-blue text-white px-4 py-1.5 rounded-xl font-black text-xs uppercase italic shadow-sm hover:brightness-110">❮ Back</button>
        <h2 className="text-xs font-black uppercase italic tracking-tighter">Fast Deposit Terminal</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,350px] gap-4">
        <div className="bg-white rounded-3xl shadow-sm border border-winbuzz-blue/10 overflow-hidden">
           <div className="header-gradient p-8 text-white text-center relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
             <h3 className="text-2xl font-black uppercase italic tracking-tighter drop-shadow-lg">BLUE PAY NODE</h3>
             <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mt-1 italic">Instant Terminal Sync Active</p>
           </div>
           
           <div className="p-8 space-y-8">
             <div className="bg-winbuzz-blue/5 p-4 rounded-2xl border border-winbuzz-blue/10 text-center">
                <p className="text-[10px] font-black text-winbuzz-blue uppercase italic mb-1 tracking-widest">Active Promotion</p>
                <p className="text-xs font-black text-slate-800 uppercase italic">Deposits &gt; ₹5,000 = <span className="text-green-600">₹300 INSTANT BONUS</span></p>
             </div>

             <div className="text-center">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Node Input Volume</span>
               <div className="text-6xl font-black text-winbuzz-blue italic mt-2">₹{parseInt(amount).toLocaleString()}</div>
             </div>

             <div className="grid grid-cols-3 gap-3">
                {quickAmounts.map(val => (
                  <button 
                    key={val} 
                    onClick={() => setAmount(val)}
                    className={`py-3 rounded-xl font-black text-[11px] transition-all border ${amount === val ? 'bg-winbuzz-blue text-white shadow-xl scale-105 border-winbuzz-blue' : 'bg-slate-50 text-slate-400 hover:text-slate-800 border-slate-100'}`}
                  >
                    ₹{parseInt(val) >= 1000 ? `${parseInt(val)/1000}k` : val}
                  </button>
                ))}
             </div>

             <div className="space-y-4">
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 italic">Mirror Node UTR (12 Digits)</label>
                 <input 
                   type="text" 
                   value={utr}
                   maxLength={12}
                   onChange={(e) => setUtr(e.target.value)}
                   placeholder="Enter payment receipt ID"
                   className="w-full bg-[#f0f7ff] border border-slate-200 rounded-2xl p-5 text-sm font-black text-slate-900 focus:border-winbuzz-blue focus:outline-none transition-all placeholder:text-slate-300 tracking-[0.5em] text-center italic shadow-inner"
                 />
               </div>

               <button 
                onClick={handleDeposit}
                className="w-full bg-winbuzz-blue text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl hover:brightness-110 active:scale-95 transition-all italic text-xs">INITIALIZE REFILL</button>
             </div>
           </div>
        </div>

        <div className="space-y-4">
           <div className="bg-[#121b28] rounded-3xl p-6 text-center text-white border border-winbuzz-blue/20">
              <div className="bg-winbuzz-blue/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-winbuzz-blue/30">
                 <span className="text-2xl italic">QR</span>
              </div>
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=winbuzz_blue@node&am=${amount}`} alt="QR" className="w-40 h-40 mx-auto rounded-2xl border-4 border-white shadow-2xl mb-4" />
              <p className="text-[10px] font-black uppercase italic tracking-widest">Fast-Scan Node Sync</p>
           </div>

           <div className="bg-white rounded-3xl p-6 border border-winbuzz-blue/10 shadow-sm">
              <h4 className="text-[10px] font-black text-winbuzz-blue uppercase mb-4 italic tracking-widest border-b border-winbuzz-blue/5 pb-2">Deposit Rewards</h4>
              <div className="space-y-4">
                 <div className="flex gap-3">
                    <div className="w-8 h-8 bg-green-50 text-green-600 rounded-lg flex items-center justify-center text-xs">🎁</div>
                    <div className="flex-1">
                       <p className="text-[9px] font-black text-slate-800 uppercase italic">Welcome Package</p>
                       <p className="text-[8px] font-bold text-slate-400 uppercase italic">100% Match on 1st Deposit</p>
                    </div>
                 </div>
                 <div className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xs">⚡</div>
                    <div className="flex-1">
                       <p className="text-[9px] font-black text-slate-800 uppercase italic">Elite Refill Bonus</p>
                       <p className="text-[8px] font-bold text-slate-400 uppercase italic">5% Extra on every USDT deposit</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DepositView;
