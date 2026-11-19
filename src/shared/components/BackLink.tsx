import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text } from 'react-native';

import { useTheme } from '@/shared/hooks/useTheme';

interface BackLinkProps {
  label: string;
  /** Par défaut : retour à l'écran précédent. */
  onPress?: () => void;
}

export const BackLink = ({ label, onPress }: BackLinkProps) => {
  const { colors, spacing, typography } = useTheme();
  const navigation = useNavigation();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Retour : ${label}`}
      onPress={onPress ?? (() => navigation.goBack())}
      style={[styles.root, { gap: spacing.xs }]}
      hitSlop={spacing.sm}
    >
      <MaterialCommunityIcons name="arrow-left" size={14} color={colors.actionPrimary} />
      <Text style={[typography.caption, styles.label, { color: colors.actionPrimary }]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  label: { fontWeight: '600' },
});
