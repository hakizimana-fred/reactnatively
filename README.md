# reactnatively

A Liquid Glass UI system for React Native and Expo: components, glass rendering,
motion primitives, design tokens, and app-level providers in one public API.

```sh
npm install reactnatively
```

## Requirements

| Peer dependency | Version |
|---|---|
| `react` | `>=18.0.0` |
| `react-native` | `>=0.73.0` |
| `react-native-reanimated` | `>=3.6.0` |
| `react-native-gesture-handler` | `>=2.14.0` |
| `expo-blur` | `>=13.0.0` optional |
| `react-native-linear-gradient` | `>=2.8.0` optional |

## Primary Import

Most apps should import from `reactnatively`:

```tsx
import {
  ReactnativelyProvider,
  Button,
  Card,
  GlassView,
  Surface,
  GlassPressable,
  useGlassStyle,
  resolveGlass,
} from 'reactnatively';
```

The monorepo is split internally for maintainability, but the main developer
experience is intentionally centralized through `reactnatively`.

## Setup

Use `ReactnativelyProvider` at the app root. It composes theme, accessibility,
interaction, glass policy, portals, and toasts.

```tsx
import { ReactnativelyProvider } from 'reactnatively';

export default function App() {
  return (
    <ReactnativelyProvider>
      {/* your app */}
    </ReactnativelyProvider>
  );
}
```

You can configure framework-wide behavior:

```tsx
<ReactnativelyProvider
  colorScheme="system"
  glass={{
    material: { quality: 'balanced', powerMode: 'normal' },
    budget: { maxBlurSurfaces: 8 },
  }}
  interaction={{ intensity: 'standard', enableHaptics: true }}
  accessibility={{ allowFontScaling: true, reduceTransparency: false }}
>
  <App />
</ReactnativelyProvider>
```

## Components

```tsx
import {
  Button,
  IconButton,
  TextInput,
  Switch,
  Checkbox,
  Card,
  Text,
  Avatar,
  Badge,
  Alert,
  toast,
  Tabs,
  Modal,
  Fade,
  GlassNavbar,
} from 'reactnatively';
```

Example:

```tsx
<Card elevation={2} variant="surface">
  <Card.Header>
    <Text weight="semibold">Revenue</Text>
  </Card.Header>
  <Card.Body>
    <Text variant="lg">$24,800</Text>
  </Card.Body>
</Card>

<Button label="Continue" variant="glass" />
```

`Card` is an ergonomic alias for `LiquidCard`; both names are exported.

## Glass

`GlassView` is the foundational liquid glass primitive.

```tsx
import { GlassView } from 'reactnatively';

<GlassView material="panel" priority="high" borderRadius={20} style={{ padding: 16 }}>
  <Text>Liquid glass surface</Text>
</GlassView>
```

Common glass exports:

```tsx
import {
  GlassView,
  Surface,
  GlassPressable,
  useGlassStyle,
  resolveGlass,
  GlassPlatformProvider,
  useGlassPlatform,
} from 'reactnatively';
```

## Motion

```tsx
import {
  Fade,
  Scale,
  Slide,
  MagneticPressable,
  usePressAnimation,
  useEntranceAnimation,
  InteractionProvider,
  SPRING_LIQUID,
} from 'reactnatively';
```

Motion hooks and components use Reanimated and respect the shared interaction
policy where available.

## Theme And Tokens

```tsx
import {
  createTheme,
  useTheme,
  spacing,
  radii,
  glassTokens,
  materialTokens,
  createRecipe,
} from 'reactnatively';

const theme = createTheme({
  colors: {
    primary: '#6366f1',
  },
});
```

`useTheme()` returns the theme context:

```tsx
const { theme, isDark } = useTheme();
```

## Optional Subpath Imports

Power users can import focused API groups from the same package:

```tsx
import { GlassView, resolveGlass } from 'reactnatively/glass';
import { useDisclosure, useHaptic } from 'reactnatively/hooks';
import { Fade, usePressAnimation } from 'reactnatively/animations';
import { createTheme, materialTokens } from 'reactnatively/theme';
import { Surface, GlassPressable } from 'reactnatively/primitives';
import { deepMerge, platformSelect } from 'reactnatively/utils';
```

These are optional. Normal application code should start with `reactnatively`.

## Package Architecture

The framework is built from internal workspace packages:

| Package | Responsibility |
|---|---|
| `reactnatively` | Public API, components, subpath exports |
| `reactnatively-glass` | Glass renderer and material policy |
| `reactnatively-theme` | Tokens, theme, recipes |
| `reactnatively-animations` | Motion hooks, presets, interaction policy |
| `reactnatively-primitives` | Surface, pressable, portal, accessibility primitives |
| `reactnatively-hooks` | Shared UI hooks |
| `reactnatively-utils` | Type and platform utilities |

## TypeScript

Everything is typed:

```tsx
import type {
  ButtonProps,
  GlassViewProps,
  ReactnativelyProviderProps,
  MaterialRecipe,
} from 'reactnatively';
```

## License

MIT
