import { View } from 'react-native';
import { Switch, Text } from 'react-native-paper';

import { useTheme } from '@/shared/hooks/useTheme';
import { useSettingsStore } from '@/shared/store/settingsStore';

export const ThemeToggle = () => {
  const { isDark } = useTheme();
  const setThemeMode = useSettingsStore((s) => s.setThemeMode);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch' }}>
      <Text>{isDark ? 'Mode sombre' : 'Mode clair'}</Text>
      <Switch
        value={isDark}
        onValueChange={(value) => setThemeMode(value ? 'dark' : 'light')}
        accessibilityLabel="Basculer le mode sombre"
      />
    </View>
  );
};
