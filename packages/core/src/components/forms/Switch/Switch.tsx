import React, { useCallback, useMemo, useState } from 'react';
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import { useTheme } from '@reactnatively/theme';
import { GlassView } from '@reactnatively/glass';
import { SPRING_BOUNCE } from '@reactnatively/animations';
import { useFormControl } from '../FormControl/form-control-context';
import type { SwitchProps, SwitchSize, SwitchColor } from './Switch.types';

// ─── Size system ─────────────────────────────────────────────────────────────
interface SizeConfig {
  trackWidth:  number;
  trackHeight: number;
  thumbSize:   number;
  thumbOffset: number; // padding from track edge
}

const SIZE_CONFIG: Record<SwitchSize, SizeConfig> = {
  sm: { trackWidth: 36, trackHeight: 20, thumbSize: 14, thumbOffset: 3 },
  md: { trackWidth: 48, trackHeight: 26, thumbSize: 20, thumbOffset: 3 },
  lg: { trackWidth: 56, trackHeight: 30, thumbSize: 24, thumbOffset: 3 },
};

// ─── Component ───────────────────────────────────────────────────────────────
export const Switch = React.memo<SwitchProps>(
  ({
    checked,
    defaultChecked = false,
    onChange,
    size           = 'md',
    color          = 'primary',
    label,
    labelPosition  = 'right',
    glass          = false,
    isDisabled     = false,
    style,
  }) => {
    const { theme }  = useTheme();
    const ctx        = useFormControl();

    const resolvedIsDisabled = isDisabled || (ctx?.isDisabled ?? false);

    // Controlled / uncontrolled
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isChecked = checked !== undefined ? checked : internalChecked;

    const sz = SIZE_CONFIG[size];

    // Travel distance for thumb (track width - thumb size - 2 * offset)
    const maxTranslate = sz.trackWidth - sz.thumbSize - sz.thumbOffset * 2;

    // Reanimated progress: 0 = off, 1 = on
    const progress = useSharedValue(isChecked ? 1 : 0);

    // Resolve the active track color from theme
    const activeColor = useMemo((): string => {
      const c = theme.colors;
      const map: Record<SwitchColor, string> = {
        primary: c.primary,
        success: c.success,
        warning: c.warning,
        error:   c.error,
      };
      return map[color];
    }, [color, theme]);

    const handlePress = useCallback(() => {
      if (resolvedIsDisabled) return;
      const next = !isChecked;
      if (checked === undefined) {
        setInternalChecked(next);
      }
      progress.value = withSpring(next ? 1 : 0, SPRING_BOUNCE);
      onChange?.(next);
    }, [resolvedIsDisabled, isChecked, checked, progress, onChange]);

    React.useEffect(() => {
      progress.value = withSpring(isChecked ? 1 : 0, SPRING_BOUNCE);
    }, [isChecked]);

    // Animated track color
    const trackAnimStyle = useAnimatedStyle((): ViewStyle => {
      'worklet';
      return {
        backgroundColor: interpolateColor(
          progress.value,
          [0, 1],
          [theme.colors.border, activeColor],
        ),
      };
    });

    // Animated thumb translateX
    const thumbAnimStyle = useAnimatedStyle((): ViewStyle => {
      'worklet';
      return {
        transform: [
          {
            translateX: progress.value * maxTranslate,
          },
        ],
      };
    });

    const trackBase: ViewStyle = {
      width:        sz.trackWidth,
      height:       sz.trackHeight,
      borderRadius: sz.trackHeight / 2,
      justifyContent: 'center',
      paddingHorizontal: sz.thumbOffset,
    };

    const thumbBase: ViewStyle = {
      width:        sz.thumbSize,
      height:       sz.thumbSize,
      borderRadius: sz.thumbSize / 2,
      backgroundColor: '#fff',
      // iOS shadow
      shadowColor:  '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.25,
      shadowRadius: 2,
      // Android
      elevation: 2,
    };

    const glassTrack = glass ? (
      <GlassView elevation={1} borderRadius={sz.trackHeight / 2}>
        <Animated.View style={[trackBase, trackAnimStyle]}>
          <Animated.View style={[thumbBase, thumbAnimStyle]} />
        </Animated.View>
      </GlassView>
    ) : (
      <Animated.View style={[trackBase, trackAnimStyle]}>
        <Animated.View style={[thumbBase, thumbAnimStyle]} />
      </Animated.View>
    );

    const labelEl = label != null ? (
      <Text
        style={[
          styles.label,
          { color: theme.colors.text },
          labelPosition === 'left' ? styles.labelLeft : styles.labelRight,
        ]}
        allowFontScaling={false}
      >
        {label}
      </Text>
    ) : null;

    return (
      <Pressable
        onPress={handlePress}
        disabled={resolvedIsDisabled}
        accessible
        accessibilityRole="switch"
        accessibilityState={{ checked: isChecked, disabled: resolvedIsDisabled }}
        accessibilityLabel={label}
        style={[
          styles.row,
          { opacity: resolvedIsDisabled ? 0.45 : 1 },
          style,
        ]}
      >
        {labelPosition === 'left' && labelEl}
        {glassTrack}
        {labelPosition === 'right' && labelEl}
      </Pressable>
    );
  },
);

Switch.displayName = 'Switch';

const styles = StyleSheet.create({
  row:        { flexDirection: 'row', alignItems: 'center' },
  label:      { fontSize: 15, fontWeight: '400' },
  labelLeft:  { marginRight: 10 },
  labelRight: { marginLeft:  10 },
});
