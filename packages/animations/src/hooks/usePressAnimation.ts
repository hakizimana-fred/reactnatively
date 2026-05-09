import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  type AnimatedStyle,
} from 'react-native-reanimated';
import type { ViewStyle } from 'react-native';
import { SPRING_SNAPPY } from '../presets/spring';
import { useReducedMotion } from './useReducedMotion';

export interface PressAnimationConfig {
  // How much the element scales down on press (0.94 = 6% smaller)
  pressedScale?: number;
  // Opacity at peak press
  pressedOpacity?: number;
  // Whether to animate
  disabled?: boolean;
}

export interface PressAnimationResult {
  animatedStyle: AnimatedStyle<ViewStyle>;
  handlers: {
    onPressIn: () => void;
    onPressOut: () => void;
  };
}

export function usePressAnimation({
  pressedScale   = 0.96,
  pressedOpacity = 0.88,
  disabled       = false,
}: PressAnimationConfig = {}): PressAnimationResult {
  const isReduced = useReducedMotion();
  const pressed   = useSharedValue(0);

  const animatedStyle = useAnimatedStyle((): ViewStyle => {
    'worklet';
    if (disabled || isReduced) return {};
    return {
      transform: [
        { scale: interpolate(pressed.value, [0, 1], [1, pressedScale]) },
      ],
      opacity: interpolate(pressed.value, [0, 1], [1, pressedOpacity]),
    };
  });

  const handlers = {
    onPressIn: () => {
      'worklet';
      pressed.value = withSpring(1, SPRING_SNAPPY);
    },
    onPressOut: () => {
      'worklet';
      pressed.value = withSpring(0, SPRING_SNAPPY);
    },
  };

  return { animatedStyle, handlers };
}
