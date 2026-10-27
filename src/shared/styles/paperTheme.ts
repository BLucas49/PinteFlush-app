import { MD3DarkTheme, MD3LightTheme, type MD3Theme } from 'react-native-paper';

import type { Theme } from '@/shared/types/styles.types';

export function buildPaperTheme({ isDark, colors, radii }: Theme): MD3Theme {
  const base = isDark ? MD3DarkTheme : MD3LightTheme;

  return {
    ...base,
    dark: isDark,
    roundness: radii.md,
    colors: {
      ...base.colors,
      primary: colors.actionPrimary,
      onPrimary: colors.onAction,
      primaryContainer: colors.surfaceViolet,
      onPrimaryContainer: colors.textPrimary,
      secondary: colors.accent,
      onSecondary: colors.onAction,
      secondaryContainer: colors.surfaceViolet,
      onSecondaryContainer: colors.textPrimary,
      tertiary: colors.success,
      error: colors.danger,
      background: colors.background,
      onBackground: colors.textPrimary,
      surface: colors.surface,
      onSurface: colors.textPrimary,
      surfaceVariant: colors.surfaceViolet,
      onSurfaceVariant: colors.textSecondary,
      outline: colors.border,
      outlineVariant: colors.border,
      elevation: {
        level0: 'transparent',
        level1: colors.surface,
        level2: colors.surface,
        level3: colors.surfaceViolet,
        level4: colors.surfaceViolet,
        level5: colors.surfaceViolet,
      },
    },
  };
}
