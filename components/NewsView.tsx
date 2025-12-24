
import React from 'react';

interface NewsViewProps {
  onBack: () => void;
}

const NewsView: React.FC<NewsViewProps> = ({ onBack }) => {
  const newsItems = [
    {
      id: 'n1',
      title: 'The Ashes: Australia Favorites as Pitch Syncs with Spinners',
      summary: 'Data mirror nodes suggest a turning track on day 4. Liquidity pouring into Australian Back markets.',
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800',
      date: 'Dec 15, 2025',
      category: 'Cricket'
    },
    {
      id: 'n2',
      title: 'Premier League: Haaland Out of Derby, Market Fluctuating',
      summary: 'Man City odds drift as star striker enters recovery node. Tactical shift expected from Guardiola.',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
      date: 'Dec 14, 2025',
      category: 'Football'
    },
    {
      id: 'n3',
      title: 'Grand Slam Sync: Djokovic Training Intensity High',
      summary: 'Satellite feeds show relentless preparation. Betting volume for straight sets win increasing.',
      image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a4bd13?auto=format&fit=crop&q=80&w=800',
      date: 'Dec 13, 2025',
      category: 'Tennis'
    }
  ];

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-winbuzz-blue/10">
        <button onClick={onBack} className="bg-winbuzz-blue text-white px-4 py-1.5 rounded-xl font-black text-xs uppercase italic shadow-sm hover:brightness-110">❮ Back</button>
        <h2 className="text-sm font-black uppercase italic tracking-tighter">Exchange News & Previews</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((news) => (
          <div key={news.id} className="bg-white rounded-[2rem] overflow-hidden border border-winbuzz-blue/10 shadow-lg hover:shadow-2xl transition-all group">
            <div className="relative h-48 overflow-hidden">
               <img src={news.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={news.title} />
               <div className="absolute top-4 left-4">
                  <span className="bg-winbuzz-blue text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest italic shadow-lg">{news.category}</span>
               </div>
            </div>
            <div className="p-6 space-y-3">
               <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{news.date}</span>
               <h3 className="text-sm font-black text-slate-800 uppercase italic tracking-tighter leading-tight group-hover:text-winbuzz-blue transition-colors">{news.title}</h3>
               <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{news.summary}</p>
               <button className="pt-2 text-[9px] font-black text-winbuzz-blue uppercase italic tracking-widest hover:underline">Read Full Analysis ❯</button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white p-12 rounded-[2.5rem] border border-winbuzz-blue/5 text-center space-y-4">
         <h4 className="text-xl font-black uppercase italic tracking-tighter text-slate-800">Subscribe to Node Alerts</h4>
         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest max-w-sm mx-auto">Get instant match previews and market shifts pushed directly to your terminal.</p>
         <div className="flex max-w-md mx-auto gap-2">
            <input type="email" placeholder="Enter Operator Email" className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 text-xs italic font-black outline-none focus:border-winbuzz-blue" />
            <button className="bg-winbuzz-blue text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase shadow-lg hover:brightness-110 italic">SYNC</button>
         </div>
      </div>
    </div>
  );
};

export default NewsView;
