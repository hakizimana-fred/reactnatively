import { useCallback, useRef } from 'react';

/**
 * Returns a throttled version of the provided callback.
 * The callback will fire at most once per `delay` ms.
 * Subsequent calls within the delay window are ignored.
 * The returned function is stable across renders.
 */
export function useThrottle<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  delay: number,
): T {
  const lastCallRef = useRef<number>(0);
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;

  return useCallback(
    (...args: Parameters<T>): ReturnType<T> | undefined => {
      const now = Date.now();
      if (now - lastCallRef.current >= delay) {
        lastCallRef.current = now;
        return fnRef.current(...args);
      }
      return undefined;
    },
    [delay],
  ) as T;
}
