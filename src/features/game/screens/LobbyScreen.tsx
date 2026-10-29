import { useState } from 'react';

import { PlaceholderScreen } from '@/shared/components/PlaceholderScreen';
import { SegmentedToggle, type SegmentedToggleOption } from '@/shared/components/SegmentedToggle';

import { CreatePartyForm } from '../components/CreatePartyForm';
import { JoinPartyForm } from '../components/JoinPartyForm';

type LobbyMode = 'join' | 'create';

const MODES = [
  { value: 'join', label: 'Rejoindre', icon: 'play-outline' },
  { value: 'create', label: 'Créer', icon: 'add' },
] as const satisfies readonly [SegmentedToggleOption, SegmentedToggleOption];

const LobbyScreen = () => {
  const [mode, setMode] = useState<LobbyMode>('create');

  return (
    <PlaceholderScreen
      centered={false}
      header={<SegmentedToggle options={MODES} value={mode} onChange={(value) => setMode(value as LobbyMode)} />}
      title={mode === 'create' ? 'Création de partie' : 'Rejoindre une partie'}
      subtitle={
        mode === 'create' ? 'Votre lieu, vos amis, votre prochaine main.' : 'Entrez le code partagé par vos amis.'
      }
    >
      {mode === 'create' && <CreatePartyForm />}
      {mode === 'join' && <JoinPartyForm />}
    </PlaceholderScreen>
  );
};

export default LobbyScreen;
