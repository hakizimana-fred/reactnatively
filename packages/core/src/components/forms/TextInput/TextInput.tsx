import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  TextInput as RNTextInput,
  Pressable,
  Text,
  StyleSheet,
  type NativeSyntheticEvent,
  type TextInputFocusEventData,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  interpolateColor,
} from 'react-native-reanimated';
import { useTheme, useIsDark } from '@reactnatively/theme';
import { GlassView } from '@reactnatively/glass';
import { SPRING_SNAPPY } from '@reactnatively/animations';
import { useFormControl } from '../FormControl/form-control-context';
import type { TextInputProps, TextInputSizeConfig } from './TextInput.types';

// ─── Size system ─────────────────────────────────────────────────────────────

const SIZE_CONFIG: Record<string, TextInputSizeConfig> = {
  sm: { height: 40, fontSize: 14, px: 12 },
  md: { height: 52, fontSize: 15, px: 16 },
  lg: { height: 60, fontSize: 16, px: 18 },
};

// ─── Component ───────────────────────────────────────────────────────────────

export const TextInput = React.memo<TextInputProps>(
  ({
    label,
    placeholder,
    helperText,
    errorText,
    leftIcon,
    rightIcon,
    leftAddon,
    rightAddon,
    size        = 'md',
    variant     = 'outline',
    glass       = false,
    isRequired  = false,
    isDisabled  = false,
    isReadOnly  = false,
    isInvalid   = false,
    clearable   = false,
    onClear,
    style,
    inputStyle,
    containerStyle,
    value,
    defaultValue,
    onFocus,
    onBlur,
    onChangeText,
    ...rest
  }) => {
    const { theme }     = useTheme();
    const isDark        = useIsDark();
    const ctx           = useFormControl();

    // Merge FormControl context
    const resolvedLabel       = label       ?? ctx?.label;
    const resolvedHelperText  = helperText  ?? ctx?.helperText;
    const resolvedErrorText   = errorText   ?? ctx?.errorText;
    const resolvedIsRequired  = isRequired  || (ctx?.isRequired ?? false);
    const resolvedIsDisabled  = isDisabled  || (ctx?.isDisabled ?? false);
    const resolvedIsReadOnly  = isReadOnly  || (ctx?.isReadOnly ?? false);
    const resolvedIsInvalid   = isInvalid   || (ctx?.isInvalid ?? false) || Boolean(resolvedErrorText);

    const resolvedVariant = glass ? 'glass' : variant;

    const sz = SIZE_CONFIG[size] ?? SIZE_CONFIG['md']!;

    // Track internal value for the uncontrolled case
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const currentValue = value !== undefined ? value : internalValue;
    const hasValue = currentValue.length > 0;

    // Floating label animation
    const floated  = useSharedValue(hasValue ? 1 : 0);
    const focused  = useSharedValue(0);

    const labelFloated = useAnimatedStyle((): ViewStyle => {
      'worklet';
      return {
        transform: [
          { translateY: interpolate(floated.value, [0, 1], [0, -(sz.height / 2 - 4)]) },
        ],
        // fontSize is not directly animatable via useAnimatedStyle but we handle it via scale
      };
    });

    // We simulate fontSize change via scale; the label sits at 15px base, scales to 12/15
    const labelScaleStyle = useAnimatedStyle((): ViewStyle => {
      'worklet';
      const scale = interpolate(floated.value, [0, 1], [1, 0.8]);
      return {
        transform: [
          { translateY: interpolate(floated.value, [0, 1], [0, -(sz.height / 2 - 4)]) },
          { scale },
        ],
      };
    });

    const labelColorStyle = useAnimatedStyle(() => {
      'worklet';
      const isFocused = focused.value > 0.5;
      return {
        color: interpolateColor(
          floated.value,
          [0, 1],
          [theme.colors.textMuted, isFocused ? theme.colors.primary : theme.colors.textSecondary],
        ),
      } as ViewStyle;
    });

    const inputRef = useRef<RNTextInput>(null);

    const handleFocus = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        focused.value = withSpring(1, SPRING_SNAPPY);
        floated.value = withSpring(1, SPRING_SNAPPY);
        onFocus?.(e);
      },
      [onFocus, focused, floated],
    );

    const handleBlur = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        focused.value = withSpring(0, SPRING_SNAPPY);
        if (!hasValue) {
          floated.value = withSpring(0, SPRING_SNAPPY);
        }
        onBlur?.(e);
      },
      [onBlur, focused, floated, hasValue],
    );

    const handleChangeText = useCallback(
      (text: string) => {
        if (value === undefined) {
          setInternalValue(text);
        }
        if (text.length > 0) {
          floated.value = withSpring(1, SPRING_SNAPPY);
        } else {
          // Only collapse if not focused
          // We check focused.value in a worklet-safe way: we store the focused state
          // The collapse on empty+unfocused is handled in handleBlur already
        }
        onChangeText?.(text);
      },
      [onChangeText, value, floated],
    );

    const handleClear = useCallback(() => {
      if (value === undefined) {
        setInternalValue('');
      }
      floated.value = withSpring(0, SPRING_SNAPPY);
      inputRef.current?.clear();
      onClear?.();
      onChangeText?.('');
    }, [onClear, onChangeText, value, floated]);

    // Border color animation
    const borderAnimStyle = useAnimatedStyle((): ViewStyle => {
      'worklet';
      if (resolvedIsInvalid) return { borderColor: theme.colors.error };
      return {
        borderColor: interpolateColor(
          focused.value,
          [0, 1],
          [theme.colors.border, theme.colors.primary],
        ),
      };
    });

    // Container base styles
    const containerBase = useMemo((): ViewStyle => {
      const base: ViewStyle = {
        height:       resolvedLabel ? sz.height + 8 : sz.height,
        borderRadius: resolvedVariant === 'underline' ? 0 : 12,
        opacity:      resolvedIsDisabled ? 0.5 : 1,
        overflow:     'visible',
      };

      if (resolvedVariant === 'outline') {
        return {
          ...base,
          borderWidth:  1.5,
          borderColor:  resolvedIsInvalid ? theme.colors.error : theme.colors.border,
        };
      }
      if (resolvedVariant === 'filled') {
        return {
          ...base,
          backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
        };
      }
      if (resolvedVariant === 'underline') {
        return {
          ...base,
          borderBottomWidth: 1.5,
          borderBottomColor: resolvedIsInvalid ? theme.colors.error : theme.colors.border,
        };
      }
      // glass handled separately
      return base;
    }, [resolvedVariant, sz.height, resolvedLabel, resolvedIsDisabled, resolvedIsInvalid, isDark, theme]);

    const rnInputStyle = useMemo((): TextStyle => ({
      flex:            1,
      fontSize:        sz.fontSize,
      color:           theme.colors.text,
      paddingTop:      resolvedLabel ? sz.height * 0.35 : 0,
      // Suppress default underline on Android
      textAlignVertical: 'center',
    }), [sz.fontSize, sz.px, theme.colors.text, resolvedLabel, sz.height]);

    const showClear = clearable && hasValue && !resolvedIsDisabled && !resolvedIsReadOnly;

    const innerContent = (
      <View style={styles.row}>
        {leftAddon != null && <View style={styles.addon}>{leftAddon}</View>}
        {leftIcon != null && (
          <View style={[styles.iconContainer, { marginLeft: sz.px }]}>{leftIcon}</View>
        )}
        <View style={[styles.inputWrapper, { paddingHorizontal: leftIcon || leftAddon ? 8 : sz.px }]}>
          {resolvedLabel != null && (
            <Animated.Text
              style={[styles.floatingLabel, labelScaleStyle, labelColorStyle]}
              allowFontScaling={false}
              onPress={() => inputRef.current?.focus()}
            >
              {resolvedLabel}
              {resolvedIsRequired && (
                <Text style={{ color: theme.colors.error }}> *</Text>
              )}
            </Animated.Text>
          )}
          <RNTextInput
            ref={inputRef}
            value={value}
            defaultValue={defaultValue}
            placeholder={resolvedLabel ? undefined : placeholder}
            placeholderTextColor={theme.colors.textMuted}
            editable={!resolvedIsDisabled && !resolvedIsReadOnly}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={handleChangeText}
            style={[rnInputStyle, inputStyle]}
            accessibilityLabel={resolvedLabel}
            accessibilityState={{
              disabled: resolvedIsDisabled,
            }}
            {...(rest as any)}
          />
        </View>
        {showClear && (
          <Pressable
            onPress={handleClear}
            style={[styles.iconContainer, { marginRight: 8 }]}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Clear input"
          >
            <Text style={[styles.clearIcon, { color: theme.colors.textMuted }]}>✕</Text>
          </Pressable>
        )}
        {rightIcon != null && !showClear && (
          <View style={[styles.iconContainer, { marginRight: sz.px }]}>{rightIcon}</View>
        )}
        {rightAddon != null && <View style={styles.addon}>{rightAddon}</View>}
      </View>
    );

    const subText = resolvedIsInvalid && resolvedErrorText ? resolvedErrorText : resolvedHelperText;

    if (resolvedVariant === 'glass') {
      return (
        <View style={[styles.outerContainer, containerStyle, style]}>
          <GlassView
            elevation={1}
            variant="surface"
            borderRadius={12}
            style={[{ opacity: resolvedIsDisabled ? 0.5 : 1 }]}
          >
            {innerContent}
          </GlassView>
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
    }

    return (
      <View style={[styles.outerContainer, containerStyle, style]}>
        <Animated.View
          style={[
            containerBase,
            (resolvedVariant === 'outline' || resolvedVariant === 'underline') && borderAnimStyle,
            styles.inputContainer,
          ]}
        >
          {innerContent}
        </Animated.View>
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

TextInput.displayName = 'TextInput';

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
  },
  inputContainer: {
    overflow: 'hidden',
  },
  row: {
    flex:           1,
    flexDirection:  'row',
    alignItems:     'center',
  },
  inputWrapper: {
    flex:           1,
    justifyContent: 'center',
  },
  floatingLabel: {
    position:   'absolute',
    left:       0,
    fontSize:   15,
    fontWeight: '400',
    transformOrigin: 'left center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems:     'center',
    minWidth:       24,
  },
  addon: {
    justifyContent: 'center',
    alignItems:     'center',
    paddingHorizontal: 8,
  },
  clearIcon: {
    fontSize:   14,
    fontWeight: '600',
  },
  subText: {
    fontSize:  12,
    marginTop: 4,
  },
});
