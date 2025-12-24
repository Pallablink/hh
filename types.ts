
export type SportType = 'Cricket' | 'Football' | 'Tennis' | 'Politics' | 'Casino' | 'Sports Book' | 'Horse Racing' | 'Greyhound Racing' | 'Binary' | 'Kabaddi' | 'Basketball' | 'Baseball' | 'Table Tennis' | 'Volleyball' | 'Ice Hockey' | 'Rugby' | 'Mixed Martial Arts' | 'Darts' | 'Futsal';

export type ViewState = 'Dashboard' | 'MatchDetail' | 'Casino' | 'Deposit' | 'Withdraw' | 'MyBets' | 'Referral' | 'BonusList' | 'ProfitLoss' | 'AccountStatement' | 'StakeSettings' | 'ChangePassword' | 'MultiMatch' | 'ForgotPassword' | 'KYC' | 'VIP' | 'ProfileSettings' | 'SecurityHistory' | 'ResponsibleGaming' | 'Support' | 'Leaderboard' | 'Wallet' | 'Rules' | 'News';

export type CurrencyCode = 'INR' | 'USD' | 'EUR';

export interface Odd {
  price: number;
  size: string;
}

export interface MarketRunner {
  id: string;
  name: string;
  back: Odd[];
  lay: Odd[];
}

export interface Match {
  id: string;
  sport: SportType;
  title: string;
  status: 'Live' | 'Upcoming';
  startTime: string;
  league: string;
  score?: string;
  hasTv?: boolean;
  hasFancy?: boolean;
  hasBookmaker?: boolean;
  runners: MarketRunner[];
  fancyMarkets?: {
    id: string;
    name: string;
    yes: Odd;
    no: Odd;
  }[];
  stats?: {
    team1: number[];
    team2: number[];
    winProbability: number;
  }
}

export interface Bet {
  id: string;
  matchId: string;
  matchTitle: string;
  runnerName: string;
  type: 'Back' | 'Lay';
  odds: number;
  stake: number;
  potentialProfit: number;
  status: 'Unmatched' | 'Matched' | 'Settled';
  date: string;
  eventDate?: string;
}

export interface SecurityLog {
  id: string;
  action: string;
  ip: string;
  device: string;
  date: string;
}

export interface User {
  username: string;
  balance: number;
  exposure: number;
  isLoggedIn: boolean;
  id: string;
  referralCode: string;
  kycStatus: 'None' | 'Pending' | 'Verified';
  vipLevel: number;
  avatarUrl?: string;
  limits?: {
    dailyDeposit: number;
    betLimit: number;
  }
}

export interface CasinoGame {
  id: string;
  title: string;
  category: string;
  image: string;
  provider?: string;
}

export interface WalletTransaction {
  id: string;
  date: string;
  credit: number | null;
  debit: number | null;
  balance: number;
  remark: string;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  winRate: number;
  profit: number;
  avatar: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  category: string;
}
