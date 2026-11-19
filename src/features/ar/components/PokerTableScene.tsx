import {
  ViroAmbientLight,
  type ViroAnchor,
  ViroARImageMarker,
  ViroARPlaneSelector,
  ViroARScene,
  ViroDirectionalLight,
  ViroNode,
  ViroTrackingStateConstants,
} from '@reactvision/react-viro';
import { useRef, useState } from 'react';

import type { Position } from '@/features/ar/types/position.types';
import { AR_LIGHT_COLOR } from '@/shared/styles/tokens/COLORS';

import { CARD_TARGET_NAME, IGNORED_POSE_LOG_INTERVAL_MS } from '../constants/AR';
import { arLog } from '../services/arLogger';
import { useARPlacementStore } from '../store/arPlacementStore';
import type { ARPlacementSource } from '../types/ar.types';
import { getCardYaw, isValidCardPosition } from '../utils/anchorPose';
import PokerTable from './PokerTable';

const PokerTableScene = () => {
  const mode = useARPlacementStore((state) => state.mode);
  const resetKey = useARPlacementStore((state) => state.resetKey);
  const locked = useARPlacementStore((state) => state.locked);
  const placedSource = useARPlacementStore((state) => state.source);
  const onTablePlaced = useARPlacementStore((state) => state.onTablePlaced);

  const handlePlaced = (source: ARPlacementSource) => {
    // On affiche un seul tapis, le premier placé gagne
    if (placedSource) {
      return;
    }

    arLog(`tapis placé (source ${source})`);
    onTablePlaced(source);
  };

  const [pose, setPose] = useState<{ key: number; position: Position; yaw: number } | null>(null);

  const trackingNormalRef = useRef(false);
  const lastIgnoredLogRef = useRef(0);

  // Log limité à un par seconde pour ne pas inonder la console
  const logIgnoredPose = (reason: string, value: unknown) => {
    const now = Date.now();
    if (now - lastIgnoredLogRef.current < IGNORED_POSE_LOG_INTERVAL_MS) {
      return;
    }
    lastIgnoredLogRef.current = now;
    arLog(`pose ignorée : ${reason}`, value);
  };

  // Renvoie false si la pose reçue est inutilisable
  const updatePose = (anchor: ViroAnchor) => {
    if (locked) {
      return true;
    }
    // Tant que le suivi n'est pas stable, la position de la carte n'est pas fiable
    if (!trackingNormalRef.current) {
      logIgnoredPose('suivi pas encore stable', anchor.position);
      return false;
    }
    if (!isValidCardPosition(anchor.position)) {
      logIgnoredPose('position invalide', anchor.position);
      return false;
    }
    const yaw = getCardYaw(anchor.rotation);
    if (yaw === null) {
      logIgnoredPose('carte pas à plat', anchor.rotation);
      return false;
    }
    setPose({
      key: resetKey,
      position: anchor.position,
      yaw,
    });
    return true;
  };

  const selectorRef = useRef<ViroARPlaneSelector>(null);

  return (
    <ViroARScene
      // En mode carte, pas de recherche de plans : ça allège le téléphone
      anchorDetectionTypes={mode === 'plane' ? ['PlanesHorizontal'] : 'None'}
      onTrackingUpdated={(state, reason) => {
        trackingNormalRef.current = state === ViroTrackingStateConstants.TRACKING_NORMAL;
        arLog('tracking', {
          state,
          reason,
          mode,
        });
      }}
      onAnchorFound={(anchor) => selectorRef.current?.handleAnchorFound(anchor)}
      onAnchorUpdated={(anchor) => selectorRef.current?.handleAnchorUpdated(anchor)}
      onAnchorRemoved={(anchor) => anchor && selectorRef.current?.handleAnchorRemoved(anchor)}
    >
      <ViroAmbientLight color={AR_LIGHT_COLOR} intensity={400} />
      <ViroDirectionalLight color={AR_LIGHT_COLOR} direction={[0, -1, -0.3]} />

      <ViroARImageMarker
        key={`card-${resetKey}`}
        target={CARD_TARGET_NAME}
        onAnchorFound={(anchor) => {
          arLog('carte détectée', anchor);
          if (updatePose(anchor)) {
            handlePlaced('card');
          }
        }}
        onAnchorUpdated={(anchor) => {
          // Si la première pose était invalide, on place le tapis dès qu'une pose correcte arrive
          if (updatePose(anchor)) {
            handlePlaced('card');
          }
        }}
        onAnchorRemoved={() => arLog('carte perdue')}
      />

      {placedSource === 'card' && pose?.key === resetKey ? (
        <ViroNode position={pose.position} rotation={[0, pose.yaw, 0]}>
          <PokerTable placed />
        </ViroNode>
      ) : null}

      {mode === 'plane' && placedSource !== 'card' ? (
        <ViroARPlaneSelector
          ref={selectorRef}
          key={`plane-${resetKey}`}
          alignment="HorizontalUpward"
          minWidth={0.3}
          minHeight={0.3}
          onPlaneSelected={() => handlePlaced('plane')}
        >
          <PokerTable placed={placedSource === 'plane'} />
        </ViroARPlaneSelector>
      ) : null}
    </ViroARScene>
  );
};

export default PokerTableScene;
