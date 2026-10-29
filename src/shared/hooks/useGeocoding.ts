import * as Location from 'expo-location';
import { useState } from 'react';

export type Coordinates = { latitude: number; longitude: number };

export function useGeocoding() {
  const [accessGranted, setAccessGranted] = useState<boolean | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const geocode = async (address: string): Promise<Coordinates | null> => {
    setLoading(true);
    setError(null);
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      setAccessGranted(granted);
      if (!accessGranted) {
        throw new Error('Permission de localisation refusée');
      }
      const [result] = await Location.geocodeAsync(address);
      const found = result ? { latitude: result.latitude, longitude: result.longitude } : null;
      if (!found) {
        setError('Adresse introuvable');
      }
      setCoordinates(found);
      return found;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'La géolocalisation a échoué');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { coordinates, error, loading, geocode };
}
