import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  TextInput as RNTextInput,
  Text,
  StyleSheet,
  type NativeSyntheticEvent,
  type TextInputContentSizeChangeEventData,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import { useTheme, useIsDark } from 'reactnatively-theme';
import { GlassView } from 'reactnatively-glass';
import { SPRING_SNAPPY } from 'reactnatively-animations';
import { useFormControl } from '../FormControl/form-control-context';
import type { TextAreaProps } from './TextArea.types';

// Approximate line height for minHeight calculation
const LINE_HEIGHT = 22;

export const TextArea = React.memo<TextAreaProps>(
  ({
    label,
    helperText,
    errorText,
    size         = 'md',
    variant      = 'outline',
    glass        = false,
    isRequired   = false,
    isDisabled   = false,
    isReadOnly   = false,
    isInvalid    = false,
    numberOfLines = 4,
    autoGrow     = false,
    maxHeight,
    style,
    inputStyle,
    containerStyle,
    value,
    defaultValue,
    onFocus,
    onBlur,
    onChangeText,
    onContentSizeChange,
    ...rest
  }) => {
    const { theme } = useTheme();
    const isDark    = useIsDark();
    const ctx       = useFormControl();

    const resolvedLabel      = label      ?? ctx?.label;
    const resolvedHelperText = helperText ?? ctx?.helperText;
    const resolvedErrorText  = errorText  ?? ctx?.errorText;
    const resolvedIsRequired = isRequired || (ctx?.isRequired ?? false);
    const resolvedIsDisabled = isDisabled || (ctx?.isDisabled ?? false);
    const resolvedIsReadOnly = isReadOnly || (ctx?.isReadOnly ?? false);
    const resolvedIsInvalid  = isInvalid  || (ctx?.isInvalid  ?? false) || Boolean(resolvedErrorText);

    const resolvedVariant = glass ? 'glass' : variant;

    const minHeight = numberOfLines * LINE_HEIGHT + 24; // padding
    const [contentHeight, setContentHeight] = useState(minHeight);

    const focused = useSharedValue(0);

    const handleFocus = useCallback(
      (e: NativeSyntheticEvent<unknown>) => {
        focused.value = withSpring(1, SPRING_SNAPPY);
        (onFocus as ((e: NativeSyntheticEvent<unknown>) => void) | undefined)?.(e);
      },
      [onFocus, focused],
    );

    const handleBlur = useCallback(
      (e: NativeSyntheticEvent<unknown>) => {
        focused.value = withSpring(0, SPRING_SNAPPY);
        (onBlur as ((e: NativeSyntheticEvent<unknown>) => void) | undefined)?.(e);
      },
      [onBlur, focused],
    );

    const handleContentSizeChange = useCallback(
      (e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
        if (autoGrow) {
          const newHeight = e.nativeEvent.contentSize.height + 24;
          const capped = maxHeight ? Math.min(newHeight, maxHeight) : newHeight;
          setContentHeight(Math.max(capped, minHeight));
        }
        onContentSizeChange?.(e);
      },
      [autoGrow, maxHeight, minHeight, onContentSizeChange],
    );

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

    const containerBase = useMemo((): ViewStyle => {
      const h = autoGrow ? contentHeight : minHeight;
      const base: ViewStyle = {
        minHeight:    h,
        borderRadius: resolvedVariant === 'underline' ? 0 : 12,
        opacity:      resolvedIsDisabled ? 0.5 : 1,
        overflow:     'hidden',
      };

      if (resolvedVariant === 'outline') {
        return { ...base, borderWidth: 1.5, borderColor: resolvedIsInvalid ? theme.colors.error : theme.colors.border };
      }
      if (resolvedVariant === 'filled') {
        return { ...base, backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' };
      }
      if (resolvedVariant === 'underline') {
        return { ...base, borderBottomWidth: 1.5, borderBottomColor: resolvedIsInvalid ? theme.colors.error : theme.colors.border };
      }
      return base;
    }, [resolvedVariant, autoGrow, contentHeight, minHeight, resolvedIsDisabled, resolvedIsInvalid, isDark, theme]);

    const rnInputStyle = useMemo((): TextStyle => ({
      flex:              1,
      fontSize:          15,
      color:             theme.colors.text,
      padding:           12,
      textAlignVertical: 'top',
    }), [theme.colors.text]);

    const subText = resolvedIsInvalid && resolvedErrorText ? resolvedErrorText : resolvedHelperText;

    const inputEl = (
      <RNTextInput
        value={value}
        defaultValue={defaultValue}
        multiline
        numberOfLines={numberOfLines}
        editable={!resolvedIsDisabled && !resolvedIsReadOnly}
        onFocus={handleFocus as any}
        onBlur={handleBlur as any}
        onChangeText={onChangeText}
        onContentSizeChange={handleContentSizeChange}
        placeholderTextColor={theme.colors.textMuted}
        scrollEnabled={!autoGrow}
        style={[rnInputStyle, inputStyle]}
        accessibilityLabel={resolvedLabel}
        accessibilityState={{ disabled: resolvedIsDisabled }}
        {...rest}
      />
    );

    return (
      <View style={[styles.outerContainer, containerStyle, style]}>
        {resolvedLabel != null && (
          <Text
            style={[styles.label, { color: theme.colors.text }]}
            allowFontScaling={false}
          >
            {resolvedLabel}
            {resolvedIsRequired && (
              <Text style={{ color: theme.colors.error }}> *</Text>
            )}
          </Text>
        )}

        {resolvedVariant === 'glass' ? (
          <GlassView
            elevation={1}
            variant="surface"
            borderRadius={12}
            style={{ opacity: resolvedIsDisabled ? 0.5 : 1 }}
          >
            {inputEl}
          </GlassView>
        ) : (
          <Animated.View
            style={[
              containerBase,
              (resolvedVariant === 'outline' || resolvedVariant === 'underline') && borderAnimStyle,
            ]}
          >
            {inputEl}
          </Animated.View>
        )}

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

TextArea.displayName = 'TextArea';

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
  },
  label: {
    fontSize:     14,
    fontWeight:   '600',
    marginBottom: 6,
  },
  subText: {
    fontSize:  12,
    marginTop: 4,
  },
});
