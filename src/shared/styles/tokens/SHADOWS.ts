import type { ViewStyle } from 'react-native';

export const SHADOWS = {
  floatingLight: {
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
  },
  floatingDark: {
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.28,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
  },
} satisfies Record<string, ViewStyle>;
