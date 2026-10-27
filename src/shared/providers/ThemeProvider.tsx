import { type PropsWithChildren, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';

import { useSettingsStore } from '@/shared/store/settingsStore';

import { buildPaperTheme } from '../styles/paperTheme';
import { DARK_COLORS, LIGHT_COLORS } from '../styles/tokens/COLORS';
import { RADII } from '../styles/tokens/RADII';
import { SHADOWS } from '../styles/tokens/SHADOWS';
import { SPACING } from '../styles/tokens/SPACING';
import { TYPOGRAPHIES } from '../styles/tokens/TYPOGRAPHIES';
import type { Theme } from '../types/styles.types';
import { ThemeContext } from './ThemeContext';

export function ThemeProvider({ children }: PropsWithChildren) {
  const systemScheme = useColorScheme();
  const themeMode = useSettingsStore((s) => s.themeMode);
  const isDark = themeMode === 'system' ? systemScheme === 'dark' : themeMode === 'dark';

  const theme = useMemo<Theme>(
    () => ({
      isDark,
      colors: isDark ? DARK_COLORS : LIGHT_COLORS,
      spacing: SPACING,
      radii: RADII,
      shadows: SHADOWS,
      typography: TYPOGRAPHIES,
    }),
    [isDark],
  );

  const paperTheme = useMemo(() => buildPaperTheme(theme), [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <PaperProvider theme={paperTheme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
}
