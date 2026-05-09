import React from 'react';
import { StyleSheet } from 'react-native';
import { GlassView } from '@reactnatively/glass';
import type { BlurSurfaceProps } from './BlurSurface.types';

/**
 * BlurSurface — thin wrapper around GlassView exposing a clean API.
 * Used as a standalone decorative blur layer. No children required.
 */
export const BlurSurface = React.memo<BlurSurfaceProps>(
  ({
    elevation = 2,
    variant = 'surface',
    borderRadius = 16,
    style,
    children,
  }) => {
    return (
      <GlassView
        elevation={elevation}
        variant={variant}
        borderRadius={borderRadius}
        style={[styles.surface, style]}
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
