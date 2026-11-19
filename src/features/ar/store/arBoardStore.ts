import { create } from 'zustand';

import { BOARD_SLOTS } from '../constants/AR';
import { CARD_IMAGES } from '../constants/CARDS';
import { MOCK_BOARD } from '../constants/MOCK_BOARD';
import type { BoardCard, CardId } from '../types/cards.types';

interface ARBoardState {
  board: BoardCard[];
  setBoard: (board: BoardCard[]) => void;
  toggleCard: (index: number) => void;
  toggleAllCards: () => void;
  addCard: () => void;
  removeCard: () => void;
}

const ALL_CARD_IDS = Object.keys(CARD_IMAGES) as CardId[];

export const useARBoardStore = create<ARBoardState>()((set) => ({
  board: MOCK_BOARD,
  setBoard: (board) => set({ board }),
  toggleCard: (index) =>
    set((state) => ({
      board: state.board.map((card, cardIndex) =>
        cardIndex === index
          ? {
              ...card,
              faceUp: !card.faceUp,
            }
          : card,
      ),
    })),
  toggleAllCards: () =>
    set((state) => ({
      board: state.board.map((card) => ({
        ...card,
        faceUp: !card.faceUp,
      })),
    })),
  // Ajoute une carte face cachée au hasard, parmi celles qui ne sont pas déjà sur le plateau
  addCard: () =>
    set((state) => {
      if (state.board.length >= BOARD_SLOTS.length) {
        return state;
      }
      const available = ALL_CARD_IDS.filter((id) => !state.board.some((card) => card.id === id));
      const id = available[Math.floor(Math.random() * available.length)];
      return {
        board: [
          ...state.board,
          {
            id,
            faceUp: false,
          },
        ],
      };
    }),
  // Retire la dernière carte du plateau
  removeCard: () => set((state) => ({ board: state.board.slice(0, -1) })),
}));
