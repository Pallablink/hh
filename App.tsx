
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MatchList from './components/MatchList';
import CasinoSection from './components/CasinoSection';
import MatchDetail from './components/MatchDetail';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import DepositView from './components/DepositView';
import WithdrawView from './components/WithdrawView';
import MyBetsView from './components/MyBetsView';
import ReferralView from './components/ReferralView';
import BonusList from './components/BonusList';
import ProfitLoss from './components/ProfitLoss';
import AccountStatement from './components/AccountStatement';
import StakeSettings from './components/StakeSettings';
import ChangePassword from './components/ChangePassword';
import ForgotPassword from './components/ForgotPassword';
import KYCView from './components/KYCView';
import VIPView from './components/VIPView';
import ProfileSettings from './components/ProfileSettings';
import SecurityHistory from './components/SecurityHistory';
import ResponsibleGaming from './components/ResponsibleGaming';
import SupportView from './components/SupportView';
import MultiMatchView from './components/MultiMatchView';
import LeaderboardView from './components/LeaderboardView';
import WalletView from './components/WalletView';
import RulesView from './components/RulesView';
import NewsView from './components/NewsView';
import BuzBot from './components/BuzBot';
import BetSlip from './components/BetSlip';
import Loader from './components/Loader';
import LiveTicker from './components/LiveTicker';
import ToastContainer, { ToastMessage, ToastType } from './components/ToastContainer';
import { Match, Bet, User, SportType, ViewState, CurrencyCode } from './types';
import { MOCK_MATCHES } from './constants';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [currency, setCurrency] = useState<CurrencyCode>('INR');

  const exchangeRates: Record<CurrencyCode, number> = {
    INR: 1,
    USD: 0.012,
    EUR: 0.011
  };

  const currencySymbols: Record<CurrencyCode, string> = {
    INR: '₹',
    USD: '$',
    EUR: '€'
  };

  const formatValue = (val: number) => {
    const converted = val * exchangeRates[currency];
    return `${currencySymbols[currency]}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const [user, setUser] = useState<User>({
    username: 'Blue Operator',
    balance: 15000.00,
    exposure: 0.00,
    isLoggedIn: false,
    id: 'WB_BLUE_NODE',
    referralCode: 'FASTWIN',
    kycStatus: 'Verified',
    vipLevel: 3,
    limits: { dailyDeposit: 100000, betLimit: 25000 }
  });
  const [currentView, setCurrentView] = useState<ViewState>('Dashboard');
  const [selectedSport, setSelectedSport] = useState<SportType>('Cricket');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [bets, setBets] = useState<Bet[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const addToast = useCallback((type: ToastType, title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 11);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (username: string) => {
    setUser(prev => ({ ...prev, username, isLoggedIn: true }));
    setIsLoginModalOpen(false);
    addToast('success', 'Terminal Synced', 'Operator identity authenticated.');
  };

  const handleLogout = () => {
    setUser(prev => ({ ...prev, isLoggedIn: false }));
    setCurrentView('Dashboard');
    addToast('info', 'Session Terminated', 'Secure node connection closed.');
  };

  const navigateTo = (view: ViewState, match: Match | null = null) => {
    setCurrentView(view);
    if (match) setSelectedMatch(match);
    else setSelectedMatch(null);
  };

  const filteredMatches = useMemo(() => {
    return MOCK_MATCHES.filter(m => 
      (m.sport === selectedSport || currentView === 'Dashboard') &&
      (m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       m.league.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, selectedSport, currentView]);

  const handleOddsClick = (betData: Omit<Bet, 'id' | 'status' | 'date'>) => {
    if (!user.isLoggedIn) { 
      setIsLoginModalOpen(true); 
      addToast('info', 'Auth Required', 'Please link your operator ID to place wagers.');
      return; 
    }
    const newBet: Bet = {
      ...betData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'Matched',
      date: new Date().toISOString()
    };
    setBets(prev => [newBet, ...prev]);
    addToast('success', 'Position Added', `${betData.runnerName} @ ${betData.odds}`);
  };

  const updateBetStake = (id: string, stake: number) => {
    setBets(prev => prev.map(b => {
      if (b.id === id) {
        const profit = b.type === 'Back' ? stake * (b.odds - 1) : stake;
        return { ...b, stake, potentialProfit: profit };
      }
      return b;
    }));
  };

  const renderContent = () => {
    switch (currentView) {
      case 'MatchDetail': return selectedMatch && <MatchDetail match={selectedMatch} onPlaceBet={handleOddsClick} onClose={() => navigateTo('Dashboard')} onNavigate={navigateTo} currency={currency} formatValue={formatValue} />;
      case 'Casino': return <CasinoSection />;
      case 'Deposit': return <DepositView onBack={() => navigateTo('Dashboard')} onNotify={addToast} />;
      case 'Withdraw': return <WithdrawView onBack={() => navigateTo('Dashboard')} onNotify={addToast} />;
      case 'MyBets': return <MyBetsView bets={bets} onBack={() => navigateTo('Dashboard')} formatValue={formatValue} />;
      case 'Referral': return <ReferralView onBack={() => navigateTo('Dashboard')} onNotify={addToast} />;
      case 'BonusList': return <BonusList onBack={() => navigateTo('Dashboard')} formatValue={formatValue} />;
      case 'ProfitLoss': return <ProfitLoss onBack={() => navigateTo('Dashboard')} formatValue={formatValue} />;
      case 'AccountStatement': return <AccountStatement onBack={() => navigateTo('Dashboard')} formatValue={formatValue} />;
      case 'StakeSettings': return <StakeSettings onBack={() => navigateTo('Dashboard')} onNotify={addToast} currency={currency} formatValue={formatValue} />;
      case 'ChangePassword': return <ChangePassword onBack={() => navigateTo('Dashboard')} onNotify={addToast} />;
      case 'ForgotPassword': return <ForgotPassword onBack={() => navigateTo('Dashboard')} onNotify={addToast} />;
      case 'KYC': return <KYCView onBack={() => navigateTo('Dashboard')} currentStatus={user.kycStatus} onNotify={addToast} />;
      case 'VIP': return <VIPView onBack={() => navigateTo('Dashboard')} userLevel={user.vipLevel} formatValue={formatValue} />;
      case 'ProfileSettings': return <ProfileSettings user={user} onBack={() => navigateTo('Dashboard')} onUpdate={(u) => setUser(p => ({...p, ...u}))} onNotify={addToast} />;
      case 'SecurityHistory': return <SecurityHistory onBack={() => navigateTo('Dashboard')} />;
      case 'ResponsibleGaming': return <ResponsibleGaming onBack={() => navigateTo('Dashboard')} user={user} onUpdate={(limits) => setUser(p => ({...p, limits}))} onNotify={addToast} />;
      case 'Support': return <SupportView onBack={() => navigateTo('Dashboard')} onNotify={addToast} />;
      case 'MultiMatch': return <MultiMatchView onBack={() => navigateTo('Dashboard')} onOddsClick={handleOddsClick} formatValue={formatValue} />;
      case 'Leaderboard': return <LeaderboardView onBack={() => navigateTo('Dashboard')} formatValue={formatValue} />;
      case 'Wallet': return <WalletView user={user} onBack={() => navigateTo('Dashboard')} formatValue={formatValue} />;
      case 'Rules': return <RulesView onBack={() => navigateTo('Dashboard')} />;
      case 'News': return <NewsView onBack={() => navigateTo('Dashboard')} />;
      default: return (
        <div className="space-y-4">
          <CasinoSection />
          <div className="flex items-center gap-3 bg-winbuzz-blue/5 p-4 rounded-2xl border border-winbuzz-blue/10">
            <span className="text-winbuzz-dark-blue font-black uppercase text-[11px] italic">Market Node:</span>
            <span className="bg-winbuzz-blue text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest italic shadow-sm">{selectedSport}</span>
          </div>
          <MatchList 
            matches={filteredMatches} 
            onSelectMatch={(m) => navigateTo('MatchDetail', m)} 
            onOddsClick={handleOddsClick}
            currency={currency}
            formatValue={formatValue}
          />
          {filteredMatches.length === 0 && (
            <div className="bg-white p-24 rounded-[3rem] border border-slate-200 text-center flex flex-col items-center gap-4 opacity-40 shadow-inner">
               <span className="text-4xl">📡</span>
               <p className="text-sm font-black uppercase italic tracking-widest text-slate-900">Scanning for live {selectedSport} signals...</p>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900">
      {isLoading && <Loader />}
      <ToastContainer toasts={toasts} onRemove={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      <Navbar 
        user={user} 
        onLoginClick={() => setIsLoginModalOpen(true)} 
        onRegisterClick={() => setIsRegisterModalOpen(true)}
        onViewChange={navigateTo} 
        onLogout={handleLogout}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        currency={currency}
        onCurrencyChange={setCurrency}
        formatValue={formatValue}
      />
      
      <LiveTicker />

      <div className="flex flex-1 overflow-hidden h-full">
        <Sidebar selectedSport={selectedSport} onSelectSport={(s) => { setSelectedSport(s); navigateTo('Dashboard'); }} onViewChange={navigateTo} />

        <main className="flex-1 overflow-y-auto p-4 scrollbar-thin bg-slate-50/50">
          <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-4">
            <div className="flex-1 min-w-0">
              {renderContent()}
            </div>

            {/* Right Sidebar */}
            <div className="hidden lg:flex flex-col gap-4 w-[300px] flex-shrink-0">
               <BetSlip 
                 bets={bets} 
                 balance={user.balance} 
                 onClear={() => setBets([])} 
                 onPlaceBets={() => { 
                   if(bets.length === 0) return;
                   setBets([]); 
                   addToast('success', 'Terminal Update', 'Positions successfully committed to exchange.'); 
                 }}
                 onUpdateStake={updateBetStake}
                 formatValue={formatValue}
               />
               <div className="bg-white p-6 rounded-3xl border border-winbuzz-blue/10 shadow-lg space-y-4">
                  <h4 className="text-[11px] font-black uppercase italic tracking-widest text-winbuzz-blue">Node Status</h4>
                  <div className="space-y-3">
                     <div className="flex justify-between items-center text-[10px] font-black uppercase">
                        <span className="text-slate-400">Network Latency</span>
                        <span className="text-green-600">12ms</span>
                     </div>
                     <div className="flex justify-between items-center text-[10px] font-black uppercase">
                        <span className="text-slate-400">Mirror Integrity</span>
                        <span className="text-winbuzz-blue">99.9%</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </main>
      </div>

      <BuzBot onNotify={addToast} />

      <footer className="bg-[#0f172a] py-3 text-center text-winbuzz-accent-blue/50 text-[10px] font-black tracking-[0.4em] italic border-t border-white/5">
        WINBUZZ LIGHT EXCHANGE • GLOBAL DATA MIRROR • ENCRYPTED SESSION
      </footer>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLogin={handleLogin} 
        onForgotPassword={() => navigateTo('ForgotPassword')} 
      />
      <RegisterModal 
        isOpen={isRegisterModalOpen} 
        onClose={() => setIsRegisterModalOpen(false)} 
        onLoginClick={() => { setIsRegisterModalOpen(false); setIsLoginModalOpen(true); }} 
        onNotify={addToast}
      />
    </div>
  );
};

export default App;
