
import React from 'react';

interface BonusListProps {
  onBack: () => void;
  // Added formatValue prop for dynamic currency rendering
  formatValue: (val: number) => string;
}

const BonusList: React.FC<BonusListProps> = ({ onBack, formatValue }) => {
  const bonuses = [
    {
      amount: 500,
      status: 'In-Progress',
      percentage: 35,
      current: 350,
      target: 1000,
      requestDate: '11/12/2025 10:15:29 PM',
      expireDate: '26/12/2025 05:29:59 AM',
      type: 'Welcome Bonus'
    },
    {
      amount: 1000,
      status: 'In-Progress',
      percentage: 12,
      current: 600,
      target: 5000,
      requestDate: '12/12/2025 08:30:12 AM',
      expireDate: '27/12/2025 08:30:00 AM',
      type: 'Weekly Reload'
    },
    {
      amount: 2500,
      status: 'In-Progress',
      percentage: 85,
      current: 21250,
      target: 25000,
      requestDate: '10/12/2025 02:22:45 PM',
      expireDate: '25/12/2025 02:22:00 PM',
      type: 'High Roller Bonus'
    },
    {
      amount: 250,
      status: 'In-Progress',
      percentage: 0,
      current: 0,
      target: 500,
      requestDate: '14/12/2025 11:00:00 PM',
      expireDate: '29/12/2025 11:00:00 PM',
      type: 'Referral Bonus'
    },
    {
      amount: 5000,
      status: 'In-Progress',
      percentage: 50,
      current: 50000,
      target: 100000,
      requestDate: '01/12/2025 09:15:00 AM',
      expireDate: '31/12/2025 11:59:59 PM',
      type: 'Monthly Milestone'
    },
    {
      amount: 150,
      status: 'In-Progress',
      percentage: 90,
      current: 135,
      target: 150,
      requestDate: '13/12/2025 04:10:00 PM',
      expireDate: '20/12/2025 04:10:00 PM',
      type: 'Daily Reward'
    },
    {
      amount: 750,
      status: 'In-Progress',
      percentage: 20,
      current: 300,
      target: 1500,
      requestDate: '08/12/2025 12:00:00 PM',
      expireDate: '23/12/2025 12:00:00 PM',
      type: 'Cricket Special'
    },
    {
      amount: 10000,
      status: 'In-Progress',
      percentage: 5,
      current: 5000,
      target: 100000,
      requestDate: '14/12/2025 06:45:30 PM',
      expireDate: '14/01/2026 06:45:00 PM',
      type: 'Elite Tier Upgrade'
    },
    {
      amount: 300,
      status: 'In-Progress',
      percentage: 60,
      current: 180,
      target: 300,
      requestDate: '12/12/2025 10:30:00 PM',
      expireDate: '19/12/2025 10:30:00 PM',
      type: 'Weekend Rush'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 bg-white p-3 rounded shadow-sm border border-slate-200">
        <button onClick={onBack} className="bg-winbuzz-gold text-slate-900 px-4 py-1.5 rounded font-black text-xs uppercase italic shadow-sm">Back</button>
        <h2 className="text-lg font-black uppercase italic tracking-tighter">Bonus List</h2>
      </div>

      <div className="flex gap-2 justify-center mb-6">
        {['In-progress', 'Redeemed', 'Expired & Void'].map((tab, i) => (
          <button key={tab} className={`px-4 py-1.5 rounded text-[10px] font-black uppercase ${i === 0 ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 border border-slate-200'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bonuses.map((bonus, i) => (
          <div key={i} className="bg-white rounded-xl border-2 border-winbuzz-gold/20 overflow-hidden shadow-lg hover:border-winbuzz-gold transition-all flex flex-col">
            <div className="bg-winbuzz-gold/30 p-3 text-center border-b border-winbuzz-gold/20">
              <span className="text-[10px] font-black uppercase text-slate-800 tracking-widest">{bonus.type}</span>
            </div>
            <div className="p-4 space-y-4 flex-1">
              <div className="flex justify-between text-[11px] font-black uppercase italic">
                <span className="text-slate-500">Amount: {formatValue(bonus.amount)}</span>
                <span className="text-amber-600">Status: {bonus.status}</span>
              </div>
              
              <div className="space-y-1">
                <div className="h-4 bg-slate-900 rounded-full relative overflow-hidden border border-slate-700 shadow-inner">
                  <div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 to-winbuzz-gold transition-all duration-1000" 
                    style={{ width: `${bonus.percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-black text-slate-400">
                  <span>{bonus.percentage}% ({formatValue(bonus.current)})</span>
                  <span>Target: {formatValue(bonus.target)}</span>
                </div>
              </div>

              <div className="pt-2 space-y-1 border-t border-slate-50">
                <p className="text-[11px] font-black text-slate-800 italic uppercase tracking-tighter">WAGERING CONTRACT</p>
                <div className="grid grid-cols-2 gap-2 text-[9px] font-bold text-slate-500">
                  <div>
                    <p className="uppercase text-slate-400">Requested:</p>
                    <p className="text-slate-700">{bonus.requestDate}</p>
                  </div>
                  <div>
                    <p className="uppercase text-slate-400">Expires:</p>
                    <p className="text-slate-700">{bonus.expireDate}</p>
                  </div>
                </div>
              </div>
            </div>
            <button className="w-full bg-slate-50 py-2 text-[10px] font-black text-slate-400 uppercase hover:bg-slate-100 transition-colors border-t border-slate-100">
              Terms & Conditions ↓
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BonusList;
