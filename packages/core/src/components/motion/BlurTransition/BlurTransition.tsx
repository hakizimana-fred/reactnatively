import React, { useEffect } from 'react';
import { Platform, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { TIMING_FAST } from 'reactnatively-animations';
import type { BlurTransitionProps } from './BlurTransition.types';

// ─── Component ────────────────────────────────────────────────────────────────
export const BlurTransition = React.memo<BlurTransitionProps>(
  ({
    in:        visible    = true,
    blurAmount = 10,
    duration   = 300,
    children,
    style,
  }) => {
    const opacity = useSharedValue(visible ? 1 : 0);
    const scale   = useSharedValue(visible ? 1 : 1.05);

    useEffect(() => {
      const timingConfig = { duration };
      opacity.value = withTiming(visible ? 1 : 0, timingConfig);
      scale.value   = withTiming(visible ? 1 : 1.05, timingConfig);
    }, [visible, duration]);

    const isWeb = Platform.OS === 'web';

    const animatedStyle = useAnimatedStyle((): ViewStyle => {
      'worklet';
      const base: ViewStyle = {
        opacity:   opacity.value,
        transform: [{ scale: scale.value }],
      };

      // On web, we can apply CSS blur via style
      if (isWeb) {
        (base as any).filter = `blur(${(1 - opacity.value) * blurAmount}px)`;
      }

      return base;
    });

    return (
      <Animated.View style={[animatedStyle, style]}>
        {children}
      </Animated.View>
    );
  },
);

BlurTransition.displayName = 'BlurTransition';
