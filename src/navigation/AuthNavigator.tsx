import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen, RegisterScreen } from '@/features/auth';

import type { AuthStackParamList } from './navigation.types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Connexion' }} />
    <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Inscription' }} />
  </Stack.Navigator>
);

export default AuthNavigator;
