import type { ViroNode } from '@reactvision/react-viro';
import { type ComponentProps, useEffect, useRef, useState } from 'react';

import {
  CARD_DROP_ANIMATION_KEY,
  CARD_LIFT_ANIMATION_KEY,
  CARD_TURN_DOWN_ANIMATION_KEY,
  CARD_TURN_UP_ANIMATION_KEY,
} from '../constants/ANIMATIONS_KEYS';

type FlipPhase = 'idle' | 'lift' | 'turn' | 'drop';
type ViroAnimation = NonNullable<ComponentProps<typeof ViroNode>['animation']>;

export const useCardFlip = (faceUp: boolean) => {
  const [phase, setPhase] = useState<FlipPhase>('idle');
  const previousFaceUp = useRef(faceUp);

  useEffect(() => {
    if (previousFaceUp.current === faceUp) {
      return;
    }
    previousFaceUp.current = faceUp;
    setPhase('lift');
  }, [faceUp]);

  // Enchaîne soulever, tourner, reposer quand faceUp change (pas au premier affichage)
  const animations: Record<FlipPhase, ViroAnimation> = {
    idle: { run: false },
    lift: {
      name: CARD_LIFT_ANIMATION_KEY,
      run: true,
      onFinish: () => setPhase('turn'),
    },
    turn: {
      name: faceUp ? CARD_TURN_UP_ANIMATION_KEY : CARD_TURN_DOWN_ANIMATION_KEY,
      run: true,
      onFinish: () => setPhase('drop'),
    },
    drop: {
      name: CARD_DROP_ANIMATION_KEY,
      run: true,
      onFinish: () => setPhase('idle'),
    },
  };

  return animations[phase];
};
