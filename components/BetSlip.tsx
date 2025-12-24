
import React from 'react';
import { Bet } from '../types';

interface BetSlipProps {
  bets: Bet[];
  balance: number;
  onClear: () => void;
  onPlaceBets: () => void;
  onUpdateStake: (id: string, stake: number) => void;
  formatValue: (val: number) => string;
}

const BetSlip: React.FC<BetSlipProps> = ({ bets, onClear, onPlaceBets, onUpdateStake, formatValue }) => {
  const totalStake = bets.reduce((acc, b) => acc + b.stake, 0);

  return (
    <div className="flex flex-col bg-white border border-slate-200 rounded-3xl shadow-lg overflow-hidden">
      <div className="header-gradient text-white p-4 text-[11px] font-black uppercase flex justify-between items-center tracking-tighter">
        <span className="flex items-center gap-2">
          <span className="bg-white/20 px-2 py-0.5 rounded-lg border border-white/10">{bets.length}</span>
          EXCHANGE BET SLIP
        </span>
        {bets.length > 0 && (
          <button 
            onClick={onClear} 
            className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full text-[9px] font-black transition-all border border-white/20"
          >
            FLUSH SLIP
          </button>
        )}
      </div>
      
      <div className="p-4 space-y-3 min-h-[160px] max-h-[400px] overflow-y-auto no-scrollbar bg-slate-50/30">
        {bets.length === 0 ? (
          <div className="text-center py-16 flex flex-col items-center gap-4 opacity-30">
            <div className="text-4xl text-winbuzz-blue grayscale opacity-50">📡</div>
            <p className="text-slate-900 font-black uppercase text-[10px] tracking-tight">Terminal Idle: No Active Positions</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {bets.map((bet) => (
              <div key={bet.id} className={`p-4 rounded-2xl border shadow-sm animate-in slide-in-from-right duration-200 ${bet.type === 'Back' ? 'bg-back-blue/40 border-winbuzz-blue/10' : 'bg-lay-pink/40 border-red-200/50'}`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black uppercase text-slate-900 italic tracking-tighter truncate max-w-[160px]">{bet.runnerName}</span>
                    <p className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter opacity-80">{bet.matchTitle}</p>
                  </div>
                  <span className={`text-[9px] font-black px-3 py-1 rounded-lg uppercase shadow-sm ${bet.type === 'Back' ? 'bg-winbuzz-blue text-white' : 'bg-red-600 text-white'}`}>{bet.type}</span>
                </div>
                
                <div className="flex justify-between mt-4 items-end">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-400 uppercase italic">Exchange Rate</span>
                    <span className="text-sm font-black text-slate-900">{bet.odds.toFixed(2)}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] font-black text-slate-400 uppercase italic">Stake</span>
                    <input 
                      type="number" 
                      value={bet.stake || ''}
                      onChange={(e) => onUpdateStake(bet.id, Number(e.target.value))}
                      className="w-24 h-9 border border-slate-200 rounded-xl text-right px-3 text-[11px] font-black focus:border-winbuzz-blue focus:ring-2 focus:ring-winbuzz-blue/10 focus:outline-none bg-white shadow-inner" 
                    />
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-black/5 flex justify-between items-center">
                   <span className="text-[10px] font-black text-slate-500 uppercase italic tracking-tighter">
                     {bet.type === 'Back' ? 'ESTIMATED PROFIT' : 'LIABILITY NODE'}
                   </span>
                   <span className={`text-[12px] font-black ${bet.type === 'Back' ? 'text-green-600' : 'text-red-600'}`}>
                     {formatValue(bet.potentialProfit || 0)}
                   </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {bets.length > 0 && (
        <div className="p-5 border-t border-slate-100 bg-white space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-slate-400 uppercase italic tracking-widest">Total Exposure Signal</span>
            <span className="text-lg font-black italic text-winbuzz-blue">{formatValue(totalStake)}</span>
          </div>
          <button 
            onClick={onPlaceBets} 
            className="w-full py-4 bg-winbuzz-blue hover:bg-winbuzz-dark-blue text-white rounded-2xl font-black text-[12px] uppercase shadow-xl transition-all active:scale-95 tracking-widest italic border-b-4 border-winbuzz-dark-blue"
          >
            COMMIT POSITIONS
          </button>
        </div>
      )}
    </div>
  );
};

export default BetSlip;
