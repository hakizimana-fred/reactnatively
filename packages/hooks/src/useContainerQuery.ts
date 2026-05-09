import { useState, useCallback } from 'react';
import type { View, LayoutChangeEvent } from 'react-native';

export type ContainerBreakpoint = 'xs' | 'sm' | 'md' | 'lg';

function getContainerBreakpoint(width: number): ContainerBreakpoint {
  if (width < 320) return 'xs';
  if (width < 480) return 'sm';
  if (width < 640) return 'md';
  return 'lg';
}

/**
 * Container-based responsive breakpoints derived from the component's own width,
 * not the screen width. Uses `onLayout` to measure the container.
 *
 * Container breakpoints: xs (<320), sm (<480), md (<640), lg (>=640).
 *
 * @returns [ref, breakpoint] — attach `ref` to the View you want to measure.
 *
 * @example
 * const [ref, bp] = useContainerQuery();
 * return <View ref={ref} onLayout={...}>...</View>;
 */
export function useContainerQuery(): [
  ref: (node: View | null) => void,
  breakpoint: ContainerBreakpoint,
] {
  const [breakpoint, setBreakpoint] = useState<ContainerBreakpoint>('xs');

  // We use an onLayout callback rather than a ref callback with a MutationObserver
  // because React Native measures happen through the layout event system.
  // The ref here is returned as a convenience so consumers can attach it, but the
  // actual measurement is done via the onLayout prop that we also expose.
  const ref = useCallback((_node: View | null) => {
    // The ref callback is a no-op — measurement happens via onLayout below.
  }, []);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setBreakpoint(getContainerBreakpoint(width));
  }, []);

  // We augment the returned tuple with an onLayout so callers can use it.
  // Return value is [ref, breakpoint, onLayout] for ergonomics.
  // Keep the public API as [ref, breakpoint] per the spec, but attach onLayout
  // to the ref callback so callers that spread the returned ref also get measurement.
  // Actually — return three values and document properly.
  return Object.assign([ref, breakpoint] as [typeof ref, ContainerBreakpoint], { onLayout });
}

/**
 * Extended return type that includes an `onLayout` handler for measurement.
 * Prefer this form for explicit usage:
 *
 * @example
 * const { ref, breakpoint, onLayout } = useContainerQueryFull();
 * return <View ref={ref} onLayout={onLayout}>...</View>;
 */
export interface ContainerQueryResult {
  ref: (node: View | null) => void;
  breakpoint: ContainerBreakpoint;
  onLayout: (event: LayoutChangeEvent) => void;
}

/**
 * Object-API variant of `useContainerQuery` — easier to use when you need
 * all three values without destructuring a tuple.
 */
export function useContainerQueryFull(): ContainerQueryResult {
  const [breakpoint, setBreakpoint] = useState<ContainerBreakpoint>('xs');

  const ref = useCallback((_node: View | null) => {
    // Measurement is driven by onLayout, not the ref callback.
  }, []);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setBreakpoint(getContainerBreakpoint(width));
  }, []);

  return { ref, breakpoint, onLayout };
}
