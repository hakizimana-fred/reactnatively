import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface DimensionsState {
  width: number;
  height: number;
  scale: number;
  fontScale: number;
  /** Current breakpoint based on screen width. */
  breakpoint: Breakpoint;
}

function getBreakpoint(width: number): Breakpoint {
  if (width < 480) return 'xs';
  if (width < 768) return 'sm';
  if (width < 1024) return 'md';
  if (width < 1280) return 'lg';
  return 'xl';
}

/**
 * Returns live window dimensions and a responsive breakpoint derived from width.
 * Breakpoints: xs (<480), sm (<768), md (<1024), lg (<1280), xl (>=1280).
 * Re-renders automatically when the screen size changes (rotation, resize).
 */
export function useDimensions(): DimensionsState {
  const { width, height, scale, fontScale } = useWindowDimensions();

  const breakpoint = useMemo(() => getBreakpoint(width), [width]);

  return { width, height, scale, fontScale, breakpoint };
}
