import { ViroAnimations } from '@reactvision/react-viro';

import {
  CARD_DROP_ANIMATION_KEY,
  CARD_LIFT_ANIMATION_KEY,
  CARD_TURN_DOWN_ANIMATION_KEY,
  CARD_TURN_UP_ANIMATION_KEY,
  TABLE_APPEAR_ANIMATION_KEY,
} from '../constants/ANIMATIONS_KEYS';
import {
  BOARD_SLOTS,
  CARD_DEAL_DURATION_MS,
  CARD_LIFT_DURATION_MS,
  CARD_LIFT_HEIGHT,
  CARD_TURN_DURATION_MS,
  TABLE_APPEAR_DURATION_MS,
  TABLE_SCALE,
} from '../constants/AR';

export const cardDealAnimationName = (slotIndex: number) => `cardDeal${slotIndex}`;

export const registerARAnimations = () => {
  const dealAnimations = Object.fromEntries(
    BOARD_SLOTS.map(([x, y, z], index) => [
      cardDealAnimationName(index),
      {
        properties: {
          positionX: x,
          positionY: y,
          positionZ: z,
          opacity: 1,
        },
        duration: CARD_DEAL_DURATION_MS,
        easing: 'EaseOut',
      },
    ]),
  );

  ViroAnimations.registerAnimations({
    [TABLE_APPEAR_ANIMATION_KEY]: {
      properties: {
        scaleX: TABLE_SCALE[0],
        scaleY: TABLE_SCALE[1],
        scaleZ: TABLE_SCALE[2],
      },
      duration: TABLE_APPEAR_DURATION_MS,
      easing: 'Bounce',
    },
    ...dealAnimations,
    [CARD_LIFT_ANIMATION_KEY]: {
      properties: { positionY: CARD_LIFT_HEIGHT },
      duration: CARD_LIFT_DURATION_MS,
      easing: 'EaseOut',
    },
    [CARD_DROP_ANIMATION_KEY]: {
      properties: { positionY: 0 },
      duration: CARD_LIFT_DURATION_MS,
      easing: 'EaseIn',
    },
    [CARD_TURN_UP_ANIMATION_KEY]: {
      properties: { rotateX: 0 },
      duration: CARD_TURN_DURATION_MS,
      easing: 'EaseInEaseOut',
    },
    [CARD_TURN_DOWN_ANIMATION_KEY]: {
      properties: { rotateX: 180 },
      duration: CARD_TURN_DURATION_MS,
      easing: 'EaseInEaseOut',
    },
  });
};
