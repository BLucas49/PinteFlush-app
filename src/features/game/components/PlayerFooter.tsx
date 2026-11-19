import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';

import { AppButton } from '@/shared/components/AppButton';
import { useTheme } from '@/shared/hooks/useTheme';
import { formatChips, formatChipsLabel } from '@/shared/utils/chips';
import { getInitials } from '@/shared/utils/initials';

import type { CurrentPlayer } from '../types/game.types';
import PlayerHand from './PlayerHand';

interface PlayerFooterProps {
  player: CurrentPlayer;
  onFold?: () => void;
  onCall?: () => void;
  onRaise?: () => void;
}

const AVATAR_SIZE = 28;
const DOT_SIZE = 8;

const PlayerFooter = ({ player, onFold, onCall, onRaise }: PlayerFooterProps) => {
  const { colors, spacing, typography } = useTheme();
  const fullName = `${player.firstName} ${player.lastName}`.trim();
  // Paper ajoute 24 px de marge de chaque côté du texte : trop pour trois boutons côte à côte
  const actionLabelStyle = { marginHorizontal: spacing.xs };

  return (
    <View
      style={[
        styles.container,
        {
          padding: spacing.sm,
          gap: spacing.sm,
        },
      ]}
    >
      <View style={styles.row}>
        <View style={[styles.turn, { gap: spacing.xs }]}>
          <View style={[styles.dot, { backgroundColor: colors.actionPrimary }]} />
          <Text style={[typography.action, { color: colors.actionPrimary }]}>À vous de jouer</Text>
        </View>
        <Text style={[typography.caption, { color: colors.textSecondary }]}>
          {`${player.secondsLeft} s / ${player.turnDuration} s`}
        </Text>
      </View>

      <View style={[styles.hand, { gap: spacing.sm }]}>
        <PlayerHand cards={player.hand} />
        <View style={styles.info}>
          <View style={[styles.identity, { gap: spacing.xs }]}>
            <Avatar.Text
              size={AVATAR_SIZE}
              label={getInitials(player.firstName, player.lastName)}
              color={colors.textSecondary}
              style={{ backgroundColor: colors.surfaceViolet }}
            />
            <Text numberOfLines={1} style={[styles.name, typography.action, { color: colors.textPrimary }]}>
              {fullName}
            </Text>
          </View>
          <View style={[styles.chips, { gap: spacing.sm }]}>
            <Text style={[typography.heading, { color: colors.textPrimary }]}>
              {formatChipsLabel(player.totalChips)}
            </Text>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>
              {`Votre mise : ${formatChips(player.currentBet)}`}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={[typography.caption, { color: colors.textSecondary }]}>
          {`À suivre : ${formatChipsLabel(player.followAmount)}`}
        </Text>
        <Text style={[typography.caption, { color: colors.textSecondary }]}>
          {`Relance min. : ${formatChips(player.minRaise)}`}
        </Text>
      </View>

      <View style={[styles.row, { gap: spacing.sm }]}>
        <AppButton variant="tonal" style={styles.action} labelStyle={actionLabelStyle} onPress={onFold}>
          Se coucher
        </AppButton>
        <AppButton style={styles.action} labelStyle={actionLabelStyle} onPress={onCall}>
          {`Suivre ${formatChips(player.followAmount)}`}
        </AppButton>
        <AppButton variant="tonal" style={styles.action} labelStyle={actionLabelStyle} onPress={onRaise}>
          Relancer
        </AppButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  turn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
  hand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  chips: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flexShrink: 1,
  },
  action: {
    flex: 1,
  },
});

export default PlayerFooter;
