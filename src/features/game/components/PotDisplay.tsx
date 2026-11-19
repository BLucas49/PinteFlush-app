import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/shared/hooks/useTheme';
import { formatChips } from '@/shared/utils/chips';

import { PHASE_LABELS } from '../constants/PHASES';
import type { GamePhase } from '../types/game.types';

interface PotDisplayProps {
  amount: number;
  phase: GamePhase;
}

const ICON_SIZE = 18;

const PotDisplay = ({ amount, phase }: PotDisplayProps) => {
  const { colors, radii, shadows, spacing, typography, isDark } = useTheme();

  return (
    <View
      accessible
      accessibilityLabel={`${PHASE_LABELS[phase]}, ${formatChips(amount)} jetons dans le pot`}
      style={[
        styles.container,
        isDark ? shadows.floatingDark : shadows.floatingLight,
        {
          backgroundColor: colors.surface,
          borderRadius: radii.md,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
          gap: 2,
        },
      ]}
    >
      <Text style={[typography.caption, { color: colors.accent }]}>{PHASE_LABELS[phase]}</Text>
      <View style={[styles.amount, { gap: spacing.xs }]}>
        <MaterialCommunityIcons name="poker-chip" size={ICON_SIZE} color={colors.actionPrimary} />
        <Text style={[typography.heading, { color: colors.textPrimary }]}>{formatChips(amount)}</Text>
      </View>
      <Text
        numberOfLines={1}
        style={[
          styles.label,
          typography.caption,
          {
            color: colors.textSecondary,
            paddingHorizontal: spacing.xs,
          },
        ]}
      >
        jetons dans le pot
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  label: {
    textAlign: 'center',
  },
  amount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PotDisplay;
