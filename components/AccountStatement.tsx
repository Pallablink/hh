
import React from 'react';

interface AccountStatementProps {
  onBack: () => void;
  // Added formatValue prop for dynamic currency rendering
  formatValue: (val: number) => string;
}

const AccountStatement: React.FC<AccountStatementProps> = ({ onBack, formatValue }) => {
  const statement = [
    { sr: 1, date: '2025-12-12 12:13', credit: 0.00, debit: null, balance: 0.00, remark: 'iCasino-R- MAC88-YDT102' },
    { sr: 2, date: '2025-12-12 12:12', credit: null, debit: -500.00, balance: 0.00, remark: 'iCasino-B- MAC88-YDT102' },
    { sr: 3, date: '2025-12-12 12:12', credit: 0.00, debit: null, balance: 1000.00, remark: 'iCasino-R- MAC88-YDT102' },
    { sr: 4, date: '2025-12-12 12:12', credit: null, debit: -500.00, balance: 500.00, remark: 'iCasino-B- MAC88-YDT102' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-white p-3 rounded shadow-sm border border-slate-200">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="bg-winbuzz-gold text-slate-900 px-4 py-1.5 rounded font-black text-xs uppercase italic shadow-sm">Back</button>
          <h2 className="text-lg font-black uppercase italic tracking-tighter">Account Statement</h2>
        </div>
        <div className="flex gap-2 items-center">
          <select className="text-[10px] border p-1 rounded font-bold uppercase"><option>All</option></select>
          <button className="bg-green-600 text-white px-3 py-1 rounded text-[10px] font-black uppercase">Search</button>
        </div>
      </div>

      <div className="bg-white rounded shadow border border-slate-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-left text-[11px] font-bold min-w-[800px]">
          <thead className="bg-slate-800 text-white italic uppercase">
            <tr>
              <th className="p-3">Sr No</th>
              <th className="p-3">Date</th>
              <th className="p-3 text-right">Credit</th>
              <th className="p-3 text-right">Debit</th>
              <th className="p-3 text-right">Balance</th>
              <th className="p-3">Remark</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {statement.map((item, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="p-3 text-slate-400">{item.sr}</td>
                <td className="p-3 text-slate-600">{item.date}</td>
                <td className="p-3 text-right text-green-600">{item.credit !== null ? formatValue(item.credit) : '-'}</td>
                <td className="p-3 text-right text-red-600">{item.debit !== null ? formatValue(item.debit) : '-'}</td>
                <td className="p-3 text-right text-slate-900">{formatValue(item.balance)}</td>
                <td className="p-3 text-slate-500 text-[9px] uppercase font-black">{item.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountStatement;
