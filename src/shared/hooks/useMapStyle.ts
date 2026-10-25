import { MAP_STYLES } from '@/shared/constants/MAP';

import { useTheme } from './useTheme';

export function useMapStyle(): string {
  const { isDark } = useTheme();
  return isDark ? MAP_STYLES.dark : MAP_STYLES.light;
}
