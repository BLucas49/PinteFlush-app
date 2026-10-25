import type { ViewStyle } from 'react-native';

export const SHADOWS = {
  card: {
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
} satisfies Record<string, ViewStyle>;
