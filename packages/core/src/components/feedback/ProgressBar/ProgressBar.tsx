import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated as RNAnimated,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { GlassView } from '@reactnatively/glass';
import { useTheme, useIsDark } from '@reactnatively/theme';
import type { ProgressBarProps } from './ProgressBar.types';

export const ProgressBar = React.memo<ProgressBarProps>(
  ({
    value         = 0,
    max           = 100,
    variant       = 'solid',
    color,
    trackColor,
    height        = 8,
    borderRadius,
    showLabel     = false,
    label,
    animated      = true,
    indeterminate = false,
    glass         = false,
    style,
  }) => {
    const { theme }  = useTheme();
    const isDark     = useIsDark();

    const fillColor  = color ?? theme.colors.primary;
    const trackBg    = trackColor ?? (isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)');
    const br         = borderRadius ?? height / 2;

    // Clamp value
    const clampedValue = Math.min(Math.max(value, 0), max);
    const pct          = (clampedValue / max) * 100;

    // Animated width for determinate bar
    const widthAnim = useRef(new RNAnimated.Value(animated ? 0 : pct)).current;

    useEffect(() => {
      if (indeterminate) return;
      if (animated) {
        RNAnimated.timing(widthAnim, {
          toValue:         pct,
          duration:        350,
          useNativeDriver: false,
        }).start();
      } else {
        widthAnim.setValue(pct);
      }
    }, [pct, animated, indeterminate]);

    // Indeterminate shimmer
    const shimmerAnim = useRef(new RNAnimated.Value(-100)).current;
    useEffect(() => {
      if (!indeterminate) return;
      shimmerAnim.setValue(-100);
      const loop = RNAnimated.loop(
        RNAnimated.timing(shimmerAnim, {
          toValue:         100,
          duration:        1200,
          useNativeDriver: false,
        }),
      );
      loop.start();
      return () => loop.stop();
    }, [indeterminate]);

    // Striped overlay opacity pulse
    const stripeAnim = useRef(new RNAnimated.Value(0.5)).current;
    useEffect(() => {
      if (variant !== 'striped') return;
      const loop = RNAnimated.loop(
        RNAnimated.sequence([
          RNAnimated.timing(stripeAnim, { toValue: 0.8, duration: 800, useNativeDriver: false }),
          RNAnimated.timing(stripeAnim, { toValue: 0.5, duration: 800, useNativeDriver: false }),
        ]),
      );
      loop.start();
      return () => loop.stop();
    }, [variant]);

    const displayLabel = label ?? `${Math.round(pct)}%`;

    const trackStyle: ViewStyle = {
      height:       height,
      borderRadius: br,
      overflow:     'hidden',
      backgroundColor: glass ? 'transparent' : trackBg,
    };

    const indeterminateFill = indeterminate ? (
      <RNAnimated.View
        style={[
          styles.fill,
          {
            backgroundColor: fillColor,
            borderRadius:    br,
            width:           '40%',
            transform: [
              {
                translateX: shimmerAnim.interpolate({
                  inputRange:  [-100, 100],
                  outputRange: ['-100%' as unknown as number, '250%' as unknown as number],
                }),
              },
            ],
          },
        ]}
      />
    ) : null;

    const determinateFill = !indeterminate ? (
      <RNAnimated.View
        style={[
          styles.fill,
          {
            backgroundColor: variant === 'gradient' ? undefined : fillColor,
            borderRadius:    br,
            width: widthAnim.interpolate({
              inputRange:  [0, 100],
              outputRange: ['0%', '100%'],
            }),
          },
          variant === 'gradient' && {
            // simple two-stop gradient simulation using a wider view clipped by overflow hidden
            backgroundColor: fillColor,
            opacity: 0.9,
          },
        ]}
      >
        {variant === 'striped' && (
          <RNAnimated.View
            style={[
              StyleSheet.absoluteFill,
              styles.stripes,
              { opacity: stripeAnim },
            ]}
          />
        )}
      </RNAnimated.View>
    ) : null;

    const trackContent = (
      <>
        {indeterminate ? indeterminateFill : determinateFill}
      </>
    );

    return (
      <View style={[styles.wrapper, style]}>
        {glass ? (
          <GlassView elevation={1} borderRadius={br} style={trackStyle}>
            <View style={[styles.glassFill, { width: `${pct}%`, backgroundColor: `${fillColor}cc`, borderRadius: br }]} />
            {indeterminate && (
              <RNAnimated.View
                style={[
                  styles.fill,
                  {
                    backgroundColor: fillColor,
                    borderRadius:    br,
                    width:           '40%',
                    position:        'absolute',
                    top: 0, bottom: 0,
                    transform: [
                      {
                        translateX: shimmerAnim.interpolate({
                          inputRange:  [-100, 100],
                          outputRange: ['-100%' as unknown as number, '250%' as unknown as number],
                        }),
                      },
                    ],
                  },
                ]}
              />
            )}
          </GlassView>
        ) : (
          <View style={[trackStyle, { backgroundColor: trackBg }]}>
            {trackContent}
          </View>
        )}

        {showLabel && (
          <Text style={[styles.label, { color: isDark ? '#94a3b8' : '#64748b' }]}>
            {displayLabel}
          </Text>
        )}
      </View>
    );
  },
);

ProgressBar.displayName = 'ProgressBar';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  fill: {
    position:  'absolute',
    top:       0,
    bottom:    0,
    left:      0,
  },
  glassFill: {
    position:  'absolute',
    top:       0,
    bottom:    0,
    left:      0,
  },
  stripes: {
    // Diagonal stripe pattern simulated with a semi-transparent lighter overlay
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  label: {
    fontSize:   12,
    fontWeight: '600',
    marginTop:  4,
    textAlign:  'right',
  },
});
