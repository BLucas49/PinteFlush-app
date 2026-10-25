import { create } from 'axios';

import { API_PREFIX } from '../constants/API';
import { toAppError } from './errors';

type HttpConfig = {
  baseUrl: string;
  getToken: () => string | null;
  onUnauthorized: () => void;
};

export const axiosInstance = create({
  headers: { 'Content-Type': 'application/json' },
  timeout: 30_000,
});

let interceptorIds: { request: number; response: number } | null = null;

export const configureHttp = ({ baseUrl, getToken, onUnauthorized }: HttpConfig) => {
  if (interceptorIds) {
    axiosInstance.interceptors.request.eject(interceptorIds.request);
    axiosInstance.interceptors.response.eject(interceptorIds.response);
  }
  axiosInstance.defaults.baseURL = `${baseUrl}${API_PREFIX}`;
  interceptorIds = {
    request: axiosInstance.interceptors.request.use((config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }),
    response: axiosInstance.interceptors.response.use(
      (response) => response,
      (error: unknown) => {
        const appError = toAppError(error);
        if (appError.code === 'UNAUTHORIZED') {
          onUnauthorized();
        }
        return Promise.reject(appError);
      },
    ),
  };
};
