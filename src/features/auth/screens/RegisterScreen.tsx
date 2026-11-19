import { useState } from 'react';
import { TextInput } from 'react-native';

import { PlaceholderScreen } from '@/shared/components/PlaceholderScreen';

const RegisterScreen = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  return (
    <PlaceholderScreen title="Inscription">
      <TextInput
        style={{ flex: 1 }}
        onChangeText={setLogin}
        value={login}
        placeholder="Ex. John.doe@gmail.com"
        autoComplete="email"
      />
    </PlaceholderScreen>
  );
};

export default RegisterScreen;
