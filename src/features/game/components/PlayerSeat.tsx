import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';

import { useTheme } from '@/shared/hooks/useTheme';
import { formatChips } from '@/shared/utils/chips';
import { getInitials } from '@/shared/utils/initials';

import type { PlayerRole } from '../types/game.types';

interface PlayerSeatProps {
  firstName: string;
  lastName: string;
  role?: PlayerRole;
  totalChips: number;
  currentBet?: number;
  isWaiting?: boolean;
}

const AVATAR_SIZE = 32;

function getStatus(currentBet: number | undefined, isWaiting: boolean): string | null {
  if (currentBet !== undefined) {
    return `Mise : ${formatChips(currentBet)}`;
  }
  return isWaiting ? 'En attente' : null;
}

const PlayerSeat = ({
  firstName,
  lastName,
  role = 'none',
  totalChips,
  currentBet,
  isWaiting = false,
}: PlayerSeatProps) => {
  const { colors, radii, shadows, spacing, typography, isDark } = useTheme();

  const status = getStatus(currentBet, isWaiting);
  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <View
      accessible
      accessibilityLabel={[fullName, `${formatChips(totalChips)} jetons`, status].filter(Boolean).join(', ')}
      style={[
        styles.container,
        isDark ? shadows.floatingDark : shadows.floatingLight,
        {
          backgroundColor: colors.surface,
          borderRadius: radii.md,
          padding: spacing.sm,
          gap: spacing.xs,
        },
      ]}
    >
      <View style={styles.header}>
        <Avatar.Text
          size={AVATAR_SIZE}
          label={getInitials(firstName, lastName)}
          color={colors.textSecondary}
          style={{ backgroundColor: colors.surfaceViolet }}
        />
        {role !== 'none' ? (
          <View
            style={[
              styles.role,
              {
                backgroundColor: colors.surfaceViolet,
                borderRadius: radii.sm,
              },
            ]}
          >
            <Text style={[typography.caption, { color: colors.textSecondary }]}>{role}</Text>
          </View>
        ) : null}
      </View>
      <Text numberOfLines={1} style={[typography.action, { color: colors.textPrimary }]}>
        {fullName}
      </Text>
      <Text style={[typography.heading, { color: colors.textPrimary }]}>{formatChips(totalChips)}</Text>
      {status ? <Text style={[typography.caption, { color: colors.actionPrimary }]}>{status}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 112,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  role: {
    minWidth: 24,
    paddingHorizontal: 6,
    paddingVertical: 4,
    alignItems: 'center',
  },
});

export default PlayerSeat;
