<div align="center">

# Reactnatively

**Liquid Glass UI for React Native.**

A cinematic component framework built around adaptive blur, motion-first interactions,
and a layered glass rendering engine — for apps that refuse to look ordinary.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React_Native-0.73+-61DAFB?logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-Compatible-000020?logo=expo&logoColor=white)](https://expo.dev/)
[![pnpm](https://img.shields.io/badge/pnpm-9.4+-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Node](https://img.shields.io/badge/Node-22+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

[Architecture](#architecture) · [Components](#components) · [Glass Engine](#glass-engine) · [Performance](#performance-architecture) · [Roadmap](#roadmap)

</div>

---

## The Problem

Most React Native component libraries give you building blocks. Buttons. Inputs. Modals. They're correct, accessible, and completely forgettable.

**Reactnatively is built for a different ambition.** It's a framework for developers who want their apps to feel like Apple designed them — surfaces that breathe, interactions that have weight, motion that communicates intention. Premium glass rendering that adapts to every device. A design system that scales from low-end Android to the latest iPhone without compromise.

This is not a UI kit. It's a rendering philosophy.

---

## What Makes It Different

| Concern | Common libraries | Reactnatively |
|---|---|---|
| Rendering | Flat Views + StyleSheet | 5-layer adaptive glass stack |
| Motion | Opacity/translate | Worklet-based spring physics |
| Glass | Not supported | Native blur + tint + refraction |
| Architecture | Monolithic bundle | Modular workspace packages |
| Theme | Static constants | Token engine + dynamic schemes |
| Device fallbacks | None | Capability-aware degradation |
| Tree shaking | Often broken | `sideEffects: false` throughout |

---

## Features

- **Liquid Glass Rendering** — A 5-layer rendering engine (shadow shell, clip shell, native blur, tint, highlight, border) that produces authentic glass depth on iOS and degrades gracefully on Android and low-end devices
- **Adaptive Blur** — Capability detection at startup (`IS_FULL_GLASS` / `IS_PARTIAL_GLASS` / `IS_NO_GLASS`) ensures the glass system never tanks performance on unsupported hardware
- **Motion-First Architecture** — Every interactive component runs spring physics and opacity interpolation on the UI thread via Reanimated v3 worklets. Zero JS-thread animations
- **83+ Production Components** — 10 categories spanning layout, typography, forms, navigation, feedback, overlays, and advanced glass compositions
- **Fully TypeScript** — Generic APIs, inferred theme types via `InferTheme<>`, compound component types, zero `any` at the public surface
- **Composable by Design** — Compound components (`Tabs.Tab`, `Tabs.List`, `LiquidCard.Header`) backed by React context rather than prop drilling
- **Expo + Bare RN** — Works in both workflows. `expo-blur` and `react-native-linear-gradient` are optional peer deps the glass engine falls back gracefully when absent
- **Tree-Shakeable** — Every package ships `sideEffects: false`, dual CJS/ESM bundles via `tsup`, and code splitting enabled. Only what you use lands in your bundle
- **Token-Driven Theming** — Semantic color tokens, glass blur scales, radii, typography, shadows, and spring configs all live as typed tokens. Dark mode is automatic
- **Accessibility First** — `accessibilityRole`, `accessibilityState`, and `accessibilityLabel` on every interactive surface. Reduced motion via `useReducedMotion()`

---

## Architecture

```
reactnatively/
├── packages/
│   ├── core/          @reactnatively/core       — 83+ components, all categories
│   ├── glass/         @reactnatively/glass       — GlassView, FrostPanel, glass engine
│   ├── animations/    @reactnatively/animations  — Spring/timing presets, motion hooks
│   ├── theme/         @reactnatively/theme       — Token system, ThemeProvider
│   ├── hooks/         @reactnatively/hooks       — useControllable, useDisclosure, etc.
│   ├── primitives/    @reactnatively/primitives  — Surface, GlassPressable, Portal
│   └── utils/         @reactnatively/utils       — defineVariants, typed helpers
├── apps/
│   └── playground/    — Expo Router dev app for visual testing
└── tooling/           — Shared tsconfig, lint config
```

The dependency graph is strictly acyclic:

```
core → primitives → glass → animations → theme → utils
core → glass, animations, theme, hooks, utils
```

Each package is independently publishable, versioned, and tree-shakeable. You can consume just `@reactnatively/glass` without any component code, or use `@reactnatively/core` for the full system.

---

## Installation

### Expo (Managed or Bare)

```sh
# Core library + required peer dep
pnpm add @reactnatively/core react-native-reanimated

# Recommended — enables full glass rendering
pnpm add expo-blur react-native-linear-gradient react-native-gesture-handler
```

Add the Reanimated plugin to `babel.config.js`:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
```

### Bare React Native

```sh
pnpm add @reactnatively/core react-native-reanimated react-native-gesture-handler

# For native blur (strongly recommended on iOS)
pnpm add expo-blur

# For gradient highlights in glass surfaces
pnpm add react-native-linear-gradient
```

Then run `pod install` for native deps on iOS.

### Peer Dependency Matrix

| Package | Required | Minimum |
|---|---|---|
| `react` | Yes | 18.0.0 |
| `react-native` | Yes | 0.73.0 |
| `react-native-reanimated` | Yes | 3.6.0 |
| `react-native-gesture-handler` | Yes | 2.14.0 |
| `expo-blur` | Optional | 13.0.0 |
| `react-native-linear-gradient` | Optional | 2.8.0 |

The glass engine detects `expo-blur` and `react-native-linear-gradient` at runtime via safe `require()` calls cached after first resolution. Neither package must be present — they unlock the full glass stack when available.

---

## Quick Start

### Wrap your app

```tsx
import { ThemeProvider } from '@reactnatively/core';

export default function App() {
  return (
    <ThemeProvider>
      {/* your app */}
    </ThemeProvider>
  );
}
```

`ThemeProvider` reads the system color scheme automatically. `useTheme()`, `useIsDark()`, and `useToken()` are available anywhere in the tree. No additional configuration for dark mode.

---

### Button

Press scale and opacity run as Reanimated worklets — the UI thread never waits for JS.

```tsx
import { Button } from '@reactnatively/core';

// Solid
<Button label="Continue" onPress={handlePress} />

// Tinted with icon
<Button
  variant="tinted"
  color="secondary"
  size="lg"
  leftIcon={<StarIcon />}
  label="Save"
  onPress={save}
/>

// Authentic liquid glass
<Button
  variant="glass"
  glass={{ elevation: 3, variant: 'frosted' }}
  label="Open Panel"
  onPress={open}
/>

// Loading state (spinner replaces label, layout holds)
<Button label="Submitting" loading />
```

**Variants:** `solid` · `outline` · `ghost` · `tinted` · `glass` · `destructive`  
**Sizes:** `xs` · `sm` · `md` · `lg` · `xl`  
**Colors:** `primary` · `secondary` · `success` · `warning` · `error` · `neutral`

---

### LiquidCard

Compound component with composable sub-surfaces. The `glass` prop routes all rendering through `GlassView`.

```tsx
import { LiquidCard } from '@reactnatively/core';

<LiquidCard glass onPress={handlePress} elevation={2}>
  <LiquidCard.Image src="https://..." height={200} />
  <LiquidCard.Header bordered>
    <Heading level="h4">Neural Interface</Heading>
    <Caption>Released 2025</Caption>
  </LiquidCard.Header>
  <LiquidCard.Body>
    <Paragraph>
      A direct bridge between intention and execution.
    </Paragraph>
  </LiquidCard.Body>
  <LiquidCard.Footer>
    <Button label="Explore" size="sm" variant="tinted" />
  </LiquidCard.Footer>
</LiquidCard>
```

---

### GlassView — raw glass primitive

Use `GlassView` directly when you need a custom glass surface.

```tsx
import { GlassView } from '@reactnatively/core';

<GlassView
  elevation={3}
  variant="frosted"
  borderRadius={20}
  glow={{ color: '#6366f1', radius: 24, opacity: 0.3 }}
>
  <View style={{ padding: 24 }}>
    <Text>Frosted glass with glow</Text>
  </View>
</GlassView>
```

Elevation `1–5` drives blur intensity, shadow depth, and tint opacity as a coordinated system. `variant` selects the glass character:

| Variant | Character |
|---|---|
| `surface` | Subtle, light material — cards, list items |
| `frosted` | Heavy frost — panels, sidebars, sheets |
| `elevated` | Deep blur — modals, command palette |
| `ultraThin` | Nearly transparent — toasts, transient overlays |

---

### Tabs — compound navigation

```tsx
import { Tabs } from '@reactnatively/core';

<Tabs defaultValue="overview" variant="pills">
  <Tabs.List>
    <Tabs.Tab value="overview" label="Overview" />
    <Tabs.Tab value="metrics"  label="Metrics" />
    <Tabs.Tab value="logs"     label="Logs" />
  </Tabs.List>

  <Tabs.Panel value="overview"><OverviewPanel /></Tabs.Panel>
  <Tabs.Panel value="metrics"><MetricsPanel /></Tabs.Panel>
  <Tabs.Panel value="logs"><LogsPanel /></Tabs.Panel>
</Tabs>
```

**Tab variants:** `line` · `enclosed` · `pills` · `glass`

The active indicator animates with spring physics. The `glass` variant wraps the active tab in a `GlassView` rather than a background color.

---

### Motion primitives

Reanimated v3 animations exposed as declarative wrappers. All run on the UI thread.

```tsx
import { Fade, Scale, Slide, BlurTransition } from '@reactnatively/core';

// Fade in on mount
<Fade in={isVisible} duration={300} onEntered={handleEntered}>
  <MyContent />
</Fade>

// Scale entrance with spring
<Scale in={isOpen} from={0.85}>
  <Panel />
</Scale>

// Slide from bottom
<Slide in={isVisible} direction="up" distance={40}>
  <BottomCard />
</Slide>

// Blur + fade — the glass-native transition feel
<BlurTransition in={showDetail}>
  <DetailView />
</BlurTransition>
```

---

### Theme

```tsx
import { useTheme, useIsDark, createTheme, ThemeProvider } from '@reactnatively/core';

// Consuming tokens
function MyComponent() {
  const { theme } = useTheme();
  const isDark = useIsDark();

  return (
    <View style={{ backgroundColor: theme.colors.backgroundDeep }}>
      <Text style={{ color: theme.colors.text }}>
        {isDark ? 'Dark mode active' : 'Light mode active'}
      </Text>
    </View>
  );
}

// Custom brand colors
const myTheme = createTheme({
  colors: {
    primary:      '#6366f1',
    primaryHover: '#4f46e5',
    primaryMuted: 'rgba(99,102,241,0.12)',
    secondary:    '#8b5cf6',
  },
});

<ThemeProvider theme={myTheme}>
  <App />
</ThemeProvider>
```

---

## Glass Engine

The `@reactnatively/glass` package is the rendering core of the framework.

### Capability Detection

At module load time, `CapabilityDetector` inspects the runtime environment:

```
IS_FULL_GLASS    — iOS + expo-blur + react-native-linear-gradient
IS_PARTIAL_GLASS — expo-blur available, no gradient (or vice versa)
IS_NO_GLASS      — Neither dep present, or older Android without blur support
```

Components branch on these constants to select the appropriate render path. No component ever renders a broken blur or falls into an error state.

### The 5-Layer Stack

Every `GlassView` renders the same layer contract — only the implementation of each layer varies:

```
┌──────────────────────────────────────────┐
│  7. Children (content layer)             │
├──────────────────────────────────────────┤
│  6. Border ring  (1px glass edge)        │
├──────────────────────────────────────────┤
│  5. Highlight    (top-edge refraction)   │
├──────────────────────────────────────────┤
│  4. Tint overlay (color + opacity)       │
├──────────────────────────────────────────┤
│  3. BlurView     (native platform blur)  │
│     ↳ expo-blur on iOS / Android         │
│     ↳ solid fallback when absent         │
├──────────────────────────────────────────┤
│  2. Clip shell   (overflow: hidden)      │
├──────────────────────────────────────────┤
│  1. Shadow shell (elevation, no clip)    │
└──────────────────────────────────────────┘
```

The shadow shell intentionally sits *outside* the clip boundary — iOS shadow rendering and Android `elevation` both require the parent view to have no `overflow: hidden`. The clip shell isolates the blur stack. Children always render above all glass layers at the correct z-level.

### Optional Dependency Loading

`expo-blur` and `react-native-linear-gradient` are loaded with safe `require()` calls that cache after the first attempt:

```ts
function loadBlurView(): BlurView | null {
  if (BlurViewImpl !== undefined) return BlurViewImpl;
  try { BlurViewImpl = require('expo-blur').BlurView; }
  catch { BlurViewImpl = null; }
  return BlurViewImpl;
}
```

The require overhead is paid once at module initialization. Neither package needs to be in your `dependencies` — they're consumed only if the host app has them installed.

---

## Components

### Layout
`Box` `Stack` `HStack` `VStack` `Flex` `Grid` `Center` `Spacer` `Container` `Divider` `AspectRatio` `Surface`

### Typography
`Text` `Heading` `Caption` `Paragraph` `Link` `Code` `GradientText`

### Inputs
`Button` `IconButton` `FAB`

### Forms
`FormControl` `TextInput` `PasswordInput` `TextArea` `SearchBar` `Checkbox` `Radio` `RadioGroup` `Switch` `Slider` `RangeSlider` `OTPInput` `Select` `MultiSelect` `DatePicker` `TimePicker`

### Data Display
`LiquidCard` `Avatar` `Badge` `Chip` `List` `ListItem` `Accordion` `Timeline` `Carousel` `StatsCard` `Table`

### Feedback
`Alert` `Banner` `Toast` `ToastProvider` `Skeleton` `ProgressBar` `Spinner` `EmptyState` `Dialog` `BottomSheet` `Tooltip` `Popover` `SnackbarProvider`

### Navigation
`Tabs` `SegmentedTabs` `TopNavigation` `BottomNavigation` `Drawer` `Sidebar` `Breadcrumb` `Stepper`

### Overlays
`Modal` `ActionSheet` `CommandPalette` `ContextMenu` `HoverCard`

### Motion
`Fade` `Scale` `Slide` `BlurTransition` `MagneticPressable`

### Advanced Glass
`BlurSurface` `DynamicIsland` `FloatingDock` `MorphingContainer` `GlassNavbar` `GlassSidebar` `InteractiveGlassSurface` `FloatingMediaPanel`

---

## Performance Architecture

### UI-Thread Animations

Every animation runs via Reanimated v3 worklets. The `'worklet'` directive inside `useAnimatedStyle` callbacks ensures the animation loop never touches the JavaScript thread:

```ts
const animatedStyle = useAnimatedStyle((): ViewStyle => {
  'worklet';
  return {
    transform: [{ scale: interpolate(pressed.value, [0, 1], [1, 0.96]) }],
    opacity:   interpolate(pressed.value, [0, 1], [1, 0.88]),
  };
});
```

This matters most on low-end Android where JS-thread animations drop frames the moment the thread is busy with any other work.

### Render Memoization

Every component is wrapped in `React.memo`. Context values are stabilized with `useMemo` to prevent subtree-wide re-renders on unrelated state changes:

```ts
// Tabs context — only re-renders consumers when activeTab actually changes
const ctx = useMemo(
  () => ({ activeTab, setActiveTab, variant, orientation }),
  [activeTab, setActiveTab, variant, orientation],
);
```

Expensive style objects (border configs, container shapes, size lookups) are memoized separately from animation styles, so Reanimated can drive animations without triggering React reconciliation.

### O(1) Variant Lookups

`@reactnatively/utils` exports `defineVariants()` — a typed wrapper that builds a frozen Record and returns a lookup function. No switch chains, no if-else towers:

```ts
const SIZE_CONFIG = defineVariants<string, ButtonSizeConfig>({
  xs: { paddingVertical: 5,  fontSize: 12, borderRadius: 8  },
  md: { paddingVertical: 11, fontSize: 15, borderRadius: 12 },
  xl: { paddingVertical: 18, fontSize: 19, borderRadius: 16 },
});

// At render time: constant-time lookup
const sz = SIZE_CONFIG(size);
```

### Adaptive Glass Degradation

The glass system never renders expensive blur layers on devices that won't benefit. Capability constants are evaluated once at startup:

- **Full glass** — iOS + expo-blur + linear-gradient: all 5 layers with native `BlurView`
- **Partial glass** — BlurView only: blur + tint + solid highlight fallback
- **No glass** — older Android, missing deps: solid semi-transparent surface with the same structural hierarchy

Apps on low-end Android never pay for blur setup, context initialization, or failed native calls.

### Tree Shaking

All packages are built with `tsup` in `treeshake: true` + `splitting: true` mode. `sideEffects: false` is set in every `package.json`. Sub-packages are marked external in each consumer's tsup config to prevent duplication:

```ts
// A single import pulls in only Button's code + its deps
import { Button } from '@reactnatively/core';
```

---

## Theming

The `@reactnatively/theme` token system is the source of truth for every visual property.

### Semantic Color Tokens

Components never hardcode colors — they reference semantic tokens that resolve per color scheme:

```ts
theme.colors.text           // Primary text
theme.colors.textSecondary  // Subdued text
theme.colors.textMuted      // Placeholders, captions
theme.colors.background     // Page background
theme.colors.backgroundDeep // Elevated surfaces
theme.colors.surface        // Card and sheet backgrounds
theme.colors.border         // Separators, input outlines
theme.colors.primary        // Brand action color
theme.colors.primaryMuted   // Tinted backgrounds
theme.colors.error          // Validation, destructive actions
theme.colors.success        // Confirmation, positive states
```

### Glass Token Scale

The blur scale is token-driven. Each elevation level maps to a full glass configuration:

```ts
glassTokens[3] = {
  blurAmount:    28,
  tintOpacity:   0.45,
  highlightStop: 0.22,
  borderOpacity: 0.18,
  shadowRadius:  24,
  shadowOpacity: 0.35,
}
```

Changing `elevation` on any glass component slides through this scale automatically.

### Custom Theme

```tsx
import { createTheme, ThemeProvider } from '@reactnatively/core';
import type { InferTheme } from '@reactnatively/core';

const theme = createTheme({
  colors: {
    primary:      '#6366f1',
    primaryHover: '#4f46e5',
    primaryMuted: 'rgba(99,102,241,0.12)',
    secondary:    '#8b5cf6',
  },
});

// Fully inferred — TypeScript knows your custom token keys
type MyTheme = InferTheme<typeof theme>;

<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>
```

---

## Developer Experience

### FormControl — Context-Driven Form State

Wrap any input in `FormControl` and it inherits label, error, required, disabled, and readonly state without prop drilling:

```tsx
<FormControl
  label="Email address"
  errorText={errors.email}
  isRequired
  isInvalid={!!errors.email}
>
  <TextInput placeholder="you@example.com" />
</FormControl>
```

### Controlled and Uncontrolled Modes

Every input and disclosure component supports both. Pass `value` + `onChange` for controlled; omit both for uncontrolled:

```tsx
// Controlled
<TextInput value={email} onChangeText={setEmail} label="Email" />

// Uncontrolled — internal state manages value
<TextInput defaultValue="prefilled@example.com" label="Email" />
```

### Accessible by Default

Interactive components declare their semantics without opt-in:

```tsx
// Button automatically sets:
accessible
accessibilityRole="button"
accessibilityLabel={label}
accessibilityState={{ disabled, busy: loading }}
```

Reduced motion is respected globally. `useReducedMotion()` wraps `AccessibilityInfo.isReduceMotionEnabled` and short-circuits or disables animations for users with that preference enabled.

---

## Monorepo Development

### Setup

```sh
# Requires Node 22+ and pnpm 9.4+
node --version  # v22.x.x
pnpm --version  # 9.4.x

git clone https://github.com/hakizimana-fred/reactnatively.git
cd reactnatively
pnpm install
```

### Commands

```sh
pnpm build       # Build all packages in dependency order (Turborepo)
pnpm dev         # Watch mode for active package development
pnpm typecheck   # Type-check the entire monorepo
pnpm test        # Run all test suites
pnpm playground  # Start the Expo playground app
```

### Playground

The playground is an Expo Router app that imports directly from workspace packages via pnpm workspace linking. Changes to any package source are reflected immediately — no publish step, no npm link, no symlink juggling.

### Adding a Component

1. Create `packages/core/src/components/<category>/<Name>/`
2. Add `<Name>.tsx`, `<Name>.types.ts`, `index.ts`
3. Export from `packages/core/src/index.ts`

Component contract:
- `React.memo` wrapper + `displayName` set
- `useTheme()` for all colors — no hardcoded hex
- `accessibilityRole` and `accessibilityState` on interactive surfaces
- `'worklet'` directive in every `useAnimatedStyle` callback

---

## Roadmap

### v0.1 — Current

- [x] 83+ production components across 10 categories
- [x] 5-layer adaptive glass rendering engine
- [x] Reanimated v3 worklet animation system
- [x] Token-driven theme engine with automatic dark mode
- [x] Full TypeScript with compound component types
- [x] Expo + Bare RN compatibility
- [x] Tree-shakeable dual CJS/ESM packages
- [x] Capability-aware glass degradation
- [x] Playground app with Expo Router

### v0.2 — Near Term

- [ ] Documentation site with live previews
- [ ] Storybook integration for isolated component development
- [ ] `@reactnatively/cli` — scaffold components and themes
- [ ] Haptic feedback integration via `expo-haptics`
- [ ] Gesture-driven components (swipe-to-dismiss, pull-to-refresh, drag handles)
- [ ] `react-native-skia` path for custom glass paint

### v0.3+ — Longer Term

- [ ] Sub-path exports for granular code splitting (`@reactnatively/core/forms`)
- [ ] React Native Web production support
- [ ] First-party icon set designed for glass surfaces
- [ ] Visual regression testing via Maestro or Detox
- [ ] `createComponentTheme()` for per-component token overrides
- [ ] Animation recording panel in the playground

---

## Contributing

Contributions that align with the framework's architectural direction are welcome.

### Before Opening a PR

Consider whether the change:
- Respects the rendering contract (no hardcoded colors, no JS-thread animations)
- Adds real capability rather than wrapping an existing component
- Keeps bundle impact proportional to feature value
- Works on Expo and Bare RN without configuration switches

### Commit Convention

```
feat(core): add PinInput component with glass variant
fix(glass): correct highlight gradient height on small borderRadius
perf(animations): memoize spring config object in usePressAnimation
chore: update peer dep range for expo-blur
```

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

<div align="center">

Built with the conviction that mobile interfaces can feel cinematic.

</div>
