
import { Match, CasinoGame, SecurityLog, LeaderboardEntry } from './types';

export const MOCK_MATCHES: Match[] = [
  // Cricket
  {
    id: 'm1', sport: 'Cricket', title: 'Australia vs England', status: 'Live', startTime: 'In-Play', league: 'The Ashes', hasTv: true, hasFancy: true, hasBookmaker: true,
    runners: [
      { id: 'r1', name: 'Australia', back: [{ price: 1.06, size: '5252k' }], lay: [{ price: 1.21, size: '20k' }] },
      { id: 'r2', name: 'England', back: [{ price: 8.80, size: '1k' }], lay: [{ price: 9.00, size: '63' }] }
    ],
    fancyMarkets: [{ id: 'f1', name: 'Australia Total Runs', yes: { price: 450, size: '1.95' }, no: { price: 450, size: '1.95' } }]
  },
  {
    id: 'm1_alt', sport: 'Cricket', title: 'India vs South Africa', status: 'Live', startTime: '12.4 Overs', league: 'T20 Series', hasTv: true, hasFancy: true, hasBookmaker: true,
    runners: [
      { id: 'r1_in', name: 'India', back: [{ price: 1.85, size: '500k' }], lay: [{ price: 1.87, size: '50k' }] },
      { id: 'r2_sa', name: 'South Africa', back: [{ price: 2.14, size: '400k' }], lay: [{ price: 2.16, size: '40k' }] }
    ]
  },
  // Football
  {
    id: 'm_fb1', sport: 'Football', title: 'Manchester City vs Liverpool', status: 'Live', startTime: '65\'', league: 'Premier League', hasTv: true,
    runners: [
      { id: 'r_fb1', name: 'Man City', back: [{ price: 1.45, size: '100k' }], lay: [{ price: 1.48, size: '10k' }] },
      { id: 'r_fb2', name: 'Liverpool', back: [{ price: 4.20, size: '20k' }], lay: [{ price: 4.40, size: '5k' }] }
    ]
  },
  {
    id: 'm_fb2', sport: 'Football', title: 'Real Madrid vs Barcelona', status: 'Upcoming', startTime: 'Tonight 11:30 PM', league: 'La Liga', hasTv: true,
    runners: [
      { id: 'r_rm', name: 'Real Madrid', back: [{ price: 1.95, size: '2M' }], lay: [{ price: 1.98, size: '200k' }] },
      { id: 'r_bar', name: 'Barcelona', back: [{ price: 3.40, size: '1M' }], lay: [{ price: 3.50, size: '100k' }] }
    ]
  },
  // Tennis
  {
    id: 'm_tn1', sport: 'Tennis', title: 'Djokovic vs Nadal', status: 'Upcoming', startTime: 'Tomorrow 10:00 AM', league: 'Wimbledon',
    runners: [
      { id: 'r_tn1', name: 'Djokovic', back: [{ price: 1.80, size: '50k' }], lay: [{ price: 1.82, size: '5k' }] },
      { id: 'r_tn2', name: 'Nadal', back: [{ price: 2.10, size: '40k' }], lay: [{ price: 2.15, size: '4k' }] }
    ]
  },
  // Kabaddi
  {
    id: 'm_kb1', sport: 'Kabaddi', title: 'Patna Pirates vs Jaipur Pink Panthers', status: 'Live', startTime: '2nd Half', league: 'Pro Kabaddi',
    runners: [
      { id: 'r_kb1', name: 'Patna Pirates', back: [{ price: 2.50, size: '15k' }], lay: [{ price: 2.60, size: '2k' }] },
      { id: 'r_kb2', name: 'Pink Panthers', back: [{ price: 1.70, size: '30k' }], lay: [{ price: 1.75, size: '10k' }] }
    ]
  },
  // MMA
  {
    id: 'm_mma1', sport: 'Mixed Martial Arts', title: 'Makhachev vs Volkanovski', status: 'Upcoming', startTime: 'Sunday 9:00 PM', league: 'UFC 300',
    runners: [
      { id: 'r_mma1', name: 'Islam Makhachev', back: [{ price: 1.40, size: '200k' }], lay: [{ price: 1.42, size: '20k' }] },
      { id: 'r_mma2', name: 'Alexander Volkanovski', back: [{ price: 3.50, size: '50k' }], lay: [{ price: 3.65, size: '10k' }] }
    ]
  },
  // Politics
  {
    id: 'm_pol1', sport: 'Politics', title: 'US Election 2024 Winner', status: 'Upcoming', startTime: 'Nov 5', league: 'Presidential Election',
    runners: [
      { id: 'r_pol1', name: 'Democratic Party', back: [{ price: 1.90, size: '1M' }], lay: [{ price: 1.95, size: '100k' }] },
      { id: 'r_pol2', name: 'Republican Party', back: [{ price: 1.90, size: '1M' }], lay: [{ price: 1.95, size: '100k' }] }
    ]
  },
  // Horse Racing
  {
    id: 'm_hr1', sport: 'Horse Racing', title: 'Royal Ascot - Race 1', status: 'Upcoming', startTime: 'Today 1:30 PM', league: 'G1 Flat',
    runners: [
      { id: 'r_hr1', name: 'Stellar Wind', back: [{ price: 3.50, size: '5k' }], lay: [{ price: 3.75, size: '500' }] },
      { id: 'r_hr2', name: 'Mighty Heart', back: [{ price: 5.00, size: '2k' }], lay: [{ price: 5.50, size: '200' }] }
    ]
  }
];

export const CASINO_GAMES: CasinoGame[] = [
  { id: 'c1', title: 'Andar Bahar', category: 'Indian Games', image: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&q=80&w=400', provider: 'MAC88' },
  { id: 'c2', title: 'Baccarat', category: 'Live Dealer', image: 'https://images.unsplash.com/photo-1596838132731-dd96c2999c54?auto=format&fit=crop&q=80&w=400', provider: 'MAC88' },
  { id: 'c3', title: 'Teenpatti', category: 'Indian Games', image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&q=80&w=400', provider: 'EVO' },
  { id: 'c4', title: 'Roulette', category: 'Live Dealer', image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&q=80&w=400', provider: 'EVO' },
  { id: 'c5', title: 'Aviator', category: 'Instant', image: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&q=80&w=400', provider: 'SPRIBE' },
  { id: 'c6', title: 'Mines', category: 'Instant', image: 'https://images.unsplash.com/photo-1596838132731-dd96c2999c54?auto=format&fit=crop&q=80&w=400', provider: 'SPRIBE' }
];

export const MOCK_SECURITY_LOGS: SecurityLog[] = [
  { id: 's1', action: 'Successful Login', ip: '102.16.88.21', device: 'Chrome / Windows 11', date: '2025-12-12 14:30' },
  { id: 's2', action: 'Password Change', ip: '102.16.88.21', device: 'Chrome / Windows 11', date: '2025-12-11 10:15' },
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, username: 'Alpha_Whale', winRate: 84.5, profit: 1250000, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
  { rank: 2, username: 'Market_Ghost', winRate: 72.1, profit: 845000, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka' },
  { rank: 3, username: 'WinBuzz_King', winRate: 68.4, profit: 532000, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=George' },
  { rank: 4, username: 'Blue_Rider', winRate: 65.2, profit: 312000, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie' },
  { rank: 5, username: 'Bet_Ninja', winRate: 61.9, profit: 245000, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shadow' },
];
