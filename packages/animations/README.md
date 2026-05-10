# reactnatively-animations

Animation presets and hooks for reactnatively, built on react-native-reanimated.

This is an internal package of [reactnatively](https://www.npmjs.com/package/reactnatively). Install the main package instead:

```sh
npm install reactnatively
```

---

## What this package does

Provides reusable animation hooks, spring/timing presets, and the reduced-motion utilities used by every animated component in the system.

### Hooks

| Hook | Use |
|---|---|
| `usePressAnimation()` | Returns `scale` shared value + press handlers for pressable animations |
| `useEntranceAnimation()` | Fade + translate entrance on mount |
| `useSpring(value, config)` | Animated value that follows a spring curve |
| `useReducedMotion()` | Returns `true` when the user has requested reduced motion |
| `useDuration(base)` | Returns adjusted duration (0 when reduced motion is on) |

### Spring presets

| Constant | Feel | Config |
|---|---|---|
| `SPRING_SNAPPY` | Quick, tight | `mass: 1, damping: 26, stiffness: 300` |
| `SPRING_LIQUID` | Fluid, natural | `mass: 1, damping: 20, stiffness: 200` |
| `SPRING_REVEAL` | Gentle entrance | `mass: 1, damping: 30, stiffness: 180` |
| `SPRING_BOUNCE` | Playful overshoot | `mass: 1, damping: 12, stiffness: 250` |
| `SPRING_PRECISE` | No overshoot | `mass: 1, damping: 40, stiffness: 300` |

### Timing presets

| Constant | Duration |
|---|---|
| `TIMING_FAST` | 150ms |
| `TIMING_NORMAL` | 250ms |
| `TIMING_SLOW` | 400ms |
| `TIMING_ENTER` | 300ms |
| `TIMING_EXIT` | 200ms |

### Reduced motion

All animation hooks respect the system reduced-motion accessibility preference automatically. Use `useReducedMotion()` in custom animations to do the same:

```ts
import { useReducedMotion, TIMING_NORMAL } from 'reactnatively';

function useMyAnimation() {
  const reduced = useReducedMotion();
  const duration = reduced ? 0 : TIMING_NORMAL;
  // ...
}
```
