import type { LngLat } from '@maplibre/maplibre-react-native';
import * as Location from 'expo-location';

// Position de l'utilisateur au format MapLibre, ou null si refusée ou indisponible
export async function getUserLngLat(): Promise<LngLat | null> {
  const { granted } = await Location.requestForegroundPermissionsAsync();
  if (!granted) {
    return null;
  }
  // D'abord, dernière position connue (plus rapide), puis position actuelle si aucune
  const position =
    (await Location.getLastKnownPositionAsync()) ??
    (await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }));
  return [position.coords.longitude, position.coords.latitude];
}
