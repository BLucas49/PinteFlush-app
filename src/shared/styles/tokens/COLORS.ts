import type { ColorPalette } from '@/shared/types/styles.types';

export const LIGHT_COLORS: ColorPalette = {
  background: '#FBFBFB',
  surface: '#FFFFFF',
  surfaceViolet: '#EDE8F4',
  textPrimary: '#5E4074',
  textSecondary: '#865A9E',
  actionPrimary: '#12676A',
  onAction: '#FFFFFF',
  accent: '#865A9E',
  border: '#D8D0E8',
  danger: '#B3261E',
  success: '#1B7F3B',
};

export const DARK_COLORS: ColorPalette = {
  background: '#211A26',
  surface: '#2C2433',
  surfaceViolet: '#3A3047',
  textPrimary: '#F7F9EC',
  textSecondary: '#B8AEC2',
  actionPrimary: '#00A88F',
  onAction: '#211A26',
  accent: '#7E57C2',
  border: '#3D3549',
  danger: '#FF8A80',
  success: '#6FDB8F',
};

export const CARD_COLORS = {
  face: '#FFFFFF',
  suit: '#30283A',
  accent: '#7E57C2',
} as const;

// Boutons et messages posés sur la caméra : identiques en thème clair et sombre
export const OVERLAY_COLORS = {
  background: 'rgba(0,0,0,0.65)',
  content: '#FFFFFF',
} as const;

export const AR_LIGHT_COLOR = '#FFFFFF';
