import React from 'react';
import { StyleSheet } from 'react-native';
import { GlassView } from 'reactnatively-glass';
import type { BlurSurfaceProps } from './BlurSurface.types';

/**
 * BlurSurface — thin wrapper around GlassView exposing a clean API.
 * Used as a standalone decorative blur layer. No children required.
 */
export const BlurSurface = React.memo<BlurSurfaceProps>(
  ({
    elevation = 1,
  variant = 'surface',
  borderRadius = 24,
  style,
  contentStyle,
  border,
  borderWidth,
  glow = false,
  children,
  }) => {
    return (
      <GlassView
       elevation={elevation}
    variant={variant}
    borderRadius={borderRadius}
    style={[styles.surface, style]}
    contentStyle={contentStyle}
    border={border}
    borderWidth={borderWidth}
   >
        {children}
      </GlassView>
    );
  },
);

BlurSurface.displayName = 'BlurSurface';

const styles = StyleSheet.create({
  surface: {
    // Intentionally minimal — this is a decoration primitive
  },
});
