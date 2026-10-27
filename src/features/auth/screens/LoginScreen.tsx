import { View } from 'react-native';

import { AppButton } from '@/shared/components/AppButton';
import { PlaceholderScreen } from '@/shared/components/PlaceholderScreen';
import { useTheme } from '@/shared/hooks/useTheme';

import { useAuthStore } from '../store/authStore';

const LoginScreen = () => {
  const { spacing } = useTheme();
  const signIn = useAuthStore((s) => s.signIn);

  const handleSignIn = () => signIn({ token: 'dev-token', user: { id: 'dev', username: 'Testeur' } });

  return (
    <PlaceholderScreen title="Connexion">
      <View style={{ gap: spacing.sm, alignSelf: 'stretch', paddingHorizontal: spacing.lg }}>
        <View style={{ flexDirection: 'row', gap: spacing.sm }}>
          <AppButton style={{ flex: 1 }} onPress={handleSignIn}>
            Suivre 50
          </AppButton>
          <AppButton style={{ flex: 1 }} variant="secondary" onPress={handleSignIn}>
            Modifier
          </AppButton>
          <AppButton style={{ flex: 1 }} variant="tonal" onPress={handleSignIn}>
            Se coucher
          </AppButton>
        </View>
      </View>
    </PlaceholderScreen>
  );
};

export default LoginScreen;
