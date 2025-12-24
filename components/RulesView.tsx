
import React from 'react';

interface RulesViewProps {
  onBack: () => void;
}

const RulesView: React.FC<RulesViewProps> = ({ onBack }) => {
  const sections = [
    { title: 'Market Acceptance', content: 'All exchange orders are processed through distributed consensus nodes. Settlement is finalized once official results are broadcast.' },
    { title: 'Void Protocols', content: 'In case of match abandonment, all open wagers on affected markets will be nullified and stakes returned to source terminals.' },
    { title: 'Withdrawal Cycle', content: 'High-priority IMPS gateways process withdrawals within 60 minutes after audit clearance. Node sync requires 2-Factor Auth.' },
    { title: 'Fancy Markets', content: 'Fancy wagers (Session, Player Runs) are fixed-odds contracts and do not follow exchange back/lay logic.' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-winbuzz-blue/10">
        <button onClick={onBack} className="bg-winbuzz-blue text-white px-4 py-1.5 rounded-xl font-black text-xs uppercase italic shadow-sm hover:brightness-110">❮ Back</button>
        <h2 className="text-sm font-black uppercase italic tracking-tighter">Protocol & Governance</h2>
      </div>

      <div className="bg-white rounded-[2.5rem] p-10 border border-winbuzz-blue/10 shadow-xl max-w-4xl mx-auto">
         <div className="text-center mb-12">
            <h3 className="text-3xl font-black uppercase italic text-winbuzz-blue tracking-tighter">Operational Guidelines</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">v4.2.0 Exchange Protocol Document</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((sec, i) => (
               <div key={i} className="space-y-3 p-6 bg-[#f0f7ff] rounded-[2rem] border border-winbuzz-blue/5">
                  <h4 className="text-[11px] font-black uppercase text-winbuzz-blue italic tracking-widest">{sec.title}</h4>
                  <p className="text-[10px] font-medium text-slate-600 leading-relaxed uppercase tracking-tighter">{sec.content}</p>
               </div>
            ))}
         </div>

         <div className="mt-12 p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 text-center">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic mb-6">By utilizing the WinBuzz Exchange terminal, you agree to these encrypted governance protocols.</p>
            <button onClick={onBack} className="bg-winbuzz-blue text-white px-10 py-3 rounded-2xl font-black uppercase text-[10px] shadow-lg hover:brightness-110 transition-all italic tracking-widest">ACKNOWLEDGE</button>
         </div>
      </div>
    </div>
  );
};

export default RulesView;
