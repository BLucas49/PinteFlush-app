import type { LngLat } from '@maplibre/maplibre-react-native';

export interface LeaderboardPlayer {
  id: string;
  rank: number;
  firstName: string;
  lastName: string;
  gamesPlayed: number;
  points: number;
  // Places gagnées (> 0) ou perdues (< 0) depuis la période précédente
  trend: number;
  isCurrentUser?: boolean;
}

export interface PlayingField {
  id: string;
  name: string;
  lngLat: LngLat;
  gamesCount: number;
}
