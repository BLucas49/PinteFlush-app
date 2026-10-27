import { Pressable, Text } from 'react-native';

import { PlaceholderScreen } from '@/shared/components/PlaceholderScreen';
import { useTheme } from '@/shared/hooks/useTheme';

import { useAuthStore } from '../store/authStore';

const LoginScreen = () => {
  const { colors } = useTheme();
  const signIn = useAuthStore((s) => s.signIn);

  const handleSignIn = () => signIn({ token: 'dev-token', user: { id: 'dev', username: 'Testeur' } });

  return (
    <PlaceholderScreen title="Connexion">
      <Pressable accessibilityRole="button" onPress={handleSignIn}>
        <Text style={{ color: colors.textPrimary }}>Aller à l&apos;accueil (test)</Text>
      </Pressable>
    </PlaceholderScreen>
  );
};

export default LoginScreen;
