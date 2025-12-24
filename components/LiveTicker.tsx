
import React from 'react';

const LiveTicker: React.FC = () => {
  const news = [
    "🔥 HOT MARKET: Australia vs England Match Odds are shifting rapidly!",
    "⚽ Premier League: Manchester City vs Arsenal live odds available now.",
    "🏏 IPL 2026: Early bird betting tokens available for VIP Diamond members.",
    "💸 INSTANT PAYOUTS: WinBuzz terminal processing over 1000 withdrawals per minute.",
    "🎰 NEW GAME: 'Mines Platinum' now live in Casino lobby with 98% RTP.",
  ];

  return (
    <div className="bg-slate-900 h-[28px] overflow-hidden flex items-center border-b border-winbuzz-blue/20">
      <div className="bg-winbuzz-blue h-full flex items-center px-4 text-[9px] font-black uppercase italic text-white z-10 whitespace-nowrap shadow-xl">
        LIVE TICKER
      </div>
      <div className="flex-1 whitespace-nowrap animate-marquee">
        <div className="inline-flex py-1">
          {news.map((item, i) => (
             <span key={i} className="text-[9px] font-black text-winbuzz-accent-blue uppercase italic px-10 tracking-widest">
               {item}
             </span>
          ))}
          {/* Duplicate for infinite effect */}
          {news.map((item, i) => (
             <span key={`dup-${i}`} className="text-[9px] font-black text-winbuzz-accent-blue uppercase italic px-10 tracking-widest">
               {item}
             </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LiveTicker;
