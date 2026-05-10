import { useMemo } from 'react';
import { useTheme } from 'reactnatively-theme';
import { resolveGlass } from '../engine/GlassEngine';
import type { GlassConfig, ResolvedGlassStyle } from '../engine/GlassEngine.types';

// Hook: resolves the full glass style recipe using the current theme's color scheme.
// Use this when building custom glass components outside of GlassView.
export function useGlassStyle(config: GlassConfig): ResolvedGlassStyle {
  const { colorScheme } = useTheme();
  return useMemo(() => resolveGlass(config, colorScheme), [config, colorScheme]);
}
