import { ViroARTrackingTargets } from '@reactvision/react-viro';

import { CARD_PHYSICAL_WIDTH_M, CARD_TARGET_NAME } from '../constants/AR';
import { arLog } from './arLogger';

export const registerCardTarget = () => {
  try {
    ViroARTrackingTargets.createTargets({
      [CARD_TARGET_NAME]: {
        source: require('@assets/images/card-marker.png'),
        orientation: 'Up',
        physicalWidth: CARD_PHYSICAL_WIDTH_M,
        type: 'Image',
      },
    });
    arLog(`cible "${CARD_TARGET_NAME}" enregistrée (largeur ${CARD_PHYSICAL_WIDTH_M} m)`);
  } catch (error) {
    arLog(`échec de l'enregistrement de la cible "${CARD_TARGET_NAME}"`, error);
    throw error;
  }
};
