import React, { useMemo } from 'react';
import { Text, Platform, StyleSheet, type TextStyle } from 'react-native';
import type { GradientTextProps } from './GradientText.types';

const DEFAULT_COLORS = ['#6366f1', '#8b5cf6', '#ec4899'];
const DEFAULT_START = { x: 0, y: 0 };
const DEFAULT_END = { x: 1, y: 0 };

// Lazy-require MaskedView and LinearGradient to handle optional peer deps gracefully
let MaskedView: React.ComponentType<{
  maskElement: React.ReactElement;
  style?: object;
  children?: React.ReactNode;
}> | null = null;

let LinearGradient: React.ComponentType<{
  colors: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: object;
  children?: React.ReactNode;
}> | null = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  MaskedView = require('@react-native-masked-view/masked-view').default;
} catch {
  MaskedView = null;
}

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  LinearGradient = require('react-native-linear-gradient').default;
} catch {
  LinearGradient = null;
}

export const GradientText = React.memo<GradientTextProps>(
  ({
    colors = DEFAULT_COLORS,
    start = DEFAULT_START,
    end = DEFAULT_END,
    children,
    style,
    ...rest
  }) => {
    // All hooks must be called unconditionally (Rules of Hooks)
    const fallbackStyle = useMemo((): TextStyle => ({
      color: colors[0] ?? DEFAULT_COLORS[0],
    }), [colors]);

    const maskedTextStyle = useMemo((): TextStyle => ({
      opacity: 0,
    }), []);

    // Only use MaskedView + LinearGradient on iOS when both are available
    const canUseGradient =
      Platform.OS === 'ios' &&
      MaskedView !== null &&
      LinearGradient !== null;

    if (canUseGradient && MaskedView !== null && LinearGradient !== null) {
      const MV = MaskedView;
      const LG = LinearGradient;

      return (
        <MV
          style={styles.masked}
          maskElement={
            <Text
              {...rest}
              style={[styles.maskText, style]}
            >
              {children}
            </Text>
          }
        >
          <LG
            colors={colors}
            start={start}
            end={end}
            style={styles.gradient}
          >
            <Text
              {...rest}
              style={[styles.gradientText, style, maskedTextStyle]}
              aria-hidden
            >
              {children}
            </Text>
          </LG>
        </MV>
      );
    }

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

const styles = StyleSheet.create({
  masked: {
    flexDirection: 'row',
  },
  maskText: {
    backgroundColor: 'transparent',
  },
  gradient: {
    flex: 1,
  },
  gradientText: {
    backgroundColor: 'transparent',
  },
});
