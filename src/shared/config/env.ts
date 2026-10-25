export type Env = {
  apiUrl: string;
  wsUrl: string;
};

type RawEnv = Partial<Record<'apiUrl' | 'wsUrl', string | undefined>>;

const required = (name: string, value: string | undefined): string => {
  if (!value) {
    throw new Error(`Variable d'environnement manquante : ${name} (voir .env.example)`);
  }
  return value;
};

export const parseEnv = (raw: RawEnv): Env => ({
  apiUrl: required('EXPO_PUBLIC_API_URL', raw.apiUrl).replace(/\/+$/, ''),
  wsUrl: required('EXPO_PUBLIC_WS_URL', raw.wsUrl).replace(/\/+$/, ''),
});

export const getEnv = (): Env =>
  parseEnv({
    apiUrl: process.env.EXPO_PUBLIC_API_URL,
    wsUrl: process.env.EXPO_PUBLIC_WS_URL,
  });
