import { isAxiosError } from 'axios';

export type AppErrorCode = 'NETWORK' | 'TIMEOUT' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'NOT_FOUND' | 'SERVER' | 'UNKNOWN';

export class AppError extends Error {
  constructor(
    public readonly code: AppErrorCode,
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

const fromStatus = (status: number): AppErrorCode => {
  if (status === 401) {
    return 'UNAUTHORIZED';
  }
  if (status === 403) {
    return 'FORBIDDEN';
  }
  if (status === 404) {
    return 'NOT_FOUND';
  }
  return status >= 500 ? 'SERVER' : 'UNKNOWN';
};

export const toAppError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }
  if (isAxiosError(error)) {
    if (error.code === 'ECONNABORTED') {
      return new AppError('TIMEOUT', 'Le serveur met trop de temps à répondre.');
    }
    if (!error.response) {
      return new AppError('NETWORK', 'Impossible de joindre le serveur.');
    }
    const { status, data } = error.response;
    const message = typeof data?.message === 'string' ? data.message : error.message;
    return new AppError(fromStatus(status), message, status);
  }
  return new AppError('UNKNOWN', error instanceof Error ? error.message : 'Erreur inconnue.');
};
