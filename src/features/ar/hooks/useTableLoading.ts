import type { Viro3DObject } from '@reactvision/react-viro';
import { type ComponentProps, useCallback, useEffect, useState } from 'react';

import { TABLE_APPEAR_DURATION_MS, TABLE_APPEAR_TIMEOUT_MARGIN_MS, TABLE_LOAD_TIMEOUT_MS } from '../constants/AR';
import { arLog } from '../services/arLogger';
import { useARPlacementStore } from '../store/arPlacementStore';

type TableStatus = 'loading' | 'ready' | 'shown' | 'error';
type LoadEndEvent = Parameters<NonNullable<ComponentProps<typeof Viro3DObject>['onLoadEnd']>>[0];
type ErrorEvent = Parameters<NonNullable<ComponentProps<typeof Viro3DObject>['onError']>>[0];

// Suit le chargement du tapis : chargé, puis apparu. Une erreur ou un délai dépassé est signalé à l'utilisateur
export const useTableLoading = (placed: boolean) => {
  const [status, setStatus] = useState<TableStatus>('loading');
  const setTableError = useARPlacementStore((state) => state.setTableError);

  const fail = useCallback(
    (reason: string, details?: unknown) => {
      arLog(`tapis indisponible : ${reason}`, details);
      setStatus('error');
      setTableError(true);
    },
    [setTableError],
  );

  const onLoadEnd = useCallback(
    (event: LoadEndEvent) => {
      // Viro n'envoie pas toujours `success` : un échec est signalé par onError, ici on ne le déduit que s'il est explicite
      if (event.nativeEvent?.success === false) {
        fail('chargement terminé sans succès');
        return;
      }
      setStatus((current) => (current === 'loading' ? 'ready' : current));
    },
    [fail],
  );

  const onError = useCallback((event: ErrorEvent) => fail('erreur de chargement', event.nativeEvent), [fail]);

  const onAppearFinish = useCallback(() => setStatus((current) => (current === 'ready' ? 'shown' : current)), []);

  // Le chargement ne se termine jamais
  useEffect(() => {
    if (status !== 'loading') {
      return;
    }
    const timer = setTimeout(() => fail('délai de chargement dépassé'), TABLE_LOAD_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [status, fail]);

  // La fin de l'animation n'est jamais signalée : on affiche les cartes quand même
  useEffect(() => {
    if (status !== 'ready' || !placed) {
      return;
    }
    const timer = setTimeout(onAppearFinish, TABLE_APPEAR_DURATION_MS + TABLE_APPEAR_TIMEOUT_MARGIN_MS);
    return () => clearTimeout(timer);
  }, [status, placed, onAppearFinish]);

  return {
    status,
    // L'animation reste active une fois terminée pour que le tapis garde sa taille
    runAnimation: placed && (status === 'ready' || status === 'shown'),
    onLoadEnd,
    onError,
    onAppearFinish,
  };
};
