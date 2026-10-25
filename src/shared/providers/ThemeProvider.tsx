import { type PropsWithChildren, useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { useSettingsStore } from '@/shared/store/settingsStore';

import { DARK_COLORS, LIGHT_COLORS } from '../styles/COLORS';
import { RADII } from '../styles/RADII';
import { SHADOWS } from '../styles/SHADOWS';
import { SPACING } from '../styles/SPACING';
import { TYPOGRAPHIES } from '../styles/TYPOGRAPHIES';
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

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}
