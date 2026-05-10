import React, { useCallback } from 'react';
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
  interpolate,
} from 'react-native-reanimated';
import { useTheme } from 'reactnatively-theme';
import { SPRING_BOUNCE } from 'reactnatively-animations';
import { useRadioGroup } from './radio-group-context';
import type { RadioProps, RadioSize } from './Radio.types';

// ─── Size system ─────────────────────────────────────────────────────────────
interface SizeConfig {
  outer:     number;
  inner:     number;
  labelSize: number;
}

const SIZE_CONFIG: Record<RadioSize, SizeConfig> = {
  sm: { outer: 18, inner: 8,  labelSize: 14 },
  md: { outer: 20, inner: 10, labelSize: 15 },
  lg: { outer: 24, inner: 12, labelSize: 16 },
};

// ─── Component ───────────────────────────────────────────────────────────────
export const Radio = React.memo<RadioProps>(
  ({ value, label, isDisabled = false, style }) => {
    const { theme }  = useTheme();
    const groupCtx   = useRadioGroup();

    const isSelected   = groupCtx?.value === value;
    const resolvedSize = groupCtx?.size ?? 'md';
    const disabled     = isDisabled || (groupCtx?.isDisabled ?? false);
    const isInvalid    = groupCtx?.isInvalid ?? false;

    const sz = SIZE_CONFIG[resolvedSize];

    // Spring progress: 0 = deselected, 1 = selected
    const progress = useSharedValue(isSelected ? 1 : 0);

    React.useEffect(() => {
      progress.value = withSpring(isSelected ? 1 : 0, SPRING_BOUNCE);
    }, [isSelected]);

    const innerDotStyle = useAnimatedStyle((): ViewStyle => {
      'worklet';
      return {
        transform: [
          { scale: interpolate(progress.value, [0, 1], [0, 1]) },
        ],
        opacity: interpolate(progress.value, [0, 0.4, 1], [0, 0, 1]),
      };
    });

    const handlePress = useCallback(() => {
      if (disabled) return;
      groupCtx?.onChange(value);
    }, [disabled, groupCtx, value]);

    const outerBorderColor = isInvalid
      ? theme.colors.error
      : isSelected
        ? theme.colors.primary
        : theme.colors.border;

    return (
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        accessible
        accessibilityRole="radio"
        accessibilityState={{ checked: isSelected, disabled }}
        accessibilityLabel={label ?? value}
        style={[
          styles.row,
          { opacity: disabled ? 0.45 : 1 },
          style,
        ]}
      >
        {/* Outer ring */}
        <View
          style={[
            styles.outerRing,
            {
              width:        sz.outer,
              height:       sz.outer,
              borderRadius: sz.outer / 2,
              borderColor:  outerBorderColor,
              borderWidth:  1.5,
              alignItems:   'center',
              justifyContent: 'center',
            },
          ]}
        >
          {/* Inner dot */}
          <Animated.View
            style={[
              {
                width:           sz.inner,
                height:          sz.inner,
                borderRadius:    sz.inner / 2,
                backgroundColor: theme.colors.primary,
              },
              innerDotStyle,
            ]}
          />
        </View>

        {label != null && (
          <Text
            style={[
              styles.label,
              { fontSize: sz.labelSize, color: theme.colors.text },
            ]}
            allowFontScaling={false}
          >
            {label}
          </Text>
        )}
      </Pressable>
    );
  },
);

Radio.displayName = 'Radio';

const styles = StyleSheet.create({
  row:      { flexDirection: 'row', alignItems: 'center' },
  outerRing: {},
  label:    { marginLeft: 10, fontWeight: '400' },
});
