import React, { useEffect } from 'react';
import { type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { SPRING_BOUNCE } from 'reactnatively-animations';
import type { ScaleProps } from './Scale.types';

// ─── Component ────────────────────────────────────────────────────────────────
export const Scale = React.memo<ScaleProps>(
  ({
    in:      visible = true,
    from     = 0.85,
    to       = 1,
    duration,  // kept in interface but spring doesn't use numeric duration
    children,
    style,
  }) => {
    const scale   = useSharedValue(visible ? to : from);
    const opacity = useSharedValue(visible ? 1 : 0);

    useEffect(() => {
      scale.value   = withSpring(visible ? to : from, SPRING_BOUNCE);
      opacity.value = withSpring(visible ? 1 : 0, SPRING_BOUNCE);
    }, [visible, from, to]);

    const animatedStyle = useAnimatedStyle((): ViewStyle => {
      'worklet';
      return {
        opacity:   opacity.value,
        transform: [{ scale: scale.value }],
      };
    });

    return (
      <Animated.View style={[animatedStyle, style]}>
        {children}
      </Animated.View>
    );
  },
);

Scale.displayName = 'Scale';
