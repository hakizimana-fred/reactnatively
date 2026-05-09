import React, { useCallback, useMemo, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useTheme, useIsDark } from '@reactnatively/theme';
import { GlassView } from '@reactnatively/glass';
import { SPRING_SNAPPY } from '@reactnatively/animations';
import type { SegmentedTabsProps, SegmentedTabsSize } from './SegmentedTabs.types';

// ─── Size config ──────────────────────────────────────────────────────────────

interface SizeConfig {
  height: number;
  fontSize: number;
  paddingVertical: number;
  borderRadius: number;
  indicatorInset: number;
}

const SIZE_CONFIG: Record<SegmentedTabsSize, SizeConfig> = {
  sm: { height: 32, fontSize: 12, paddingVertical: 4,  borderRadius: 8,  indicatorInset: 3 },
  md: { height: 40, fontSize: 14, paddingVertical: 6,  borderRadius: 10, indicatorInset: 3 },
  lg: { height: 48, fontSize: 16, paddingVertical: 8,  borderRadius: 12, indicatorInset: 4 },
};

// ─── Component ───────────────────────────────────────────────────────────────

export const SegmentedTabs = React.memo<SegmentedTabsProps>(
  ({
    options,
    value,
    defaultValue,
    onChange,
    glass = false,
    size = 'md',
    style,
  }) => {
    const { theme } = useTheme();
    const isDark = useIsDark();

    const resolvedDefault = defaultValue ?? options[0]?.value ?? '';
    const [internalValue, setInternalValue] = useState(resolvedDefault);
    const activeValue = value !== undefined ? value : internalValue;
    const activeIndex = useMemo(
      () => Math.max(0, options.findIndex((o) => o.value === activeValue)),
      [options, activeValue],
    );

    const [containerWidth, setContainerWidth] = useState(0);
    const segmentWidth = containerWidth > 0 ? containerWidth / options.length : 0;

    const sz = SIZE_CONFIG[size];

    // translateX drives the sliding indicator
    const translateX = useSharedValue(0);

    // Update translateX when activeIndex or segmentWidth changes
    React.useEffect(() => {
      if (segmentWidth > 0) {
        translateX.value = withSpring(
          activeIndex * segmentWidth + sz.indicatorInset,
          SPRING_SNAPPY,
        );
      }
    }, [activeIndex, segmentWidth, sz.indicatorInset]);

    const indicatorAnimStyle = useAnimatedStyle((): ViewStyle => {
      'worklet';
      return { transform: [{ translateX: translateX.value }] };
    });

    const handleLayout = useCallback((e: LayoutChangeEvent) => {
      setContainerWidth(e.nativeEvent.layout.width);
    }, []);

    const handleSelect = useCallback(
      (optValue: string) => {
        if (value === undefined) setInternalValue(optValue);
        onChange?.(optValue);
      },
      [value, onChange],
    );

    const indicatorWidth = segmentWidth > 0 ? segmentWidth - sz.indicatorInset * 2 : 0;

    const containerBg = glass
      ? undefined
      : isDark
      ? 'rgba(255,255,255,0.08)'
      : 'rgba(0,0,0,0.06)';

    const indicatorBg = glass ? 'rgba(255,255,255,0.20)' : isDark ? '#3a3a4a' : '#ffffff';

    const inner = (
      <View
        style={[styles.track, { height: sz.height, borderRadius: sz.borderRadius }]}
        onLayout={handleLayout}
      >
        {/* Sliding indicator */}
        {indicatorWidth > 0 && (
          <Animated.View
            style={[
              styles.indicator,
              {
                width: indicatorWidth,
                height: sz.height - sz.indicatorInset * 2,
                top: sz.indicatorInset,
                borderRadius: sz.borderRadius - sz.indicatorInset,
                backgroundColor: indicatorBg,
              },
              indicatorAnimStyle,
            ]}
          />
        )}

        {/* Segments */}
        {options.map((option) => {
          const isActive = option.value === activeValue;
          return (
            <Pressable
              key={option.value}
              onPress={() => handleSelect(option.value)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              style={styles.segment}
            >
              {option.icon != null && (
                <View style={styles.segmentIcon}>{option.icon}</View>
              )}
              <Text
                style={[
                  styles.segmentLabel,
                  {
                    fontSize: sz.fontSize,
                    color: isActive
                      ? isDark ? '#ffffff' : theme.colors.text
                      : theme.colors.textSecondary,
                    fontWeight: isActive ? '600' : '400',
                  },
                ]}
                numberOfLines={1}
                allowFontScaling={false}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    );

    if (glass) {
      return (
        <GlassView
          elevation={2}
          borderRadius={sz.borderRadius}
          style={style}
        >
          {inner}
        </GlassView>
      );
    }

    return (
      <View
        style={[
          styles.outer,
          { backgroundColor: containerBg, borderRadius: sz.borderRadius },
          style,
        ]}
      >
        {inner}
      </View>
    );
  },
);

SegmentedTabs.displayName = 'SegmentedTabs';

const styles = StyleSheet.create({
  outer: {
    overflow: 'hidden',
  },
  track: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  segment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  segmentIcon: {
    marginRight: 4,
  },
  segmentLabel: {
    lineHeight: 20,
  },
});
