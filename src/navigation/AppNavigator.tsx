import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { GameOverScreen, GameScreen, LobbyScreen, ScannerScreen, WaitingRoomScreen } from '@/features/game';
import { GameDetailScreen, HistoryMapScreen } from '@/features/history';
import { LegalScreen } from '@/features/settings';

import MainTabs from './MainTabs';
import type { AppStackParamList } from './navigation.types';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
    <Stack.Screen name="Lobby" component={LobbyScreen} options={{ title: 'Salon' }} />
    <Stack.Screen name="Scanner" component={ScannerScreen} options={{ headerShown: false }} />
    <Stack.Screen name="WaitingRoom" component={WaitingRoomScreen} options={{ title: "Salle d'attente" }} />
    <Stack.Screen
      name="Game"
      component={GameScreen}
      options={{
        headerShown: false,
        gestureEnabled: false,
      }}
    />
    <Stack.Screen
      name="GameOver"
      component={GameOverScreen}
      options={{
        presentation: 'modal',
        headerShown: false,
        gestureEnabled: false,
      }}
    />
    <Stack.Screen name="HistoryMap" component={HistoryMapScreen} options={{ title: 'Carte des parties' }} />
    <Stack.Screen name="GameDetail" component={GameDetailScreen} options={{ title: 'Détail de la partie' }} />
    <Stack.Screen name="Legal" component={LegalScreen} options={{ title: 'CGU et crédits' }} />
  </Stack.Navigator>
);

export default AppNavigator;
