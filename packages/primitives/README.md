# reactnatively-primitives

Low-level primitives used by Reactnatively components.

## Install

Most apps should install the full framework:

```sh
npm install reactnatively
```

Install `reactnatively-primitives` directly only when building lower-level UI
infrastructure without the full component framework.

Most users should import primitives from `reactnatively`:

```tsx
import {
  Surface,
  GlassPressable,
  GlassText,
  PortalProvider,
  AccessibilityProvider,
} from 'reactnatively';
```

Optional subpath:

```tsx
import { Surface, GlassPressable } from 'reactnatively/primitives';
```

## Main Primitives

### Surface

Glass-aware or solid rendering primitive.

```tsx
<Surface glass={{ elevation: 2, variant: 'surface' }} borderRadius="lg">
  {children}
</Surface>
```

### GlassPressable

Interactive surface with shared press animation and optional glass rendering.

```tsx
<GlassPressable glass onPress={handlePress}>
  <GlassText>Press me</GlassText>
</GlassPressable>
```

### AccessibilityProvider

Provides shared accessibility defaults such as minimum touch target, font scaling,
and reduced transparency preference.

```tsx
<AccessibilityProvider policy={{ allowFontScaling: true }}>
  <App />
</AccessibilityProvider>
```

Most apps get this automatically through `ReactnativelyProvider`.
