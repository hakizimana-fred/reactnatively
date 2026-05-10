/**
 * useScrollHandler — scroll-driven animation values via Reanimated.
 *
 * This hook requires `react-native-reanimated` >= 3.6.0 as a peer dependency.
 * It is guarded by a try/catch import so that the rest of the package remains
 * importable when Reanimated is not installed (it will throw a clear error only
 * when useScrollHandler itself is called).
 */

// We import types only here so TypeScript can check the rest of this file even
// when the peer is absent at runtime. The actual module is loaded lazily.
import type {
  SharedValue,
  ScrollHandlerProcessed,
} from 'react-native-reanimated';

export interface ScrollHandlerResult {
  /** Pass this to the `onScroll` prop of Reanimated.ScrollView / FlatList. */
  scrollHandler: ScrollHandlerProcessed<Record<string, unknown>>;
  /** Shared value tracking current vertical scroll offset in pixels. */
  scrollY: SharedValue<number>;
  /** Shared value tracking scroll direction — updates when direction changes. */
  scrollDirection: SharedValue<'up' | 'down'>;
}

let reanimated: typeof import('react-native-reanimated') | null = null;

function loadReanimated(): typeof import('react-native-reanimated') {
  if (reanimated) return reanimated;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    reanimated = require('react-native-reanimated') as typeof import('react-native-reanimated');
    return reanimated;
  } catch {
    throw new Error(
      '[reactnatively-hooks] useScrollHandler requires react-native-reanimated >= 3.6.0. ' +
        'Install it with: npx expo install react-native-reanimated',
    );
  }
}

/**
 * Returns scroll-driven Reanimated shared values and a scroll handler.
 *
 * @example
 * const { scrollHandler, scrollY, scrollDirection } = useScrollHandler();
 * return (
 *   <Animated.ScrollView onScroll={scrollHandler} scrollEventThrottle={16}>
 *     ...
 *   </Animated.ScrollView>
 * );
 */
export function useScrollHandler(): ScrollHandlerResult {
  const rn = loadReanimated();
  const { useSharedValue, useAnimatedScrollHandler } = rn;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const scrollY = useSharedValue<number>(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const scrollDirection = useSharedValue<'up' | 'down'>('down');

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const scrollHandler = useAnimatedScrollHandler({
    onScroll(event) {
      'worklet';
      const y = event.contentOffset.y;
      if (y > scrollY.value) {
        scrollDirection.value = 'down';
      } else if (y < scrollY.value) {
        scrollDirection.value = 'up';
      }
      scrollY.value = y;
    },
  });

  return { scrollHandler, scrollY, scrollDirection };
}
