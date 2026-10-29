import type { PropsWithChildren, ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/shared/hooks/useTheme';

interface PlaceholderScreenProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
  header?: ReactNode;
  centered?: boolean;
}

export function PlaceholderScreen({ title, subtitle, header, centered = true, children }: PlaceholderScreenProps) {
  const { colors, spacing, typography } = useTheme();
  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.content,
          centered && styles.centered,
          { padding: centered ? spacing.md : spacing.lg, gap: spacing.md },
        ]}
      >
        {header && <View style={{ alignSelf: 'stretch', marginBottom: spacing.lg }}>{header}</View>}
        <View style={{ gap: spacing.xs }}>
          <Text accessibilityRole="header" style={[typography.title, { color: colors.textPrimary }]}>
            {title}
          </Text>
          {subtitle && <Text style={[typography.body, { color: colors.textSecondary }]}>{subtitle}</Text>}
        </View>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { flex: 1 },
  centered: { justifyContent: 'center', alignItems: 'center' },
});
