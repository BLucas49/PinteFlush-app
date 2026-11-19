/** Règles alignées sur le back (PinteFlush-back/src/backend/core/utils/validation.ts et auth/dto.ts). */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAIL_MAX_LENGTH = 254;
export const PASSWORD_MIN_LENGTH = 20;

/** Renvoie un message d'erreur, ou null si l'email est valide. */
export const validateEmail = (email: string): string | null => {
  const value = email.trim();
  if (value === '') {
    return "L'email est requis.";
  }
  if (value.length > EMAIL_MAX_LENGTH || !EMAIL_REGEX.test(value)) {
    return "Format d'email invalide.";
  }
  return null;
};

/** Renvoie un message d'erreur, ou null si le mot de passe est valide. */
export const validatePassword = (password: string): string | null => {
  if (password === '') {
    return 'Le mot de passe est requis.';
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    return `Le mot de passe doit contenir au moins ${PASSWORD_MIN_LENGTH} caractères.`;
  }
  return null;
};
