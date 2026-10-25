import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useAuthStore } from '@/features/auth';
import RootNavigator from '@/navigation/RootNavigator';
import { getEnv } from '@/shared/config/env';
import { useTheme } from '@/shared/hooks/useTheme';
import { configureHttp } from '@/shared/lib/axios';
import { ThemeProvider } from '@/shared/providers/ThemeProvider';

const useBootstrap = () => {
  useEffect(() => {
    configureHttp({
      baseUrl: getEnv().apiUrl,
      getToken: () => useAuthStore.getState().token,
      onUnauthorized: () => useAuthStore.getState().signOut(),
    });
  }, []);
};

const Root = () => {
  const { isDark, colors } = useTheme();
  useBootstrap();

  const navigationTheme = useMemo(() => {
    const base = isDark ? DarkTheme : DefaultTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        background: colors.background,
        card: colors.surface,
        text: colors.text,
        primary: colors.primary,
        border: colors.border,
      },
    };
  }, [isDark, colors]);

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <RootNavigator />
    </NavigationContainer>
  );
};

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaProvider>
      <ThemeProvider>
        <Root />
      </ThemeProvider>
    </SafeAreaProvider>
  </GestureHandlerRootView>
);

export default App;
