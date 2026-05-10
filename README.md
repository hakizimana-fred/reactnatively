# reactnatively

A Liquid Glass UI system for React Native & Expo. 60+ components with native blur, depth, and glass effects — fully typed, tree-shakeable, dark mode ready.

```sh
npm install reactnatively
```

---

## Requirements

| Peer dependency | Version |
|---|---|
| `react` | ≥ 18.0.0 |
| `react-native` | ≥ 0.73.0 |
| `react-native-reanimated` | ≥ 3.6.0 |
| `react-native-gesture-handler` | ≥ 2.14.0 |
| `expo-blur` *(optional)* | ≥ 13.0.0 |
| `react-native-linear-gradient` *(optional)* | ≥ 2.8.0 |

---

## Setup

Wrap your app root with `ThemeProvider` and `ToastProvider`:

```tsx
import { ThemeProvider, ToastProvider } from 'reactnatively';

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        {/* your app */}
      </ToastProvider>
    </ThemeProvider>
  );
}
```

---

## GlassView

The foundational primitive every glass component is built on.

```tsx
import { GlassView } from 'reactnatively';

<GlassView elevation={2} borderRadius={16} style={{ padding: 16 }}>
  <Text>Liquid glass surface</Text>
</GlassView>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `elevation` | `0 – 5` | `2` | Blur intensity and tint depth |
| `variant` | `'ultraThin' \| 'thin' \| 'surface' \| 'elevated'` | `'surface'` | Glass tint style |
| `highlight` | `boolean` | `true` | Top-edge refraction shimmer |
| `border` | `boolean` | `true` | 1px glass edge line |
| `borderWidth` | `number` | `1` | Border thickness |
| `borderRadius` | `number` | `16` | Corner radius |
| `blurOverride` | `number` | — | Override computed blur amount |
| `tintOverride` | `string` | — | Override tint color |
| `glow` | `{ color: string; radius?: number; opacity?: number }` | — | Outer glow (iOS) |
| `style` | `StyleProp<ViewStyle>` | — | Outer container style |
| `contentStyle` | `StyleProp<ViewStyle>` | — | Inner content style |

### Elevation scale

| Level | Blur | Tint opacity | Best for |
|---|---|---|---|
| `0` | none | 95% | Solid tinted surface |
| `1` | 12px | 82% | Subtle card |
| `2` | 24px | 72% | Standard card |
| `3` | 40px | 65% | Modal, sheet |
| `4` | 55px | 55% | Overlay |
| `5` | 72px | 45% | Maximum transparency |

---

## Components

### Layout

```tsx
import { Box, Stack, HStack, VStack, Flex, Grid, Center, Spacer, Container, Divider } from 'reactnatively';

<Stack gap={12}>
  <HStack gap={8} align="center">
    <Box width={40} height={40} />
    <Text>Item</Text>
  </HStack>
</Stack>
```

### Button

```tsx
import { Button } from 'reactnatively';

<Button label="Save" />
<Button label="Delete" color="danger" variant="outline" />
<Button label="Glass" variant="glass" />
<Button label="Loading" loading />
<Button label="Full width" fullWidth />
```

| Prop | Options |
|---|---|
| `variant` | `'solid'` `'outline'` `'ghost'` `'glass'` `'tinted'` `'destructive'` |
| `size` | `'xs'` `'sm'` `'md'` `'lg'` `'xl'` |
| `color` | `'primary'` `'secondary'` `'success'` `'warning'` `'danger'` `'neutral'` |

Additional props: `leftIcon`, `rightIcon`, `loading`, `disabled`, `fullWidth`, `flex`, `style`, `textStyle`.

### Forms

```tsx
import {
  FormControl, TextInput, PasswordInput, TextArea, SearchBar,
  Checkbox, Radio, RadioGroup, Switch, Slider, RangeSlider,
  Select, MultiSelect, OTPInput, DatePicker, TimePicker,
} from 'reactnatively';

<TextInput label="Email" placeholder="you@example.com" />
<PasswordInput label="Password" />
<Checkbox label="Remember me" checked={checked} onChange={setChecked} />
<Switch value={enabled} onValueChange={setEnabled} />
<Select
  options={[{ label: 'Option A', value: 'a' }]}
  value={val}
  onChange={setVal}
/>
<OTPInput length={6} onComplete={handleOTP} />
```

### Data display

```tsx
import { LiquidCard, Avatar, Badge, Chip, Accordion, Carousel, StatsCard, Table, Timeline, List } from 'reactnatively';

<LiquidCard>
  <LiquidCard.Header title="Title" subtitle="Subtitle" />
  <LiquidCard.Body>...</LiquidCard.Body>
  <LiquidCard.Footer>...</LiquidCard.Footer>
</LiquidCard>

<Avatar source={{ uri: '...' }} size="lg" />
<Badge label="New" color="success" />
<Chip label="React Native" onClose={() => {}} />
```

### Feedback

```tsx
import { Alert, Banner, Skeleton, ProgressBar, Spinner, EmptyState, Dialog, BottomSheet, Tooltip } from 'reactnatively';

<Alert variant="success" title="Saved" description="Your changes were saved." />
<Skeleton width={200} height={20} borderRadius={8} />
<ProgressBar value={0.6} color="primary" />
<Spinner size="lg" />
<EmptyState
  title="Nothing here yet"
  description="Add your first item to get started."
  action={<Button label="Add item" onPress={handleAdd} />}
/>
```

### Toast

```tsx
import { toast } from 'reactnatively';

toast.success('Saved successfully!');
toast.error('Something went wrong', { duration: 6000 });
toast.warning('Low storage space');
toast.info('Update available');

// Full control
const id = toast.show({
  message: 'Undo delete?',
  type: 'default',
  position: 'top',
  glass: true,
  action: { label: 'Undo', onPress: handleUndo },
});
toast.dismiss(id);
```

| Option | Type | Default |
|---|---|---|
| `message` | `string` | required |
| `type` | `'success' \| 'error' \| 'warning' \| 'info' \| 'default'` | `'default'` |
| `duration` | `number` (ms) | `4000` |
| `position` | `'top' \| 'bottom'` | `'bottom'` |
| `glass` | `boolean` | `true` |
| `action` | `{ label: string; onPress: () => void }` | — |

### Navigation

```tsx
import { Tabs, SegmentedTabs, TopNavigation, BottomNavigation, Drawer, Breadcrumb, Stepper, Sidebar } from 'reactnatively';

<SegmentedTabs
  tabs={['All', 'Active', 'Done']}
  activeIndex={active}
  onChange={setActive}
/>

<Breadcrumb
  items={[
    { label: 'Home', onPress: goHome },
    { label: 'Settings', onPress: goSettings },
    { label: 'Profile' },
  ]}
/>
```

### Overlays

```tsx
import { Modal, ActionSheet, CommandPalette, ContextMenu, HoverCard } from 'reactnatively';

<Modal visible={open} onClose={() => setOpen(false)} title="Confirm action">
  <Text>Are you sure you want to continue?</Text>
  <HStack gap={8}>
    <Button label="Cancel" variant="ghost" onPress={() => setOpen(false)} flex={1} />
    <Button label="Confirm" onPress={confirm} flex={1} />
  </HStack>
</Modal>
```

### Motion

```tsx
import { Fade, Scale, Slide, BlurTransition, MagneticPressable } from 'reactnatively';

<Fade visible={show}>
  <Text>Fades in and out</Text>
</Fade>

<MagneticPressable onPress={action}>
  <Button label="Magnetic" />
</MagneticPressable>
```

### Advanced glass

```tsx
import {
  BlurSurface,
  GlassNavbar,
  GlassSidebar,
  FloatingDock,
  DynamicIsland,
  MorphingContainer,
  InteractiveGlassSurface,
  FloatingMediaPanel,
} from 'reactnatively';

<GlassNavbar title="Home" rightAction={<IconButton icon={<SettingsIcon />} />} />
<FloatingDock items={dockItems} position="bottom" />
<DynamicIsland state={islandState} />
```

### Typography

```tsx
import { Heading, Text, Paragraph, Caption, Link, Code, GradientText } from 'reactnatively';

<Heading size="xl">Welcome back</Heading>
<Paragraph>Body text with comfortable line height.</Paragraph>
<Caption>Secondary information</Caption>
<Code>const x = 42</Code>
<GradientText colors={['#6366f1', '#8b5cf6']}>Gradient</GradientText>
```

---

## Theming

### useTheme

```tsx
import { useTheme, useIsDark, useToken } from 'reactnatively';

function MyComponent() {
  const { colors, spacing } = useTheme();
  const isDark = useIsDark();

  return (
    <View style={{ backgroundColor: isDark ? colors.surface.dark : colors.surface.light }}>
      ...
    </View>
  );
}
```

### Custom theme

```tsx
import { ThemeProvider, createTheme } from 'reactnatively';

const theme = createTheme({
  colors: {
    primary: '#6366f1',
    secondary: '#8b5cf6',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Design tokens

```tsx
import { spacing, radii, typography, shadows, motion, glassTokens } from 'reactnatively';

spacing.md          // 16
radii.lg            // 16
typography.fontSize.lg   // 18
motion.spring.snappy     // reanimated spring config
glassTokens.elevation[2] // blur, tint, shadow values for elevation 2
```

---

## Animation hooks

```tsx
import {
  usePressAnimation,
  useEntranceAnimation,
  useSpring,
  useReducedMotion,
  SPRING_LIQUID,
  SPRING_SNAPPY,
  TIMING_NORMAL,
} from 'reactnatively';

function AnimatedCard() {
  const { scale, handlers } = usePressAnimation();

  return (
    <Animated.View style={{ transform: [{ scale }] }} {...handlers}>
      <GlassView elevation={2}>
        <Text>Press me</Text>
      </GlassView>
    </Animated.View>
  );
}
```

| Constant | Feel |
|---|---|
| `SPRING_SNAPPY` | Quick, tight response |
| `SPRING_LIQUID` | Fluid, natural |
| `SPRING_REVEAL` | Gentle entrance |
| `SPRING_BOUNCE` | Playful overshoot |
| `SPRING_PRECISE` | No overshoot |

---

## TypeScript

All components and hooks are fully typed. Import types directly:

```tsx
import type {
  GlassViewProps,
  ButtonProps,
  ToastOptions,
  ThemeContextValue,
} from 'reactnatively';
```

---

## License

MIT © [Hakizimana Fred](https://github.com/hakizimana-fred)
