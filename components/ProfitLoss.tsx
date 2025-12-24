
import React from 'react';

interface ProfitLossProps {
  onBack: () => void;
  // Added formatValue prop for dynamic currency rendering
  formatValue: (val: number) => string;
}

const ProfitLoss: React.FC<ProfitLossProps> = ({ onBack, formatValue }) => {
  const history = [
    { id: 1, date: '2025-12-12 12:13', event: 'MAC88-YDT102 [YDT1251212064240]', pnl: 0.00 },
    { id: 2, date: '2025-12-12 12:12', event: 'MAC88-YDT102 [YDT1251212064135]', pnl: 200.00 },
    { id: 3, date: '2025-12-12 11:43', event: 'MAC88-YDT102 [YDT1251212061151]', pnl: 200.00 },
    { id: 4, date: '2025-12-12 11:37', event: 'MAC88-YDT102 [YDT1251212060646]', pnl: 1000.00 },
    { id: 5, date: '2025-12-04 23:42', event: 'Gulf Giants v MI Emirates (Cricket)', pnl: -52.33 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-white p-3 rounded shadow-sm border border-slate-200">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="bg-winbuzz-gold text-slate-900 px-4 py-1.5 rounded font-black text-xs uppercase italic shadow-sm">Back</button>
          <h2 className="text-lg font-black uppercase italic tracking-tighter">Betting Profit And Loss</h2>
        </div>
        <div className="flex gap-2 items-center">
          <input type="date" className="text-[10px] border p-1 rounded" />
          <span className="text-[10px] font-bold">To</span>
          <input type="date" className="text-[10px] border p-1 rounded" />
          <button className="bg-green-600 text-white px-3 py-1 rounded text-[10px] font-black uppercase">Search</button>
        </div>
      </div>

      <div className="bg-white rounded shadow-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-[11px] font-bold">
          <thead className="bg-slate-800 text-white italic uppercase">
            <tr>
              <th className="p-3">No</th>
              <th className="p-3">Date</th>
              <th className="p-3">Event Type</th>
              <th className="p-3">Event</th>
              <th className="p-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {history.map((item, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="p-3 text-slate-400">{item.id}</td>
                <td className="p-3 text-slate-600">{item.date}</td>
                <td className="p-3 uppercase text-slate-400">Exchange</td>
                <td className="p-3 text-slate-800 tracking-tighter">{item.event}</td>
                <td className={`p-3 text-right font-black ${item.pnl > 0 ? 'text-green-600' : item.pnl < 0 ? 'text-red-600' : 'text-slate-400'}`}>
                  {item.pnl > 0 ? '+' : ''}{formatValue(item.pnl)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfitLoss;
