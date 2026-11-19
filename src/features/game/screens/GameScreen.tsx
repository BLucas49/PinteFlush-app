import { useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ARTableView } from '@/features/ar';
import { BottomDrawer } from '@/shared/components/BottomDrawer';
import { PermissionGate } from '@/shared/components/PermissionGate';
import { useTheme } from '@/shared/hooks/useTheme';

import GameHeader from '../components/GameHeader';
import PlayerFooter from '../components/PlayerFooter';
import PlayerSeat from '../components/PlayerSeat';
import PotDisplay from '../components/PotDisplay';
import { MOCK_CURRENT_PLAYER, MOCK_GAME_INFO, MOCK_OPPONENTS, MOCK_PHASE, MOCK_POT } from '../constants/MOCK_GAME';
import { useLeaveGameConfirmation } from '../hooks/useLeaveGameConfirmation';
import { useTurnDrawer } from '../hooks/useTurnDrawer';

const GameScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const { spacing } = useTheme();
  const leaveGame = useLeaveGameConfirmation();
  const [drawerOpen, setDrawerOpen] = useTurnDrawer(MOCK_CURRENT_PLAYER.isMyTurn);

  // Le pot se place juste au-dessus du panneau, et les messages de l'AR juste au-dessus du pot
  const [drawerHeight, setDrawerHeight] = useState(0);
  const [potHeight, setPotHeight] = useState(0);
  const potBottom = drawerHeight + spacing.sm;

  const [leftOpponent, rightOpponent] = MOCK_OPPONENTS;

  return (
    <View style={styles.container}>
      <GameHeader title={MOCK_GAME_INFO.title} subtitle={MOCK_GAME_INFO.subtitle} onBack={leaveGame} />
      <PermissionGate
        permission={permission}
        onRequest={requestPermission}
        message="La caméra est nécessaire pour afficher la table en réalité augmentée."
        actionLabel="Autoriser la caméra"
      >
        <View style={styles.table}>
          <ARTableView messageBottomInset={potBottom + potHeight + spacing.sm} controlsBottomInset={potBottom} />
          <View
            pointerEvents="box-none"
            style={[
              styles.opponents,
              {
                top: spacing.sm,
                paddingHorizontal: spacing.sm,
              },
            ]}
          >
            {leftOpponent ? <PlayerSeat {...leftOpponent} /> : <View />}
            {rightOpponent ? <PlayerSeat {...rightOpponent} /> : <View />}
          </View>
          <View
            pointerEvents="box-none"
            style={[styles.pot, { bottom: potBottom }]}
            onLayout={(event) => setPotHeight(event.nativeEvent.layout.height)}
          >
            <PotDisplay amount={MOCK_POT} phase={MOCK_PHASE} />
          </View>
          <BottomDrawer open={drawerOpen} onOpenChange={setDrawerOpen} onVisibleHeightChange={setDrawerHeight}>
            <PlayerFooter player={MOCK_CURRENT_PLAYER} />
          </BottomDrawer>
        </View>
      </PermissionGate>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  table: { flex: 1 },
  opponents: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  pot: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default GameScreen;
