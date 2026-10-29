import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { AppButton } from '@/shared/components/AppButton';
import { useTheme } from '@/shared/hooks/useTheme';

export function JoinPartyForm() {
  const { colors, radii, spacing, typography } = useTheme();
  const [code, setCode] = useState('');

  const canSubmit = code.trim().length === 6;

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
  const infos = 'Un code à 6 caractères.';

  return (
    <View style={{ gap: spacing.md }}>
      <View style={styles.row}>
        <View>
          <Text style={label}>CODE</Text>
          <View style={field}>
            <TextInput
              style={input}
              value={code}
              onChangeText={setCode}
              placeholder="Entrez le code"
              placeholderTextColor={colors.border}
              returnKeyType="next"
              maxLength={6}
            />
          </View>
        </View>
        <AppButton
          variant="tonal"
          disabled={false}
          icon="scan-helper"
          style={{ marginTop: spacing.md }}
          contentStyle={[styles.buttonContent, { paddingVertical: spacing.xs }]}
          labelStyle={{ fontSize: 10 }}
        >
          QR Code
        </AppButton>
      </View>

      <Text style={[typography.caption, { color: colors.textSecondary }]}>{infos}</Text>

      <AppButton
        disabled={!canSubmit}
        style={{ marginTop: spacing.md }}
        contentStyle={[styles.buttonContent, { paddingVertical: spacing.sm }]}
        labelStyle={{ fontSize: 15 }}
      >
        Rejoindre la partie
      </AppButton>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontWeight: '600' },
  field: { flexDirection: 'row', minHeight: 46, minWidth: 200, borderWidth: 1 },
  input: { flex: 1, paddingVertical: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  stepperButton: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  seats: { minWidth: 24, textAlign: 'center' },
  disabled: { opacity: 0.4 },
  buttonContent: { flexDirection: 'row-reverse' },
});
