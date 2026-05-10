import React, { useCallback, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { GlassView } from 'reactnatively-glass';
import { useTheme } from 'reactnatively-theme';
import { SPRING_SNAPPY } from 'reactnatively-animations';
import type { GlassSidebarItem, GlassSidebarProps } from './GlassSidebar.types';

const DEFAULT_WIDTH = 240;
const DEFAULT_COLLAPSED_WIDTH = 64;

// ─── Sidebar Item ─────────────────────────────────────────────────────────────

interface SidebarItemViewProps {
  item: GlassSidebarItem;
  isActive: boolean;
  isCollapsed: boolean;
  labelOpacity: SharedValue<number>;
  onPress: (value: string) => void;
}

const SidebarItemView = React.memo<SidebarItemViewProps>(
  ({ item, isActive, labelOpacity, onPress }) => {
    const { theme } = useTheme();

    const labelStyle = useAnimatedStyle(() => ({
      opacity: labelOpacity.value,
      // Prevent label from taking space when collapsed
      width: interpolate(labelOpacity.value, [0, 1], [0, 1000], Extrapolation.CLAMP) === 0
        ? 0
        : undefined,
    }));

    const handlePress = useCallback(() => {
      onPress(item.value);
    }, [item.value, onPress]);

    const activeBackground = isActive ? theme.colors.primaryMuted : 'transparent';
    const iconColor = isActive ? theme.colors.primary : theme.colors.textSecondary;

    return (
      <Pressable
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={item.label}
        accessibilityState={{ selected: isActive }}
      >
        <View
          style={[
            styles.itemRow,
            { backgroundColor: activeBackground },
          ]}
        >
          {/* Icon */}
          <View style={[styles.itemIcon, { tintColor: iconColor } as any]}>
            {item.icon}
          </View>

          {/* Label — hidden when collapsed */}
          <Animated.View style={[styles.labelWrapper, labelStyle]}>
            <Text
              style={[
                styles.itemLabel,
                {
                  color: isActive ? theme.colors.primary : theme.colors.text,
                  fontWeight: isActive ? '600' : '400',
                },
              ]}
              numberOfLines={1}
            >
              {item.label}
            </Text>
          </Animated.View>

          {/* Badge */}
          {item.badge != null && item.badge > 0 && (
            <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
              <Text style={styles.badgeText}>
                {item.badge > 99 ? '99+' : item.badge}
              </Text>
            </View>
          )}
        </View>
      </Pressable>
    );
  },
);

SidebarItemView.displayName = 'GlassSidebar.Item';

// ─── GlassSidebar ─────────────────────────────────────────────────────────────

/**
 * GlassSidebar — persistent (non-modal) sidebar with collapsible animation.
 * Width springs between expanded/collapsed; labels fade out when collapsed.
 */
export const GlassSidebar = React.memo<GlassSidebarProps>(
  ({
    items,
    activeItem,
    onItemPress,
    isCollapsed = false,
    width = DEFAULT_WIDTH,
    collapsedWidth = DEFAULT_COLLAPSED_WIDTH,
    style,
  }) => {
    const animWidth        = useSharedValue(isCollapsed ? collapsedWidth : width);
    const labelOpacity     = useSharedValue(isCollapsed ? 0 : 1);

    useEffect(() => {
      animWidth.value    = withSpring(isCollapsed ? collapsedWidth : width, SPRING_SNAPPY);
      labelOpacity.value = withSpring(isCollapsed ? 0 : 1, SPRING_SNAPPY);
    }, [isCollapsed, width, collapsedWidth]);

    const animatedStyle = useAnimatedStyle(() => ({
      width: animWidth.value,
    }));

    const handleItemPress = useCallback(
      (value: string) => {
        onItemPress?.(value);
      },
      [onItemPress],
    );

    return (
      <Animated.View style={[styles.wrapper, animatedStyle, style]}>
        <GlassView
          elevation={2}
          variant="surface"
          borderRadius={0}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.itemList}>
          {items.map((item) => (
            <SidebarItemView
              key={item.value}
              item={item}
              isActive={activeItem === item.value}
              isCollapsed={isCollapsed}
              labelOpacity={labelOpacity}
              onPress={handleItemPress}
            />
          ))}
        </View>
      </Animated.View>
    );
  },
);

GlassSidebar.displayName = 'GlassSidebar';

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    alignSelf: 'stretch',
  },
  itemList: {
    flex: 1,
    paddingVertical: 8,
    gap: 2,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginHorizontal: 6,
    overflow: 'hidden',
  },
  itemIcon: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  labelWrapper: {
    flex: 1,
    marginLeft: 10,
    overflow: 'hidden',
  },
  itemLabel: {
    fontSize: 14,
    lineHeight: 20,
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    marginLeft: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
});
