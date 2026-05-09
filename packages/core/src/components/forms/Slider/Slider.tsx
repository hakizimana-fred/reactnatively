import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '@reactnatively/theme';
import { useControllable } from '@reactnatively/hooks';
import { defineVariants } from '@reactnatively/utils';
import type { SliderProps, SliderSizeConfig } from './Slider.types';

// ─── Size configs ─────────────────────────────────────────────────────────────
const SIZE_CONFIG = defineVariants<'sm' | 'md' | 'lg', SliderSizeConfig>({
  sm: { trackHeight: 3, thumbSize: 18 },
  md: { trackHeight: 4, thumbSize: 22 },
  lg: { trackHeight: 6, thumbSize: 28 },
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
function snapToStep(value: number, step: number, min: number): number {
  return Math.round((value - min) / step) * step + min;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// ─── Component ────────────────────────────────────────────────────────────────
export function Slider({
  value: valueProp,
  defaultValue,
  min         = 0,
  max         = 100,
  step        = 1,
  onChange,
  onChangeEnd,
  size        = 'md',
  color,
  trackColor,
  thumbSize:  thumbSizeProp,
  showValue   = false,
  marks       = false,
  isDisabled  = false,
  style,
}: SliderProps) {
  const { theme } = useTheme();
  const sz = SIZE_CONFIG(size);

  const resolvedColor     = color     ?? theme.colors.primary;
  const resolvedTrackColor = trackColor ?? theme.colors.border;
  const resolvedThumbSize = thumbSizeProp ?? sz.thumbSize;

  const [trackWidth, setTrackWidth] = useState(0);

  const [value, setValue] = useControllable<number>({
    value:        valueProp,
    defaultValue: defaultValue ?? min,
    onChange,
  });

  const resolvedValue = value ?? min;

  // Keep mutable refs so PanResponder callbacks never go stale
  const valueRef      = useRef(resolvedValue);
  const trackWidthRef = useRef(0);
  const startXRef     = useRef(0);
  const startValRef   = useRef(resolvedValue);

  valueRef.current = resolvedValue;

  const thumbOffset = trackWidth > 0
    ? ((resolvedValue - min) / (max - min)) * trackWidth
    : 0;

  const thumbAnim = useRef(new Animated.Value(thumbOffset)).current;

  // Keep animated value in sync when controlled value changes
  const prevTrackWidth = useRef(0);
  if (trackWidth !== prevTrackWidth.current || resolvedValue !== valueRef.current) {
    const newOffset = trackWidth > 0
      ? ((resolvedValue - min) / (max - min)) * trackWidth
      : 0;
    thumbAnim.setValue(newOffset);
  }
  prevTrackWidth.current = trackWidth;

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width - resolvedThumbSize;
    setTrackWidth(w);
    trackWidthRef.current = w;
    const offset = w > 0 ? ((valueRef.current - min) / (max - min)) * w : 0;
    thumbAnim.setValue(offset);
  }, [min, max, resolvedThumbSize, thumbAnim]);

  const computeValue = useCallback((x: number): number => {
    const w = trackWidthRef.current;
    if (w <= 0) return valueRef.current;
    const ratio    = clamp(x / w, 0, 1);
    const raw      = ratio * (max - min) + min;
    const snapped  = snapToStep(raw, step, min);
    return clamp(snapped, min, max);
  }, [min, max, step]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isDisabled,
      onMoveShouldSetPanResponder:  () => !isDisabled,
      onPanResponderGrant: (_, gs) => {
        startXRef.current   = (thumbAnim as any)._value;
        startValRef.current = valueRef.current;
      },
      onPanResponderMove: (_, gs) => {
        const newX  = clamp(startXRef.current + gs.dx, 0, trackWidthRef.current);
        const newVal = computeValue(newX);
        thumbAnim.setValue(newX);
        valueRef.current = newVal;
        setValue(newVal);
      },
      onPanResponderRelease: (_, gs) => {
        const newX   = clamp(startXRef.current + gs.dx, 0, trackWidthRef.current);
        const newVal = computeValue(newX);
        setValue(newVal);
        onChangeEnd?.(newVal);
      },
      onPanResponderTerminate: () => {
        // Snap back to last known
        const offset = trackWidthRef.current > 0
          ? ((valueRef.current - min) / (max - min)) * trackWidthRef.current
          : 0;
        thumbAnim.setValue(offset);
      },
    }),
  ).current;

  const markPositions: number[] = (() => {
    if (!marks) return [];
    if (marks === true) {
      const count = Math.floor((max - min) / step);
      return Array.from({ length: count + 1 }, (_, i) => min + i * step);
    }
    return marks;
  })();

  const containerPadding = resolvedThumbSize / 2;

  return (
    <View
      style={[styles.wrapper, style]}
      accessible
      accessibilityRole="adjustable"
      accessibilityValue={{ min, max, now: resolvedValue }}
      accessibilityLabel="Slider"
      accessibilityState={{ disabled: isDisabled }}
    >
      {showValue && (
        <Animated.View
          style={[
            styles.tooltip,
            {
              left: Animated.subtract(thumbAnim, new Animated.Value(containerPadding - resolvedThumbSize / 2)),
              backgroundColor: resolvedColor,
            },
          ]}
          pointerEvents="none"
        >
          <Text style={styles.tooltipText}>{Math.round(resolvedValue)}</Text>
        </Animated.View>
      )}

      <View
        style={[styles.trackContainer, { paddingHorizontal: containerPadding }]}
        onLayout={onLayout}
      >
        {/* Background track */}
        <View
          style={[
            styles.track,
            {
              height:          sz.trackHeight,
              backgroundColor: resolvedTrackColor,
              borderRadius:    sz.trackHeight / 2,
              opacity:         isDisabled ? 0.4 : 1,
            },
          ]}
        >
          {/* Filled track */}
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {
                right:           undefined,
                width:           thumbAnim,
                backgroundColor: resolvedColor,
                borderRadius:    sz.trackHeight / 2,
              },
            ]}
          />
        </View>

        {/* Tick marks */}
        {markPositions.map((markVal) => {
          const markOffset = trackWidth > 0
            ? ((markVal - min) / (max - min)) * trackWidth
            : 0;
          return (
            <View
              key={markVal}
              style={[
                styles.mark,
                {
                  left:   markOffset + containerPadding - 2,
                  top:    (sz.thumbSize - 6) / 2,
                  backgroundColor:
                    markVal <= resolvedValue ? resolvedColor : resolvedTrackColor,
                },
              ]}
              pointerEvents="none"
            />
          );
        })}

        {/* Thumb */}
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.thumb,
            {
              width:           resolvedThumbSize,
              height:          resolvedThumbSize,
              borderRadius:    resolvedThumbSize / 2,
              backgroundColor: resolvedColor,
              transform:       [{ translateX: thumbAnim }],
              opacity:         isDisabled ? 0.5 : 1,
              shadowColor:     resolvedColor,
            },
          ]}
        />
      </View>
    </View>
  );
}

Slider.displayName = 'Slider';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  } as ViewStyle,
  trackContainer: {
    width:          '100%',
    justifyContent: 'center',
  } as ViewStyle,
  track: {
    width:    '100%',
    overflow: 'hidden',
  } as ViewStyle,
  thumb: {
    position:      'absolute',
    top:           undefined,
    shadowOffset:  { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius:  4,
    elevation:     4,
    backgroundColor: '#fff',
    borderWidth:   2,
    borderColor:   '#fff',
  } as ViewStyle,
  tooltip: {
    position:     'absolute',
    top:          -32,
    paddingHorizontal: 6,
    paddingVertical:   2,
    borderRadius: 6,
    minWidth:     32,
    alignItems:   'center',
  } as ViewStyle,
  tooltipText: {
    color:      '#fff',
    fontSize:   11,
    fontWeight: '600',
  },
  mark: {
    position:     'absolute',
    width:        4,
    height:       6,
    borderRadius: 2,
  } as ViewStyle,
});
