import React, { useCallback, useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useTheme, useIsDark } from '@reactnatively/theme';
import { GlassView } from '@reactnatively/glass';
import { useEntranceAnimation, SPRING_SNAPPY } from '@reactnatively/animations';
import type { OTPInputProps } from './OTPInput.types';

// ─── Single box ───────────────────────────────────────────────────────────────

interface BoxProps {
  char:       string;
  isFocused:  boolean;
  isInvalid:  boolean;
  glass:      boolean;
  index:      number;
}

const OTPBox = React.memo<BoxProps>(({ char, isFocused, isInvalid, glass, index }) => {
  const { theme } = useTheme();
  const isDark    = useIsDark();

  const entranceStyle = useEntranceAnimation({
    variant: 'scale',
    delay:   index * 50,
  });

  const focused = useSharedValue(isFocused ? 1 : 0);

  // Keep shared value in sync with prop
  if (isFocused) {
    focused.value = 1;
  } else {
    focused.value = 0;
  }

  const borderStyle = useAnimatedStyle((): ViewStyle => {
    'worklet';
    return {
      borderColor: isInvalid
        ? theme.colors.error
        : focused.value > 0.5
          ? theme.colors.primary
          : theme.colors.border,
      borderWidth: isFocused ? 2 : 1.5,
    };
  });

  const filled    = char.length > 0;
  const fillColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.04)';

  if (glass) {
    return (
      <Animated.View style={[styles.boxWrapper, entranceStyle]}>
        <GlassView
          elevation={1}
          borderRadius={12}
          style={[
            styles.box,
            isInvalid && { borderColor: theme.colors.error, borderWidth: 2 },
            isFocused && { borderColor: theme.colors.primary, borderWidth: 2 },
          ]}
        >
          <Text style={[styles.char, { color: theme.colors.text }]}>{char}</Text>
        </GlassView>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[styles.boxWrapper, entranceStyle]}>
      <Animated.View
        style={[
          styles.box,
          { backgroundColor: filled ? fillColor : 'transparent' },
          borderStyle,
        ]}
      >
        <Text style={[styles.char, { color: theme.colors.text }]}>{char}</Text>
      </Animated.View>
    </Animated.View>
  );
});

OTPBox.displayName = 'OTPBox';

// ─── Main component ───────────────────────────────────────────────────────────

export const OTPInput = React.memo<OTPInputProps>(
  ({
    length      = 6,
    value:      valueProp,
    onChange,
    onComplete,
    type        = 'numeric',
    glass       = false,
    isInvalid   = false,
    isDisabled  = false,
    autoFocus   = false,
    style,
  }) => {
    const { theme } = useTheme();

    const isControlled   = valueProp !== undefined;
    const [internal, setInternal] = useState('');
    const currentValue   = isControlled ? valueProp! : internal;

    // Which box appears focused: derived from cursor position
    const focusedIndex = Math.min(currentValue.length, length - 1);

    const inputRef = useRef<TextInput>(null);

    const handlePress = useCallback(() => {
      if (!isDisabled) inputRef.current?.focus();
    }, [isDisabled]);

    const handleChange = useCallback(
      (text: string) => {
        // Strip to allowed chars
        const filtered = type === 'numeric'
          ? text.replace(/[^0-9]/g, '')
          : text.replace(/[^a-zA-Z0-9]/g, '');

        const next = filtered.slice(0, length);

        if (!isControlled) setInternal(next);
        onChange?.(next);
        if (next.length === length) {
          onComplete?.(next);
        }
      },
      [isControlled, length, type, onChange, onComplete],
    );

    return (
      <Pressable
        onPress={handlePress}
        style={[styles.container, style]}
        accessible
        accessibilityRole="none"
        accessibilityLabel={`OTP input, ${length} digits`}
        accessibilityState={{ disabled: isDisabled }}
      >
        {/* Hidden real input */}
        <TextInput
          ref={inputRef}
          value={currentValue}
          onChangeText={handleChange}
          keyboardType={type === 'numeric' ? 'number-pad' : 'default'}
          maxLength={length}
          autoFocus={autoFocus}
          editable={!isDisabled}
          caretHidden
          style={styles.hiddenInput}
          importantForAccessibility="no"
          autoComplete="one-time-code"
          textContentType="oneTimeCode"
        />

        {/* Visual boxes */}
        <View style={styles.boxes} pointerEvents="none">
          {Array.from({ length }, (_, i) => (
            <OTPBox
              key={i}
              index={i}
              char={currentValue[i] ?? ''}
              isFocused={i === focusedIndex}
              isInvalid={isInvalid}
              glass={glass}
            />
          ))}
        </View>
      </Pressable>
    );
  },
);

OTPInput.displayName = 'OTPInput';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  hiddenInput: {
    position: 'absolute',
    opacity:  0,
    width:    0,
    height:   0,
  } as TextStyle,
  boxes: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:            8,
  } as ViewStyle,
  boxWrapper: {
    flex: 1,
  } as ViewStyle,
  box: {
    height:         56,
    borderRadius:   12,
    alignItems:     'center',
    justifyContent: 'center',
    borderWidth:    1.5,
    borderColor:    'transparent',
  } as ViewStyle,
  char: {
    fontSize:   22,
    fontWeight: '600',
    lineHeight: 28,
  } as TextStyle,
});
