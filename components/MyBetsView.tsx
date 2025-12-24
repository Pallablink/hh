
import React, { useState, useMemo } from 'react';
import { Bet } from '../types';

interface MyBetsViewProps {
  bets: Bet[];
  onBack: () => void;
  // Added formatValue prop for dynamic currency rendering
  formatValue: (val: number) => string;
}

type SortKey = 'matchTitle' | 'runnerName' | 'type' | 'odds' | 'stake' | 'potentialProfit' | 'date';
type SortOrder = 'asc' | 'desc';

const MyBetsView: React.FC<MyBetsViewProps> = ({ bets, onBack, formatValue }) => {
  const [tab, setTab] = useState<'Matched' | 'Unmatched'>('Matched');
  
  // Filter States
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [minOdds, setMinOdds] = useState('');
  const [maxOdds, setMaxOdds] = useState('');
  const [minStake, setMinStake] = useState('');
  const [maxStake, setMaxStake] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Sorting State
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const filteredAndSortedBets = useMemo(() => {
    let result = bets.filter(b => b.status === tab);

    // Apply Filters
    if (dateFrom) {
      const from = new Date(dateFrom).getTime();
      result = result.filter(b => new Date(b.date).getTime() >= from);
    }
    if (dateTo) {
      const to = new Date(dateTo).getTime() + 86400000; // end of day
      result = result.filter(b => new Date(b.date).getTime() <= to);
    }
    if (minOdds) {
      result = result.filter(b => b.odds >= parseFloat(minOdds));
    }
    if (maxOdds) {
      result = result.filter(b => b.odds <= parseFloat(maxOdds));
    }
    if (minStake) {
      result = result.filter(b => b.stake >= parseFloat(minStake));
    }
    if (maxStake) {
      result = result.filter(b => b.stake <= parseFloat(maxStake));
    }

    // Apply Sorting
    result.sort((a, b) => {
      let valA: any = a[sortKey];
      let valB: any = b[sortKey];

      if (sortKey === 'date') {
        valA = new Date(a.date).getTime();
        valB = new Date(b.date).getTime();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [bets, tab, dateFrom, dateTo, minOdds, maxOdds, minStake, maxStake, sortKey, sortOrder]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k) return <span className="ml-1 opacity-20">⇅</span>;
    return <span className="ml-1 text-winbuzz-gold">{sortOrder === 'asc' ? '↑' : '↓'}</span>;
  };

  const clearFilters = () => {
    setDateFrom('');
    setDateTo('');
    setMinOdds('');
    setMaxOdds('');
    setMinStake('');
    setMaxStake('');
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-3 rounded-xl shadow-sm border border-slate-200 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="bg-winbuzz-gold text-slate-900 px-4 py-2 rounded-lg font-black text-xs uppercase italic shadow-md hover:brightness-110 active:scale-95 transition-all">Back</button>
          <h2 className="text-lg font-black uppercase italic tracking-tighter">My Bets History</h2>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all flex items-center gap-2 border ${showFilters ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
          >
            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
            <span className="text-xs">🔍</span>
          </button>
          
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setTab('Matched')}
              className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${tab === 'Matched' ? 'bg-winbuzz-gold text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Matched
            </button>
            <button 
              onClick={() => setTab('Unmatched')}
              className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${tab === 'Unmatched' ? 'bg-winbuzz-gold text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Unmatched
            </button>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white p-6 rounded-xl shadow-xl border border-slate-200 animate-in slide-in-from-top duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date Range</label>
              <div className="flex items-center gap-2">
                <input 
                  type="date" 
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="flex-1 text-[10px] border border-slate-200 p-2 rounded-lg focus:ring-1 focus:ring-winbuzz-gold outline-none font-bold"
                />
                <span className="text-slate-300">to</span>
                <input 
                  type="date" 
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="flex-1 text-[10px] border border-slate-200 p-2 rounded-lg focus:ring-1 focus:ring-winbuzz-gold outline-none font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Odds Range</label>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  placeholder="Min"
                  value={minOdds}
                  onChange={(e) => setMinOdds(e.target.value)}
                  className="flex-1 text-[10px] border border-slate-200 p-2 rounded-lg focus:ring-1 focus:ring-winbuzz-gold outline-none font-bold"
                />
                <input 
                  type="number" 
                  placeholder="Max"
                  value={maxOdds}
                  onChange={(e) => setMaxOdds(e.target.value)}
                  className="flex-1 text-[10px] border border-slate-200 p-2 rounded-lg focus:ring-1 focus:ring-winbuzz-gold outline-none font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stake Range</label>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  placeholder="Min"
                  value={minStake}
                  onChange={(e) => setMinStake(e.target.value)}
                  className="flex-1 text-[10px] border border-slate-200 p-2 rounded-lg focus:ring-1 focus:ring-winbuzz-gold outline-none font-bold"
                />
                <input 
                  type="number" 
                  placeholder="Max"
                  value={maxStake}
                  onChange={(e) => setMaxStake(e.target.value)}
                  className="flex-1 text-[10px] border border-slate-200 p-2 rounded-lg focus:ring-1 focus:ring-winbuzz-gold outline-none font-bold"
                />
              </div>
            </div>

            <div className="flex items-end justify-end">
              <button 
                onClick={clearFilters}
                className="bg-red-50 text-red-600 px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-red-100 transition-all"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bets Table */}
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[11px] font-bold min-w-[700px]">
            <thead className="bg-slate-900 text-white uppercase italic">
              <tr>
                <th onClick={() => toggleSort('matchTitle')} className="p-4 cursor-pointer hover:bg-slate-800 transition-colors">
                  Event Name <SortIcon k="matchTitle" />
                </th>
                <th onClick={() => toggleSort('runnerName')} className="p-4 cursor-pointer hover:bg-slate-800 transition-colors">
                  Runner <SortIcon k="runnerName" />
                </th>
                <th onClick={() => toggleSort('type')} className="p-4 cursor-pointer hover:bg-slate-800 transition-colors">
                  Type <SortIcon k="type" />
                </th>
                <th onClick={() => toggleSort('odds')} className="p-4 cursor-pointer hover:bg-slate-800 transition-colors">
                  Odds <SortIcon k="odds" />
                </th>
                <th onClick={() => toggleSort('stake')} className="p-4 cursor-pointer hover:bg-slate-800 transition-colors">
                  Amount <SortIcon k="stake" />
                </th>
                <th onClick={() => toggleSort('potentialProfit')} className="p-4 cursor-pointer hover:bg-slate-800 transition-colors">
                  Potential P/L <SortIcon k="potentialProfit" />
                </th>
                <th onClick={() => toggleSort('date')} className="p-4 cursor-pointer hover:bg-slate-800 transition-colors">
                  Date <SortIcon k="date" />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAndSortedBets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center">
                    <div className="flex flex-col items-center opacity-30">
                      <span className="text-4xl mb-4">🔍</span>
                      <p className="text-sm font-black uppercase italic text-slate-900">No bets found</p>
                      <p className="text-xs font-bold text-slate-500 mt-1">Try adjusting your filters or tabs</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAndSortedBets.map(bet => (
                  <tr key={bet.id} className="hover:bg-slate-50/80 transition-all border-l-4 border-transparent hover:border-winbuzz-gold">
                    <td className="p-4 text-slate-900 uppercase tracking-tighter max-w-[200px] truncate">{bet.matchTitle}</td>
                    <td className="p-4 text-slate-800 font-black">{bet.runnerName}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase shadow-sm ${bet.type === 'Back' ? 'bg-sky-100 text-sky-700' : 'bg-red-100 text-red-700'}`}>
                        {bet.type}
                      </span>
                    </td>
                    <td className="p-4 text-slate-900 font-black">{bet.odds.toFixed(2)}</td>
                    <td className="p-4 text-slate-900 font-black">{formatValue(bet.stake)}</td>
                    <td className="p-4">
                       <div className="flex flex-col">
                          <span className="text-green-600 font-black">+{formatValue(bet.potentialProfit)}</span>
                          <span className="text-[8px] text-slate-400 uppercase">Estimated</span>
                       </div>
                    </td>
                    <td className="p-4">
                       <div className="flex flex-col">
                          <span className="text-slate-600">{new Date(bet.date).toLocaleDateString()}</span>
                          <span className="text-[9px] text-slate-400 font-medium">{new Date(bet.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Quick Summary Bar */}
      {filteredAndSortedBets.length > 0 && (
        <div className="bg-slate-900 p-4 rounded-xl flex flex-wrap justify-between items-center gap-4 text-white">
           <div className="flex gap-8">
              <div className="flex flex-col">
                 <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Total Bets Shown</span>
                 <span className="text-xl font-black italic">{filteredAndSortedBets.length}</span>
              </div>
              <div className="flex flex-col">
                 <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Total Stakes</span>
                 <span className="text-xl font-black text-winbuzz-gold">{formatValue(filteredAndSortedBets.reduce((acc, b) => acc + b.stake, 0))}</span>
              </div>
           </div>
           <p className="text-[9px] text-slate-500 font-bold max-w-[300px] text-right uppercase italic leading-relaxed">
             * All settlements are based on official market results. 
             Latency may occur during heavy traffic periods.
           </p>
        </div>
      )}
    </div>
  );
};

export default MyBetsView;
