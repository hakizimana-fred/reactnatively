import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated as RNAnimated,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from 'reactnatively-theme';
import type { SpinnerProps, SpinnerSize } from './Spinner.types';

const SIZE_MAP: Record<SpinnerSize, number> = {
  xs: 16,
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64,
};

const DEFAULT_THICKNESS_MAP: Record<SpinnerSize, number> = {
  xs: 2,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
};

export const Spinner = React.memo<SpinnerProps>(
  ({
    size      = 'md',
    color,
    trackColor,
    thickness,
    duration  = 800,
    style,
    label,
  }) => {
    const { theme }   = useTheme();
    const spinColor   = color ?? theme.colors.primary;
    const dim         = SIZE_MAP[size];
    const bw          = thickness ?? DEFAULT_THICKNESS_MAP[size];
    const radius      = dim / 2;
    const spinValue   = useRef(new RNAnimated.Value(0)).current;

    useEffect(() => {
      const loop = RNAnimated.loop(
        RNAnimated.timing(spinValue, {
          toValue:         1,
          duration,
          useNativeDriver: true,
        }),
      );
      loop.start();
      return () => loop.stop();
    }, [duration]);

    const rotate = spinValue.interpolate({
      inputRange:  [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <View
        style={[styles.container, { width: dim, height: dim }, style]}
        accessible
        accessibilityLabel={label ?? 'Loading'}
        accessibilityRole="progressbar"
      >
        {/* Track ring */}
        <View
          style={[
            styles.ring,
            {
              width:        dim,
              height:       dim,
              borderRadius: radius,
              borderWidth:  bw,
              borderColor:  trackColor ?? `${spinColor}30`,
            },
          ]}
        />
        {/* Spinning arc */}
        <RNAnimated.View
          style={[
            styles.ring,
            styles.arc,
            {
              width:              dim,
              height:             dim,
              borderRadius:       radius,
              borderWidth:        bw,
              borderTopColor:     spinColor,
              borderRightColor:   'transparent',
              borderBottomColor:  'transparent',
              borderLeftColor:    'transparent',
              transform: [{ rotate }],
            },
          ]}
        />
      </View>
    );
  },
);

Spinner.displayName = 'Spinner';

const styles = StyleSheet.create({
  container: {
    alignItems:     'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
  },
  arc: {
    // Arc is on top of track
  },
});
