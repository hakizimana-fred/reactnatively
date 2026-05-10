import React, { useCallback, useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { useTheme, useIsDark } from 'reactnatively-theme';
import { GlassView } from 'reactnatively-glass';
import { SPRING_SNAPPY, SPRING_BOUNCE, usePressAnimation } from 'reactnatively-animations';
import type { BottomNavigationItem, BottomNavigationProps } from './BottomNavigation.types';

// ─── Constants ────────────────────────────────────────────────────────────────

const IOS_SAFE_BOTTOM = 20;
const ANDROID_SAFE_BOTTOM = 8;

// ─── NavItem ─────────────────────────────────────────────────────────────────

interface NavItemProps {
  item: BottomNavigationItem;
  isActive: boolean;
  showLabel: boolean;
  onPress: (value: string) => void;
}

const NavItem = React.memo<NavItemProps>(({ item, isActive, showLabel, onPress }) => {
  const { theme } = useTheme();
  const { animatedStyle, handlers } = usePressAnimation({ pressedScale: 0.88 });

  // Dot pulse animation for active state
  const dotScale = useSharedValue(isActive ? 1 : 0);
  const iconScale = useSharedValue(isActive ? 1 : 0.85);

  React.useEffect(() => {
    dotScale.value = withSpring(isActive ? 1 : 0, SPRING_BOUNCE);
    iconScale.value = withSpring(isActive ? 1 : 0.85, SPRING_SNAPPY);
  }, [isActive]);

  const dotStyle = useAnimatedStyle((): ViewStyle => {
    'worklet';
    return {
      transform: [{ scale: dotScale.value }],
      opacity: dotScale.value,
    };
  });

  const iconWrapStyle = useAnimatedStyle((): ViewStyle => {
    'worklet';
    return {
      transform: [{ scale: iconScale.value }],
    };
  });

  const activeColor = theme.colors.primary;
  const inactiveColor = theme.colors.textMuted;
  const color = isActive ? activeColor : inactiveColor;

  const handlePress = useCallback(() => onPress(item.value), [item.value, onPress]);

  const badgeCount = typeof item.badge === 'number' ? item.badge : undefined;
  const hasBadge = item.badge === true || (typeof item.badge === 'number' && item.badge > 0);

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlers.onPressIn}
      onPressOut={handlers.onPressOut}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={item.label}
      style={styles.navItem}
    >
      <Animated.View style={[styles.navItemInner, animatedStyle]}>
        {/* Icon with badge */}
        <View style={styles.iconWrapper}>
          <Animated.View style={iconWrapStyle}>
            {isActive && item.activeIcon != null ? item.activeIcon : item.icon}
          </Animated.View>

          {/* Badge */}
          {hasBadge && (
            <View style={[styles.badge, { backgroundColor: theme.colors.error }]}>
              {badgeCount != null && badgeCount > 0 && (
                <Text style={styles.badgeText} allowFontScaling={false}>
                  {badgeCount > 99 ? '99+' : String(badgeCount)}
                </Text>
              )}
            </View>
          )}
        </View>

        {/* Label */}
        {showLabel && (
          <Text
            style={[
              styles.navLabel,
              {
                color,
                fontWeight: isActive ? '600' : '400',
              },
            ]}
            numberOfLines={1}
            allowFontScaling={false}
          >
            {item.label}
          </Text>
        )}

        {/* Active dot indicator */}
        <Animated.View
          style={[
            styles.activeDot,
            { backgroundColor: activeColor },
            dotStyle,
          ]}
        />
      </Animated.View>
    </Pressable>
  );
});

NavItem.displayName = 'BottomNavigation.Item';

// ─── BottomNavigation ─────────────────────────────────────────────────────────

export const BottomNavigation = React.memo<BottomNavigationProps>(
  ({
    items,
    value,
    defaultValue,
    onChange,
    glass = false,
    showLabel = true,
    style,
  }) => {
    const { theme } = useTheme();
    const isDark = useIsDark();

    const resolvedDefault = defaultValue ?? items[0]?.value ?? '';
    const [internalValue, setInternalValue] = useState(resolvedDefault);
    const activeValue = value !== undefined ? value : internalValue;

    const handlePress = useCallback(
      (itemValue: string) => {
        if (value === undefined) setInternalValue(itemValue);
        onChange?.(itemValue);
      },
      [value, onChange],
    );

    const safeBottom =
      Platform.OS === 'ios' ? IOS_SAFE_BOTTOM : ANDROID_SAFE_BOTTOM;

    const bar = (
      <View style={[styles.bar, { paddingBottom: safeBottom }]}>
        {items.map((item) => (
          <NavItem
            key={item.value}
            item={item}
            isActive={item.value === activeValue}
            showLabel={showLabel}
            onPress={handlePress}
          />
        ))}
      </View>
    );

    if (glass) {
      return (
        <GlassView elevation={3} borderRadius={0} style={style}>
          {bar}
        </GlassView>
      );
    }

    return (
      <View
        style={[
          styles.solidContainer,
          {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.border,
          },
          style,
        ]}
      >
        {bar}
      </View>
    );
  },
);

BottomNavigation.displayName = 'BottomNavigation';

const styles = StyleSheet.create({
  solidContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navItemInner: {
    alignItems: 'center',
    paddingHorizontal: 4,
    minWidth: 44,
  },
  iconWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#fff',
    lineHeight: 12,
  },
  navLabel: {
    fontSize: 10,
    lineHeight: 14,
    marginTop: 3,
    textAlign: 'center',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 4,
  },
});
