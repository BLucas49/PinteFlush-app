import { create } from 'zustand';

import type { User } from '@/shared/types/user.types';

import { type Credentials, fetchMe, login, logout } from '../services/authService';

export type AuthStatus = 'loading' | 'unauthenticated' | 'authenticated';

interface AuthState {
  status: AuthStatus;
  user: User | null;
  /** Au démarrage : restaure la session si les cookies sont encore valides. */
  bootstrap: () => Promise<void>;
  /** Rejette avec une AppError si les identifiants sont refusés. */
  signIn: (credentials: Credentials) => Promise<void>;
  signOut: () => Promise<void>;
  /** Efface la session locale sans appeler le back (session expirée). */
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'loading',
  user: null,
  bootstrap: async () => {
    try {
      const user = await fetchMe();
      set({
        status: 'authenticated',
        user,
      });
    } catch {
      set({
        status: 'unauthenticated',
        user: null,
      });
    }
  },
  signIn: async (credentials) => {
    await login(credentials);
    const user = await fetchMe();
    set({
      status: 'authenticated',
      user,
    });
  },
  signOut: async () => {
    try {
      await logout();
    } catch {
      // Même si le back est injoignable, l'utilisateur doit être déconnecté localement
    } finally {
      get().clearSession();
    }
  },
  clearSession: () =>
    set({
      status: 'unauthenticated',
      user: null,
    }),
}));
