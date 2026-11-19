import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Camera, type InitialViewState, Map, Marker, UserLocation } from '@maplibre/maplibre-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { useMapStyle } from '@/shared/hooks/useMapStyle';
import { useTheme } from '@/shared/hooks/useTheme';

import { useUserLngLat } from '../hooks/useUserLngLat';
import type { PlayingField } from '../types/leaderboard.types';

interface PlayingFieldsMapProps {
  fields: PlayingField[];
  onFieldPress?: (field: PlayingField) => void;
}

const MAP_HEIGHT = 200;
const MARKER_SIZE = 32;

// Centre sur Nantes par défaut
const DEFAULT_VIEW: InitialViewState = {
  center: [-1.5536, 47.2184], // Nantes
  zoom: 12,
};

export function PlayingFieldsMap({ fields, onFieldPress }: PlayingFieldsMapProps) {
  const { colors, radii, typography } = useTheme();
  const mapStyle = useMapStyle();
  const userLngLat = useUserLngLat();

  return (
    <View
      style={[
        styles.root,
        {
          borderRadius: radii.lg,
          borderColor: colors.border,
          backgroundColor: colors.surfaceViolet,
        },
      ]}
    >
      <Map
        style={StyleSheet.absoluteFill}
        mapStyle={mapStyle}
        touchRotate={false}
        touchPitch={false}
        compass={false}
        logo={false}
      >
        <Camera initialViewState={DEFAULT_VIEW} />
        {userLngLat && <UserLocation />}
        {fields.map((field) => (
          <Marker
            key={field.id}
            id={field.id}
            lngLat={field.lngLat}
            anchor="center"
            onPress={onFieldPress ? () => onFieldPress(field) : undefined}
          >
            <View accessibilityLabel={`${field.name}, ${field.gamesCount} partie(s)`}>
              <View
                style={[
                  styles.marker,
                  {
                    backgroundColor: colors.actionPrimary,
                    borderColor: colors.surface,
                  },
                ]}
              >
                <MaterialCommunityIcons name="cards-spade-outline" size={16} color={colors.onAction} />
              </View>
              {field.gamesCount > 1 && (
                <View
                  style={[
                    styles.countBadge,
                    {
                      backgroundColor: colors.accent,
                      borderColor: colors.surface,
                    },
                  ]}
                >
                  <Text style={[typography.navigation, styles.badgeLabel, { color: colors.onAction }]}>
                    {field.gamesCount}
                  </Text>
                </View>
              )}
            </View>
          </Marker>
        ))}
      </Map>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: MAP_HEIGHT,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
  },
  marker: {
    width: MARKER_SIZE,
    height: MARKER_SIZE,
    borderRadius: MARKER_SIZE / 2,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countBadge: {
    position: 'absolute',
    top: -6,
    right: -8,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeLabel: { fontWeight: '700' },
});
