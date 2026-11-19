import { useState } from 'react';

import { toAppError } from '@/shared/lib/errors';

import { useAuthStore } from '../store/authStore';
import { validateEmail, validatePassword } from '../utils/validation';

export const useLogin = () => {
  const signIn = useAuthStore((s) => s.signIn);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Les erreurs de champ ne s'affichent qu'après une première tentative
  const [showFieldErrors, setShowFieldErrors] = useState(false);

  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  const isValid = emailError === null && passwordError === null;

  const submit = async () => {
    if (submitting) {
      return;
    }
    setShowFieldErrors(true);
    if (!isValid) {
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      // En cas de succès, RootNavigator bascule sur l'app (status 'authenticated')
      await signIn({
        email: email.trim(),
        password,
      });
    } catch (e) {
      setError(toAppError(e).message);
      setSubmitting(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    emailError: showFieldErrors ? emailError : null,
    passwordError: showFieldErrors ? passwordError : null,
    submitting,
    error,
    submit,
  };
};
