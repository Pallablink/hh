
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white/90 backdrop-blur-md animate-in fade-in duration-500">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-winbuzz-blue/10 rounded-full shadow-inner"></div>
        <div className="absolute inset-0 border-4 border-winbuzz-blue border-t-transparent rounded-full animate-spin shadow-lg"></div>
        <div className="absolute inset-4 bg-winbuzz-blue/5 rounded-full flex items-center justify-center border border-winbuzz-blue/20">
           <span className="text-winbuzz-blue font-black italic text-lg tracking-tighter">WB</span>
        </div>
      </div>
      <div className="mt-6 flex flex-col items-center gap-1.5">
         <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-winbuzz-blue rounded-full animate-pulse"></div>
            <span className="text-winbuzz-blue font-black uppercase tracking-[0.4em] text-[11px] italic">WINBUZZ TERMINAL</span>
            <div className="w-1.5 h-1.5 bg-winbuzz-blue rounded-full animate-pulse delay-100"></div>
         </div>
         <span className="text-[9px] font-bold text-slate-400 uppercase italic tracking-widest opacity-60">Syncing Exchange Nodes...</span>
      </div>
    </div>
  );
};

export default Loader;
