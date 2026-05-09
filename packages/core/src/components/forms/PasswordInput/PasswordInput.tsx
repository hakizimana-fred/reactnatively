import React, { useCallback, useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useTheme } from '@reactnatively/theme';
import { TextInput } from '../TextInput/TextInput';
import type { PasswordInputProps } from './PasswordInput.types';

// ─── Toggle icon ─────────────────────────────────────────────────────────────

interface EyeIconProps {
  visible: boolean;
  color:   string;
}

const EyeIcon = React.memo<EyeIconProps>(({ visible, color }) => (
  <Text style={[styles.eyeText, { color }]}>
    {visible ? '⊙' : '⊗'}
  </Text>
));
EyeIcon.displayName = 'EyeIcon';

// ─── Component ───────────────────────────────────────────────────────────────

export const PasswordInput = React.memo<PasswordInputProps>(
  ({
    defaultVisible = false,
    label          = 'Password',
    ...rest
  }) => {
    const { theme } = useTheme();
    const [visible, setVisible] = useState(defaultVisible);

    const toggleVisibility = useCallback(() => {
      setVisible(prev => !prev);
    }, []);

    const toggleButton = (
      <Pressable
        onPress={toggleVisibility}
        style={styles.toggleButton}
        accessible
        accessibilityRole="button"
        accessibilityLabel={visible ? 'Hide password' : 'Show password'}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <EyeIcon visible={visible} color={theme.colors.textMuted} />
      </Pressable>
    );

    return (
      <TextInput
        label={label}
        secureTextEntry={!visible}
        rightIcon={toggleButton}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="password"
        textContentType={visible ? 'none' : 'password'}
        {...rest}
      />
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

const styles = StyleSheet.create({
  toggleButton: {
    justifyContent: 'center',
    alignItems:     'center',
    padding:        4,
  },
  eyeText: {
    fontSize: 18,
  },
});
