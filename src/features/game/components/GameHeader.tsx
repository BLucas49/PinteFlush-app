import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/shared/hooks/useTheme';

interface GameHeaderProps {
  title: string;
  subtitle: string;
  onBack: () => void;
}

const GameHeader = ({ title, subtitle, onBack }: GameHeaderProps) => {
  const { colors, radii, spacing, typography } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          paddingTop: insets.top + spacing.sm,
          paddingBottom: spacing.sm,
          paddingHorizontal: spacing.md,
          gap: spacing.sm,
        },
      ]}
    >
      <IconButton
        mode="contained"
        icon="chevron-left"
        size={24}
        containerColor={colors.surfaceViolet}
        iconColor={colors.textSecondary}
        style={{
          borderRadius: radii.md,
          margin: 0,
        }}
        accessibilityLabel="Quitter la partie"
        onPress={onBack}
      />
      <View style={styles.titles}>
        <Text numberOfLines={1} style={[typography.heading, { color: colors.textPrimary }]}>
          {title}
        </Text>
        <Text numberOfLines={1} style={[typography.caption, { color: colors.textSecondary }]}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titles: {
    flex: 1,
  },
});

export default GameHeader;
