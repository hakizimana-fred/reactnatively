import React, { useMemo } from 'react';
import { Text, StyleSheet, type TextStyle } from 'react-native';
import { useTheme } from 'reactnatively-theme';
import type { HeadingProps, HeadingLevel } from './Heading.types';
import type { TextWeight } from '../Text/Text.types';

const HEADING_SIZES: Record<HeadingLevel, number> = {
  h1: 36,
  h2: 30,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,
};

const DEFAULT_HEADING_WEIGHTS: Record<HeadingLevel, TextStyle['fontWeight']> = {
  h1: '700',
  h2: '700',
  h3: '700',
  h4: '600',
  h5: '600',
  h6: '600',
};

const WEIGHT_VALUES: Record<TextWeight, TextStyle['fontWeight']> = {
  regular:   '400',
  medium:    '500',
  semibold:  '600',
  bold:      '700',
  extrabold: '800',
};

export const Heading = React.memo<HeadingProps>(
  ({
    level = 'h2',
    weight,
    color,
    align,
    style,
    children,
    ...rest
  }) => {
    const { theme } = useTheme();

    const computedStyle = useMemo((): TextStyle => ({
      fontSize: HEADING_SIZES[level],
      fontWeight: weight !== undefined ? WEIGHT_VALUES[weight] : DEFAULT_HEADING_WEIGHTS[level],
      color: color ?? theme.colors.text,
      ...(align !== undefined ? { textAlign: align } : undefined),
    }), [level, weight, color, theme.colors.text, align]);

    return (
      <Text
        {...rest}
        accessibilityRole="header"
        style={[computedStyle, style]}
      >
        {children}
      </Text>
    );
  },
);

Heading.displayName = 'Heading';

const styles = StyleSheet.create({});
