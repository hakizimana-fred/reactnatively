import React, { useMemo } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useTheme, useIsDark } from 'reactnatively-theme';
import { GlassView } from 'reactnatively-glass';
import type { TopNavigationProps } from './TopNavigation.types';

// ─── Constants ────────────────────────────────────────────────────────────────

const IOS_STATUS_BAR_HEIGHT = 44;
const ANDROID_STATUS_BAR_HEIGHT = 24;
const NAV_HEIGHT = 56;

// ─── Component ───────────────────────────────────────────────────────────────

export const TopNavigation = React.memo<TopNavigationProps>(
  ({
    title,
    subtitle,
    leading,
    trailing,
    glass = false,
    blur = false,
    scrollY,
    style,
  }) => {
    const { theme } = useTheme();
    const isDark = useIsDark();

    const safeTop =
      Platform.OS === 'ios' ? IOS_STATUS_BAR_HEIGHT : ANDROID_STATUS_BAR_HEIGHT;

    const totalHeight = NAV_HEIGHT + safeTop;

    // Animated backdrop opacity when scroll-driven blur is enabled
    const backdropStyle = useAnimatedStyle((): ViewStyle => {
      'worklet';
      if (!blur || !scrollY) return { opacity: 0 };
      return {
        opacity: interpolate(scrollY.value, [0, 50], [0, 1], 'clamp'),
      };
    });

    const backdropColor = isDark ? 'rgba(15,15,25,0.75)' : 'rgba(255,255,255,0.80)';

    const titleContent = (
      <View style={styles.titleBlock} pointerEvents="none">
        {title != null && (
          <Text
            style={[styles.title, { color: theme.colors.text }]}
            numberOfLines={1}
            allowFontScaling={false}
          >
            {title}
          </Text>
        )}
        {subtitle != null && (
          <Text
            style={[styles.subtitle, { color: theme.colors.textSecondary }]}
            numberOfLines={1}
            allowFontScaling={false}
          >
            {subtitle}
          </Text>
        )}
      </View>
    );

    const row = (
      <View
        style={[
          styles.row,
          { height: NAV_HEIGHT },
        ]}
      >
        {/* Leading slot */}
        <View style={styles.sideSlot}>
          {leading != null ? leading : null}
        </View>

        {/* Center title */}
        {titleContent}

        {/* Trailing slot */}
        <View style={[styles.sideSlot, styles.trailingSlot]}>
          {trailing != null ? trailing : null}
        </View>
      </View>
    );

    if (glass) {
      return (
        <GlassView
          elevation={2}
          borderRadius={0}
          style={[{ paddingTop: safeTop, minHeight: totalHeight }, style]}
        >
          {/* Scroll-driven blur overlay */}
          {blur && (
            <Animated.View
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: backdropColor, borderRadius: 0 },
                backdropStyle,
              ]}
              pointerEvents="none"
            />
          )}
          {row}
        </GlassView>
      );
    }

    const solidBg = isDark ? theme.colors.surface : theme.colors.surface;

    return (
      <View
        style={[
          styles.solidContainer,
          {
            paddingTop: safeTop,
            minHeight: totalHeight,
            backgroundColor: solidBg,
            borderBottomColor: theme.colors.border,
          },
          style,
        ]}
      >
        {blur && (
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: backdropColor },
              backdropStyle,
            ]}
            pointerEvents="none"
          />
        )}
        {row}
      </View>
    );
  },
);

TopNavigation.displayName = 'TopNavigation';

const styles = StyleSheet.create({
  solidContainer: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  sideSlot: {
    width: 52,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  trailingSlot: {
    alignItems: 'flex-end',
  },
  titleBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.2,
    lineHeight: 22,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    marginTop: 1,
  },
});
