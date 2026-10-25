import { create } from 'zustand';

import type { User } from '@/shared/types/user.types';

export type AuthStatus = 'loading' | 'unauthenticated' | 'authenticated';

interface AuthState {
  status: AuthStatus;
  token: string | null;
  user: User | null;
  signIn: (session: { token: string; user: User | null }) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  status: 'unauthenticated',
  token: null,
  user: null,
  signIn: ({ token, user }) => set({ status: 'authenticated', token, user }),
  signOut: () => set({ status: 'unauthenticated', token: null, user: null }),
}));
