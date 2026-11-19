import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { IconButton } from 'react-native-paper';

import { AppButton } from '@/shared/components/AppButton';
import { useTheme } from '@/shared/hooks/useTheme';

export function JoinPartyForm() {
  const { colors, radii, spacing, typography } = useTheme();
  const navigation = useNavigation();
  const [code, setCode] = useState('');

  const canSubmit = code.trim().length === 6;

  const label = [
    typography.caption,
    styles.label,
    {
      color: colors.textSecondary,
      marginBottom: spacing.xs,
    },
  ];
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
        <IconButton
          onPress={() => navigation.navigate('App', { screen: 'Scanner' })}
          mode="contained-tonal"
          icon="scan-helper"
          accessibilityLabel="Scanner un QR code"
          style={[styles.iconButton, { borderRadius: radii.md }]}
        />
      </View>

      <Text style={[typography.caption, { color: colors.textSecondary }]}>{infos}</Text>

      <AppButton
        onPress={() =>
          navigation.navigate('App', {
            screen: 'WaitingRoom',
            params: { roomId: code.trim() },
          })
        }
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
  field: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 46,
    minWidth: 200,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'flex-end',
  },
  iconButton: {
    width: 46,
    height: 46,
    margin: 0,
    padding: 0,
  },
  stepperButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seats: {
    minWidth: 24,
    textAlign: 'center',
  },
  disabled: { opacity: 0.4 },
  buttonContent: { flexDirection: 'row-reverse' },
});
