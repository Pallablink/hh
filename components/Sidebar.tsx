
import React from 'react';
import { SportType, ViewState } from '../types';
import { Icon } from './Icons';

interface SidebarProps {
  selectedSport: SportType;
  onSelectSport: (sport: SportType) => void;
  onViewChange: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedSport, onSelectSport, onViewChange }) => {
  const categories: { name: SportType; icon: React.ReactNode }[] = [
    { name: 'Cricket', icon: <Icon.Cricket className="w-4 h-4" /> },
    { name: 'Football', icon: <Icon.Football className="w-4 h-4" /> },
    { name: 'Tennis', icon: <Icon.Tennis className="w-4 h-4" /> },
    { name: 'Politics', icon: <Icon.Shield className="w-4 h-4" /> },
    { name: 'Casino', icon: <Icon.Casino className="w-4 h-4" /> },
    { name: 'Sports Book', icon: <Icon.Trophy className="w-4 h-4" /> },
    { name: 'Horse Racing', icon: <Icon.Horse className="w-4 h-4" /> },
    { name: 'Greyhound Racing', icon: <Icon.Horse className="w-4 h-4" /> },
    { name: 'Binary', icon: <Icon.Bell className="w-4 h-4" /> },
    { name: 'Kabaddi', icon: <Icon.Trophy className="w-4 h-4" /> },
    { name: 'Basketball', icon: <Icon.Trophy className="w-4 h-4" /> },
    { name: 'Baseball', icon: <Icon.Trophy className="w-4 h-4" /> },
    { name: 'Table Tennis', icon: <Icon.Trophy className="w-4 h-4" /> },
    { name: 'Volleyball', icon: <Icon.Trophy className="w-4 h-4" /> },
    { name: 'Ice Hockey', icon: <Icon.Trophy className="w-4 h-4" /> },
    { name: 'Rugby', icon: <Icon.Trophy className="w-4 h-4" /> },
    { name: 'Mixed Martial Arts', icon: <Icon.Trophy className="w-4 h-4" /> },
    { name: 'Darts', icon: <Icon.Trophy className="w-4 h-4" /> },
    { name: 'Futsal', icon: <Icon.Trophy className="w-4 h-4" /> },
  ];

  return (
    <aside className="hidden md:flex flex-col w-[220px] bg-white border-r border-winbuzz-blue/10 h-full overflow-y-auto no-scrollbar shadow-sm flex-shrink-0">
      <div className="p-5 border-b border-slate-50 bg-[#f8fafc]">
        <span className="text-[10px] font-black text-winbuzz-blue uppercase tracking-[0.3em] italic">Categories</span>
      </div>
      <div className="flex-1">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => onSelectSport(cat.name)}
            className={`w-full flex items-center justify-between px-6 py-3.5 border-b border-slate-50 group transition-all ${
              selectedSport === cat.name 
              ? 'bg-winbuzz-accent-blue text-winbuzz-blue border-l-4 border-l-winbuzz-blue shadow-inner' 
              : 'text-slate-600 hover:bg-slate-50 border-l-4 border-l-transparent'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className={`transition-all duration-300 ${selectedSport === cat.name ? 'text-winbuzz-blue scale-110' : 'text-slate-400 group-hover:text-winbuzz-blue'}`}>
                {cat.icon}
              </span>
              <span className={`text-[11px] font-black tracking-tight uppercase truncate italic ${selectedSport === cat.name ? 'text-winbuzz-blue' : 'text-slate-700'}`}>{cat.name}</span>
            </div>
            <span className={`text-[9px] transition-all ${selectedSport === cat.name ? 'text-winbuzz-blue' : 'text-slate-300 group-hover:translate-x-1 group-hover:text-winbuzz-blue'}`}>❯</span>
          </button>
        ))}
      </div>
      
      <div className="p-5 border-t border-slate-100 bg-[#f8fafc] space-y-4">
        <button onClick={() => onViewChange('Referral')} className="w-full bg-white border border-winbuzz-blue/20 py-3 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-sm hover:bg-winbuzz-blue group transition-all">
           <span className="text-[9px] font-black text-winbuzz-blue group-hover:text-white uppercase tracking-widest italic">REFER & EARN</span>
        </button>
        <button className="w-full bg-winbuzz-blue text-white py-3.5 rounded-2xl flex items-center justify-center gap-2 text-[11px] font-black uppercase hover:brightness-110 transition-all shadow-xl italic border-b-4 border-winbuzz-dark-blue active:translate-y-1">
           <img src="https://img.icons8.com/color/48/whatsapp.png" className="w-5 h-5 brightness-200 contrast-200" alt="whatsapp" />
           Instant ID Node
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
