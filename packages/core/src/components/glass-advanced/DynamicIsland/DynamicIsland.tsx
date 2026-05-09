import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { GlassView } from '@reactnatively/glass';
import { SPRING_BOUNCE } from '@reactnatively/animations';
import type { DynamicIslandProps, DynamicIslandState } from './DynamicIsland.types';

// Sizes for each state
const STATE_SIZES: Record<DynamicIslandState, { width: number; height: number }> = {
  minimal:  { width: 12,  height: 12  },
  compact:  { width: 120, height: 36  },
  expanded: { width: 340, height: 160 },
};

const STATE_RADIUS: Record<DynamicIslandState, number> = {
  minimal:  6,
  compact:  18,
  expanded: 40,
};

/**
 * DynamicIsland — morphing pill that cycles between compact, expanded, and minimal states.
 * Animated width/height transitions via withSpring(SPRING_BOUNCE).
 */
export const DynamicIsland = React.memo<DynamicIslandProps>(
  ({
    state: controlledState,
    defaultState = 'compact',
    onStateChange,
    compactContent,
    expandedContent,
    minimalContent,
    onPress,
    style,
  }) => {
    const [internalState, setInternalState] = useState<DynamicIslandState>(defaultState);
    const activeState = controlledState !== undefined ? controlledState : internalState;

    const animWidth        = useSharedValue(STATE_SIZES[activeState].width);
    const animHeight       = useSharedValue(STATE_SIZES[activeState].height);
    const animBorderRadius = useSharedValue(STATE_RADIUS[activeState]);

    // Sync animated values when state changes
    useEffect(() => {
      const { width, height } = STATE_SIZES[activeState];
      const radius = STATE_RADIUS[activeState];
      animWidth.value        = withSpring(width,  SPRING_BOUNCE);
      animHeight.value       = withSpring(height, SPRING_BOUNCE);
      animBorderRadius.value = withSpring(radius, SPRING_BOUNCE);
    }, [activeState]);

    const animatedStyle = useAnimatedStyle(() => ({
      width:        animWidth.value,
      height:       animHeight.value,
      borderRadius: animBorderRadius.value,
    }));

    const handlePress = useCallback(() => {
      if (onPress) {
        onPress();
        return;
      }
      // Default cycle: compact → expanded → compact
      const next: DynamicIslandState =
        activeState === 'compact' ? 'expanded' : 'compact';
      if (controlledState === undefined) {
        setInternalState(next);
      }
      onStateChange?.(next);
    }, [activeState, controlledState, onPress, onStateChange]);

    const renderContent = () => {
      if (activeState === 'minimal')  return minimalContent ?? null;
      if (activeState === 'expanded') return expandedContent ?? null;
      return compactContent ?? null;
    };

    return (
      <Animated.View style={[styles.wrapper, animatedStyle, style]}>
        <Pressable onPress={handlePress} style={styles.pressable}>
          <GlassView
            elevation={4}
            variant="frosted"
            tintOverride="rgba(0,0,0,0.85)"
            borderRadius={0}
            border={false}
            style={StyleSheet.absoluteFill}
          >
            <View style={styles.content}>
              {renderContent()}
            </View>
          </GlassView>
        </Pressable>
      </Animated.View>
    );
  },
);

DynamicIsland.displayName = 'DynamicIsland';

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    overflow: 'hidden',
  },
  pressable: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
});
