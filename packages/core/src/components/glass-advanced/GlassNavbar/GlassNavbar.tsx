import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { GlassView } from 'reactnatively-glass';
import { useTheme } from 'reactnatively-theme';
import type { GlassNavbarProps } from './GlassNavbar.types';

const NAVBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const SCROLL_THRESHOLD = 50;

/**
 * GlassNavbar — top navigation bar whose glass intensity scales with scroll position.
 * At scrollY=0: transparent (elevation 0). At scrollY>50: frosted (elevation 2).
 */
export const GlassNavbar = React.memo<GlassNavbarProps>(
  ({ title, leading, trailing, scrollY, style }) => {
    const { theme } = useTheme();

    // Animated border opacity driven by scrollY
    const borderAnimStyle = useAnimatedStyle(() => {
      'worklet';
      if (!scrollY) return { opacity: 0 };
      const opacity = interpolate(
        scrollY.value,
        [0, SCROLL_THRESHOLD],
        [0, 1],
        Extrapolation.CLAMP,
      );
      return { opacity };
    });

    // Animated glass tint opacity driven by scrollY
    const glassOpacityStyle = useAnimatedStyle(() => {
      'worklet';
      if (!scrollY) return { opacity: 1 };
      const opacity = interpolate(
        scrollY.value,
        [0, SCROLL_THRESHOLD],
        [0, 1],
        Extrapolation.CLAMP,
      );
      return { opacity };
    });

    const elevation = scrollY ? (2 as const) : (0 as const);

    return (
      <View style={[styles.wrapper, style]}>
        {/* Glass layer — fades in as user scrolls */}
        <Animated.View style={[StyleSheet.absoluteFill, glassOpacityStyle]}>
          <GlassView
            elevation={elevation}
            variant="frosted"
            borderRadius={0}
            border={false}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>

        {/* Bottom border — fades in at scroll threshold */}
        <Animated.View
          style={[
            styles.border,
            { borderBottomColor: theme.colors.border },
            borderAnimStyle,
          ]}
          pointerEvents="none"
        />

        {/* Navbar row */}
        <View style={styles.row}>
          <View style={styles.side}>{leading}</View>
          <View style={styles.titleContainer}>
            {title != null && (
              <Text
                style={[styles.title, { color: theme.colors.text }]}
                numberOfLines={1}
              >
                {title}
              </Text>
            )}
          </View>
          <View style={[styles.side, styles.trailingSide]}>{trailing}</View>
        </View>
      </View>
    );
  },
);

GlassNavbar.displayName = 'GlassNavbar';

const styles = StyleSheet.create({
  wrapper: {
    height: NAVBAR_HEIGHT,
    zIndex: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  side: {
    width: 60,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  trailingSide: {
    alignItems: 'flex-end',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.4,
  },
  border: {
    ...StyleSheet.absoluteFillObject,
    top: undefined,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
