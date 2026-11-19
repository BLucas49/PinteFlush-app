export const arLog = (...args: unknown[]) => {
  if (__DEV__) {
    console.warn('[AR]', ...args);
  }
};
