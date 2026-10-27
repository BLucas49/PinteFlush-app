import type { TextStyle } from 'react-native';

export const TYPOGRAPHIES = {
  title: { fontSize: 30, fontWeight: '700', lineHeight: 36, letterSpacing: -1 },
  heading: { fontSize: 18, fontWeight: '700', lineHeight: 24, letterSpacing: -0.5 },
  body: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  action: { fontSize: 13, fontWeight: '600', lineHeight: 18 },
  caption: { fontSize: 11, fontWeight: '500', lineHeight: 15 },
  navigation: { fontSize: 10, fontWeight: '500', lineHeight: 14 },
} satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof TYPOGRAPHIES;
