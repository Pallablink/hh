
import React from 'react';
import { ToastType } from './ToastContainer';
import { CurrencyCode } from '../types';

interface StakeSettingsProps {
  onBack: () => void;
  onNotify: (type: ToastType, title: string, message: string) => void;
  // Added currency and formatValue props
  currency: CurrencyCode;
  formatValue: (val: number) => string;
}

const StakeSettings: React.FC<StakeSettingsProps> = ({ onBack, onNotify, formatValue }) => {
  const defaultStakes = [100, 200, 500, 1000, 2000, 5000, 10000, 25000];

  const handleSave = () => {
    onNotify('success', 'Terminal Config Sync', 'Exchange stake matrix updated in local cache.');
    onBack();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-6 bg-white p-5 rounded-[2rem] border border-winbuzz-blue/10 shadow-lg">
        <button onClick={onBack} className="bg-winbuzz-blue text-white px-8 py-2.5 rounded-2xl font-black text-[11px] uppercase italic shadow-lg hover:scale-105 transition-all">❮ Back</button>
        <h2 className="text-xl font-black uppercase italic tracking-tighter text-slate-900">Stake <span className="text-winbuzz-blue">Matrix</span> Configuration</h2>
      </div>

      <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-winbuzz-blue/10 max-w-4xl mx-auto relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-winbuzz-blue/5 rounded-full blur-[100px] -mr-40 -mt-40"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 relative z-10">
          {defaultStakes.map((val, i) => (
            <div key={i} className="flex gap-4 group">
              <div className="flex-1 space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] italic ml-1 group-hover:text-winbuzz-blue transition-colors">Descriptor</label>
                <input type="text" defaultValue={`${formatValue(val).replace('.00', '')}`} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs font-black text-slate-900 italic focus:border-winbuzz-blue focus:ring-1 focus:ring-winbuzz-blue/20 outline-none transition-all shadow-inner" />
              </div>
              <div className="flex-1 space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] italic ml-1 group-hover:text-winbuzz-blue transition-colors">Stake Value</label>
                <input type="number" defaultValue={val} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs font-black text-slate-900 italic focus:border-winbuzz-blue focus:ring-1 focus:ring-winbuzz-blue/20 outline-none transition-all shadow-inner" />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 flex justify-end gap-6 pt-12 border-t border-slate-100 relative z-10">
           <button onClick={onBack} className="px-12 py-5 rounded-2xl text-[11px] font-black uppercase text-slate-500 hover:text-slate-900 transition-all italic tracking-widest">Discard Changes</button>
           <button onClick={handleSave} className="bg-winbuzz-blue text-white px-20 py-5 rounded-[2rem] shadow-[0_0_40px_rgba(37,99,235,0.3)] font-black uppercase text-[11px] hover:scale-105 transition-all italic tracking-widest border-b-4 border-winbuzz-dark-blue active:translate-y-1">Commit to Terminal</button>
        </div>
      </div>
    </div>
  );
};

export default StakeSettings;
