import { type ReactNode, useEffect, useState } from 'react';
import { type LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { GestureDetector, usePanGesture } from 'react-native-gesture-handler';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/shared/hooks/useTheme';

interface BottomDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVisibleHeightChange?: (height: number) => void;
  children: ReactNode;
}

const HANDLE_HEIGHT = 24;
const HANDLE_WIDTH = 40;
const HANDLE_THICKNESS = 4;
const ANIMATION_DURATION_MS = 250;
const VELOCITY_PROJECTION_S = 0.2;
const ACTIVE_OFFSET_Y = 10;

export function BottomDrawer({ open, onOpenChange, onVisibleHeightChange, children }: BottomDrawerProps) {
  const { colors, radii, shadows, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [height, setHeight] = useState(0);

  // Replié, il ne reste visible que la poignée, au-dessus de la zone système du bas
  const closedOffset = Math.max(height - HANDLE_HEIGHT - insets.bottom, 0);
  const offset = useSharedValue(0);
  const startOffset = useSharedValue(0);

  useEffect(() => {
    offset.set(withTiming(open ? 0 : closedOffset, { duration: ANIMATION_DURATION_MS }));
  }, [open, closedOffset, offset]);

  useEffect(() => {
    onVisibleHeightChange?.(open ? height : height - closedOffset);
  }, [open, height, closedOffset, onVisibleHeightChange]);

  const pan = usePanGesture({
    runOnJS: true,
    activeOffsetY: [-ACTIVE_OFFSET_Y, ACTIVE_OFFSET_Y],
    onBegin: () => {
      startOffset.set(offset.get());
    },
    onUpdate: (event) => {
      offset.set(Math.min(Math.max(startOffset.get() + event.translationY, 0), closedOffset));
    },
    onDeactivate: (event) => {
      const projected = offset.get() + event.velocityY * VELOCITY_PROJECTION_S;
      const shouldOpen = projected < closedOffset / 2;
      offset.set(withTiming(shouldOpen ? 0 : closedOffset, { duration: ANIMATION_DURATION_MS }));
      onOpenChange(shouldOpen);
    },
  });

  const drawerStyle = useAnimatedStyle(() => ({ transform: [{ translateY: offset.value }] }));

  // Le contenu s'efface en se repliant, pour ne laisser que la poignée
  const contentStyle = useAnimatedStyle(() => ({
    opacity: closedOffset > 0 ? interpolate(offset.value, [0, closedOffset * 0.6], [1, 0], 'clamp') : 1,
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        onLayout={(event: LayoutChangeEvent) => setHeight(event.nativeEvent.layout.height)}
        style={[
          styles.drawer,
          isDark ? shadows.floatingDark : shadows.floatingLight,
          {
            backgroundColor: colors.surface,
            borderTopLeftRadius: radii.md,
            borderTopRightRadius: radii.md,
          },
          drawerStyle,
        ]}
      >
        <View
          accessible
          accessibilityLabel={open ? 'Replier le panneau' : 'Déplier le panneau'}
          accessibilityActions={[{ name: 'activate' }]}
          onAccessibilityAction={() => onOpenChange(!open)}
          style={styles.handleArea}
        >
          <View style={[styles.handle, { backgroundColor: colors.border }]} />
        </View>
        <Animated.View pointerEvents={open ? 'auto' : 'none'} style={[{ paddingBottom: insets.bottom }, contentStyle]}>
          {children}
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  handleArea: {
    height: HANDLE_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  handle: {
    width: HANDLE_WIDTH,
    height: HANDLE_THICKNESS,
    borderRadius: HANDLE_THICKNESS / 2,
  },
});
