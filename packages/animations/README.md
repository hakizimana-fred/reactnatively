# reactnatively-animations

Motion presets, animation hooks, and interaction policy for Reactnatively.

## Install

Most apps should install the full framework:

```sh
npm install reactnatively
```

Install `reactnatively-animations` directly only when building custom motion
infrastructure without the full component framework.

Most users should import from `reactnatively`:

```tsx
import {
  Fade,
  Scale,
  usePressAnimation,
  InteractionProvider,
  SPRING_LIQUID,
} from 'reactnatively';
```

Optional subpath:

```tsx
import { usePressAnimation, SPRING_SNAPPY } from 'reactnatively/animations';
```

## Exports

- Spring presets: `SPRING_SNAPPY`, `SPRING_LIQUID`, `SPRING_REVEAL`, `SPRING_BOUNCE`, `SPRING_PRECISE`
- Timing presets: `TIMING_FAST`, `TIMING_NORMAL`, `TIMING_SLOW`, `TIMING_ENTER`, `TIMING_EXIT`
- Hooks: `usePressAnimation`, `useEntranceAnimation`, `useReducedMotion`, `useSpring`, `useDuration`
- Policy: `InteractionProvider`, `useInteraction`
- Components from the public package subpath: `Fade`, `Scale`, `Slide`, `BlurTransition`, `MagneticPressable`

## Interaction Policy

```tsx
<InteractionProvider
  policy={{
    intensity: 'standard',
    enableHaptics: true,
    defaultSpring: 'snappy',
  }}
>
  <App />
</InteractionProvider>
```

Most apps get this automatically through `ReactnativelyProvider`.
