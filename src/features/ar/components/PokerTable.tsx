import { Viro3DObject, ViroNode } from '@reactvision/react-viro';

import { TABLE_APPEAR_ANIMATION_KEY } from '../constants/ANIMATIONS_KEYS';
import { TABLE_POSITION, TABLE_ROTATION } from '../constants/AR';
import { useTableLoading } from '../hooks/useTableLoading';
import BoardCards from './BoardCards';

interface PokerTableProps {
  placed: boolean;
}

const PokerTable = ({ placed }: PokerTableProps) => {
  const { status, runAnimation, onLoadEnd, onError, onAppearFinish } = useTableLoading(placed);

  return (
    <ViroNode>
      <Viro3DObject
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        source={require('@assets/models/tapis_poker_large.glb')}
        type="GLB"
        position={TABLE_POSITION}
        rotation={TABLE_ROTATION}
        scale={[0, 0, 0]}
        animation={{
          name: TABLE_APPEAR_ANIMATION_KEY,
          run: runAnimation,
          onFinish: onAppearFinish,
        }}
        onLoadEnd={onLoadEnd}
        onError={onError}
      />
      {status === 'shown' ? <BoardCards /> : null}
    </ViroNode>
  );
};

export default PokerTable;
