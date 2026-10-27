import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useTheme } from '@/shared/hooks/useTheme';

interface LoadingStateProps {
  label?: string;
}

export function LoadingState({ label = 'Chargement…' }: LoadingStateProps) {
  const { colors } = useTheme();
  return (
    <View accessible style={styles.center} accessibilityRole="progressbar" accessibilityLabel={label}>
      <ActivityIndicator color={colors.actionPrimary} size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
