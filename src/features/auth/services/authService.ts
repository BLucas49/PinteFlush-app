import { axiosInstance } from '@/shared/lib/axios';
import type { ApiSuccess } from '@/shared/types/api.types';
import type { User } from '@/shared/types/user.types';

/** Routes relatives au préfixe /api (voir PinteFlush-back/src/backend/routes). */
export const AUTH_ROUTES = {
  login: '/login',
  renew: '/renew',
  logout: '/auth/logout',
  me: '/auth/user/me',
} as const;

export interface Credentials {
  email: string;
  password: string;
}

/** Profil renvoyé par GET /auth/user/me (UserDetails côté back). */
interface MeResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  elo: number;
  bio: string | null;
  createdAt: string;
}

/** Ouvre une session : le back pose les cookies access_token et refresh_token. */
export const login = async (credentials: Credentials): Promise<void> => {
  await axiosInstance.post(AUTH_ROUTES.login, credentials, { skipAuthRefresh: true });
};

/** Renouvelle la session à partir du cookie refresh_token (rotation côté back). */
export const renewSession = async (): Promise<void> => {
  await axiosInstance.post(AUTH_ROUTES.renew, undefined, { skipAuthRefresh: true });
};

/** Ferme toutes les sessions de l'utilisateur côté back et efface les cookies. */
export const logout = async (): Promise<void> => {
  await axiosInstance.post(AUTH_ROUTES.logout);
};

export const fetchMe = async (): Promise<User> => {
  const { data } = await axiosInstance.get<ApiSuccess<MeResponse>>(AUTH_ROUTES.me);
  const { id, email, firstName, lastName, elo, bio } = data.data;
  return {
    id,
    email,
    firstName,
    lastName,
    elo,
    bio,
  };
};
