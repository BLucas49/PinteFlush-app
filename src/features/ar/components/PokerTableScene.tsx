import {
  ViroAmbientLight,
  type ViroAnchor,
  ViroARImageMarker,
  ViroARPlaneSelector,
  ViroARScene,
  ViroDirectionalLight,
  ViroNode,
} from '@reactvision/react-viro';
import { useRef, useState } from 'react';

import type { Position } from '@/features/ar/types/position.types';
import { AR_LIGHT_COLOR } from '@/shared/styles/tokens/COLORS';

import { CARD_TARGET_NAME } from '../constants/AR';
import { arLog } from '../services/arLogger';
import { useARPlacementStore } from '../store/arPlacementStore';
import type { ARPlacementSource } from '../types/ar.types';
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

  const updatePose = (anchor: ViroAnchor) => {
    if (locked) {
      return;
    }
    setPose({
      key: resetKey,
      position: anchor.position,
      yaw: anchor.rotation[1],
    });
  };

  const selectorRef = useRef<ViroARPlaneSelector>(null);

  return (
    <ViroARScene
      anchorDetectionTypes={mode === 'plane' ? ['PlanesHorizontal'] : undefined}
      onTrackingUpdated={(state, reason) =>
        arLog('tracking', {
          state,
          reason,
          mode,
        })
      }
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
          updatePose(anchor);
          handlePlaced('card');
        }}
        onAnchorUpdated={updatePose}
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
