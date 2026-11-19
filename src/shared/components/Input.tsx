import { type Dispatch, type SetStateAction } from 'react';
import { type KeyboardTypeOptions, StyleSheet, Text, TextInput, type TextInputProps, View } from 'react-native';

import { useTheme } from '@/shared/hooks/useTheme';

interface AppInputProps {
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  keyboard?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoComplete?: TextInputProps['autoComplete'];
  /** Message affiché sous le champ (bordure en rouge). */
  error?: string | null;
}

export const AppInput = ({
  label,
  value,
  setValue,
  placeholder,
  keyboard = 'default',
  secureTextEntry,
  autoCapitalize,
  autoComplete,
  error,
}: AppInputProps) => {
  const { colors, radii, spacing, typography } = useTheme();
  const inputStyle = [typography.body, styles.input, { color: colors.textPrimary }];
  const fieldStyle = [
    styles.field,
    {
      borderColor: error ? colors.danger : colors.border,
      borderRadius: radii.md,
      backgroundColor: colors.surface,
      paddingHorizontal: spacing.compact,
    },
  ];
  const labelStyle = [
    typography.caption,
    styles.label,
    {
      color: colors.textSecondary,
      marginBottom: spacing.xs,
    },
  ];
  return (
    <View>
      <Text style={labelStyle}>{label}</Text>
      <View style={fieldStyle}>
        <TextInput
          style={inputStyle}
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          placeholderTextColor={colors.border}
          keyboardType={keyboard}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          aria-invalid={!!error}
        />
      </View>
      {error && (
        <Text
          style={[
            typography.caption,
            {
              color: colors.danger,
              marginTop: spacing.xs,
            },
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: { fontWeight: '600' },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 46,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
  },
});
