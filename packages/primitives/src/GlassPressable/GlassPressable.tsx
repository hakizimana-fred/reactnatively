import React, { useCallback } from 'react';
import { Pressable, StyleSheet, type GestureResponderEvent } from 'react-native';
import Animated from 'react-native-reanimated';
import { usePressAnimation } from 'reactnatively-animations';
import { Surface } from '../Surface/Surface';
import type { GlassPressableProps } from './GlassPressable.types';

// ─── Haptics (optional peer dependency) ──────────────────────────────────────

let triggerHaptic: (() => void) | null = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Haptics = require('expo-haptics') as typeof import('expo-haptics');
  triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {
      // swallow — haptics are best-effort
    });
  };
} catch {
  // expo-haptics not installed; haptic prop will be a no-op
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * GlassPressable — the interactive foundation of the Reactnatively component system.
 *
 * Layer order (outer → inner):
 *   Pressable (touch target)
 *   └─ Animated.View (scale + opacity spring animation)
 *      └─ Surface (glass or solid background)
 *         └─ children
 */
export const GlassPressable = React.memo<GlassPressableProps>(
  ({
    // Press animation
    pressedScale   = 0.97,
    pressedOpacity = 0.90,
    haptic         = false,
    // State
    loading  = false,
    disabled = false,
    // Surface passthrough
    glass,
    elevation,
    variant,
    bg,
    borderRadius,
    border,
    borderColor,
    borderWidth,
    style,
    contentStyle,
    children,
    // Pressable handlers
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
    // rest of PressableProps (accessibilityRole, testID, etc.)
    ...pressableProps
  }) => {
    const isDisabled = disabled || loading;

    const { animatedStyle, handlers } = usePressAnimation({
      pressedScale,
      pressedOpacity,
      disabled: isDisabled,
    });

    const handlePressIn = useCallback(
      (e: GestureResponderEvent) => {
        handlers.onPressIn();
        if (haptic && triggerHaptic) triggerHaptic();
        onPressIn?.(e);
      },
      [handlers, haptic, onPressIn],
    );

    const handlePressOut = useCallback(
      (e: GestureResponderEvent) => {
        handlers.onPressOut();
        onPressOut?.(e);
      },
      [handlers, onPressOut],
    );

    const handlePress = useCallback(
      (e: GestureResponderEvent) => {
        if (!isDisabled) onPress?.(e);
      },
      [isDisabled, onPress],
    );

    const handleLongPress = useCallback(
      (e: GestureResponderEvent) => {
        if (!isDisabled) onLongPress?.(e);
      },
      [isDisabled, onLongPress],
    );

    return (
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onLongPress={handleLongPress}
        disabled={isDisabled}
        style={styles.pressable}
        {...pressableProps}
      >
        <Animated.View style={[animatedStyle, styles.animatedContainer, isDisabled && styles.disabled]}>
          <Surface
            glass={glass}
            elevation={elevation}
            variant={variant}
            bg={bg}
            borderRadius={borderRadius}
            border={border}
            borderColor={borderColor}
            borderWidth={borderWidth}
            style={style}
            contentStyle={contentStyle}
          >
            {children}
          </Surface>
        </Animated.View>
      </Pressable>
    );
  },
);

GlassPressable.displayName = 'GlassPressable';

const styles = StyleSheet.create({
  pressable: {
    // Pressable itself is transparent — layout handled by Animated.View + Surface
  },
  animatedContainer: {
    // Animated.View wraps the Surface so scale/opacity transforms compose correctly
  },
  disabled: {
    opacity: 0.45,
  },
});
