import { create, isAxiosError } from 'axios';

import { API_PREFIX } from '../constants/API';
import { toAppError } from './errors';

declare module 'axios' {
  interface AxiosRequestConfig {
    /** Ne pas tenter de renouveler la session sur 401 (login, renew…). */
    skipAuthRefresh?: boolean;
    /** Requête déjà rejouée après un renouvellement de session. */
    _retried?: boolean;
  }
}

type HttpConfig = {
  baseUrl: string;
  /** Renouvelle la session (cookie refresh_token). Rejette si la session est expirée. */
  refreshSession: () => Promise<void>;
  /** Appelé quand le renouvellement échoue : l'utilisateur doit se reconnecter. */
  onSessionExpired: () => void;
};

/**
 * Le back authentifie par cookies httpOnly (access_token / refresh_token) :
 * le cookie jar natif de React Native les stocke et les renvoie seul.
 */
export const axiosInstance = create({
  headers: { 'Content-Type': 'application/json' },
  timeout: 30_000,
  withCredentials: true,
});

let interceptorId: number | null = null;
let refreshInFlight: Promise<void> | null = null;

/**
 * Un seul renouvellement à la fois : le back fait une rotation du refresh token,
 * deux appels concurrents avec le même cookie invalideraient la session.
 */
const refreshOnce = (refreshSession: () => Promise<void>): Promise<void> => {
  refreshInFlight ??= refreshSession().finally(() => {
    refreshInFlight = null;
  });
  return refreshInFlight;
};

export const configureHttp = ({ baseUrl, refreshSession, onSessionExpired }: HttpConfig) => {
  if (interceptorId !== null) {
    axiosInstance.interceptors.response.eject(interceptorId);
  }
  axiosInstance.defaults.baseURL = `${baseUrl}${API_PREFIX}`;
  interceptorId = axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: unknown) => {
      const appError = toAppError(error);
      const config = isAxiosError(error) ? error.config : undefined;

      if (appError.code !== 'UNAUTHORIZED' || !config || config.skipAuthRefresh || config._retried) {
        throw appError;
      }

      try {
        await refreshOnce(refreshSession);
      } catch (refreshError) {
        const refreshAppError = toAppError(refreshError);
        // Une erreur réseau pendant le renouvellement ne doit pas déconnecter l'utilisateur
        if (refreshAppError.code === 'UNAUTHORIZED') {
          onSessionExpired();
          throw appError;
        }
        throw refreshAppError;
      }

      config._retried = true;
      return axiosInstance(config);
    },
  );
};
