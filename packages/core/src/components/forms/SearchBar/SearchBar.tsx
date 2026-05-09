import React, { useCallback, useRef, useState } from 'react';
import {
  TextInput as RNTextInput,
  Pressable,
  Text,
  View,
  StyleSheet,
  type NativeSyntheticEvent,
  type TextInputFocusEventData,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useTheme, useIsDark } from '@reactnatively/theme';
import { GlassView } from '@reactnatively/glass';
import { TIMING_FAST } from '@reactnatively/animations';
import type { SearchBarProps, SearchBarSize } from './SearchBar.types';

// ─── Size system ─────────────────────────────────────────────────────────────
interface SizeConfig {
  height:   number;
  fontSize: number;
  px:       number;
  iconSize: number;
}

const SIZE_CONFIG: Record<SearchBarSize, SizeConfig> = {
  sm: { height: 36, fontSize: 13, px: 10, iconSize: 14 },
  md: { height: 44, fontSize: 15, px: 12, iconSize: 16 },
  lg: { height: 52, fontSize: 16, px: 14, iconSize: 18 },
};

// Cancel button animated width (collapsed = 0, expanded = 70)
const CANCEL_WIDTH = 70;

// ─── Component ───────────────────────────────────────────────────────────────
export const SearchBar = React.memo<SearchBarProps>(
  ({
    value,
    defaultValue  = '',
    onChangeText,
    onSearch,
    onCancel,
    placeholder   = 'Search',
    showCancel    = true,
    autoFocus     = false,
    glass         = false,
    size          = 'md',
    style,
  }) => {
    const { theme } = useTheme();
    const isDark    = useIsDark();
    const inputRef  = useRef<RNTextInput>(null);

    const [internalValue, setInternalValue] = useState(defaultValue);
    const currentValue = value !== undefined ? value : internalValue;
    const hasValue     = currentValue.length > 0;

    const sz = SIZE_CONFIG[size];

    // Animated cancel button width: 0 (hidden) → CANCEL_WIDTH (visible)
    const cancelWidth = useSharedValue(0);

    const cancelAnimStyle = useAnimatedStyle((): ViewStyle => {
      'worklet';
      return {
        width:   cancelWidth.value,
        opacity: cancelWidth.value / CANCEL_WIDTH,
      };
    });

    const handleFocus = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        if (showCancel) {
          cancelWidth.value = withTiming(CANCEL_WIDTH, TIMING_FAST);
        }
      },
      [showCancel, cancelWidth],
    );

    const handleBlur = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        // Only collapse cancel if there is no value
        if (!hasValue && showCancel) {
          cancelWidth.value = withTiming(0, TIMING_FAST);
        }
      },
      [hasValue, showCancel, cancelWidth],
    );

    const handleChangeText = useCallback(
      (text: string) => {
        if (value === undefined) {
          setInternalValue(text);
        }
        onChangeText?.(text);
      },
      [value, onChangeText],
    );

    const handleClear = useCallback(() => {
      if (value === undefined) {
        setInternalValue('');
      }
      inputRef.current?.clear();
      onChangeText?.('');
    }, [value, onChangeText]);

    const handleCancel = useCallback(() => {
      inputRef.current?.blur();
      if (value === undefined) {
        setInternalValue('');
      }
      inputRef.current?.clear();
      onChangeText?.('');
      cancelWidth.value = withTiming(0, TIMING_FAST);
      onCancel?.();
    }, [value, onChangeText, cancelWidth, onCancel]);

    const handleSubmit = useCallback((_e: unknown) => {
      onSearch?.(currentValue);
    }, [currentValue, onSearch]);

    const inputBg: ViewStyle = {
      backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
    };

    const innerContent = (
      <View style={[styles.inputRow, { height: sz.height, paddingHorizontal: sz.px }]}>
        {/* Search icon */}
        <Text
          style={[styles.searchIcon, { fontSize: sz.iconSize, color: theme.colors.textMuted }]}
          allowFontScaling={false}
        >
          ⌕
        </Text>

        {/* Text input */}
        <RNTextInput
          ref={inputRef}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textMuted}
          autoFocus={autoFocus}
          returnKeyType="search"
          clearButtonMode="never"
          onFocus={handleFocus as any}
          onBlur={handleBlur as any}
          onChangeText={handleChangeText}
          onSubmitEditing={handleSubmit}
          style={[
            styles.input,
            {
              fontSize:  sz.fontSize,
              color:     theme.colors.text,
            },
          ]}
          accessibilityLabel="Search input"
          
        />

        {/* Clear button */}
        {hasValue && (
          <Pressable
            onPress={handleClear}
            style={styles.clearBtn}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            hitSlop={8}
          >
            <Text
              style={[styles.clearIcon, { color: theme.colors.textMuted }]}
              allowFontScaling={false}
            >
              ✕
            </Text>
          </Pressable>
        )}
      </View>
    );

    const searchContainer = glass ? (
      <GlassView elevation={1} borderRadius={12} style={styles.glassContainer}>
        {innerContent}
      </GlassView>
    ) : (
      <View style={[styles.inputContainer, inputBg, { borderRadius: 12 }]}>
        {innerContent}
      </View>
    );

    return (
      <View style={[styles.outerRow, style]}>
        <View style={styles.searchWrapper}>
          {searchContainer}
        </View>

        {showCancel && (
          <Animated.View style={[styles.cancelWrapper, cancelAnimStyle]}>
            <Pressable
              onPress={handleCancel}
              accessible
              accessibilityRole="button"
              accessibilityLabel="Cancel search"
            >
              <Text
                style={[styles.cancelText, { color: theme.colors.primary }]}
                allowFontScaling={false}
                numberOfLines={1}
              >
                Cancel
              </Text>
            </Pressable>
          </Animated.View>
        )}
      </View>
    );
  },
);

SearchBar.displayName = 'SearchBar';

const styles = StyleSheet.create({
  outerRow:       { flexDirection: 'row', alignItems: 'center' },
  searchWrapper:  { flex: 1 },
  inputContainer: { overflow: 'hidden' },
  glassContainer: {},
  inputRow: {
    flexDirection:  'row',
    alignItems:     'center',
  },
  searchIcon: {
    marginRight:  6,
    includeFontPadding: false,
  },
  input: {
    flex:         1,
    paddingVertical: 0,
  },
  clearBtn: {
    marginLeft:   6,
    alignItems:   'center',
    justifyContent: 'center',
  },
  clearIcon: {
    fontSize:   13,
    fontWeight: '600',
  },
  cancelWrapper: {
    overflow:       'hidden',
    alignItems:     'center',
    justifyContent: 'center',
  },
  cancelText: {
    fontSize:   15,
    fontWeight: '500',
    paddingLeft: 8,
  },
});
