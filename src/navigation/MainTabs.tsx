import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LobbyScreen } from '@/features/game';
import { HistoryScreen } from '@/features/history';
import { LeaderboardScreen } from '@/features/leaderboard';
import { ProfileScreen } from '@/features/profile';
import { SettingsScreen } from '@/features/settings';
import { useTheme } from '@/shared/hooks/useTheme';

import type { MainTabParamList } from './navigation.types';

const Tab = createBottomTabNavigator<MainTabParamList>();

type IconName = keyof typeof Ionicons.glyphMap;

const TABS: { name: keyof MainTabParamList; title: string; icon: IconName; component: React.ComponentType }[] = [
  { name: 'Lobby', title: 'Salon', icon: 'people-outline', component: LobbyScreen },
  { name: 'History', title: 'Historique', icon: 'time-outline', component: HistoryScreen },
  { name: 'Leaderboard', title: 'Classement', icon: 'trophy-outline', component: LeaderboardScreen },
  { name: 'Profile', title: 'Profil', icon: 'person-outline', component: ProfileScreen },
  { name: 'Settings', title: 'Réglages', icon: 'settings-outline', component: SettingsScreen },
];

const activeIcon = (icon: IconName) => icon.replace(/-outline$/, '') as IconName;

const TAB_BAR_HEIGHT = 64;

const MainTabs = () => {
  const { colors, isDark, radii, shadows, spacing, typography } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.actionPrimary,
        tabBarInactiveTintColor: isDark ? colors.textPrimary : colors.accent,
        tabBarStyle: {
          height: TAB_BAR_HEIGHT,
          paddingTop: 0,
          paddingBottom: 0,
          marginHorizontal: spacing.compact,
          marginBottom: insets.bottom + spacing.md,
          borderRadius: radii.xl,
          borderTopWidth: 0,
          borderWidth: isDark ? 1 : 0,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          ...(isDark ? shadows.floatingDark : shadows.floatingLight),
        },
        tabBarItemStyle: { paddingVertical: spacing.sm },
      }}
    >
      {TABS.map(({ name, title, icon, component }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            title,
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name={focused ? activeIcon(icon) : icon} color={color} size={size} />
            ),
            tabBarLabel: ({ color, focused }) => (
              <Text numberOfLines={1} style={[typography.navigation, { color, fontWeight: focused ? '700' : '500' }]}>
                {title}
              </Text>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default MainTabs;
