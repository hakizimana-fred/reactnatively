import React, { useCallback, useRef } from 'react';
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { GlassView } from 'reactnatively-glass';
import { SPRING_SNAPPY } from 'reactnatively-animations';
import type { InteractiveGlassSurfaceProps } from './InteractiveGlassSurface.types';

const MAX_TILT_DEG = 12;

/**
 * InteractiveGlassSurface — GlassView that simulates a gyroscope tilt effect
 * by tracking touch position relative to the component center.
 * Springs back to 0,0 on touch end.
 */
export const InteractiveGlassSurface = React.memo<InteractiveGlassSurfaceProps>(
  ({
    children,
    parallaxStrength = 0.05,
    elevation = 2,
    style,
  }) => {
    const rotateX = useSharedValue(0);
    const rotateY = useSharedValue(0);

    // Store layout dimensions for center calculation
    const layoutRef = useRef({ width: 0, height: 0 });

    const handleLayout = useCallback((e: LayoutChangeEvent) => {
      layoutRef.current = {
        width:  e.nativeEvent.layout.width,
        height: e.nativeEvent.layout.height,
      };
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        { perspective: 800 },
        { rotateX: `${rotateX.value}deg` },
        { rotateY: `${rotateY.value}deg` },
      ],
    }));

    const responderHandlers = {
      onStartShouldSetResponder: () => true,
      onMoveShouldSetResponder: () => true,
      onResponderGrant: (e: any) => {
        const { locationX, locationY } = e.nativeEvent;
        updateTilt(locationX, locationY);
      },
      onResponderMove: (e: any) => {
        const { locationX, locationY } = e.nativeEvent;
        updateTilt(locationX, locationY);
      },
      onResponderRelease: () => {
        resetTilt();
      },
      onResponderTerminate: () => {
        resetTilt();
      },
    };

    function updateTilt(touchX: number, touchY: number) {
      const { width, height } = layoutRef.current;
      if (width === 0 || height === 0) return;

      // Normalise to -1..1 relative to center
      const normX = (touchX - width  / 2) / (width  / 2);
      const normY = (touchY - height / 2) / (height / 2);

      // Clamp to [-1,1]
      const clampedX = Math.max(-1, Math.min(1, normX));
      const clampedY = Math.max(-1, Math.min(1, normY));

      // rotateX tilts on vertical axis (pitch), rotateY on horizontal (yaw)
      const tiltScalar = parallaxStrength * MAX_TILT_DEG * 20;
      rotateX.value = withSpring(-clampedY * tiltScalar, SPRING_SNAPPY);
      rotateY.value = withSpring( clampedX * tiltScalar, SPRING_SNAPPY);
    }

    function resetTilt() {
      rotateX.value = withSpring(0, SPRING_SNAPPY);
      rotateY.value = withSpring(0, SPRING_SNAPPY);
    }

    return (
      <Animated.View style={[styles.wrapper, animatedStyle, style]}>
        <View style={StyleSheet.absoluteFill} onLayout={handleLayout} {...responderHandlers} />
        <GlassView
          elevation={elevation}
          variant="surface"
          borderRadius={20}
          style={styles.glass}
        >
          {children}
        </GlassView>
      </Animated.View>
    );
  },
);

InteractiveGlassSurface.displayName = 'InteractiveGlassSurface';

const styles = StyleSheet.create({
  wrapper: {
    // perspective is set via transform in animatedStyle
  },
  glass: {
    overflow: 'hidden',
  },
});
