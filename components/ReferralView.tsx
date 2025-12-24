
import React from 'react';
import { ToastType } from './ToastContainer';

interface ReferralViewProps {
  onBack: () => void;
  // Added missing onNotify prop to match App.tsx usage
  onNotify: (type: ToastType, title: string, message: string) => void;
}

const ReferralView: React.FC<ReferralViewProps> = ({ onBack, onNotify }) => {
  const referralCode = 'FO8JxK';
  const referralLink = `https://winbuzz.org/signup?ref=${referralCode}`;

  // Handler for copying referral link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    onNotify('info', 'Node Link Copied', 'Your unique referral signal is ready to be broadcasted.');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 bg-white p-3 rounded shadow-sm border border-slate-200">
        <button onClick={onBack} className="bg-winbuzz-gold text-slate-900 px-4 py-1.5 rounded font-black text-xs uppercase italic shadow-sm">Back</button>
        <h2 className="text-lg font-black uppercase italic tracking-tighter">Refer & Earn</h2>
      </div>

      <div className="bg-white rounded-xl shadow-lg border-2 border-winbuzz-gold overflow-hidden max-w-4xl mx-auto">
        <div className="bg-winbuzz-gold p-8 text-center">
           <h3 className="text-3xl font-black uppercase italic text-slate-900 tracking-tighter">REFER AND EARN!</h3>
           <p className="text-sm font-bold text-slate-800 mt-2 max-w-xl mx-auto leading-relaxed">
             Keep your friends close and referral friends closer! Invite your friends and family to sign up using your personal referral code and get 20% of each and every one of their deposits made thereafter!
           </p>
        </div>

        <div className="p-8 space-y-8">
           <div className="bg-slate-900 rounded-2xl p-6 text-center shadow-xl border-4 border-slate-800 transform hover:scale-[1.02] transition-transform">
              <p className="text-xs font-black text-winbuzz-gold uppercase tracking-widest mb-4">Your Referral Link</p>
              <div 
                onClick={handleCopyLink}
                className="bg-slate-800 rounded-lg p-4 text-white font-mono text-sm break-all select-all cursor-pointer hover:bg-slate-700 transition-colors">
                {referralLink}
              </div>
              <button 
                onClick={handleCopyLink}
                className="mt-4 bg-winbuzz-gold text-slate-900 px-8 py-2 rounded-full font-black uppercase text-xs shadow-lg hover:brightness-110">Copy Link</button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Invite Friends', desc: 'Share your link via WhatsApp or Telegram' },
                { title: 'They Register', desc: 'Friends join WinBuzz using your code' },
                { title: 'Get 20% Bonus', desc: 'Earn 20% of their life-time deposits' }
              ].map((step, i) => (
                <div key={i} className="text-center p-6 bg-slate-50 rounded-xl border border-slate-100">
                   <div className="w-10 h-10 bg-winbuzz-gold rounded-full flex items-center justify-center font-black mx-auto mb-3">{i+1}</div>
                   <h4 className="font-black text-sm uppercase tracking-tighter text-slate-900 mb-1">{step.title}</h4>
                   <p className="text-[10px] text-slate-500 font-medium">{step.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralView;
