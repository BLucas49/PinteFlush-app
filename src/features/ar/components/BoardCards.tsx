import { ViroNode } from '@reactvision/react-viro';
import { useEffect, useState } from 'react';

import { BOARD_SLOTS, CARD_DEAL_STAGGER_MS, TABLE_POSITION, TABLE_ROTATION, TABLE_SCALE } from '../constants/AR';
import { useARBoardStore } from '../store/arBoardStore';
import PlayingCard from './PlayingCard';

const BoardCards = () => {
  const board = useARBoardStore((state) => state.board);
  // Les cartes présentes au départ sont distribuées l'une après l'autre, les suivantes tout de suite
  const [initialCount, setInitialCount] = useState(board.length);

  useEffect(() => {
    const timer = setTimeout(() => setInitialCount(0), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ViroNode position={TABLE_POSITION} rotation={TABLE_ROTATION} scale={TABLE_SCALE}>
      {board.slice(0, BOARD_SLOTS.length).map((card, index) => (
        <PlayingCard
          key={index}
          id={card.id}
          faceUp={card.faceUp}
          slotIndex={index}
          dealDelayMs={index < initialCount ? index * CARD_DEAL_STAGGER_MS : 0}
        />
      ))}
    </ViroNode>
  );
};

export default BoardCards;
