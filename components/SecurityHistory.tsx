
import React from 'react';
import { MOCK_SECURITY_LOGS } from '../constants';

interface SecurityHistoryProps {
  onBack: () => void;
}

const SecurityHistory: React.FC<SecurityHistoryProps> = ({ onBack }) => {
  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex items-center gap-4 bg-white p-3 rounded shadow-sm border border-slate-200">
        <button onClick={onBack} className="bg-winbuzz-blue text-white px-4 py-1.5 rounded font-black text-[10px] uppercase italic shadow-sm hover:brightness-110">❮ Back</button>
        <h2 className="text-sm font-black uppercase italic tracking-tighter">Security & Access Logs</h2>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
        <div className="bg-[#f0f7ff] p-4 border-b border-slate-100">
          <p className="text-[10px] font-black text-winbuzz-blue uppercase tracking-widest italic">Terminal Node Activity</p>
        </div>
        <table className="w-full text-[11px] font-bold text-left">
          <thead className="bg-slate-50 text-slate-400 uppercase italic">
            <tr>
              <th className="p-4">Action</th>
              <th className="p-4">IP Address</th>
              <th className="p-4">User Agent</th>
              <th className="p-4">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_SECURITY_LOGS.map(log => (
              <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${log.action.includes('Success') ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                    {log.action}
                  </span>
                </td>
                <td className="p-4 text-slate-900 font-black">{log.ip}</td>
                <td className="p-4 text-slate-500 italic uppercase tracking-tighter">{log.device}</td>
                <td className="p-4 text-slate-400">{log.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 bg-slate-50 border-t border-slate-100">
          <p className="text-[9px] font-bold text-slate-400 uppercase italic tracking-widest text-center">
            * We log all authentication requests to ensure the integrity of your exchange account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityHistory;
