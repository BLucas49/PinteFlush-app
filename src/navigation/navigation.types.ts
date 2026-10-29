import type { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList> | undefined;
  App: NavigatorScreenParams<AppStackParamList> | undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Lobby: undefined;
  History: undefined;
  Leaderboard: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type AppStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  Lobby: undefined;
  WaitingRoom: { roomId: string };
  Game: { roomId: string };
  GameOver: { roomId: string };
  HistoryMap: undefined;
  GameDetail: { gameId: string };
  PermissionsExplainer: undefined;
  Legal: undefined;
};

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}
