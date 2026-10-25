import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuthStore } from '@/features/auth';
import { LoadingState } from '@/shared/components/LoadingState';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import type { RootStackParamList } from './navigation.types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const status = useAuthStore((s) => s.status);

  if (status === 'loading') {
    return <LoadingState label="Démarrage…" />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {status === 'authenticated' ? (
        <Stack.Screen name="App" component={AppNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
