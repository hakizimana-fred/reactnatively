# reactnatively-glass

Glass rendering engine for Reactnatively.

## Install

Most apps should install the full framework:

```sh
npm install reactnatively
```

Install `reactnatively-glass` directly only when building a custom package on
top of the glass engine without the full component framework.

Most users should import glass APIs from `reactnatively`:

```tsx
import {
  GlassView,
  useGlassStyle,
  resolveGlass,
  GlassPlatformProvider,
} from 'reactnatively';
```

Power users can use the optional subpath:

```tsx
import { GlassView, resolveGlass } from 'reactnatively/glass';
```

## What It Provides

- `GlassView`: layered blur/tint/highlight/border rendering primitive
- `resolveGlass`: resolves elevation, variant, material, and color scheme into a render recipe
- `useGlassStyle`: glass style helper
- `GlassPlatformProvider`: global glass quality, power mode, reduced transparency, and blur budget policy
- Capability flags such as `SUPPORTS_BLUR`, `IS_NO_GLASS`, and `GLASS_CAPABILITY`

## GlassView

```tsx
<GlassView material="panel" priority="high" borderRadius={20} style={{ padding: 16 }}>
  <Text>Liquid glass</Text>
</GlassView>
```

Layer stack:

1. Shadow shell
2. Clip shell
3. Native blur when available
4. Tint overlay
5. Top-edge highlight
6. Border ring
7. Content

## Platform Policy

```tsx
<GlassPlatformProvider
  material={{ quality: 'balanced', powerMode: 'normal' }}
  budget={{ maxBlurSurfaces: 8, degradeStrategy: 'reduce-all-blur' }}
>
  <App />
</GlassPlatformProvider>
```

Most apps get this automatically through `ReactnativelyProvider`.
