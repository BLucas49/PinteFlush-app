import { useEffect } from 'react';

import type { PermissionState } from '@/shared/types/permissions.types';

// Demande la permission dès l'affichage de l'écran, tant que le système l'autorise
export function useAutoRequestPermission(permission: PermissionState | null, request: () => Promise<unknown>) {
  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      void request();
    }
  }, [permission, request]);
}
