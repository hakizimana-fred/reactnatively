import React, { useEffect } from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import type { FadeProps } from './Fade.types';

// ─── Component ────────────────────────────────────────────────────────────────
export const Fade = React.memo<FadeProps>(
  ({
    in:     visible = true,
    duration = 250,
    delay    = 0,
    children,
    style,
    onEntered,
    onExited,
  }) => {
    const opacity = useSharedValue(visible ? 1 : 0);

    useEffect(() => {
      const timingConfig = { duration };
      const targetOpacity = visible ? 1 : 0;

      const runAnimation = () => {
        opacity.value = withTiming(targetOpacity, timingConfig, (finished) => {
          if (!finished) return;
          if (visible && onEntered) {
            runOnJS(onEntered)();
          } else if (!visible && onExited) {
            runOnJS(onExited)();
          }
        });
      };

      if (delay > 0) {
        const timer = setTimeout(runAnimation, delay);
        return () => clearTimeout(timer);
      }
      runAnimation();
      return undefined;
    }, [visible, duration, delay]);

    const animatedStyle = useAnimatedStyle((): ViewStyle => {
      'worklet';
      return { opacity: opacity.value };
    });

    return (
      <Animated.View style={[animatedStyle, style]}>
        {children}
      </Animated.View>
    );
  },
);

Fade.displayName = 'Fade';
