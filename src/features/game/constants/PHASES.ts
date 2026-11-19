import type { GamePhase } from '../types/game.types';

export const PHASE_LABELS: Record<GamePhase, string> = {
  preflop: 'PRÉFLOP',
  flop: 'FLOP',
  turn: 'TURN',
  river: 'RIVER',
};
