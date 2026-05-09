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
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme, useIsDark } from '@reactnatively/theme';
import { GlassView } from '@reactnatively/glass';
import { SPRING_SNAPPY } from '@reactnatively/animations';
import type { MultiSelectProps } from './MultiSelect.types';
import type { SelectOption } from '../Select/Select.types';

// ─── Chip ─────────────────────────────────────────────────────────────────────

interface ChipProps {
  label:    string;
  onRemove: () => void;
  theme:    ReturnType<typeof useTheme>['theme'];
}

const Chip = React.memo<ChipProps>(({ label, onRemove, theme }) => (
  <View style={[styles.chip, { backgroundColor: theme.colors.primaryMuted }]}>
    <Text style={[styles.chipLabel, { color: theme.colors.primary }]} numberOfLines={1}>
      {label}
    </Text>
    <Pressable
      onPress={onRemove}
      hitSlop={{ top: 6, bottom: 6, left: 4, right: 4 }}
      accessibilityRole="button"
      accessibilityLabel={`Remove ${label}`}
    >
      <Text style={[styles.chipDismiss, { color: theme.colors.primary }]}>✕</Text>
    </Pressable>
  </View>
));

Chip.displayName = 'Chip';

// ─── Option row ───────────────────────────────────────────────────────────────

interface OptionRowProps {
  option:      SelectOption;
  isSelected:  boolean;
  isDisabled:  boolean;
  onToggle:    (value: string) => void;
  theme:       ReturnType<typeof useTheme>['theme'];
}

const OptionRow = React.memo<OptionRowProps>(({ option, isSelected, isDisabled, onToggle, theme }) => {
  const handlePress = useCallback(() => {
    if (!option.disabled && !isDisabled) onToggle(option.value);
  }, [option, isDisabled, onToggle]);

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.optionRow,
        pressed && { backgroundColor: theme.colors.neutralSubtle },
        (option.disabled || isDisabled) && { opacity: 0.4 },
      ]}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isSelected, disabled: option.disabled || isDisabled }}
    >
      {/* Checkbox visual */}
      <View
        style={[
          styles.checkbox,
          {
            borderColor:     isSelected ? theme.colors.primary : theme.colors.border,
            backgroundColor: isSelected ? theme.colors.primary : 'transparent',
          },
        ]}
      >
        {isSelected && (
          <Text style={styles.checkboxTick}>✓</Text>
        )}
      </View>

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
    </Pressable>
  );
});

OptionRow.displayName = 'OptionRow';

// ─── Main component ───────────────────────────────────────────────────────────

export const MultiSelect = React.memo<MultiSelectProps>(
  ({
    options,
    value:          valueProp,
    defaultValue,
    onChange,
    placeholder     = 'Select options',
    maxSelections,
    glass           = false,
    isDisabled      = false,
    isInvalid       = false,
    style,
  }) => {
    const { theme } = useTheme();
    const isDark    = useIsDark();

    const isControlled = valueProp !== undefined;
    const [internal, setInternal] = useState<string[]>(defaultValue ?? []);
    const currentValues = isControlled ? valueProp! : internal;

    const [open, setOpen] = useState(false);

    const chevronRot = useSharedValue(0);
    const slideAnim  = useRef(new RNAnimated.Value(300)).current;

    const openSheet = useCallback(() => {
      if (isDisabled) return;
      setOpen(true);
      chevronRot.value = withSpring(1, SPRING_SNAPPY);
      RNAnimated.spring(slideAnim, {
        toValue:         0,
        useNativeDriver: true,
        damping:         20,
        stiffness:       200,
      }).start();
    }, [isDisabled, chevronRot, slideAnim]);

    const closeSheet = useCallback(() => {
      chevronRot.value = withSpring(0, SPRING_SNAPPY);
      RNAnimated.timing(slideAnim, {
        toValue:         300,
        duration:        200,
        useNativeDriver: true,
      }).start(() => setOpen(false));
    }, [chevronRot, slideAnim]);

    const handleToggle = useCallback(
      (val: string) => {
        let next: string[];
        if (currentValues.includes(val)) {
          next = currentValues.filter(v => v !== val);
        } else {
          if (maxSelections != null && currentValues.length >= maxSelections) return;
          next = [...currentValues, val];
        }
        if (!isControlled) setInternal(next);
        onChange?.(next);
      },
      [currentValues, isControlled, maxSelections, onChange],
    );

    const handleRemoveChip = useCallback(
      (val: string) => {
        const next = currentValues.filter(v => v !== val);
        if (!isControlled) setInternal(next);
        onChange?.(next);
      },
      [currentValues, isControlled, onChange],
    );

    const chevronStyle = useAnimatedStyle((): ViewStyle => {
      'worklet';
      return {
        transform: [{ rotate: `${chevronRot.value * 180}deg` }],
      };
    });

    const selectedOptions = options.filter(o => currentValues.includes(o.value));

    const triggerContent = (
      <Pressable
        onPress={openSheet}
        style={[styles.triggerRow]}
        accessibilityRole="combobox"
        accessibilityState={{ expanded: open, disabled: isDisabled }}
        accessibilityLabel={placeholder}
      >
        <View style={styles.chipsContainer}>
          {selectedOptions.length === 0 ? (
            <Text style={[styles.placeholder, { color: theme.colors.textMuted }]}>
              {placeholder}
            </Text>
          ) : (
            selectedOptions.map(opt => (
              <Chip
                key={opt.value}
                label={opt.label}
                onRemove={() => handleRemoveChip(opt.value)}
                theme={theme}
              />
            ))
          )}
        </View>
        <Animated.View style={chevronStyle}>
          <Text style={[styles.chevron, { color: theme.colors.textSecondary }]}>›</Text>
        </Animated.View>
      </Pressable>
    );

    const triggerBorder: ViewStyle = {
      borderColor:  isInvalid ? theme.colors.error : theme.colors.border,
      borderWidth:  1.5,
      borderRadius: 12,
      minHeight:    52,
      opacity:      isDisabled ? 0.5 : 1,
    };

    return (
      <View style={[styles.wrapper, style]}>
        {glass ? (
          <GlassView elevation={1} borderRadius={12} style={{ opacity: isDisabled ? 0.5 : 1 }}>
            {triggerContent}
          </GlassView>
        ) : (
          <View style={triggerBorder}>
            {triggerContent}
          </View>
        )}

        <Modal
          visible={open}
          transparent
          animationType="none"
          onRequestClose={closeSheet}
          statusBarTranslucent
        >
          <Pressable style={styles.backdrop} onPress={closeSheet}>
            <View style={styles.backdropFill} />
          </Pressable>

          <RNAnimated.View
            style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}
          >
            {glass ? (
              <GlassView elevation={1} borderRadius={20} style={styles.panelFill}>
                <View style={styles.handle} />
                {maxSelections != null && (
                  <Text style={[styles.limitText, { color: theme.colors.textSecondary }]}>
                    {currentValues.length}/{maxSelections} selected
                  </Text>
                )}
                <ScrollView
                  style={styles.optionScroll}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                >
                  {options.map(opt => (
                    <OptionRow
                      key={opt.value}
                      option={opt}
                      isSelected={currentValues.includes(opt.value)}
                      isDisabled={
                        isDisabled ||
                        (maxSelections != null &&
                          currentValues.length >= maxSelections &&
                          !currentValues.includes(opt.value))
                      }
                      onToggle={handleToggle}
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
                    backgroundColor:     isDark ? theme.colors.surface : '#fff',
                    borderTopLeftRadius:  20,
                    borderTopRightRadius: 20,
                  },
                ]}
              >
                <View style={styles.handle} />
                {maxSelections != null && (
                  <Text style={[styles.limitText, { color: theme.colors.textSecondary }]}>
                    {currentValues.length}/{maxSelections} selected
                  </Text>
                )}
                <ScrollView
                  style={styles.optionScroll}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                >
                  {options.map(opt => (
                    <OptionRow
                      key={opt.value}
                      option={opt}
                      isSelected={currentValues.includes(opt.value)}
                      isDisabled={
                        isDisabled ||
                        (maxSelections != null &&
                          currentValues.length >= maxSelections &&
                          !currentValues.includes(opt.value))
                      }
                      onToggle={handleToggle}
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

MultiSelect.displayName = 'MultiSelect';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  } as ViewStyle,
  triggerRow: {
    flexDirection:  'row',
    alignItems:     'center',
    paddingHorizontal: 12,
    paddingVertical:   8,
    minHeight:      52,
    flexWrap:       'nowrap',
  } as ViewStyle,
  chipsContainer: {
    flex:           1,
    flexDirection:  'row',
    flexWrap:       'wrap',
    gap:            6,
    alignItems:     'center',
  } as ViewStyle,
  placeholder: {
    fontSize: 15,
  } as TextStyle,
  chip: {
    flexDirection:   'row',
    alignItems:      'center',
    paddingVertical:  4,
    paddingLeft:     10,
    paddingRight:    6,
    borderRadius:    20,
    gap:             4,
  } as ViewStyle,
  chipLabel: {
    fontSize:   13,
    fontWeight: '500',
    maxWidth:   100,
  } as TextStyle,
  chipDismiss: {
    fontSize:   11,
    fontWeight: '700',
  } as TextStyle,
  chevron: {
    fontSize:   22,
    fontWeight: '300',
    marginLeft: 4,
  } as TextStyle,
  backdrop: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
  } as ViewStyle,
  backdropFill: {
    ...StyleSheet.absoluteFill,
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
  limitText: {
    fontSize:         13,
    textAlign:        'center',
    paddingBottom:     8,
  } as TextStyle,
  optionScroll: {
    maxHeight: 400,
  },
  optionRow: {
    flexDirection:     'row',
    alignItems:        'center',
    paddingVertical:   14,
    paddingHorizontal: 20,
    gap:               14,
  } as ViewStyle,
  checkbox: {
    width:          22,
    height:         22,
    borderRadius:   6,
    borderWidth:    1.5,
    alignItems:     'center',
    justifyContent: 'center',
  } as ViewStyle,
  checkboxTick: {
    color:      '#fff',
    fontSize:   13,
    fontWeight: '700',
    lineHeight: 16,
  } as TextStyle,
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
});
