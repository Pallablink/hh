
import React from 'react';
import { Icon } from './Icons';
import { ToastType } from './ToastContainer';

interface SupportViewProps {
  onBack: () => void;
  onNotify: (type: ToastType, title: string, message: string) => void;
}

const SupportView: React.FC<SupportViewProps> = ({ onBack, onNotify }) => {
  const supportNodes = [
    { name: 'General Support Node', id: '@WB_SUPPORT_01', type: 'Telegram', status: 'ONLINE', response: '< 2 mins' },
    { name: 'VIP Priority Node', id: '+91 99999 88888', type: 'WhatsApp', status: 'ONLINE', response: 'INSTANT' },
    { name: 'Withdrawal Audit Node', id: '@WB_AUDIT', type: 'Telegram', status: 'BUSY', response: '< 10 mins' },
    { name: 'ID Activation Node', id: '+91 77777 66666', type: 'WhatsApp', status: 'ONLINE', response: '< 5 mins' }
  ];

  const handleConnect = (nodeName: string) => {
    onNotify('info', 'Routing Signal', `Bridging secure connection to ${nodeName}...`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 bg-white p-4 rounded-[2rem] shadow-md border border-winbuzz-blue/10">
        <button onClick={onBack} className="bg-winbuzz-blue text-white px-8 py-2 rounded-xl font-black text-xs uppercase italic shadow-sm hover:brightness-110 border border-white/10">❮ Back</button>
        <h2 className="text-sm font-black uppercase italic tracking-tighter text-slate-900">Support & Operator Nodes</h2>
      </div>

      <div className="bg-white rounded-[3rem] p-12 border border-winbuzz-blue/10 shadow-2xl max-w-5xl mx-auto">
         <div className="text-center mb-16">
            <h3 className="text-4xl font-black uppercase italic text-winbuzz-blue tracking-tighter">How can we assist?</h3>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-4">Connect to a live operator node for instant resolution</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {supportNodes.map((node, i) => (
               <div key={i} className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 hover:border-winbuzz-blue hover:bg-white transition-all group cursor-pointer relative overflow-hidden shadow-sm hover:shadow-xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-winbuzz-blue/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-winbuzz-blue/10 transition-colors"></div>
                  <div className="flex justify-between items-start mb-6 relative z-10">
                     <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase italic shadow-sm ${node.status === 'ONLINE' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                        ● {node.status}
                     </span>
                     <span className="text-[11px] font-black text-winbuzz-blue italic bg-white px-3 py-1 rounded-lg border border-winbuzz-blue/10">{node.type}</span>
                  </div>
                  <h4 className="text-lg font-black uppercase text-slate-800 italic mb-2 group-hover:text-winbuzz-blue transition-colors">{node.name}</h4>
                  <p className="text-xs font-black text-slate-400 italic mb-8 uppercase tracking-widest">{node.id}</p>
                  <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                     <span className="text-[10px] font-bold text-slate-400 uppercase italic">Response: <span className="text-slate-800">{node.response}</span></span>
                     <button onClick={() => handleConnect(node.name)} className="bg-winbuzz-blue text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase shadow-lg hover:scale-110 transition-all italic tracking-widest">Connect</button>
                  </div>
               </div>
            ))}
         </div>

         <div className="mt-16 p-12 bg-slate-950 rounded-[3rem] text-center text-white relative overflow-hidden shadow-2xl border-4 border-winbuzz-blue/10">
            <div className="absolute inset-0 bg-gradient-to-r from-winbuzz-blue/30 via-transparent to-winbuzz-blue/30"></div>
            <h5 className="text-2xl font-black uppercase italic tracking-widest relative z-10">24/7 Global Hotdesk</h5>
            <p className="text-[11px] font-bold text-slate-400 uppercase italic mt-4 relative z-10 tracking-[0.2em]">Email: help@winbuzz-blue.exchange</p>
            <button className="mt-10 bg-white text-slate-950 px-12 py-5 rounded-[2.5rem] font-black uppercase text-[11px] shadow-[0_0_30px_rgba(255,255,255,0.2)] relative z-10 hover:scale-105 transition-all italic tracking-[0.2em] border-b-4 border-slate-300 active:translate-y-1">Launch Direct Mirror Ticket</button>
         </div>
      </div>
    </div>
  );
};

export default SupportView;
