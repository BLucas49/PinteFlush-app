import { create } from 'zustand';

import type { ARPlacementMode, ARPlacementSource, ARPlacementStatus } from '../types/ar.types';

interface ARPlacementState {
  status: ARPlacementStatus;
  mode: ARPlacementMode;
  source: ARPlacementSource | null;
  locked: boolean;
  resetKey: number;
  tableError: boolean;
  onTablePlaced: (source: ARPlacementSource) => void;
  switchToPlane: () => void;
  switchToCard: () => void;
  toggleLock: () => void;
  setTableError: (tableError: boolean) => void;
  reset: () => void;
}

export const useARPlacementStore = create<ARPlacementState>()((set) => ({
  status: 'searching',
  mode: 'card',
  source: null,
  locked: false,
  resetKey: 0,
  tableError: false,
  onTablePlaced: (source) =>
    set({
      source,
      status: 'placed',
    }),
  switchToPlane: () => set({ mode: 'plane' }),
  switchToCard: () => set({ mode: 'card' }),
  toggleLock: () => set((state) => ({ locked: !state.locked })),
  setTableError: (tableError) => set({ tableError }),
  reset: () =>
    set((state) => ({
      status: 'searching',
      mode: 'card',
      source: null,
      locked: false,
      tableError: false,
      resetKey: state.resetKey + 1,
    })),
}));
