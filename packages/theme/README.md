# reactnatively-theme

Theme, token, and recipe engine for Reactnatively.

## Install

Most apps should install the full framework:

```sh
npm install reactnatively
```

Install `reactnatively-theme` directly only when building custom theming or
token tooling without the full component framework.

Most users should import theme APIs from `reactnatively`:

```tsx
import {
  ReactnativelyProvider,
  createTheme,
  useTheme,
  materialTokens,
  createRecipe,
} from 'reactnatively';
```

Optional subpath:

```tsx
import { createTheme, glassTokens } from 'reactnatively/theme';
```

## Tokens

| Export | Purpose |
|---|---|
| `palette` | Raw color palette |
| `spacing` | Spacing scale |
| `radii` | Radius scale |
| `typography` | Type scale |
| `shadows` | Shadow presets |
| `motion` | Motion durations and springs |
| `glassTokens` | Raw glass blur/tint/elevation tokens |
| `materialTokens` | Semantic material recipes |
| `stateTokens` | Pressed, hovered, focused, selected, disabled states |
| `zDepth` | Overlay and stacking levels |
| `breakpoints` | Responsive breakpoints |
| `density` | Compact, regular, spacious density tokens |
| `accessibilityTokens` | Touch target, contrast, font scale, transparency |
| `hapticTokens` | Haptic intent tokens |
| `componentTokens` | Component-level token defaults |

## createTheme

```tsx
const theme = createTheme({
  colors: {
    primary: '#6366f1',
  },
});

<ReactnativelyProvider theme={theme}>
  <App />
</ReactnativelyProvider>
```

## Recipes

```tsx
const resolveButton = createRecipe({
  material: 'regular',
  base: { borderRadius: 12 },
  variants: {
    primary: { color: 'primary' },
    subtle: { color: 'neutral' },
  },
  defaults: {
    variant: 'primary',
    material: 'regular',
  },
});
```
