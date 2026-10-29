import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { AppButton } from '@/shared/components/AppButton';
import { useGeocoding } from '@/shared/hooks/useGeocoding';
import { useTheme } from '@/shared/hooks/useTheme';

const MIN_SEATS = 2;
const MAX_SEATS = 3;

export function CreatePartyForm() {
  const { colors, radii, spacing, typography } = useTheme();
  const { coordinates, error, loading, geocode } = useGeocoding();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [players, setPlayers] = useState(3);

  const canSubmit = name.trim().length > 0 && address.trim().length > 0 && !loading;

  const label = [typography.caption, styles.label, { color: colors.textSecondary, marginBottom: spacing.xs }];
  const field = [
    styles.field,
    {
      borderColor: colors.border,
      borderRadius: radii.md,
      backgroundColor: colors.surface,
      paddingHorizontal: spacing.compact,
    },
  ];
  const input = [typography.body, styles.input, { color: colors.textPrimary }];
  const infos = coordinates
    ? `Lieu trouvé : ${coordinates.latitude.toFixed(5)}, ${coordinates.longitude.toFixed(5)}`
    : 'Un code à partager sera créé avec votre partie.';
  const stepperButton = [styles.stepperButton, { backgroundColor: colors.surfaceViolet, borderRadius: radii.sm }];

  return (
    <View style={{ gap: spacing.md }}>
      <View>
        <Text style={label}>Nom de la partie</Text>
        <View style={field}>
          <TextInput
            style={input}
            value={name}
            onChangeText={setName}
            placeholder="Le Monday Club"
            placeholderTextColor={colors.border}
            returnKeyType="next"
          />
        </View>
      </View>

      <View>
        <Text style={label}>Lieu de rendez-vous</Text>
        <View style={field}>
          <TextInput
            style={input}
            value={address}
            onChangeText={setAddress}
            placeholder="Club Montmartre · Paris 9e"
            placeholderTextColor={colors.border}
            returnKeyType="done"
          />
          <Ionicons name="location-outline" size={20} color={colors.actionPrimary} />
        </View>
      </View>

      <Text style={[typography.caption, { color: error ? colors.danger : colors.textSecondary }]}>
        {error ?? infos}
      </Text>

      <View style={styles.row}>
        <Text style={[typography.action, { color: colors.textPrimary }]}>Nombre de places</Text>
        <View style={[styles.row, { gap: spacing.compact }]}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Retirer une place"
            disabled={players <= MIN_SEATS}
            onPress={() => setPlayers((p) => Math.max(p - 1, MIN_SEATS))}
            style={[stepperButton, players <= MIN_SEATS && styles.disabled]}
          >
            <Ionicons name="remove" size={18} color={colors.textPrimary} />
          </Pressable>
          <Text style={[typography.heading, styles.seats, { color: colors.textPrimary }]}>{players}</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Ajouter une place"
            disabled={players >= MAX_SEATS}
            onPress={() => setPlayers((p) => Math.min(p + 1, MAX_SEATS))}
            style={[stepperButton, players >= MAX_SEATS && styles.disabled]}
          >
            <Ionicons name="add" size={18} color={colors.actionPrimary} />
          </Pressable>
        </View>
      </View>

      <AppButton
        onPress={() => geocode(address.trim())}
        disabled={!canSubmit}
        loading={loading}
        style={{ marginTop: spacing.md }}
        contentStyle={[styles.buttonContent, { paddingVertical: spacing.sm }]}
        labelStyle={{ fontSize: 15 }}
      >
        Créer la partie
      </AppButton>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontWeight: '600' },
  field: { flexDirection: 'row', alignItems: 'center', minHeight: 46, borderWidth: 1 },
  input: { flex: 1, paddingVertical: 12 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  stepperButton: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  seats: { minWidth: 24, textAlign: 'center' },
  disabled: { opacity: 0.4 },
  buttonContent: { flexDirection: 'row-reverse' },
});
