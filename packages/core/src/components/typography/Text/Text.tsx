import React, { useMemo } from 'react';
import { Text as RNText, StyleSheet, type TextStyle } from 'react-native';
import { useTheme } from 'reactnatively-theme';
import type { TextProps, TextVariant, TextWeight } from './Text.types';

const FONT_SIZES: Record<TextVariant, number> = {
  xs:  12,
  sm:  14,
  md:  16,
  lg:  18,
  xl:  20,
  '2xl': 24,
};

const FONT_WEIGHTS: Record<TextWeight, TextStyle['fontWeight']> = {
  regular:   '400',
  medium:    '500',
  semibold:  '600',
  bold:      '700',
  extrabold: '800',
};

export const Text = React.memo<TextProps>(
  ({
    variant = 'md',
    weight = 'regular',
    color,
    align,
    italic = false,
    underline = false,
    strikethrough = false,
    numberOfLines,
    style,
    children,
    ...rest
  }) => {
    const { theme } = useTheme();

    const computedStyle = useMemo((): TextStyle => ({
      fontSize: FONT_SIZES[variant],
      fontWeight: FONT_WEIGHTS[weight],
      color: color ?? theme.colors.text,
      ...(align !== undefined ? { textAlign: align } : undefined),
      ...(italic ? { fontStyle: 'italic' as const } : undefined),
      ...(underline && strikethrough
        ? { textDecorationLine: 'underline line-through' as const }
        : underline
        ? { textDecorationLine: 'underline' as const }
        : strikethrough
        ? { textDecorationLine: 'line-through' as const }
        : undefined),
    }), [variant, weight, color, theme.colors.text, align, italic, underline, strikethrough]);

    return (
      <RNText
        {...rest}
        numberOfLines={numberOfLines}
        style={[computedStyle, style]}
      >
        {children}
      </RNText>
    );
  },
);

Text.displayName = 'Text';

