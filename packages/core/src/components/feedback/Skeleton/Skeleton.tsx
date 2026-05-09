import React, { useEffect } from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { useIsDark } from '@reactnatively/theme';
import { useReducedMotion } from '@reactnatively/animations';

let LinearGradientImpl:
  | typeof import('react-native-linear-gradient').default
  | null
  | undefined;

function loadLinearGradient(): typeof import('react-native-linear-gradient').default | null {
  if (LinearGradientImpl !== undefined) return LinearGradientImpl;
  try {
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    const gradientModule = require('react-native-linear-gradient');
    LinearGradientImpl = gradientModule?.default ?? gradientModule;
  } catch {
    LinearGradientImpl = null;
  }
  return LinearGradientImpl;
}

export type SkeletonVariant = 'text' | 'circle' | 'rect' | 'card';

export interface SkeletonProps {
  variant?:      SkeletonVariant;
  width?:        number | string;
  height?:       number;
  borderRadius?: number;
  lines?:        number;
  lineSpacing?:  number;
  style?:        StyleProp<ViewStyle>;
  testID?:       string;
}

export const Skeleton = React.memo<SkeletonProps>(
  ({
    variant      = 'rect',
    width        = '100%',
    height       = 20,
    borderRadius,
    lines        = 1,
    lineSpacing  = 8,
    style,
    testID,
  }) => {
    const isDark    = useIsDark();
    const isReduced = useReducedMotion();
    const shimmer   = useSharedValue(0);

    useEffect(() => {
      if (isReduced) return;
      shimmer.value = withRepeat(withTiming(1, { duration: 1400 }), -1, false);
    }, [isReduced]);

    const baseBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
    const shimmerLight = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.65)';
    const shimmerColors = [baseBg, shimmerLight, baseBg];

    const resolvedRadius = (() => {
      if (borderRadius !== undefined) return borderRadius;
      if (variant === 'circle') return 9999;
      if (variant === 'text')   return 4;
      if (variant === 'card')   return 16;
      return 8;
    })();

    const resolvedHeight = (() => {
      if (variant === 'circle') return typeof width === 'number' ? width : height;
      if (variant === 'text')   return 14;
      if (variant === 'card')   return height || 180;
      return height;
    })();

    const animatedStyle = useAnimatedStyle(() => {
      'worklet';
      return {
        transform: [{
          translateX: interpolate(shimmer.value, [0, 1], [-300, 300], Extrapolation.CLAMP),
        }],
      };
    });

    const renderSingle = (key?: number, widthOverride?: string) => (
      <View
        key={key}
        testID={key === undefined ? testID : undefined}
        style={[
          {
            width:           (widthOverride ?? width) as ViewStyle['width'],
            height:          resolvedHeight,
            borderRadius:    resolvedRadius,
            backgroundColor: baseBg,
            overflow:        'hidden' as const,
            marginBottom:    key !== undefined && key < lines - 1 ? lineSpacing : 0,
          },
          key === undefined ? style : undefined,
        ]}
      >
        {!isReduced && (
          <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
            {loadLinearGradient() ? (
              <LinearGradientImpl
                colors={shimmerColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1, width: 300 }}
              />
            ) : (
              <View
                style={[
                  StyleSheet.absoluteFill,
                  { backgroundColor: shimmerLight, width: 300 },
                ]}
              />
            )}
          </Animated.View>
        )}
      </View>
    );

    if (variant === 'text' && lines > 1) {
      return (
        <View testID={testID} style={style}>
          {Array.from({ length: lines }).map((_, i) =>
            renderSingle(i, i === lines - 1 ? '65%' : String(width)),
          )}
        </View>
      );
    }

    return renderSingle();
  },
);

Skeleton.displayName = 'Skeleton';
