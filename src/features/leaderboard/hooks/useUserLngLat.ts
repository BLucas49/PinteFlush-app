import type { LngLat } from '@maplibre/maplibre-react-native';
import { useEffect, useState } from 'react';

import { getUserLngLat } from '../services/userLocation';

export function useUserLngLat() {
  const [lngLat, setLngLat] = useState<LngLat | null>(null);

  useEffect(() => {
    let active = true;
    getUserLngLat()
      .then((value) => {
        if (active) {
          setLngLat(value);
        }
      })
      .catch((error: unknown) => console.warn('Position indisponible', error));
    return () => {
      active = false;
    };
  }, []);

  return lngLat;
}
