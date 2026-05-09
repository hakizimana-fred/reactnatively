import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '@reactnatively/theme';
import { GlassView } from '@reactnatively/glass';
import { SPRING_SNAPPY } from '@reactnatively/animations';
import type { SidebarProps } from './Sidebar.types';

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_WIDTH = 240;
const DEFAULT_COLLAPSED_WIDTH = 60;

// ─── Component ───────────────────────────────────────────────────────────────

export const Sidebar = React.memo<SidebarProps>(
  ({
    isOpen,
    defaultOpen = true,
    width = DEFAULT_WIDTH,
    collapsedWidth = DEFAULT_COLLAPSED_WIDTH,
    children,
    glass = false,
    style,
  }) => {
    const { theme } = useTheme();

    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const resolvedOpen = isOpen !== undefined ? isOpen : internalOpen;

    const targetWidth = resolvedOpen ? width : collapsedWidth;
    const animatedWidth = useSharedValue(targetWidth);

    React.useEffect(() => {
      animatedWidth.value = withSpring(resolvedOpen ? width : collapsedWidth, SPRING_SNAPPY);
    }, [resolvedOpen, width, collapsedWidth]);

    const animStyle = useAnimatedStyle((): ViewStyle => {
      'worklet';
      return { width: animatedWidth.value };
    });

    if (glass) {
      return (
        <Animated.View style={[styles.root, animStyle]}>
          <GlassView elevation={2} borderRadius={0} style={[styles.inner, style]}>
            {children}
          </GlassView>
        </Animated.View>
      );
    }

    return (
      <Animated.View
        style={[
          styles.root,
          animStyle,
          {
            backgroundColor: theme.colors.surface,
            borderRightColor: theme.colors.border,
          },
          style,
        ]}
      >
        <View style={styles.inner}>{children}</View>
      </Animated.View>
    );
  },
);

Sidebar.displayName = 'Sidebar';

const styles = StyleSheet.create({
  root: {
    borderRightWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  inner: {
    flex: 1,
  },
});
