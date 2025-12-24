
import React from 'react';
import { CASINO_GAMES } from '../constants';

const CasinoSection: React.FC = () => {
  const banners = [
    { title: 'AVIATOR X', img: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&q=80&w=400', promo: '3X MULTIPLIER' },
    { title: 'MINES PRO', img: 'https://images.unsplash.com/photo-1596838132731-dd96c2999c54?auto=format&fit=crop&q=80&w=400', promo: 'DAILY DROP' },
    { title: 'ROULETTE', img: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&q=80&w=400', promo: 'LIVE TABLE' },
    { title: 'BACCARAT', img: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&q=80&w=400', promo: 'VIP ROOM' }
  ];

  return (
    <div className="space-y-3 mb-3">
      {/* Promo Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {banners.map((b, i) => (
          <div key={i} className="relative h-[90px] rounded-xl overflow-hidden shadow-sm border border-winbuzz-blue/10 cursor-pointer group bg-white">
             <img src={b.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-75" alt={b.title} />
             <div className="absolute inset-0 bg-gradient-to-t from-winbuzz-blue/80 via-transparent to-transparent flex flex-col justify-end p-2.5">
                <span className="text-[8px] font-black text-winbuzz-accent-blue uppercase tracking-[0.2em] mb-0.5">{b.promo}</span>
                <span className="text-white text-[11px] font-black uppercase tracking-widest italic drop-shadow-md">{b.title}</span>
             </div>
          </div>
        ))}
      </div>

      {/* Game Grid */}
      <div className="bg-white p-3 rounded-2xl border border-winbuzz-blue/10 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between mb-3 px-1">
           <h4 className="text-[10px] font-black text-winbuzz-blue uppercase italic tracking-widest">Trending Live Games</h4>
           <button className="text-[9px] font-black text-slate-400 hover:text-winbuzz-blue uppercase italic">View Lobby ❯</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
           {CASINO_GAMES.map(game => (
              <div key={game.id} className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-sm border border-slate-100 cursor-pointer group bg-white">
                 <img src={game.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={game.title} />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 text-center">
                    <span className="text-white text-[9px] font-black uppercase italic tracking-tight">{game.title}</span>
                    <span className="text-winbuzz-blue text-[7px] font-bold uppercase mt-1">Play Now</span>
                 </div>
                 {/* Provider Badge */}
                 <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-1.5 py-0.5 rounded-md border border-slate-100 shadow-sm">
                    <span className="text-[7px] font-black text-winbuzz-blue uppercase tracking-tighter">{game.provider}</span>
                 </div>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default CasinoSection;
