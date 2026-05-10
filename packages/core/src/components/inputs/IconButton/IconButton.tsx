import React, { useCallback, useMemo } from 'react';
import {
  Pressable,
  ActivityIndicator,
  View,
  StyleSheet,
  type ViewStyle,
  type GestureResponderEvent,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { useTheme } from 'reactnatively-theme';
import { GlassView } from 'reactnatively-glass';
import { usePressAnimation } from 'reactnatively-animations';
import type { IconButtonProps, IconButtonSize, IconButtonVariant } from './IconButton.types';
import type { ButtonColor } from '../Button/Button.types';

// ─── Size system ─────────────────────────────────────────────────────────────
const SIZE_MAP: Record<IconButtonSize, number> = {
  xs: 28,
  sm: 36,
  md: 44,
  lg: 52,
  xl: 60,
};

// ─── Color tokens (mirrors Button) ───────────────────────────────────────────
function resolveColors(
  color: ButtonColor,
  theme: ReturnType<typeof useTheme>['theme'],
): { bg: string; border: string; fg: string } {
  const c = theme.colors;
  const map: Record<ButtonColor, { bg: string; border: string; fg: string }> = {
    primary:   { bg: c.primary,   border: c.primary,   fg: '#fff' },
    secondary: { bg: c.secondary, border: c.secondary, fg: '#fff' },
    success:   { bg: c.success,   border: c.success,   fg: '#fff' },
    warning:   { bg: c.warning,   border: c.warning,   fg: '#fff' },
    error:     { bg: c.error,     border: c.error,     fg: '#fff' },
    danger:    { bg: c.error,     border: c.error,     fg: '#fff' },
    neutral:   { bg: c.neutral,   border: c.border,    fg: c.textInverted },
  };
  return map[color];
}

// ─── Component ───────────────────────────────────────────────────────────────
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const IconButton = React.memo<IconButtonProps>(
  ({
    icon,
    size          = 'md',
    variant       = 'solid',
    color         = 'primary',
    isDisabled    = false,
    isLoading     = false,
    onPress,
    accessibilityLabel,
    borderRadius,
    glass         = false,
    style,
  }) => {
    const { theme } = useTheme();
    const dim       = SIZE_MAP[size];
    const clr       = resolveColors(color, theme);

    const disabled = isDisabled || isLoading;

    const resolvedBorderRadius = borderRadius ?? dim / 4;

    const { animatedStyle, handlers } = usePressAnimation({
      pressedScale:   0.92,
      pressedOpacity: 0.8,
      disabled,
    });

    const handlePressIn = useCallback(() => {
      handlers.onPressIn();
    }, [handlers]);

    const handlePressOut = useCallback(() => {
      handlers.onPressOut();
    }, [handlers]);

    const containerStyle = useMemo((): ViewStyle => {
      const base: ViewStyle = {
        width:           dim,
        height:          dim,
        borderRadius:    resolvedBorderRadius,
        alignItems:      'center',
        justifyContent:  'center',
        opacity:         disabled ? 0.45 : 1,
      };

      if (variant === 'solid') return { ...base, backgroundColor: clr.bg };
      if (variant === 'outline') return { ...base, borderWidth: 1.5, borderColor: clr.border, backgroundColor: 'transparent' };
      if (variant === 'ghost')   return { ...base, backgroundColor: 'transparent' };
      // glass handled via GlassView
      return base;
    }, [variant, dim, resolvedBorderRadius, clr, disabled]);

    const content = isLoading ? (
      <ActivityIndicator
        size="small"
        color={variant === 'solid' ? '#fff' : clr.border}
      />
    ) : icon;

    if (variant === 'glass' || glass) {
      return (
        <AnimatedPressable
          onPress={disabled ? undefined : onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled}
          accessible
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel}
          accessibilityState={{ disabled, busy: isLoading }}
          style={[
            { width: dim, height: dim, opacity: disabled ? 0.45 : 1, alignSelf: 'flex-start' },
            animatedStyle,
            style,
          ]}
        >
          <GlassView elevation={1} borderRadius={resolvedBorderRadius} style={styles.fill}>
            <View style={styles.center}>{content}</View>
          </GlassView>
        </AnimatedPressable>
      );
    }

    return (
      <AnimatedPressable
        onPress={disabled ? undefined : onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        accessible
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled, busy: isLoading }}
        style={[containerStyle, animatedStyle, style]}
      >
        {content}
      </AnimatedPressable>
    );
  },
);

IconButton.displayName = 'IconButton';

const styles = StyleSheet.create({
  fill:   { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
