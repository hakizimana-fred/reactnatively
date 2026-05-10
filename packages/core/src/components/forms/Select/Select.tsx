import React, { useCallback, useRef, useState } from 'react';
import {
  Animated as RNAnimated,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useTheme, useIsDark } from 'reactnatively-theme';
import { GlassView } from 'reactnatively-glass';
import { SPRING_SNAPPY, TIMING_FAST } from 'reactnatively-animations';
import type { SelectProps, SelectOption } from './Select.types';

// ─── Size config ──────────────────────────────────────────────────────────────

const SIZE_HEIGHT: Record<string, number> = { sm: 40, md: 52, lg: 60 };
const SIZE_FONT:   Record<string, number> = { sm: 13, md: 15, lg: 16 };
const SIZE_PX:     Record<string, number> = { sm: 12, md: 16, lg: 18 };

// ─── Option row ───────────────────────────────────────────────────────────────

interface OptionRowProps {
  option:     SelectOption;
  isSelected: boolean;
  onSelect:   (value: string) => void;
  theme:      ReturnType<typeof useTheme>['theme'];
}

const OptionRow = React.memo<OptionRowProps>(({ option, isSelected, onSelect, theme }) => {
  const handlePress = useCallback(() => {
    if (!option.disabled) onSelect(option.value);
  }, [option, onSelect]);

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.optionRow,
        pressed && { backgroundColor: theme.colors.neutralSubtle },
        option.disabled && { opacity: 0.4 },
      ]}
      accessibilityRole="menuitem"
      accessibilityState={{ selected: isSelected, disabled: option.disabled }}
    >
      <View style={styles.optionContent}>
        <Text style={[styles.optionLabel, { color: theme.colors.text }]}>
          {option.label}
        </Text>
        {option.description != null && (
          <Text style={[styles.optionDesc, { color: theme.colors.textSecondary }]}>
            {option.description}
          </Text>
        )}
      </View>
      {isSelected && (
        <Text style={[styles.checkmark, { color: theme.colors.primary }]}>✓</Text>
      )}
    </Pressable>
  );
});

OptionRow.displayName = 'OptionRow';

// ─── Main component ───────────────────────────────────────────────────────────

export const Select = React.memo<SelectProps>(
  ({
    options,
    value:        valueProp,
    defaultValue,
    onChange,
    placeholder   = 'Select an option',
    label,
    helperText,
    errorText,
    size          = 'md',
    glass         = false,
    isDisabled    = false,
    isInvalid     = false,
    style,
  }) => {
    const { theme } = useTheme();
    const isDark    = useIsDark();

    const isControlled  = valueProp !== undefined;
    const [internal, setInternal] = useState(defaultValue ?? '');
    const currentValue  = isControlled ? valueProp! : internal;

    const [open, setOpen] = useState(false);

    // Chevron rotation
    const chevronRot = useSharedValue(0);

    // Sheet slide animation (RN Animated for translateY)
    const slideAnim = useRef(new RNAnimated.Value(300)).current;

    const openSheet = useCallback(() => {
      if (isDisabled) return;
      setOpen(true);
      chevronRot.value = withSpring(1, SPRING_SNAPPY);
      RNAnimated.spring(slideAnim, {
        toValue:        0,
        useNativeDriver: true,
        damping:        20,
        stiffness:      200,
      }).start();
    }, [isDisabled, chevronRot, slideAnim]);

    const closeSheet = useCallback(() => {
      chevronRot.value = withSpring(0, SPRING_SNAPPY);
      RNAnimated.timing(slideAnim, {
        toValue:        300,
        duration:       200,
        useNativeDriver: true,
      }).start(() => setOpen(false));
    }, [chevronRot, slideAnim]);

    const handleSelect = useCallback(
      (val: string) => {
        if (!isControlled) setInternal(val);
        onChange?.(val);
        closeSheet();
      },
      [isControlled, onChange, closeSheet],
    );

    const chevronStyle = useAnimatedStyle((): ViewStyle => {
      'worklet';
      const deg = chevronRot.value * 180;
      return {
        transform: [{ rotate: `${deg}deg` }],
      };
    });

    const selectedOption = options.find(o => o.value === currentValue);
    const displayLabel   = selectedOption?.label ?? '';

    const height = SIZE_HEIGHT[size] ?? SIZE_HEIGHT['md']!;
    const fs     = SIZE_FONT[size]   ?? SIZE_FONT['md']!;
    const px     = SIZE_PX[size]     ?? SIZE_PX['md']!;

    const resolvedIsInvalid = isInvalid || Boolean(errorText);
    const subText = resolvedIsInvalid && errorText ? errorText : helperText;

    // Trigger
    const triggerBorder: ViewStyle = {
      borderColor: resolvedIsInvalid ? theme.colors.error : theme.colors.border,
      borderWidth: 1.5,
      borderRadius: 12,
      height,
      opacity: isDisabled ? 0.5 : 1,
    };

    const triggerInner = (
      <Pressable
        onPress={openSheet}
        style={[styles.triggerRow, { paddingHorizontal: px }]}
        accessibilityRole="combobox"
        accessibilityState={{ expanded: open, disabled: isDisabled }}
        accessibilityLabel={label ?? placeholder}
      >
        <Text
          style={[
            styles.triggerText,
            {
              fontSize: fs,
              color: displayLabel ? theme.colors.text : theme.colors.textMuted,
              flex: 1,
            },
          ]}
          numberOfLines={1}
        >
          {displayLabel || placeholder}
        </Text>
        <Animated.View style={chevronStyle}>
          <Text style={[styles.chevron, { color: theme.colors.textSecondary }]}>›</Text>
        </Animated.View>
      </Pressable>
    );

    return (
      <View style={[styles.wrapper, style]}>
        {label != null && (
          <Text style={[styles.label, { color: theme.colors.text }]}>{label}</Text>
        )}

        {glass ? (
          <GlassView elevation={1} borderRadius={12} style={{ opacity: isDisabled ? 0.5 : 1 }}>
            {triggerInner}
          </GlassView>
        ) : (
          <View style={triggerBorder}>
            {triggerInner}
          </View>
        )}

        {subText != null && (
          <Text
            style={[
              styles.subText,
              { color: resolvedIsInvalid ? theme.colors.error : theme.colors.textSecondary },
            ]}
          >
            {subText}
          </Text>
        )}

        <Modal
          visible={open}
          transparent
          animationType="none"
          onRequestClose={closeSheet}
          statusBarTranslucent
        >
          {/* Backdrop */}
          <Pressable style={styles.backdrop} onPress={closeSheet}>
            <View style={styles.backdropFill} />
          </Pressable>

          {/* Sheet */}
          <RNAnimated.View
            style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}
          >
            {glass ? (
              <GlassView elevation={1} borderRadius={20} style={styles.panelFill}>
                <View style={styles.handle} />
                <ScrollView
                  style={styles.optionScroll}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                >
                  {options.map(opt => (
                    <OptionRow
                      key={opt.value}
                      option={opt}
                      isSelected={opt.value === currentValue}
                      onSelect={handleSelect}
                      theme={theme}
                    />
                  ))}
                </ScrollView>
              </GlassView>
            ) : (
              <View
                style={[
                  styles.panelFill,
                  {
                    backgroundColor: isDark ? theme.colors.surface : '#fff',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                  },
                ]}
              >
                <View style={styles.handle} />
                <ScrollView
                  style={styles.optionScroll}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                >
                  {options.map(opt => (
                    <OptionRow
                      key={opt.value}
                      option={opt}
                      isSelected={opt.value === currentValue}
                      onSelect={handleSelect}
                      theme={theme}
                    />
                  ))}
                </ScrollView>
              </View>
            )}
          </RNAnimated.View>
        </Modal>
      </View>
    );
  },
);

Select.displayName = 'Select';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  } as ViewStyle,
  label: {
    fontSize:     14,
    fontWeight:   '600',
    marginBottom: 6,
  } as TextStyle,
  subText: {
    fontSize:  12,
    marginTop: 4,
  } as TextStyle,
  triggerRow: {
    flex:           1,
    flexDirection:  'row',
    alignItems:     'center',
  } as ViewStyle,
  triggerText: {
    fontWeight: '400',
  } as TextStyle,
  chevron: {
    fontSize:   22,
    fontWeight: '300',
    marginLeft: 4,
  } as TextStyle,
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  } as ViewStyle,
  backdropFill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  } as ViewStyle,
  sheet: {
    position:  'absolute',
    bottom:    0,
    left:      0,
    right:     0,
    maxHeight: '70%',
  } as ViewStyle,
  panelFill: {
    overflow: 'hidden',
  } as ViewStyle,
  handle: {
    alignSelf:       'center',
    width:           40,
    height:          4,
    borderRadius:    2,
    backgroundColor: 'rgba(120,120,128,0.3)',
    marginVertical:  12,
  } as ViewStyle,
  optionScroll: {
    maxHeight: 400,
  },
  optionRow: {
    flexDirection:  'row',
    alignItems:     'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  } as ViewStyle,
  optionContent: {
    flex: 1,
  } as ViewStyle,
  optionLabel: {
    fontSize:   16,
    fontWeight: '400',
  } as TextStyle,
  optionDesc: {
    fontSize:  13,
    marginTop: 2,
  } as TextStyle,
  checkmark: {
    fontSize:   18,
    fontWeight: '600',
    marginLeft: 12,
  } as TextStyle,
});
