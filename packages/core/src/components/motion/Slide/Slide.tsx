import React, { useEffect } from 'react';
import { type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { SPRING_SNAPPY } from '@reactnatively/animations';
import type { SlideProps, SlideDirection } from './Slide.types';

// ─── Helpers ─────────────────────────────────────────────────────────────────
function initialOffset(direction: SlideDirection, distance: number): { x: number; y: number } {
  switch (direction) {
    case 'up':    return { x: 0, y:  distance };
    case 'down':  return { x: 0, y: -distance };
    case 'left':  return { x:  distance, y: 0 };
    case 'right': return { x: -distance, y: 0 };
    default:      return { x: 0, y:  distance };
  }
}

// ─── Component ────────────────────────────────────────────────────────────────
export const Slide = React.memo<SlideProps>(
  ({
    in:        visible   = true,
    direction  = 'up',
    distance   = 30,
    duration,   // kept for interface parity; spring drives animation
    children,
    style,
  }) => {
    const { x: offX, y: offY } = initialOffset(direction, distance);

    const translateX = useSharedValue(visible ? 0 : offX);
    const translateY = useSharedValue(visible ? 0 : offY);
    const opacity    = useSharedValue(visible ? 1 : 0);

    useEffect(() => {
      translateX.value = withSpring(visible ? 0 : offX, SPRING_SNAPPY);
      translateY.value = withSpring(visible ? 0 : offY, SPRING_SNAPPY);
      opacity.value    = withSpring(visible ? 1 : 0, SPRING_SNAPPY);
    }, [visible, offX, offY]);

    const animatedStyle = useAnimatedStyle((): ViewStyle => {
      'worklet';
      return {
        opacity:   opacity.value,
        transform: [
          { translateX: translateX.value },
          { translateY: translateY.value },
        ],
      };
    });

    return (
      <Animated.View style={[animatedStyle, style]}>
        {children}
      </Animated.View>
    );
  },
);

Slide.displayName = 'Slide';
