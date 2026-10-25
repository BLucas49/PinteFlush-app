import type { RADII } from '../styles/RADII';
import type { SHADOWS } from '../styles/SHADOWS';
import type { SPACING } from '../styles/SPACING';
import type { TYPOGRAPHIES } from '../styles/TYPOGRAPHIES';

export type ColorPalette = {
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  primary: string;
  onPrimary: string;
  border: string;
  danger: string;
  success: string;
};

export type Theme = {
  isDark: boolean;
  colors: ColorPalette;
  spacing: typeof SPACING;
  radii: typeof RADII;
  shadows: typeof SHADOWS;

  typography: typeof TYPOGRAPHIES;
};
