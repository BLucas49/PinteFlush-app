import type { BoardCard } from '../types/cards.types';

// Données de test, à remplacer par l'état de la partie
export const MOCK_BOARD: BoardCard[] = [
  {
    id: 'A_spades',
    faceUp: true,
  },
  {
    id: 'K_hearts',
    faceUp: true,
  },
  {
    id: '10_clubs',
    faceUp: true,
  },
  {
    id: 'Q_diamonds',
    faceUp: true,
  },
  {
    id: 'J_spades',
    faceUp: false,
  },
];
