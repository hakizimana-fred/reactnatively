# reactnatively-glass

Liquid Glass rendering engine — native blur, vibrancy, and depth for React Native & Expo.

This is an internal package of [reactnatively](https://www.npmjs.com/package/reactnatively). Install the main package instead:

```sh
npm install reactnatively
```

---

## What this package does

Provides the core glass rendering primitive (`GlassView`) and the capability detection, token engine, and style hooks that all glass components in the system depend on.

### GlassView

Renders a layered glass surface using platform-native blur:

- **iOS / macOS** — `expo-blur` with native vibrancy
- **Android** — `expo-blur` with `dimezis` experimental blur method
- **Web / no-blur** — solid semi-transparent fallback with gradient highlight

Layer stack (bottom → top):

1. Shadow shell — drop shadow / Android elevation
2. Clip shell — `overflow: hidden`, clips all inner layers to border radius
3. BlurView — native platform blur
4. Tint overlay — semi-transparent color
5. Highlight — top-edge gradient shimmer (the "liquid glass" refraction)
6. Border ring — 1px glass edge
7. Content — children

### GlassEngine

Resolves glass token values (blur amount, tint color, shadow, border) from `elevation` + `variant` + `colorScheme`. Keeps all rendering decisions in one place.

### CapabilityDetector

Detects at runtime whether the device/platform supports native blur and which blur method to use. Components use the `IS_NO_GLASS` flag to render a graceful solid fallback on unsupported platforms.

---

## Internal API

```ts
import { GlassView } from 'reactnatively-glass';
import { resolveGlass } from 'reactnatively-glass/engine';
import { IS_NO_GLASS, ANDROID_BLUR_METHOD } from 'reactnatively-glass/engine';
import { useGlassStyle } from 'reactnatively-glass/hooks';
```

See the main [reactnatively README](../../README.md) for full GlassView props documentation.
