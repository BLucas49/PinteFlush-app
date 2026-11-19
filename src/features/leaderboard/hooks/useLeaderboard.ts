import { MOCK_PERIOD_LABEL, MOCK_PLAYERS, MOCK_PLAYING_FIELDS } from '../constants/MOCK_LEADERBOARD';

// Point d'entrée unique des données du classement : brancher ici le service réseau
export function useLeaderboard() {
  return {
    periodLabel: MOCK_PERIOD_LABEL,
    players: MOCK_PLAYERS,
    fields: MOCK_PLAYING_FIELDS,
  };
}
