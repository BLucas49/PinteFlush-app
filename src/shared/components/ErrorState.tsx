import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/shared/hooks/useTheme';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const { colors, spacing } = useTheme();
  return (
    <View style={[styles.center, { gap: spacing.md, padding: spacing.md }]} accessibilityRole="alert">
      <Text style={[styles.text, { color: colors.textPrimary }]}>{message}</Text>
      {onRetry ? (
        <Pressable accessibilityRole="button" onPress={onRetry}>
          <Text style={{ color: colors.actionPrimary }}>Réessayer</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { textAlign: 'center' },
});
