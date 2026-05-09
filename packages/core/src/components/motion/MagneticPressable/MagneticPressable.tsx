import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  type LayoutChangeEvent,
  type GestureResponderEvent,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { SPRING_BOUNCE } from '@reactnatively/animations';
import type { MagneticPressableProps } from './MagneticPressable.types';

// ─── Component ────────────────────────────────────────────────────────────────
export const MagneticPressable = React.memo<MagneticPressableProps>(
  ({ children, strength = 0.3, onPress, style }) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    // Store layout measurements in a ref to avoid re-renders
    const layoutRef = useRef({ width: 0, height: 0, pageX: 0, pageY: 0 });
    const viewRef   = useRef<View>(null);

    const handleLayout = useCallback((_e: LayoutChangeEvent) => {
      // Measure after layout to get absolute position
      viewRef.current?.measureInWindow((x, y, w, h) => {
        layoutRef.current = { width: w, height: h, pageX: x, pageY: y };
      });
    }, []);

    const handleResponderMove = useCallback((e: GestureResponderEvent) => {
      const { pageX, pageY } = e.nativeEvent;
      const { width, height, pageX: elemX, pageY: elemY } = layoutRef.current;

      const centerX = elemX + width / 2;
      const centerY = elemY + height / 2;

      const offsetX = (pageX - centerX) * strength;
      const offsetY = (pageY - centerY) * strength;

      translateX.value = withSpring(offsetX, SPRING_BOUNCE);
      translateY.value = withSpring(offsetY, SPRING_BOUNCE);
    }, [strength]);

    const handleRelease = useCallback(() => {
      translateX.value = withSpring(0, SPRING_BOUNCE);
      translateY.value = withSpring(0, SPRING_BOUNCE);
    }, []);

    const animatedStyle = useAnimatedStyle((): ViewStyle => {
      'worklet';
      return {
        transform: [
          { translateX: translateX.value },
          { translateY: translateY.value },
        ],
      };
    });

    return (
      <Animated.View style={[animatedStyle, style]}>
        <View
          ref={viewRef}
          onLayout={handleLayout}
          onStartShouldSetResponder={() => true}
          onMoveShouldSetResponder={() => true}
          onResponderMove={handleResponderMove}
          onResponderRelease={handleRelease}
          onResponderTerminate={handleRelease}
        >
          <Pressable
            onPress={onPress}
            accessibilityRole="button"
            style={styles.pressable}
          >
            {children}
          </Pressable>
        </View>
      </Animated.View>
    );
  },
);

MagneticPressable.displayName = 'MagneticPressable';

const styles = StyleSheet.create({
  pressable: {
    alignSelf: 'flex-start',
  },
});
