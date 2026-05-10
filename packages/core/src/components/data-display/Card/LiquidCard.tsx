import React, { useCallback } from 'react';
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { GlassView } from 'reactnatively-glass';
import { useIsDark } from 'reactnatively-theme';
import { SPRING_LIQUID } from 'reactnatively-animations';
import type {
  LiquidCardProps,
  LiquidCardHeaderProps,
  LiquidCardBodyProps,
  LiquidCardFooterProps,
  LiquidCardImageProps,
} from './LiquidCard.types';

// ─── Sub-components ───────────────────────────────────────────────────────────

const LiquidCardHeader = React.memo<LiquidCardHeaderProps>(
  ({ children, style, bordered = false, compact = false }) => {
    const isDark = useIsDark();
    return (
      <View
        style={[
          styles.header,
          compact && styles.compact,
          bordered && {
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: isDark
              ? 'rgba(255,255,255,0.10)'
              : 'rgba(0,0,0,0.08)',
          },
          style,
        ]}
      >
        {children}
      </View>
    );
  },
);
LiquidCardHeader.displayName = 'LiquidCard.Header';

const LiquidCardBody = React.memo<LiquidCardBodyProps>(
  ({ children, style, compact = false }) => (
    <View style={[styles.body, compact && styles.compact, style]}>
      {children}
    </View>
  ),
);
LiquidCardBody.displayName = 'LiquidCard.Body';

const LiquidCardFooter = React.memo<LiquidCardFooterProps>(
  ({ children, style, bordered = true, compact = false }) => {
    const isDark = useIsDark();
    return (
      <View
        style={[
          styles.footer,
          compact && styles.compact,
          bordered && {
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: isDark
              ? 'rgba(255,255,255,0.10)'
              : 'rgba(0,0,0,0.08)',
          },
          style,
        ]}
      >
        {children}
      </View>
    );
  },
);
LiquidCardFooter.displayName = 'LiquidCard.Footer';

const LiquidCardImage = React.memo<LiquidCardImageProps>(
  ({ source, height = 200, style, rounded = false }) => (
    <Image
      source={source}
      style={[
        styles.image,
        { height },
        rounded && { borderRadius: 12 },
        style,
      ]}
      resizeMode="cover"
    />
  ),
);
LiquidCardImage.displayName = 'LiquidCard.Image';

// ─── Root card ────────────────────────────────────────────────────────────────

const LiquidCardRoot = React.memo<LiquidCardProps>(
  ({
    elevation    = 2,
    variant      = 'surface',
    borderRadius = 20,
    glow,
    border       = true,
    pressable    = false,
    onPress,
    onLongPress,
    fullWidth    = false,
    style,
    contentStyle,
    children,
    testID,
    accessibilityLabel,
    accessibilityHint,
  }) => {
    const pressed = useSharedValue(0);

    const animatedStyle = useAnimatedStyle((): ViewStyle => {
      'worklet';
      if (!pressable) return {};
      return {
        transform: [{ scale: interpolate(pressed.value, [0, 1], [1, 0.97]) }],
      };
    });

    const handlePressIn = useCallback(() => {
      if (!pressable) return;
      pressed.value = withSpring(1, SPRING_LIQUID);
    }, [pressable]);

    const handlePressOut = useCallback(() => {
      if (!pressable) return;
      pressed.value = withSpring(0, SPRING_LIQUID);
    }, [pressable]);

    const glass = (
      <GlassView
        testID={testID}
        elevation={elevation}
        variant={variant}
        borderRadius={borderRadius}
        border={border}
        glow={glow}
        style={fullWidth ? styles.fullWidth : undefined}
        contentStyle={contentStyle}
      >
        {children}
      </GlassView>
    );

    if (pressable) {
      return (
        <Pressable
          onPress={onPress}
          onLongPress={onLongPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          accessible
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel}
          accessibilityHint={accessibilityHint}
          style={fullWidth ? styles.fullWidth : undefined}
        >
          <Animated.View style={[animatedStyle, style]}>
            {glass}
          </Animated.View>
        </Pressable>
      );
    }

    return (
      <Animated.View style={[style]}>
        {glass}
      </Animated.View>
    );
  },
);
LiquidCardRoot.displayName = 'LiquidCard';

// ─── Compound component assembly ──────────────────────────────────────────────

export const LiquidCard = Object.assign(LiquidCardRoot, {
  Header: LiquidCardHeader,
  Body:   LiquidCardBody,
  Footer: LiquidCardFooter,
  Image:  LiquidCardImage,
});

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop:        20,
    paddingBottom:     12,
  },
  body: {
    paddingHorizontal: 20,
    paddingVertical:   12,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop:        12,
    paddingBottom:     20,
    flexDirection:     'row',
    alignItems:        'center',
  },
  compact: {
    paddingHorizontal: 14,
    paddingVertical:   10,
  },
  image: {
    width: '100%',
    borderTopLeftRadius:  20,
    borderTopRightRadius: 20,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
});
