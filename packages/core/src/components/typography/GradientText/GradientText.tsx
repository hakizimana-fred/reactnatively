import React, { useMemo } from 'react';
import { Text, type TextStyle } from 'react-native';
import type { GradientTextProps } from './GradientText.types';

const DEFAULT_COLORS = ['#6366f1', '#8b5cf6', '#ec4899'];
const DEFAULT_START = { x: 0, y: 0 };
const DEFAULT_END = { x: 1, y: 0 };

export const GradientText = React.memo<GradientTextProps>(
  ({
    colors = DEFAULT_COLORS,
    start = DEFAULT_START,
    end = DEFAULT_END,
    children,
    style,
    ...rest
  }) => {
    void start;
    void end;

    // All hooks must be called unconditionally (Rules of Hooks)
    const fallbackStyle = useMemo((): TextStyle => ({
      color: colors[0] ?? DEFAULT_COLORS[0],
    }), [colors]);

    // Fallback: render with the first gradient color as solid color
    return (
      <Text
        {...rest}
        style={[fallbackStyle, style]}
      >
        {children}
      </Text>
    );
  },
);

GradientText.displayName = 'GradientText';
