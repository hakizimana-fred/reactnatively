import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  View,
  type LayoutChangeEvent,
  type ViewStyle,
} from 'react-native';
import { useTheme } from 'reactnatively-theme';
import { GlassView } from 'reactnatively-glass';
import type { RangeSliderProps } from './RangeSlider.types';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function snapToStep(value: number, step: number, min: number): number {
  return Math.round((value - min) / step) * step + min;
}

function clamp(value: number, lo: number, hi: number): number {
  return Math.min(Math.max(value, lo), hi);
}

const TRACK_HEIGHT  = 4;
const DEFAULT_THUMB = 20;

// ─── Component ────────────────────────────────────────────────────────────────

export const RangeSlider = React.memo<RangeSliderProps>(
  ({
    min               = 0,
    max               = 100,
    step              = 1,
    value:            valueProp,
    defaultValue,
    onChange,
    onChangeEnd,
    trackColor,
    activeTrackColor,
    thumbSize         = DEFAULT_THUMB,
    glass             = false,
    isDisabled        = false,
    style,
  }) => {
    const { theme } = useTheme();

    const resolvedTrackColor  = trackColor       ?? theme.colors.border;
    const resolvedActiveColor = activeTrackColor ?? theme.colors.primary;

    // ─── Controlled / uncontrolled state ────────────────────────────────────
    const isControlled  = valueProp !== undefined;
    const initLow  = (valueProp ?? defaultValue)?.[0] ?? min;
    const initHigh = (valueProp ?? defaultValue)?.[1] ?? max;

    const [internalValue, setInternalValue] = useState<[number, number]>([initLow, initHigh]);
    const currentValue: [number, number] = isControlled ? valueProp! : internalValue;

    const [low, high] = currentValue;

    // ─── Layout ─────────────────────────────────────────────────────────────
    const [trackWidth, setTrackWidth] = useState(0);
    const trackWidthRef = useRef(0);

    const toOffset = useCallback(
      (val: number, tw: number) =>
        tw > 0 ? ((val - min) / (max - min)) * tw : 0,
      [min, max],
    );

    const thumbPad = thumbSize / 2;

    // ─── Animated values ────────────────────────────────────────────────────
    const lowAnim  = useRef(new Animated.Value(toOffset(low, trackWidth))).current;
    const highAnim = useRef(new Animated.Value(toOffset(high, trackWidth))).current;

    // Refs for PanResponder closures (never stale)
    const lowRef       = useRef(low);
    const highRef      = useRef(high);
    const startLowX    = useRef(0);
    const startHighX   = useRef(0);

    lowRef.current  = low;
    highRef.current = high;

    // Sync animated values when controlled value or track width changes
    const prevTrackWidth = useRef(0);
    if (trackWidth !== prevTrackWidth.current) {
      lowAnim.setValue(toOffset(low, trackWidth));
      highAnim.setValue(toOffset(high, trackWidth));
    }
    prevTrackWidth.current = trackWidth;

    const onLayout = useCallback(
      (e: LayoutChangeEvent) => {
        const w = e.nativeEvent.layout.width - thumbSize;
        setTrackWidth(w);
        trackWidthRef.current = w;
        lowAnim.setValue(toOffset(lowRef.current, w));
        highAnim.setValue(toOffset(highRef.current, w));
      },
      [thumbSize, toOffset, lowAnim, highAnim],
    );

    // ─── Value compute ───────────────────────────────────────────────────────
    const computeValue = useCallback(
      (x: number): number => {
        const w = trackWidthRef.current;
        if (w <= 0) return 0;
        const ratio   = clamp(x / w, 0, 1);
        const raw     = ratio * (max - min) + min;
        const snapped = snapToStep(raw, step, min);
        return clamp(snapped, min, max);
      },
      [min, max, step],
    );

    // ─── Apply new range value ───────────────────────────────────────────────
    const applyValue = useCallback(
      (nextLow: number, nextHigh: number, ended = false) => {
        const next: [number, number] = [nextLow, nextHigh];
        if (!isControlled) setInternalValue(next);
        onChange?.(next);
        if (ended) onChangeEnd?.(next);
      },
      [isControlled, onChange, onChangeEnd],
    );

    // ─── Low thumb PanResponder ──────────────────────────────────────────────
    const lowPan = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => !isDisabled,
        onMoveShouldSetPanResponder:  () => !isDisabled,
        onPanResponderGrant: () => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          startLowX.current = (lowAnim as any)._value;
        },
        onPanResponderMove: (_, gs) => {
          const maxLowX = toOffset(highRef.current - step, trackWidthRef.current);
          const newX    = clamp(startLowX.current + gs.dx, 0, maxLowX);
          const newVal  = computeValue(newX);
          lowAnim.setValue(newX);
          lowRef.current = newVal;
          applyValue(newVal, highRef.current, false);
        },
        onPanResponderRelease: (_, gs) => {
          const maxLowX = toOffset(highRef.current - step, trackWidthRef.current);
          const newX    = clamp(startLowX.current + gs.dx, 0, maxLowX);
          const newVal  = computeValue(newX);
          applyValue(newVal, highRef.current, true);
        },
        onPanResponderTerminate: () => {
          lowAnim.setValue(toOffset(lowRef.current, trackWidthRef.current));
        },
      }),
    ).current;

    // ─── High thumb PanResponder ─────────────────────────────────────────────
    const highPan = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => !isDisabled,
        onMoveShouldSetPanResponder:  () => !isDisabled,
        onPanResponderGrant: () => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          startHighX.current = (highAnim as any)._value;
        },
        onPanResponderMove: (_, gs) => {
          const minHighX = toOffset(lowRef.current + step, trackWidthRef.current);
          const maxX     = trackWidthRef.current;
          const newX     = clamp(startHighX.current + gs.dx, minHighX, maxX);
          const newVal   = computeValue(newX);
          highAnim.setValue(newX);
          highRef.current = newVal;
          applyValue(lowRef.current, newVal, false);
        },
        onPanResponderRelease: (_, gs) => {
          const minHighX = toOffset(lowRef.current + step, trackWidthRef.current);
          const maxX     = trackWidthRef.current;
          const newX     = clamp(startHighX.current + gs.dx, minHighX, maxX);
          const newVal   = computeValue(newX);
          applyValue(lowRef.current, newVal, true);
        },
        onPanResponderTerminate: () => {
          highAnim.setValue(toOffset(highRef.current, trackWidthRef.current));
        },
      }),
    ).current;

    // ─── Active track segment ────────────────────────────────────────────────
    const activeLeft  = Animated.add(lowAnim,  new Animated.Value(thumbPad));
    const activeWidth = Animated.subtract(highAnim, lowAnim);

    const track = (
      <View
        style={[styles.trackContainer, { paddingHorizontal: thumbPad }]}
        onLayout={onLayout}
      >
        {/* Background track */}
        <View
          style={[
            styles.track,
            {
              backgroundColor: resolvedTrackColor,
              opacity:         isDisabled ? 0.4 : 1,
            },
          ]}
        />

        {/* Active segment */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.activeSegment,
            {
              backgroundColor: resolvedActiveColor,
              left:  activeLeft,
              width: activeWidth,
            },
          ]}
        />

        {/* Low thumb */}
        <Animated.View
          {...lowPan.panHandlers}
          style={[
            styles.thumb,
            {
              width:        thumbSize,
              height:       thumbSize,
              borderRadius: thumbSize / 2,
              transform:    [{ translateX: lowAnim }],
              opacity:      isDisabled ? 0.5 : 1,
            },
          ]}
          accessible
          accessibilityRole="adjustable"
          accessibilityValue={{ min, max, now: low }}
          accessibilityLabel="Lower range thumb"
        />

        {/* High thumb */}
        <Animated.View
          {...highPan.panHandlers}
          style={[
            styles.thumb,
            {
              width:        thumbSize,
              height:       thumbSize,
              borderRadius: thumbSize / 2,
              transform:    [{ translateX: highAnim }],
              opacity:      isDisabled ? 0.5 : 1,
            },
          ]}
          accessible
          accessibilityRole="adjustable"
          accessibilityValue={{ min, max, now: high }}
          accessibilityLabel="Upper range thumb"
        />
      </View>
    );

    if (glass) {
      return (
        <GlassView elevation={1} borderRadius={12} style={[styles.wrapper, style]}>
          {track}
        </GlassView>
      );
    }

    return (
      <View style={[styles.wrapper, style]}>
        {track}
      </View>
    );
  },
);

RangeSlider.displayName = 'RangeSlider';

const styles = StyleSheet.create({
  wrapper: {
    width:          '100%',
    paddingVertical: 12,
  } as ViewStyle,
  trackContainer: {
    width:           '100%',
    height:          TRACK_HEIGHT,
    justifyContent:  'center',
  } as ViewStyle,
  track: {
    position:     'absolute',
    left:         0,
    right:        0,
    height:       TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
  } as ViewStyle,
  activeSegment: {
    position:     'absolute',
    height:       TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    top:          0,
  } as ViewStyle,
  thumb: {
    position:        'absolute',
    top:             -(DEFAULT_THUMB / 2 - TRACK_HEIGHT / 2),
    backgroundColor: '#ffffff',
    shadowColor:     '#000',
    shadowOffset:    { width: 0, height: 2 },
    shadowOpacity:   0.25,
    shadowRadius:    4,
    elevation:       4,
    borderWidth:     2,
    borderColor:     '#e5e7eb',
  } as ViewStyle,
});
