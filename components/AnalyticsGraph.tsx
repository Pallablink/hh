
import React from 'react';

const AnalyticsGraph: React.FC = () => {
  const points = [
    { x: 0, y: 100 },
    { x: 50, y: 80 },
    { x: 100, y: 120 },
    { x: 150, y: 40 },
    { x: 200, y: 90 },
    { x: 250, y: 30 },
    { x: 300, y: 60 }
  ];

  const pathData = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
  const areaData = `${pathData} L 300,150 L 0,150 Z`;

  return (
    <div className="w-full h-40 bg-slate-50 rounded-2xl p-4 relative overflow-hidden">
       <svg viewBox="0 0 300 150" className="w-full h-full preserve-3d">
          <defs>
             <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#007bff', stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: '#007bff', stopOpacity: 0 }} />
             </linearGradient>
          </defs>
          <path d={areaData} fill="url(#grad)" />
          <path d={pathData} fill="none" stroke="#007bff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {points.map((p, i) => (
             <circle key={i} cx={p.x} cy={p.y} r="3" fill="#007bff" />
          ))}
       </svg>
       <div className="absolute inset-x-0 bottom-1 flex justify-between px-6 text-[7px] font-black text-slate-300 uppercase italic">
          <span>MON</span>
          <span>TUE</span>
          <span>WED</span>
          <span>THU</span>
          <span>FRI</span>
          <span>SAT</span>
          <span>SUN</span>
       </div>
    </div>
  );
};

export default AnalyticsGraph;
