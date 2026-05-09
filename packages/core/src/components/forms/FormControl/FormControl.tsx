import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@reactnatively/theme';
import { useId } from '@reactnatively/hooks';
import { FormControlContext } from './form-control-context';
import type { FormControlContextValue } from './form-control-context';
import type { FormControlProps } from './FormControl.types';

export const FormControl = React.memo<FormControlProps>(
  ({
    id: idProp,
    label,
    helperText,
    errorText,
    isRequired  = false,
    isDisabled  = false,
    isInvalid:  isInvalidProp = false,
    isReadOnly  = false,
    children,
    style,
  }) => {
    const { theme } = useTheme();
    const generatedId = useId('form-control');
    const id = idProp ?? generatedId;

    // errorText presence automatically makes the field invalid
    const isInvalid = isInvalidProp || Boolean(errorText);

    const contextValue = useMemo((): FormControlContextValue => ({
      id,
      isRequired,
      isDisabled,
      isInvalid,
      isReadOnly,
      label,
      helperText,
      errorText,
    }), [id, isRequired, isDisabled, isInvalid, isReadOnly, label, helperText, errorText]);

    const subTextStyle = useMemo(() => ({
      fontSize:  12,
      marginTop: 4,
      color:     isInvalid && errorText
        ? theme.colors.error
        : theme.colors.textSecondary,
    }), [isInvalid, errorText, theme.colors.error, theme.colors.textSecondary]);

    const subText = isInvalid && errorText ? errorText : helperText;

    return (
      <FormControlContext.Provider value={contextValue}>
        <View style={[styles.container, style]}>
          {label != null && (
            <Text
              nativeID={`${id}-label`}
              style={[
                styles.label,
                { color: theme.colors.text },
              ]}
              allowFontScaling={false}
            >
              {label}
              {isRequired && (
                <Text style={{ color: theme.colors.error }}> *</Text>
              )}
            </Text>
          )}

          {children}

          {subText != null && (
            <Text style={subTextStyle} allowFontScaling={false}>
              {subText}
            </Text>
          )}
        </View>
      </FormControlContext.Provider>
    );
  },
);

FormControl.displayName = 'FormControl';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize:     14,
    fontWeight:   '600',
    marginBottom: 6,
  },
});
