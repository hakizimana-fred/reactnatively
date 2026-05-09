import React, { useCallback, useRef } from 'react';
import {
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { GlassView } from '@reactnatively/glass';
import { usePressAnimation, SPRING_SNAPPY } from '@reactnatively/animations';
import type { DockItem, FloatingDockProps } from './FloatingDock.types';

const ITEM_SIZE = 48;
const MAGNIFICATION_RANGE = 80;
const MAGNIFICATION_STRENGTH = 0.6;

// ─── Individual dock item ─────────────────────────────────────────────────────

interface DockItemViewProps {
  item: DockItem;
  magnification: boolean;
  touchX: SharedValue<number>;
  itemIndex: number;
  itemCenters: React.MutableRefObject<number[]>;
}

const DockItemView = React.memo<DockItemViewProps>(
  ({ item, magnification, touchX, itemIndex, itemCenters }) => {
    const { animatedStyle: pressStyle, handlers } = usePressAnimation({ pressedScale: 0.9 });

    const magnifiedStyle = useAnimatedStyle(() => {
      'worklet';
      if (!magnification) return {};
      const centerX = itemCenters.current[itemIndex] ?? 0;
      const distance = Math.abs(touchX.value - centerX);
      if (touchX.value < 0 || distance >= MAGNIFICATION_RANGE) {
        return { transform: [{ scale: withSpring(1, SPRING_SNAPPY) }] };
      }
      const strength = MAGNIFICATION_STRENGTH * (1 - distance / MAGNIFICATION_RANGE);
      return {
        transform: [{ scale: withSpring(1 + strength, SPRING_SNAPPY) }],
      };
    });

    const handleLayout = useCallback(
      (e: LayoutChangeEvent) => {
        const { x, width } = e.nativeEvent.layout;
        itemCenters.current[itemIndex] = x + width / 2;
      },
      [itemIndex, itemCenters],
    );

    return (
      <Animated.View style={magnifiedStyle} onLayout={handleLayout}>
        <Pressable
          onPress={item.onPress}
          onPressIn={handlers.onPressIn}
          onPressOut={handlers.onPressOut}
          accessibilityLabel={item.label}
          accessibilityRole="button"
        >
          <Animated.View style={[styles.itemContainer, pressStyle]}>
            <View style={styles.iconWrapper}>{item.icon}</View>
            <Text style={styles.itemLabel} numberOfLines={1}>
              {item.label}
            </Text>
          </Animated.View>
        </Pressable>
      </Animated.View>
    );
  },
);

DockItemView.displayName = 'DockItemView';

// ─── FloatingDock ─────────────────────────────────────────────────────────────

/**
 * FloatingDock — macOS-inspired dock with magnification on touch proximity.
 * GlassView pill container with items in a row.
 */
export const FloatingDock = React.memo<FloatingDockProps>(
  ({
    items,
    position = 'bottom',
    glass = true,
    magnification = true,
    style,
  }) => {
    // Shared value for current touch X position; -1 means "no active touch"
    const touchX = useSharedValue(-1);
    // Center X position for each item, measured after layout
    const itemCenters = useRef<number[]>([]);

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => magnification,
        onMoveShouldSetPanResponder: () => magnification,
        onPanResponderGrant: (e) => {
          touchX.value = e.nativeEvent.locationX;
        },
        onPanResponderMove: (e) => {
          touchX.value = e.nativeEvent.locationX;
        },
        onPanResponderRelease: () => {
          touchX.value = withSpring(-1, SPRING_SNAPPY);
        },
        onPanResponderTerminate: () => {
          touchX.value = withSpring(-1, SPRING_SNAPPY);
        },
      }),
    ).current;

    const positionStyle = position === 'top' ? styles.positionTop : styles.positionBottom;

    const container = (
      <View
        style={[styles.row, positionStyle, style]}
        {...(magnification ? panResponder.panHandlers : {})}
      >
        {items.map((item, index) => (
          <DockItemView
            key={item.label}
            item={item}
            magnification={magnification}
            touchX={touchX}
            itemIndex={index}
            itemCenters={itemCenters}
          />
        ))}
      </View>
    );

    if (!glass) {
      return (
        <View style={[styles.pillFallback, positionStyle, style]}>
          {container}
        </View>
      );
    }

    return (
      <GlassView
        elevation={3}
        variant="surface"
        borderRadius={36}
        style={[positionStyle, style]}
      >
        <View
          style={styles.row}
          {...(magnification ? panResponder.panHandlers : {})}
        >
          {items.map((item, index) => (
            <DockItemView
              key={item.label}
              item={item}
              magnification={magnification}
              touchX={touchX}
              itemIndex={index}
              itemCenters={itemCenters}
            />
          ))}
        </View>
      </GlassView>
    );
  },
);

FloatingDock.displayName = 'FloatingDock';

const styles = StyleSheet.create({
  positionBottom: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  positionTop: {
    alignSelf: 'center',
    marginTop: 16,
  },
  pillFallback: {
    borderRadius: 36,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  itemContainer: {
    width: ITEM_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLabel: {
    fontSize: 10,
    marginTop: 2,
    textAlign: 'center',
    color: 'rgba(0,0,0,0.7)',
  },
});
