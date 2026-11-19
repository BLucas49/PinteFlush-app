import { CommonActions, useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import { AppButton } from '@/shared/components/AppButton';
import { PlaceholderScreen } from '@/shared/components/PlaceholderScreen';
import { ThemeToggle } from '@/shared/components/ThemeToggle';
import { useTheme } from '@/shared/hooks/useTheme';

const HomeScreen = () => {
  const { spacing } = useTheme();
  const navigation = useNavigation();

  return (
    <PlaceholderScreen title="Accueil">
      <View
        style={{
          alignSelf: 'stretch',
          paddingHorizontal: spacing.lg,
        }}
      >
        <ThemeToggle />
        {/* Temporaire : accès direct à l'écran RA en développement. */}
        {__DEV__ ? (
          <AppButton onPress={() => navigation.dispatch(CommonActions.navigate('Game', { roomId: 'dev' }))}>
            Tester la RA
          </AppButton>
        ) : null}
      </View>
    </PlaceholderScreen>
  );
};

export default HomeScreen;
