import React, { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioGroupContext } from './radio-group-context';
import type { RadioGroupProps } from './Radio.types';

export const RadioGroup = React.memo<RadioGroupProps>(
  ({
    value,
    defaultValue = '',
    onChange,
    direction    = 'column',
    children,
    isDisabled   = false,
    isInvalid    = false,
    size         = 'md',
    style,
  }) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const resolvedValue = value !== undefined ? value : internalValue;

    const handleChange = useMemo(
      () => (v: string) => {
        if (value === undefined) {
          setInternalValue(v);
        }
        onChange?.(v);
      },
      [value, onChange],
    );

    const ctx = useMemo(
      () => ({
        value:      resolvedValue,
        onChange:   handleChange,
        isDisabled,
        isInvalid,
        size,
      }),
      [resolvedValue, handleChange, isDisabled, isInvalid, size],
    );

    return (
      <RadioGroupContext.Provider value={ctx}>
        <View
          style={[
            styles.container,
            direction === 'row' ? styles.row : styles.column,
            style,
          ]}
          accessible
          accessibilityRole="radiogroup"
        >
          {children}
        </View>
      </RadioGroupContext.Provider>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';

const styles = StyleSheet.create({
  container: {},
  row:    { flexDirection: 'row',    flexWrap: 'wrap', gap: 12 },
  column: { flexDirection: 'column', gap: 10 },
});
