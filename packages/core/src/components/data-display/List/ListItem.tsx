import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { GlassView } from '@reactnatively/glass';
import { useTheme, useIsDark } from '@reactnatively/theme';
import { usePressAnimation } from '@reactnatively/animations';
import type { ListItemProps } from './List.types';

export const ListItem = React.memo<ListItemProps>(
  ({
    title,
    subtitle,
    description,
    leading,
    trailing,
    onPress,
    onLongPress,
    isDisabled = false,
    glass      = false,
    showDivider = false,
    style,
  }) => {
    const { theme } = useTheme();
    const isDark    = useIsDark();

    const { animatedStyle, handlers } = usePressAnimation({
      pressedScale:   0.99,
      pressedOpacity: 0.80,
      disabled:       isDisabled || (!onPress && !onLongPress),
    });

    const dividerColor = isDark
      ? 'rgba(255,255,255,0.08)'
      : 'rgba(0,0,0,0.07)';

    const content = (
      <>
        {/* Leading slot */}
        {leading != null && (
          <View style={styles.leadingSlot}>{leading}</View>
        )}

        {/* Text block */}
        <View style={styles.textBlock}>
          <Text
            style={[styles.title, { color: isDisabled ? theme.colors.textDisabled : theme.colors.text }]}
            numberOfLines={2}
          >
            {title}
          </Text>

          {subtitle != null && (
            <Text
              style={[styles.subtitle, { color: isDisabled ? theme.colors.textDisabled : theme.colors.textSecondary }]}
              numberOfLines={1}
            >
              {subtitle}
            </Text>
          )}

          {description != null && (
            <Text
              style={[styles.description, { color: theme.colors.textMuted }]}
              numberOfLines={3}
            >
              {description}
            </Text>
          )}
        </View>

        {/* Trailing slot */}
        {trailing != null && (
          <View style={styles.trailingSlot}>{trailing}</View>
        )}
      </>
    );

    const rowStyle = [
      styles.row,
      showDivider && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: dividerColor },
      { opacity: isDisabled ? 0.5 : 1 },
      style,
    ];

    if (glass) {
      const inner = (
        <GlassView
          borderRadius={12}
          style={styles.glassContainer}
          contentStyle={styles.row}
        >
          {content}
        </GlassView>
      );

      if (onPress || onLongPress) {
        return (
          <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            onPressIn={handlers.onPressIn}
            onPressOut={handlers.onPressOut}
            disabled={isDisabled}
            accessible
            accessibilityRole="button"
            accessibilityState={{ disabled: isDisabled }}
          >
            <Animated.View style={[animatedStyle, style, { opacity: isDisabled ? 0.5 : 1 }]}>
              {inner}
            </Animated.View>
          </Pressable>
        );
      }

      return (
        <View style={[style, { opacity: isDisabled ? 0.5 : 1 }]}>
          {inner}
        </View>
      );
    }

    if (onPress || onLongPress) {
      return (
        <Pressable
          onPress={onPress}
          onLongPress={onLongPress}
          onPressIn={handlers.onPressIn}
          onPressOut={handlers.onPressOut}
          disabled={isDisabled}
          accessible
          accessibilityRole="button"
          accessibilityState={{ disabled: isDisabled }}
        >
          <Animated.View style={[animatedStyle, rowStyle]}>
            {content}
          </Animated.View>
        </Pressable>
      );
    }

    return <View style={rowStyle}>{content}</View>;
  },
);
ListItem.displayName = 'ListItem';

const styles = StyleSheet.create({
  row: {
    flexDirection:  'row',
    alignItems:     'center',
    paddingHorizontal: 16,
    paddingVertical:   13,
    minHeight:      56,
  },
  glassContainer: {
    marginHorizontal: 0,
  },
  leadingSlot: {
    marginRight:    12,
    alignItems:     'center',
    justifyContent: 'center',
  },
  textBlock: {
    flex:    1,
    gap:     2,
  },
  title: {
    fontSize:    15,
    fontWeight:  '500',
    lineHeight:  20,
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize:   13,
    fontWeight: '400',
    lineHeight: 18,
  },
  description: {
    fontSize:   12,
    fontWeight: '400',
    lineHeight: 17,
    marginTop:  2,
  },
  trailingSlot: {
    marginLeft:     8,
    alignItems:     'center',
    justifyContent: 'center',
  },
});
