import { View } from 'react-native';

import { PlaceholderScreen } from '@/shared/components/PlaceholderScreen';
import { ThemeToggle } from '@/shared/components/ThemeToggle';
import { useTheme } from '@/shared/hooks/useTheme';

const HomeScreen = () => {
  const { spacing } = useTheme();

  return (
    <PlaceholderScreen title="Accueil">
      <View style={{ alignSelf: 'stretch', paddingHorizontal: spacing.lg }}>
        <ThemeToggle />
      </View>
    </PlaceholderScreen>
  );
};

export default HomeScreen;
