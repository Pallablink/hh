
import React, { useState } from 'react';
import { User, ViewState, SportType, CurrencyCode } from '../types';
import { Icon } from './Icons';

interface NavbarProps {
  user: User;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onLogout: () => void;
  onViewChange: (view: ViewState) => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  formatValue: (val: number) => string;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLoginClick, onRegisterClick, onLogout, onViewChange, searchTerm, onSearchChange, currency, onCurrencyChange, formatValue }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const menuSections = [
    {
      title: 'Banking & Funds',
      items: [
        { label: 'Wallet Terminal', view: 'Wallet' },
        { label: 'Deposit Funds', view: 'Deposit' },
        { label: 'Withdrawal Portal', view: 'Withdraw' },
      ]
    },
    {
      title: 'Exchange History',
      items: [
        { label: 'Open Positions', view: 'MyBets' },
        { label: 'Account Statement', view: 'AccountStatement' },
        { label: 'P&L Analytics', view: 'ProfitLoss' },
      ]
    },
    {
      title: 'Account Settings',
      items: [
        { label: 'Profile Manager', view: 'ProfileSettings' },
        { label: 'KYC Node Verification', view: 'KYC' },
        { label: 'Security Panel', view: 'ChangePassword' },
        { label: 'Security Logs', view: 'SecurityHistory' },
      ]
    },
    {
      title: 'Promotions & Social',
      items: [
        { label: 'VIP Club Status', view: 'VIP' },
        { label: 'Reward Inventory', view: 'BonusList' },
        { label: 'Global Leaderboard', view: 'Leaderboard' },
        { label: 'Referral Center', view: 'Referral' },
        { label: 'News & Previews', view: 'News' },
      ]
    },
    {
      title: 'Help & Governance',
      items: [
        { label: 'Support Live Node', view: 'Support' },
        { label: 'Multi-Market View', view: 'MultiMatch' },
        { label: 'Protocol Rules', view: 'Rules' },
        { label: 'Responsible Gaming', view: 'ResponsibleGaming' },
      ]
    }
  ];

  return (
    <header className="flex flex-col z-[110] relative shadow-md bg-white">
      {/* Main Header */}
      <div className="header-gradient h-[64px] px-6 flex items-center justify-between">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => onViewChange('Dashboard')}>
          <div className="flex items-center gap-2">
            <span className="text-white font-black italic text-2xl tracking-tighter drop-shadow-md">WB <span className="text-blue-100">WINBUZZ</span></span>
          </div>
        </div>

        <div className="flex items-center gap-5 flex-1 justify-end max-w-4xl">
          {/* Currency Switcher */}
          <div className="relative">
            <button 
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full text-[10px] font-black border border-white/20 transition-all flex items-center gap-2"
            >
              <span className="opacity-60">{currency}</span>
              <span className="text-[8px]">▼</span>
            </button>
            {showCurrencyDropdown && (
              <>
                <div className="fixed inset-0 z-[125]" onClick={() => setShowCurrencyDropdown(false)} />
                <div className="absolute right-0 mt-2 w-24 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-[130] animate-in slide-in-from-top-1 duration-200">
                  {(['INR', 'USD', 'EUR'] as CurrencyCode[]).map(c => (
                    <button
                      key={c}
                      onClick={() => { onCurrencyChange(c); setShowCurrencyDropdown(false); }}
                      className={`w-full text-left px-4 py-2 text-[10px] font-black uppercase hover:bg-slate-50 ${currency === c ? 'text-winbuzz-blue' : 'text-slate-600'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="relative w-64 hidden lg:block">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Live Markets..." 
              className="w-full bg-white/10 border border-white/20 rounded-full py-2 px-10 text-[11px] font-bold focus:outline-none placeholder:text-white/60 text-white transition-all focus:bg-white/20"
            />
            <span className="absolute left-4 top-2.5 text-white/50"><Icon.Search className="w-3.5 h-3.5" /></span>
          </div>

          {!user.isLoggedIn ? (
            <div className="flex items-center gap-3">
              <button 
                onClick={(e) => { e.preventDefault(); onLoginClick(); }} 
                className="bg-white/10 text-white hover:bg-white/20 px-6 py-2.5 rounded-full text-[10px] font-black uppercase border border-white/40 shadow-sm transition-all"
              >
                SIGN IN
              </button>
              <button 
                onClick={(e) => { e.preventDefault(); onRegisterClick(); }} 
                className="bg-white text-winbuzz-blue hover:bg-winbuzz-light-blue px-6 py-2.5 rounded-full text-[10px] font-black uppercase shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:scale-105 transition-all border border-white"
              >
                JOIN NOW
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex flex-col text-right text-[10px] leading-tight font-black text-white">
                <span className="opacity-70 uppercase tracking-tighter text-[8px]">Current Balance</span>
                <span className="text-sm">{formatValue(user.balance)}</span>
              </div>
              
              <div className="h-8 w-px bg-white/20 hidden sm:block" />

              <div className="relative">
                <button 
                  onClick={() => setShowMenu(!showMenu)}
                  className="bg-white text-winbuzz-blue px-5 py-2.5 rounded-full flex items-center gap-2 text-[10px] font-black uppercase shadow-md transition-all hover:bg-winbuzz-light-blue border border-winbuzz-blue/10"
                >
                  <Icon.User className="w-4 h-4" /> 
                  <span className="hidden sm:inline">ACCOUNT</span>
                  <span className="opacity-40 text-[8px]">▼</span>
                </button>
                
                {showMenu && (
                  <>
                    <div className="fixed inset-0 z-[115]" onClick={() => setShowMenu(false)} />
                    <div className="absolute right-0 mt-3 w-80 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-100 py-2 z-[120] animate-in slide-in-from-top-2 duration-300 overflow-hidden">
                      <div className="px-6 py-5 border-b border-slate-50 mb-1 bg-winbuzz-light-blue">
                        <p className="text-[9px] font-black text-winbuzz-blue uppercase tracking-widest">Authenticated Node</p>
                        <p className="text-xs font-black uppercase italic truncate text-slate-900">{user.username}</p>
                      </div>
                      
                      <div className="max-h-[480px] overflow-y-auto no-scrollbar py-2">
                        {menuSections.map((section) => (
                          <div key={section.title} className="mb-4 last:mb-0">
                            <div className="px-6 mb-1">
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{section.title}</span>
                            </div>
                            {section.items.map((item) => (
                              <button 
                                key={item.label}
                                onClick={() => { onViewChange(item.view as ViewState); setShowMenu(false); }} 
                                className="w-full text-left px-6 py-2.5 text-[11px] font-bold text-slate-600 hover:bg-winbuzz-accent-blue hover:text-winbuzz-blue uppercase tracking-tighter transition-all flex items-center gap-3"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-winbuzz-blue/30"></span>
                                {item.label}
                              </button>
                            ))}
                          </div>
                        ))}
                      </div>

                      <button 
                        onClick={() => { onLogout(); setShowMenu(false); }} 
                        className="w-full text-left px-6 py-4 text-[11px] font-black text-red-600 hover:bg-red-50 uppercase tracking-tighter border-t border-slate-100 mt-1 flex items-center gap-3"
                      >
                        <Icon.Logout className="w-4 h-4" />
                        TERMINATE SESSION
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sub Nav Bar */}
      <nav className="bg-winbuzz-accent-blue text-winbuzz-dark-blue h-[44px] flex items-center px-6 overflow-x-auto no-scrollbar whitespace-nowrap border-b border-winbuzz-blue/10">
        <div className="flex h-full">
          {['LOBBY', 'CRICKET', 'FOOTBALL', 'TENNIS', 'CASINO', 'POLITICS', 'HORSE RACING', 'GREYHOUND', 'BINARY', 'KABADDI', 'BASKETBALL', 'BASEBALL', 'RUGBY'].map((item) => (
            <button 
              key={item} 
              onClick={() => onViewChange(item === 'CASINO' ? 'Casino' : 'Dashboard')}
              className={`px-5 h-full flex items-center text-[10px] font-black uppercase hover:bg-winbuzz-blue/10 transition-all border-r border-winbuzz-blue/5 last:border-0 tracking-tighter ${item === 'LOBBY' ? 'bg-winbuzz-blue text-white shadow-sm' : 'text-slate-700'}`}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
