import type { CardId } from '@/features/ar';

export type GamePhase = 'preflop' | 'flop' | 'turn' | 'river';

export type PlayerRole = 'D' | 'SB' | 'BB' | 'none';

export interface GamePlayer {
  id: string;
  firstName: string;
  lastName: string;
  role: PlayerRole;
  totalChips: number;
  currentBet?: number;
  isWaiting?: boolean;
}

export interface CurrentPlayer {
  isMyTurn: boolean;
  firstName: string;
  lastName: string;
  totalChips: number;
  currentBet: number;
  followAmount: number;
  minRaise: number;
  hand: [CardId, CardId];
  secondsLeft: number;
  turnDuration: number;
}

export interface GameInfo {
  title: string;
  subtitle: string;
}
