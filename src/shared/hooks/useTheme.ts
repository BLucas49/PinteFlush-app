import { useContext } from 'react';

import { ThemeContext } from '../providers/ThemeContext';
import type { Theme } from '../types/styles.types';

export function useTheme(): Theme {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return theme;
}
