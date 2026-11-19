import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/shared/hooks/useTheme';
import { getInitials } from '@/shared/utils/initials';

import type { LeaderboardPlayer } from '../types/leaderboard.types';

interface LeaderboardPlayerRowProps {
  player: LeaderboardPlayer;
}

const AVATAR_SIZE = 36;

export function LeaderboardPlayerRow({ player }: LeaderboardPlayerRowProps) {
  const { colors, radii, spacing, typography } = useTheme();
  const { rank, firstName, lastName, gamesPlayed, points, trend, isCurrentUser } = player;

  const fullName = `${firstName} ${lastName}`;
  const rankColor = rank === 1 ? colors.gold : colors.textSecondary;
  const trendColor = trend > 0 ? colors.actionPrimary : colors.textSecondary;
  const trendLabel = trend === 0 ? 'stable' : `${trend > 0 ? 'gagne' : 'perd'} ${Math.abs(trend)} place(s)`;

  return (
    <View
      accessible
      accessibilityLabel={`${rank}e, ${fullName}${isCurrentUser ? ', vous' : ''}, ${points} points, ${trendLabel}`}
      style={[
        styles.row,
        {
          gap: spacing.compact,
          paddingVertical: spacing.compact,
          paddingHorizontal: spacing.compact,
          borderRadius: radii.md,
        },
        isCurrentUser && { backgroundColor: colors.surfaceViolet },
      ]}
    >
      <Text style={[typography.heading, styles.rank, { color: rankColor }]}>{rank}</Text>

      <View
        style={[
          styles.avatar,
          { backgroundColor: isCurrentUser ? colors.actionPrimary : colors.surfaceViolet },
          !isCurrentUser &&
            rank === 1 && {
              borderWidth: 1,
              borderColor: colors.gold,
            },
        ]}
      >
        <Text style={[typography.caption, { color: isCurrentUser ? colors.onAction : rankColor }]}>
          {getInitials(firstName, lastName)}
        </Text>
      </View>

      <View style={styles.identity}>
        <View style={[styles.nameLine, { gap: spacing.sm }]}>
          <Text numberOfLines={1} style={[typography.body, styles.name, { color: colors.textPrimary }]}>
            {fullName}
          </Text>
          {isCurrentUser && (
            <Text style={[typography.navigation, styles.you, { color: colors.actionPrimary }]}>VOUS</Text>
          )}
        </View>
        <Text style={[typography.caption, { color: colors.textSecondary }]}>{gamesPlayed} parties</Text>
      </View>

      <Text style={[typography.heading, { color: colors.textPrimary }]}>{points}</Text>

      <View style={[styles.trend, { gap: 2 }]}>
        {trend === 0 ? (
          <Text style={[typography.caption, { color: trendColor }]}>–</Text>
        ) : (
          <>
            <MaterialCommunityIcons name={trend > 0 ? 'arrow-up' : 'arrow-down'} size={12} color={trendColor} />
            <Text style={[typography.caption, { color: trendColor }]}>{Math.abs(trend)}</Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rank: {
    minWidth: 28,
    fontVariant: ['tabular-nums'],
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  identity: {
    flex: 1,
    minWidth: 0,
  },
  nameLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flexShrink: 1,
    fontWeight: '600',
  },
  you: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  trend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minWidth: 28,
  },
});
