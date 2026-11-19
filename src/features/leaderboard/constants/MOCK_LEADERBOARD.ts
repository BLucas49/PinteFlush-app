import type { LeaderboardPlayer, PlayingField } from '../types/leaderboard.types';

// Données de test, à remplacer par l'API du classement
export const MOCK_PERIOD_LABEL = 'Octobre 2026';

export const MOCK_PLAYERS: LeaderboardPlayer[] = [
  {
    id: '1',
    rank: 1,
    firstName: 'Alex',
    lastName: 'Martin',
    gamesPlayed: 12,
    points: 2840,
    trend: 2,
  },
  {
    id: '2',
    rank: 2,
    firstName: 'Sarah',
    lastName: 'Chen',
    gamesPlayed: 10,
    points: 2610,
    trend: 0,
  },
  {
    id: '3',
    rank: 3,
    firstName: 'Hugo',
    lastName: 'Bernard',
    gamesPlayed: 11,
    points: 2450,
    trend: -1,
  },
  {
    id: '4',
    rank: 4,
    firstName: 'Julien',
    lastName: 'Dupont',
    gamesPlayed: 8,
    points: 2180,
    trend: 3,
    isCurrentUser: true,
  },
  {
    id: '5',
    rank: 5,
    firstName: 'Emma',
    lastName: 'Laurent',
    gamesPlayed: 9,
    points: 1960,
    trend: -1,
  },
  {
    id: '6',
    rank: 6,
    firstName: 'Léa',
    lastName: 'Moreau',
    gamesPlayed: 7,
    points: 1720,
    trend: 1,
  },
  {
    id: '7',
    rank: 7,
    firstName: 'Nathan',
    lastName: 'Petit',
    gamesPlayed: 6,
    points: 1540,
    trend: -2,
  },
];

export const MOCK_PLAYING_FIELDS: PlayingField[] = [
  {
    id: 'f1',
    name: 'Le Monday Club',
    lngLat: [-1.5683, 47.2265],
    gamesCount: 4,
  },
  {
    id: 'f2',
    name: 'Chez Sarah',
    lngLat: [-1.5277, 47.2251],
    gamesCount: 1,
  },
  {
    id: 'f3',
    name: 'Le Ponton',
    lngLat: [-1.5512, 47.2068],
    gamesCount: 1,
  },
];
