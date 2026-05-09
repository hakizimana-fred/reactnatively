import React, { useMemo } from 'react';
import { Text, StyleSheet, type TextStyle } from 'react-native';
import { useTheme } from '@reactnatively/theme';
import type { ParagraphProps, ParagraphSize } from './Paragraph.types';

const SIZE_CONFIG: Record<ParagraphSize, { fontSize: number; lineHeight: number }> = {
  sm: { fontSize: 14, lineHeight: 22 },
  md: { fontSize: 16, lineHeight: 26 },
  lg: { fontSize: 18, lineHeight: 30 },
};

export const Paragraph = React.memo<ParagraphProps>(
  ({ size = 'md', color, align, style, children }) => {
    const { theme } = useTheme();
    const { fontSize, lineHeight } = SIZE_CONFIG[size];

    const computedStyle = useMemo((): TextStyle => ({
      fontSize,
      lineHeight,
      color: color ?? theme.colors.text,
      ...(align !== undefined ? { textAlign: align } : undefined),
    }), [fontSize, lineHeight, color, theme.colors.text, align]);

    return (
      <Text style={[computedStyle, style]}>
        {children}
      </Text>
    );
  },
);

Paragraph.displayName = 'Paragraph';

const styles = StyleSheet.create({});
