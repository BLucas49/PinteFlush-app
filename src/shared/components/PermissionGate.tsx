import type { ReactNode } from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/shared/components/AppButton';
import { LoadingState } from '@/shared/components/LoadingState';
import { useAutoRequestPermission } from '@/shared/hooks/useAutoRequestPermission';
import { useTheme } from '@/shared/hooks/useTheme';
import type { PermissionState } from '@/shared/types/permissions.types';

interface PermissionGateProps {
  permission: PermissionState | null;
  onRequest: () => Promise<unknown>;
  message: string;
  actionLabel?: string;
  children: ReactNode;
}

export function PermissionGate({
  permission,
  onRequest,
  message,
  actionLabel = 'Autoriser',
  children,
}: PermissionGateProps) {
  const { colors, spacing } = useTheme();
  useAutoRequestPermission(permission, onRequest);

  if (!permission) {
    return <LoadingState />;
  }
  if (permission.granted) {
    return children;
  }

  return (
    <View
      style={[
        styles.center,
        {
          padding: spacing.lg,
          gap: spacing.md,
        },
      ]}
    >
      <Text style={[styles.text, { color: colors.textPrimary }]}>{message}</Text>
      {permission.canAskAgain ? (
        <AppButton onPress={() => void onRequest()}>{actionLabel}</AppButton>
      ) : (
        <AppButton onPress={() => void Linking.openSettings()}>Ouvrir les réglages</AppButton>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { textAlign: 'center' },
});
