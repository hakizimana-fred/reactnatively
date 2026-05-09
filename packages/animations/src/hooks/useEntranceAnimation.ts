import { useEffect } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  type AnimatedStyle,
} from 'react-native-reanimated';
import type { ViewStyle } from 'react-native';
import { SPRING_REVEAL } from '../presets/spring';
import { TIMING_ENTER } from '../presets/timing';
import { useReducedMotion } from './useReducedMotion';

export type EntranceVariant = 'fade' | 'slideUp' | 'slideDown' | 'scale' | 'none';

export interface EntranceAnimationConfig {
  variant?:     EntranceVariant;
  delay?:       number;
  slideOffset?: number;
  visible?:     boolean;
}

export function useEntranceAnimation({
  variant     = 'fade',
  delay       = 0,
  slideOffset = 20,
  visible     = true,
}: EntranceAnimationConfig = {}): AnimatedStyle<ViewStyle> {
  const isReduced = useReducedMotion();
  const progress  = useSharedValue(visible ? 1 : 0);

  useEffect(() => {
    const timer = delay > 0 ? setTimeout(animate, delay) : null;
    if (!timer) animate();
    return () => { if (timer) clearTimeout(timer); };

    function animate() {
      if (isReduced) {
        progress.value = visible ? 1 : 0;
      } else {
        progress.value = visible
          ? withSpring(1, SPRING_REVEAL)
          : withTiming(0, TIMING_ENTER);
      }
    }
  }, [visible, isReduced, delay]);

  return useAnimatedStyle((): ViewStyle => {
    'worklet';
    if (variant === 'none') return {};

    const opacity = interpolate(progress.value, [0, 1], [0, 1]);

    if (variant === 'fade') {
      return { opacity };
    }

    if (variant === 'scale') {
      return {
        opacity,
        transform: [{ scale: interpolate(progress.value, [0, 1], [0.92, 1]) }],
      };
    }

    if (variant === 'slideUp') {
      return {
        opacity,
        transform: [
          { translateY: interpolate(progress.value, [0, 1], [slideOffset, 0]) },
        ],
      };
    }

    if (variant === 'slideDown') {
      return {
        opacity,
        transform: [
          { translateY: interpolate(progress.value, [0, 1], [-slideOffset, 0]) },
        ],
      };
    }

    return { opacity };
  });
}
