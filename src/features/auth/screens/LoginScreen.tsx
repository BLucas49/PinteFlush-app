import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { TextInput, View } from 'react-native';

import { AppButton } from '@/shared/components/AppButton';
import { PlaceholderScreen } from '@/shared/components/PlaceholderScreen';
import { useTheme } from '@/shared/hooks/useTheme';

import { useAuthStore } from '../store/authStore';

const LoginScreen = () => {
  const navigate = useNavigation();
  const { spacing } = useTheme();
  const signIn = useAuthStore((s) => s.signIn);

  const handleSignIn = () => signIn({ token: 'dev-token', user: { id: 'dev', username: 'Testeur' } });

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  return (
    <PlaceholderScreen title="Connexion">
      <TextInput
        style={{ flex: 1 }}
        onChangeText={setLogin}
        value={login}
        placeholder="Ex. John.doe@gmail.com"
        autoComplete="email"
      />
      <TextInput
        style={{ flex: 1 }}
        onChangeText={setPassword}
        value={password}
        placeholder="Ex. "
        autoComplete="current-password"
      />
      <AppButton style={{ flex: 1 }} onPress={handleSignIn}>
        Se connecter
      </AppButton>
      <AppButton style={{ flex: 1 }} onPress={() => navigate.navigate('Auth', { screen: 'Register' })}>
        Creer un compte
      </AppButton>
    </PlaceholderScreen>
  );
};

export default LoginScreen;
