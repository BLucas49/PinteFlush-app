import type { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/shared/hooks/useTheme';

interface PlaceholderScreenProps extends PropsWithChildren {
  title: string;
}

export function PlaceholderScreen({ title, children }: PlaceholderScreenProps) {
  const { colors, spacing, typography } = useTheme();
  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={[styles.content, { padding: spacing.md, gap: spacing.md }]}>
        <Text accessibilityRole="header" style={[typography.title, { color: colors.textPrimary }]}>
          {title}
        </Text>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
