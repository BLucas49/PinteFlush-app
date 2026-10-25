import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HistoryScreen } from '@/features/history';
import { LeaderboardScreen } from '@/features/leaderboard';
import { HomeScreen } from '@/features/lobby';
import { ProfileScreen } from '@/features/profile';
import { SettingsScreen } from '@/features/settings';
import { useTheme } from '@/shared/hooks/useTheme';

import type { MainTabParamList } from './navigation.types';

const Tab = createBottomTabNavigator<MainTabParamList>();

type IconName = keyof typeof Ionicons.glyphMap;

const TABS: { name: keyof MainTabParamList; title: string; icon: IconName; component: React.ComponentType }[] = [
  { name: 'Home', title: 'Accueil', icon: 'home-outline', component: HomeScreen },
  { name: 'History', title: 'Historique', icon: 'time-outline', component: HistoryScreen },
  { name: 'Leaderboard', title: 'Classement', icon: 'trophy-outline', component: LeaderboardScreen },
  { name: 'Profile', title: 'Profil', icon: 'person-outline', component: ProfileScreen },
  { name: 'Settings', title: 'Réglages', icon: 'settings-outline', component: SettingsScreen },
];

const MainTabs = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
      }}
    >
      {TABS.map(({ name, title, icon, component }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            title,
            tabBarIcon: ({ color, size }) => <Ionicons name={icon} color={color} size={size} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default MainTabs;
