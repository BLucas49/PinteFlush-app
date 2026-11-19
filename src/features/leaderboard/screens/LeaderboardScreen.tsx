import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/shared/components/EmptyState';
import { SegmentedToggle, type SegmentedToggleOption } from '@/shared/components/SegmentedToggle';
import { useTheme } from '@/shared/hooks/useTheme';

import { LeaderboardPlayerRow } from '../components/LeaderboardPlayerRow';
import { PlayingFieldsMap } from '../components/PlayingFieldsMap';
import { useLeaderboard } from '../hooks/useLeaderboard';

type ClubMode = 'leaderboard' | 'history';

const MODES = [
  {
    value: 'leaderboard',
    label: 'Classement',
    icon: 'trophy-outline',
  },
  {
    value: 'history',
    label: 'Historique',
    icon: 'history',
  },
] as const satisfies readonly [SegmentedToggleOption, SegmentedToggleOption];

const PREVIEW_COUNT = 5;

const LeaderboardScreen = () => {
  const { colors, radii, spacing, typography } = useTheme();
  const { periodLabel, players, fields } = useLeaderboard();
  const [mode, setMode] = useState<ClubMode>('leaderboard');
  const [showAll, setShowAll] = useState(false);

  const visiblePlayers = showAll ? players : players.slice(0, PREVIEW_COUNT);
  const canExpand = players.length > PREVIEW_COUNT;

  const sectionTitle = [typography.heading, { color: colors.textPrimary }];
  const columnLabel = [typography.navigation, styles.columnLabel, { color: colors.textSecondary }];

  return (
    <SafeAreaView edges={['top']} style={[styles.root, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.root,
          {
            paddingHorizontal: spacing.lg,
            paddingTop: spacing.lg,
            paddingBottom: spacing.md,
            gap: spacing.lg,
          },
        ]}
      >
        <View style={styles.titleRow}>
          <Text accessibilityRole="header" style={[typography.title, { color: colors.textPrimary }]}>
            La vie du club
          </Text>
          <MaterialCommunityIcons name="cards-club-outline" size={26} color={colors.actionPrimary} />
        </View>

        <SegmentedToggle options={MODES} value={mode} onChange={(value) => setMode(value as ClubMode)} />

        {mode === 'history' && <EmptyState message="L'historique des parties arrive bientôt." />}

        {mode === 'leaderboard' && (
          <>
            <View style={{ gap: spacing.compact }}>
              <Text accessibilityRole="header" style={sectionTitle}>
                Nos terrains de jeu
              </Text>
              <PlayingFieldsMap fields={fields} />
            </View>

            <View style={[styles.root, { gap: spacing.compact }]}>
              <View style={styles.sectionHeader}>
                <Text accessibilityRole="header" style={sectionTitle}>
                  Le classement
                </Text>
                {/* TODO : ouvrir un sélecteur de période une fois l'API branchée */}
                <View
                  style={[
                    styles.periodChip,
                    {
                      gap: spacing.xs,
                      paddingHorizontal: spacing.compact,
                      paddingVertical: spacing.xs,
                      borderRadius: radii.full,
                      borderColor: colors.border,
                      backgroundColor: colors.surface,
                    },
                  ]}
                >
                  <Text style={[typography.action, { color: colors.textPrimary }]}>{periodLabel}</Text>
                  <MaterialCommunityIcons name="chevron-down" size={16} color={colors.textPrimary} />
                </View>
              </View>

              <View
                style={[
                  styles.card,
                  {
                    padding: spacing.sm,
                    borderRadius: radii.lg,
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                  },
                ]}
              >
                <View
                  style={[
                    styles.columns,
                    {
                      paddingHorizontal: spacing.compact,
                      paddingVertical: spacing.sm,
                    },
                  ]}
                >
                  <Text style={columnLabel}>JOUEUR</Text>
                  <Text style={columnLabel}>POINTS / ÉVOL.</Text>
                </View>

                <FlatList
                  data={visiblePlayers}
                  keyExtractor={(player) => player.id}
                  renderItem={({ item }) => <LeaderboardPlayerRow player={item} />}
                  showsVerticalScrollIndicator={false}
                  ListFooterComponent={
                    canExpand ? (
                      <Pressable
                        accessibilityRole="button"
                        onPress={() => setShowAll((value) => !value)}
                        style={[
                          styles.seeAll,
                          {
                            gap: spacing.xs,
                            paddingVertical: spacing.compact,
                          },
                        ]}
                      >
                        <Text style={[typography.action, { color: colors.actionPrimary }]}>
                          {showAll ? 'Voir moins' : `Voir les ${players.length} joueurs`}
                        </Text>
                        <MaterialCommunityIcons
                          name={showAll ? 'chevron-up' : 'arrow-right'}
                          size={16}
                          color={colors.actionPrimary}
                        />
                      </Pressable>
                    ) : undefined
                  }
                />
              </View>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  periodChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  card: {
    flexShrink: 1,
    borderWidth: StyleSheet.hairlineWidth,
  },
  columns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columnLabel: {
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LeaderboardScreen;
