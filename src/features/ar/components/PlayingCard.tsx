import { ViroImage, ViroNode } from '@reactvision/react-viro';
import { useState } from 'react';

import { BOARD_CARD_HEIGHT, BOARD_CARD_WIDTH, BOARD_DECK_POSITION } from '../constants/AR';
import { CARD_BACK_IMAGE, CARD_IMAGES } from '../constants/CARDS';
import { useCardFlip } from '../hooks/useCardFlip';
import { cardDealAnimationName } from '../services/arAnimations';
import type { CardId } from '../types/cards.types';

interface PlayingCardProps {
  id: CardId;
  faceUp: boolean;
  slotIndex: number;
  dealDelayMs: number;
}

const PlayingCard = ({ id, faceUp, slotIndex, dealDelayMs }: PlayingCardProps) => {
  const BACK_OFFSET_Y = -0.0005;
  const flipAnimation = useCardFlip(faceUp);

  // La rotation de départ ne change plus, les animations prennent le relais
  const [initialFaceUp] = useState(faceUp);
  // Le délai de distribution ne compte qu'au premier affichage
  const [initialDelayMs] = useState(dealDelayMs);

  return (
    <ViroNode
      position={BOARD_DECK_POSITION}
      opacity={0}
      animation={{
        name: cardDealAnimationName(slotIndex),
        run: true,
        delay: initialDelayMs,
      }}
    >
      <ViroNode rotation={[initialFaceUp ? 0 : 180, 0, 0]} animation={flipAnimation}>
        <ViroImage
          source={CARD_IMAGES[id]}
          width={BOARD_CARD_WIDTH}
          height={BOARD_CARD_HEIGHT}
          rotation={[-90, 0, 0]}
        />
        <ViroImage
          source={CARD_BACK_IMAGE}
          width={BOARD_CARD_WIDTH}
          height={BOARD_CARD_HEIGHT}
          position={[0, BACK_OFFSET_Y, 0]}
          rotation={[90, 0, 0]}
        />
      </ViroNode>
    </ViroNode>
  );
};

export default PlayingCard;
