import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { GlassView } from '@reactnatively/glass';
import { SPRING_BOUNCE } from '@reactnatively/animations';
import type { MorphingContainerProps, MorphingContainerShape } from './MorphingContainer.types';

const DEFAULT_SHAPE: MorphingContainerShape = {
  width: 200,
  height: 200,
  borderRadius: 16,
};

/**
 * MorphingContainer — GlassView that spring-animates between different shape prop values.
 * All three dimensions (width, height, borderRadius) animate in unison via withSpring.
 */
export const MorphingContainer = React.memo<MorphingContainerProps>(
  ({
    shape = DEFAULT_SHAPE,
    glass = true,
    children,
    style,
  }) => {
    const animWidth        = useSharedValue(shape.width);
    const animHeight       = useSharedValue(shape.height);
    const animBorderRadius = useSharedValue(shape.borderRadius);

    useEffect(() => {
      animWidth.value        = withSpring(shape.width,        SPRING_BOUNCE);
      animHeight.value       = withSpring(shape.height,       SPRING_BOUNCE);
      animBorderRadius.value = withSpring(shape.borderRadius, SPRING_BOUNCE);
    }, [shape.width, shape.height, shape.borderRadius]);

    const animatedStyle = useAnimatedStyle(() => ({
      width:        animWidth.value,
      height:       animHeight.value,
      borderRadius: animBorderRadius.value,
      overflow:     'hidden' as const,
    }));

    if (!glass) {
      return (
        <Animated.View style={[styles.fallback, animatedStyle, style]}>
          {children}
        </Animated.View>
      );
    }

    return (
      <Animated.View style={[animatedStyle, style]}>
        <GlassView
          elevation={2}
          variant="surface"
          borderRadius={0}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.content}>{children}</View>
      </Animated.View>
    );
  },
);

MorphingContainer.displayName = 'MorphingContainer';

const styles = StyleSheet.create({
  fallback: {
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
