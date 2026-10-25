import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/shared/hooks/useTheme';

interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  const { colors, spacing } = useTheme();
  return (
    <View style={[styles.center, { padding: spacing.md }]}>
      <Text style={[styles.text, { color: colors.textMuted }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { textAlign: 'center' },
});
