import { Button, type ButtonProps } from 'react-native-paper';

import { useTheme } from '@/shared/hooks/useTheme';

export type AppButtonProps = Omit<ButtonProps, 'mode'> & {
  variant?: 'primary' | 'secondary' | 'tonal' | 'ghost';
};

const MODE_BY_VARIANT = {
  primary: 'contained',
  secondary: 'outlined',
  tonal: 'contained-tonal',
  ghost: 'text',
} as const;

export const AppButton = ({ variant = 'primary', style, labelStyle, ...props }: AppButtonProps) => {
  const { colors, radii, spacing, typography } = useTheme();

  return (
    <Button
      mode={MODE_BY_VARIANT[variant]}
      accessibilityRole="button"
      style={[{ borderRadius: radii.md }, variant === 'secondary' && { backgroundColor: colors.surface }, style]}
      contentStyle={{ paddingVertical: spacing.xs }}
      labelStyle={[typography.action, labelStyle]}
      {...props}
    />
  );
};
