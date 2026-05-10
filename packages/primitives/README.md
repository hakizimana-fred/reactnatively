# reactnatively-primitives

Base rendering primitives for reactnatively.

This is an internal package of [reactnatively](https://www.npmjs.com/package/reactnatively). Install the main package instead:

```sh
npm install reactnatively
```

---

## What this package does

Provides the lowest-level interactive and surface primitives that higher-level components are composed from. These handle the glass rendering + gesture layer combination so each component doesn't re-implement it.

### Surface

A glass-aware `View` that automatically applies the correct glass token values based on theme and elevation. Higher-level components like `LiquidCard` and `Modal` are built on `Surface`.

```tsx
import { Surface } from 'reactnatively-primitives';

<Surface elevation={2} borderRadius={16}>
  {children}
</Surface>
```

### GlassPressable

A pressable that combines gesture handling (via `react-native-gesture-handler`) with a glass surface and a built-in press scale animation. Used as the base for `Button`, `Chip`, `IconButton`, and similar interactive components.

```tsx
import { GlassPressable } from 'reactnatively-primitives';

<GlassPressable elevation={1} onPress={handlePress}>
  {children}
</GlassPressable>
```

### GlassText

A `Text` component that automatically picks the correct foreground color for the current glass elevation and color scheme, maintaining readable contrast over glass surfaces.

```tsx
import { GlassText } from 'reactnatively-primitives';

<GlassText elevation={3}>Label on glass</GlassText>
```
