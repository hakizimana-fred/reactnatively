import React, { useMemo } from 'react';
import { Text, StyleSheet, type TextStyle } from 'react-native';
import { useTheme } from '@reactnatively/theme';
import type { CaptionProps } from './Caption.types';

export const Caption = React.memo<CaptionProps>(
  ({ color, align, style, children }) => {
    const { theme } = useTheme();

    const computedStyle = useMemo((): TextStyle => ({
      fontSize: 12,
      color: color ?? theme.colors.textSecondary,
      ...(align !== undefined ? { textAlign: align } : undefined),
    }), [color, theme.colors.textSecondary, align]);

    return (
      <Text style={[computedStyle, style]}>
        {children}
      </Text>
    );
  },
);

Caption.displayName = 'Caption';

const styles = StyleSheet.create({});
