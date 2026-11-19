import type { CurrentPlayer, GameInfo, GamePhase, GamePlayer } from '../types/game.types';

// Données de test, à remplacer par l'état de la partie
export const MOCK_GAME_INFO: GameInfo = {
  title: 'Le Monday Club',
  subtitle: "Main 1 · Hold'em NL · Blindes 25 / 50",
};

export const MOCK_OPPONENTS: GamePlayer[] = [
  {
    id: '1',
    firstName: 'Alex',
    lastName: 'Martin',
    role: 'D',
    totalChips: 2000,
    isWaiting: true,
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Chen',
    role: 'SB',
    totalChips: 1975,
    currentBet: 25,
  },
];
export const MOCK_POT = 75;
export const MOCK_PHASE: GamePhase = 'preflop';

export const MOCK_CURRENT_PLAYER: CurrentPlayer = {
  isMyTurn: true,
  firstName: 'Julien',
  lastName: 'Dupont',
  totalChips: 2200,
  currentBet: 0,
  followAmount: 50,
  minRaise: 100,
  hand: ['A_spades', 'Q_spades'],
  secondsLeft: 22,
  turnDuration: 30,
};
