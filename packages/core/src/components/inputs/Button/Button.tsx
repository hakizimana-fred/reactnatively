import React, { useCallback, useMemo } from 'react';
import {
  Pressable,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
  type GestureResponderEvent,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { useTheme } from 'reactnatively-theme';
import { GlassView } from 'reactnatively-glass';
import { SPRING_SNAPPY } from 'reactnatively-animations';
import { defineVariants } from 'reactnatively-utils';
import type { ButtonProps, ButtonSizeConfig, ButtonColor } from './Button.types';

// ─── Size system ─────────────────────────────────────────────────────────────
const SIZE_CONFIG = defineVariants<string, ButtonSizeConfig>({
  xs: { paddingVertical: 5,  paddingHorizontal: 12, fontSize: 12, lineHeight: 16, borderRadius: 8,  iconSize: 12, loaderSize: 'small' },
  sm: { paddingVertical: 7,  paddingHorizontal: 16, fontSize: 13, lineHeight: 18, borderRadius: 10, iconSize: 14, loaderSize: 'small' },
  md: { paddingVertical: 11, paddingHorizontal: 20, fontSize: 15, lineHeight: 20, borderRadius: 12, iconSize: 16, loaderSize: 'small' },
  lg: { paddingVertical: 14, paddingHorizontal: 26, fontSize: 17, lineHeight: 22, borderRadius: 14, iconSize: 18, loaderSize: 'small' },
  xl: { paddingVertical: 18, paddingHorizontal: 32, fontSize: 19, lineHeight: 24, borderRadius: 16, iconSize: 20, loaderSize: 'large' },
});

// ─── Color resolver ───────────────────────────────────────────────────────────
type ColorTokens = { bg: string; bgHover: string; bgTinted: string; textOnBg: string; border: string };

function resolveColorTokens(
  color: ButtonColor,
  theme: ReturnType<typeof useTheme>['theme'],
): ColorTokens {
  const c = theme.colors;
  const map: Record<ButtonColor, ColorTokens> = {
    primary:   { bg: c.primary,   bgHover: c.primaryHover,   bgTinted: c.primaryMuted,             textOnBg: '#fff',         border: c.primary   },
    secondary: { bg: c.secondary, bgHover: c.secondaryHover, bgTinted: 'rgba(139,92,246,0.12)',     textOnBg: '#fff',         border: c.secondary },
    success:   { bg: c.success,   bgHover: c.success,        bgTinted: c.successSubtle,             textOnBg: '#fff',         border: c.success   },
    warning:   { bg: c.warning,   bgHover: c.warning,        bgTinted: c.warningSubtle,             textOnBg: '#fff',         border: c.warning   },
    error:     { bg: c.error,     bgHover: c.errorHover,     bgTinted: c.errorSubtle,               textOnBg: '#fff',         border: c.error     },
    danger:    { bg: c.error,     bgHover: c.errorHover,     bgTinted: c.errorSubtle,               textOnBg: '#fff',         border: c.error     },
    neutral:   { bg: c.neutral,   bgHover: c.neutral,        bgTinted: c.neutralSubtle,             textOnBg: c.textInverted, border: c.border    },
  };
  return map[color];
}

// ─── Component ───────────────────────────────────────────────────────────────
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Button = React.memo<ButtonProps>(
  ({
    variant      = 'solid',
    size         = 'md',
    color        = 'primary',
    label,
    children,
    leftIcon,
    rightIcon,
    loading      = false,
    disabled     = false,
    fullWidth    = false,
    flex,
    glass,
    style,
    textStyle,
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
    accessibilityLabel,
    accessibilityHint,
    testID,
    ...pressableProps
  }) => {
    const { theme } = useTheme();
    const pressed   = useSharedValue(0);

    const animatedStyle = useAnimatedStyle((): ViewStyle => {
      'worklet';
      return {
        transform: [{ scale: interpolate(pressed.value, [0, 1], [1, 0.96]) }],
        opacity:   interpolate(pressed.value, [0, 1], [1, 0.88]),
      };
    });

    const handlePressIn = useCallback((e: GestureResponderEvent) => {
      pressed.value = withSpring(1, SPRING_SNAPPY);
      onPressIn?.(e);
    }, [onPressIn]);

    const handlePressOut = useCallback((e: GestureResponderEvent) => {
      pressed.value = withSpring(0, SPRING_SNAPPY);
      onPressOut?.(e);
    }, [onPressOut]);

    const sz  = SIZE_CONFIG(size);
    const clr = resolveColorTokens(color, theme);

    const containerStyle = useMemo((): ViewStyle => {
      const base: ViewStyle = {
        borderRadius: sz.borderRadius,
        alignSelf:    fullWidth ? 'stretch' : 'flex-start',
        opacity:      disabled ? 0.45 : 1,
        ...(flex !== undefined && { flex }),
      };

      if (variant === 'solid') return { ...base, backgroundColor: clr.bg };
      if (variant === 'destructive') return { ...base, backgroundColor: theme.colors.error };
      if (variant === 'outline') return { ...base, backgroundColor: 'transparent', borderWidth: 1.5, borderColor: clr.border };
      if (variant === 'ghost')   return { ...base, backgroundColor: 'transparent' };
      if (variant === 'tinted')  return { ...base, backgroundColor: clr.bgTinted };
      return base;
    }, [variant, sz, clr, fullWidth, disabled, theme]);

    const resolvedTextStyle = useMemo((): TextStyle => {
      const base: TextStyle = { fontSize: sz.fontSize, lineHeight: sz.lineHeight, fontWeight: '600', letterSpacing: 0.1 };
      if (variant === 'solid' || variant === 'destructive') return { ...base, color: clr.textOnBg };
      if (variant === 'outline' || variant === 'ghost' || variant === 'glass') return { ...base, color: clr.border };
      if (variant === 'tinted') return { ...base, color: clr.border };
      return { ...base, color: theme.colors.text };
    }, [variant, sz, clr, theme]);

    const loaderColor = (variant === 'solid' || variant === 'destructive') ? '#fff' : clr.border;
    const isDisabled  = disabled || loading;

    const resolvedLabel = label ?? (typeof children === 'string' ? children : undefined);
    const customContent = label == null ? children : null;

    const innerContent = (
      <View style={[styles.inner, { paddingVertical: sz.paddingVertical, paddingHorizontal: sz.paddingHorizontal }]}>
        {loading ? (
          <ActivityIndicator testID={`${testID ?? ''}-spinner`} size={sz.loaderSize} color={loaderColor} />
        ) : (
          <>
            {leftIcon != null && <View style={styles.iconLeft}>{leftIcon}</View>}
            {resolvedLabel != null && (
              <Text style={[resolvedTextStyle, textStyle]} numberOfLines={1} allowFontScaling={false}>
                {resolvedLabel}
              </Text>
            )}
            {customContent != null && typeof customContent !== 'string' && customContent}
            {rightIcon != null && <View style={styles.iconRight}>{rightIcon}</View>}
          </>
        )}
      </View>
    );

    if (variant === 'glass') {
      return (
        <AnimatedPressable
          testID={testID}
          onPress={isDisabled ? undefined : onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onLongPress={isDisabled ? undefined : onLongPress}
          disabled={isDisabled}
          accessible
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel ?? label ?? (typeof children === 'string' ? children : 'Button')}
          accessibilityHint={accessibilityHint}
          accessibilityState={{ disabled: isDisabled, busy: loading }}
          style={[
            animatedStyle,
            fullWidth ? styles.fullWidth : flex !== undefined ? { flex } : styles.selfStart,
            { opacity: disabled ? 0.45 : 1 },
            style,
          ]}
          {...pressableProps}
        >
          <GlassView
            testID={`${testID ?? ''}-glass`}
            elevation={glass?.elevation ?? 2}
            variant={glass?.variant ?? 'surface'}
            borderRadius={sz.borderRadius}
            glow={glass?.glow && glass.glowColor ? { color: glass.glowColor, radius: 20, opacity: 0.35 } : false}
          >
            {innerContent}
          </GlassView>
        </AnimatedPressable>
      );
    }

    return (
      <AnimatedPressable
        testID={testID}
        onPress={isDisabled ? undefined : onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onLongPress={isDisabled ? undefined : onLongPress}
        disabled={isDisabled}
        accessible
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label ?? (typeof children === 'string' ? children : 'Button')}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ disabled: isDisabled, busy: loading }}
        style={[containerStyle, animatedStyle, style]}
        {...pressableProps}
      >
        {innerContent}
      </AnimatedPressable>
    );
  },
);

Button.displayName = 'Button';

const styles = StyleSheet.create({
  inner:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  iconLeft:  { marginRight: 8 },
  iconRight: { marginLeft: 8 },
  fullWidth: { alignSelf: 'stretch' },
  selfStart: { alignSelf: 'flex-start' },
});
