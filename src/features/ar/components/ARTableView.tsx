import { ViroARSceneNavigator } from '@reactvision/react-viro';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';

import { useTheme } from '@/shared/hooks/useTheme';
import { OVERLAY_COLORS } from '@/shared/styles/tokens/COLORS';

import { registerARAnimations } from '../services/arAnimations';
import { registerCardTarget } from '../services/arTracking';
import { useARPlacementStore } from '../store/arPlacementStore';
import BoardDebugButtons from './BoardDebugButtons';
import PokerTableScene from './PokerTableScene';

registerCardTarget();
registerARAnimations();

interface ARTableViewProps {
  // Distance entre le bas de la vue et le message de placement
  messageBottomInset?: number;
  // Distance entre le bas de la vue et les boutons d'action
  controlsBottomInset?: number;
}

const ARTableView = ({ messageBottomInset = 48, controlsBottomInset = 16 }: ARTableViewProps) => {
  const { status, mode, source, locked, tableError, switchToPlane, switchToCard, toggleLock, reset } =
    useARPlacementStore();
  const { radii, spacing } = useTheme();
  const controlStyle = {
    borderRadius: radii.sm,
    margin: 0,
  };
  const [showDebug, setShowDebug] = useState(false);

  // Repart de zéro en quittant l'écran
  useEffect(() => reset, [reset]);

  return (
    <View style={styles.container}>
      <ViroARSceneNavigator
        autofocus
        initialScene={{ scene: PokerTableScene as unknown as () => React.JSX.Element }}
        style={styles.container}
      />

      {__DEV__ && status === 'placed' && showDebug ? <BoardDebugButtons bottom={messageBottomInset} /> : null}

      {status === 'placed' ? (
        <View
          pointerEvents="box-none"
          style={[
            styles.controls,
            {
              right: spacing.sm,
              bottom: controlsBottomInset,
            },
          ]}
        >
          {__DEV__ ? (
            <IconButton
              mode="contained"
              icon="bug-outline"
              containerColor={OVERLAY_COLORS.background}
              style={controlStyle}
              iconColor={OVERLAY_COLORS.content}
              accessibilityLabel="Boutons de test des cartes"
              onPress={() => setShowDebug((value) => !value)}
            />
          ) : null}
          {source === 'card' ? (
            <IconButton
              mode="contained"
              icon={locked ? 'lock' : 'lock-open-variant'}
              containerColor={OVERLAY_COLORS.background}
              style={controlStyle}
              iconColor={OVERLAY_COLORS.content}
              accessibilityLabel={locked ? 'Suivre la carte' : 'Figer le tapis'}
              onPress={toggleLock}
            />
          ) : null}
          <IconButton
            mode="contained"
            icon="cursor-move"
            containerColor={OVERLAY_COLORS.background}
            style={controlStyle}
            iconColor={OVERLAY_COLORS.content}
            accessibilityLabel="Repositionner"
            onPress={reset}
          />
        </View>
      ) : null}

      {tableError ? (
        <View style={[styles.banner, { bottom: messageBottomInset }]}>
          <Text style={styles.bannerText}>{"Impossible d'afficher le tapis"}</Text>
          <Pressable accessibilityRole="button" onPress={reset}>
            <Text style={styles.link}>Réessayer</Text>
          </Pressable>
        </View>
      ) : null}

      {!tableError && status !== 'placed' ? (
        <View style={[styles.banner, { bottom: messageBottomInset }]}>
          <Text style={styles.bannerText}>
            {mode === 'card'
              ? 'Pose ta carte étudiante à plat sur la table, verso visible'
              : 'Balaie une surface plane puis touche-la pour poser le tapis'}
          </Text>
          <Pressable accessibilityRole="button" onPress={mode === 'card' ? switchToPlane : switchToCard}>
            <Text style={styles.link}>{mode === 'card' ? 'Placer sans carte' : 'Revenir à la carte'}</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  controls: {
    position: 'absolute',
    gap: 4,
  },
  banner: {
    position: 'absolute',
    alignSelf: 'center',
    maxWidth: '85%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: OVERLAY_COLORS.background,
    gap: 8,
  },
  bannerText: {
    color: OVERLAY_COLORS.content,
    textAlign: 'center',
  },
  link: {
    color: OVERLAY_COLORS.content,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default ARTableView;
