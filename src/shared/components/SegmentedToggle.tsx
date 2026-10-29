import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/shared/hooks/useTheme';

type IconName = keyof typeof Ionicons.glyphMap;

export type SegmentedToggleOption = {
  value: string;
  label: string;
  icon?: IconName;
};

interface SegmentedToggleProps {
  options: readonly [SegmentedToggleOption, SegmentedToggleOption];
  value: string;
  onChange: (value: string) => void;
}

export const SegmentedToggle = ({ options, value, onChange }: SegmentedToggleProps) => {
  const { colors, radii, spacing, typography } = useTheme();

  return (
    <View
      accessibilityRole="tablist"
      style={[styles.root, { backgroundColor: colors.surfaceViolet, borderRadius: radii.md, padding: spacing.xs }]}
    >
      {options.map((option) => {
        const selected = option.value === value;
        const color = selected ? colors.onAction : colors.textSecondary;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            onPress={() => onChange(option.value)}
            style={[
              styles.segment,
              { gap: spacing.sm, borderRadius: radii.sm },
              selected && { backgroundColor: colors.actionPrimary },
            ]}
          >
            {option.icon && <Ionicons name={option.icon} size={18} color={color} />}
            <Text style={[typography.action, { color }]}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flexDirection: 'row', alignSelf: 'stretch' },
  segment: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minHeight: 36 },
});
