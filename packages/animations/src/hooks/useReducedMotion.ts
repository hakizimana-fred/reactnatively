import { useReducedMotion as useReanimatedReducedMotion } from 'react-native-reanimated';
import { reducedMotion, springs, duration } from 'reactnatively-theme';
import type { SpringConfig } from 'reactnatively-theme';

export function useReducedMotion(): boolean {
  return useReanimatedReducedMotion();
}

// Returns the correct spring config — reduced if the user has the system setting on
export function useSpring(key: keyof typeof springs): SpringConfig {
  const isReduced = useReanimatedReducedMotion();
  return isReduced
    ? (reducedMotion.springs[key] as unknown as SpringConfig)
    : springs[key];
}

// Returns the correct duration — collapsed if reduced motion is on
export function useDuration(key: keyof typeof duration): number {
  const isReduced = useReanimatedReducedMotion();
  if (isReduced && key in reducedMotion.duration) {
    return reducedMotion.duration[key as keyof typeof reducedMotion.duration];
  }
  return duration[key];
}
