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
  interpolate,
} from 'react-native-reanimated';
import { useTheme } from '@reactnatively/theme';
import { GlassView } from '@reactnatively/glass';
import { SPRING_BOUNCE } from '@reactnatively/animations';
import { useFormControl } from '../FormControl/form-control-context';
import type { CheckboxProps, CheckboxSize } from './Checkbox.types';

// ─── Size system ─────────────────────────────────────────────────────────────
interface SizeConfig {
  box: number;
  borderRadius: number;
  fontSize: number;
  labelSize: number;
}

const SIZE_CONFIG: Record<CheckboxSize, SizeConfig> = {
  sm: { box: 20, borderRadius: 6,  fontSize: 13, labelSize: 14 },
  md: { box: 24, borderRadius: 7,  fontSize: 15, labelSize: 15 },
  lg: { box: 28, borderRadius: 8,  fontSize: 17, labelSize: 16 },
};

// ─── Component ───────────────────────────────────────────────────────────────
export const Checkbox = React.memo<CheckboxProps>(
  ({
    checked,
    defaultChecked = false,
    onChange,
    label,
    helperText,
    errorText,
    size         = 'md',
    glass        = false,
    isDisabled   = false,
    isInvalid    = false,
    isIndeterminate = false,
    style,
  }) => {
    const { theme } = useTheme();
    const ctx       = useFormControl();

    // Merge FormControl context
    const resolvedIsDisabled = isDisabled || (ctx?.isDisabled ?? false);
    const resolvedIsInvalid  = isInvalid  || (ctx?.isInvalid  ?? false) || Boolean(errorText ?? ctx?.errorText);
    const resolvedHelperText = helperText ?? ctx?.helperText;
    const resolvedErrorText  = errorText  ?? ctx?.errorText;

    // Controlled / uncontrolled state
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isChecked = checked !== undefined ? checked : internalChecked;

    // Reanimated shared value: 0 = unchecked, 1 = checked/indeterminate
    const progress = useSharedValue(isChecked || isIndeterminate ? 1 : 0);

    const sz = SIZE_CONFIG[size];

    const handlePress = useCallback(() => {
      if (resolvedIsDisabled) return;
      const next = !isChecked;
      if (checked === undefined) {
        setInternalChecked(next);
      }
      progress.value = withSpring(next || isIndeterminate ? 1 : 0, SPRING_BOUNCE);
      onChange?.(next);
    }, [resolvedIsDisabled, isChecked, checked, isIndeterminate, progress, onChange]);

    // Update progress when controlled value changes
    React.useEffect(() => {
      progress.value = withSpring(isChecked || isIndeterminate ? 1 : 0, SPRING_BOUNCE);
    }, [isChecked, isIndeterminate]);

    // Animated style for the checkmark icon
    const checkmarkStyle = useAnimatedStyle((): ViewStyle => {
      'worklet';
      return {
        opacity:   interpolate(progress.value, [0, 0.5, 1], [0, 0, 1]),
        transform: [
          { scale: interpolate(progress.value, [0, 1], [0.4, 1]) },
        ],
      };
    });

    // Box background and border
    const boxStyle = useMemo((): ViewStyle => {
      const active = isChecked || isIndeterminate;
      return {
        width:        sz.box,
        height:       sz.box,
        borderRadius: sz.borderRadius,
        alignItems:   'center',
        justifyContent: 'center',
        backgroundColor: active ? theme.colors.primary : 'transparent',
        borderWidth:  active ? 0 : 1.5,
        borderColor:  resolvedIsInvalid ? theme.colors.error : theme.colors.border,
      };
    }, [isChecked, isIndeterminate, sz, theme, resolvedIsInvalid]);

    const subText = resolvedIsInvalid && resolvedErrorText
      ? resolvedErrorText
      : resolvedHelperText;

    const boxContent = (
      <View style={boxStyle}>
        <Animated.Text
          style={[
            styles.checkmark,
            { fontSize: sz.fontSize, color: '#fff' },
            checkmarkStyle,
          ]}
          allowFontScaling={false}
        >
          {isIndeterminate ? '−' : '✓'}
        </Animated.Text>
      </View>
    );

    const wrappedBox = glass ? (
      <GlassView elevation={1} borderRadius={sz.borderRadius}>
        {boxContent}
      </GlassView>
    ) : boxContent;

    return (
      <View style={[styles.container, { opacity: resolvedIsDisabled ? 0.45 : 1 }, style]}>
        <Pressable
          onPress={handlePress}
          disabled={resolvedIsDisabled}
          accessible
          accessibilityRole="checkbox"
          accessibilityState={{ checked: isIndeterminate ? 'mixed' : isChecked, disabled: resolvedIsDisabled }}
          accessibilityLabel={label}
          style={styles.row}
        >
          {wrappedBox}
          {label != null && (
            <Text
              style={[styles.label, { fontSize: sz.labelSize, color: theme.colors.text }]}
              allowFontScaling={false}
            >
              {label}
            </Text>
          )}
        </Pressable>
        {subText != null && (
          <Text
            style={[
              styles.subText,
              { color: resolvedIsInvalid ? theme.colors.error : theme.colors.textSecondary },
            ]}
            allowFontScaling={false}
          >
            {subText}
          </Text>
        )}
      </View>
    );
  },
);

Checkbox.displayName = 'Checkbox';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    alignItems:    'center',
  },
  checkmark: {
    fontWeight: '700',
    lineHeight: undefined,
  },
  label: {
    marginLeft: 10,
    fontWeight: '400',
  },
  subText: {
    fontSize:   12,
    marginTop:  4,
    marginLeft: 0,
  },
});
