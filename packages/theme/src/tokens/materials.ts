import { glassTokens } from './glass';
import { shadows } from './shadows';

export const materialTokens = {
  thin: {
    elevation: 1,
    variant: 'thin',
    blur: glassTokens.blur.light,
    tintOpacity: 0.08,
    border: 'subtle',
    highlight: 'subtle',
    shadow: 'sm',
  },
  regular: {
    elevation: 2,
    variant: 'surface',
    blur: glassTokens.blur.medium,
    tintOpacity: 0.1,
    border: 'medium',
    highlight: 'medium',
    shadow: 'md',
  },
  thick: {
    elevation: 3,
    variant: 'elevated',
    blur: glassTokens.blur.heavy,
    tintOpacity: 0.12,
    border: 'medium',
    highlight: 'medium',
    shadow: 'lg',
  },
  chrome: {
    elevation: 4,
    variant: 'overlay',
    blur: glassTokens.blur.intense,
    tintOpacity: 0.14,
    border: 'strong',
    highlight: 'strong',
    shadow: 'xl',
  },
  hud: {
    elevation: 4,
    variant: 'frosted',
    blur: glassTokens.blur.intense,
    tintOpacity: 0.16,
    border: 'strong',
    highlight: 'intense',
    shadow: 'glassGlow',
  },
  panel: {
    elevation: 2,
    variant: 'surface',
    blur: glassTokens.blur.medium,
    tintOpacity: 0.1,
    border: 'medium',
    highlight: 'medium',
    shadow: 'md',
  },
  bar: {
    elevation: 3,
    variant: 'thin',
    blur: glassTokens.blur.heavy,
    tintOpacity: 0.075,
    border: 'subtle',
    highlight: 'subtle',
    shadow: 'sm',
  },
  popover: {
    elevation: 4,
    variant: 'elevated',
    blur: glassTokens.blur.heavy,
    tintOpacity: 0.13,
    border: 'strong',
    highlight: 'strong',
    shadow: 'xl',
  },
  sheet: {
    elevation: 5,
    variant: 'overlay',
    blur: glassTokens.blur.intense,
    tintOpacity: 0.15,
    border: 'strong',
    highlight: 'strong',
    shadow: 'xl',
  },
} as const;

export const stateTokens = {
  pressed: { scale: 0.96, opacity: 0.88 },
  hovered: { tintLift: 0.04, borderLift: 0.08 },
  focused: { ringWidth: 2, ringOffset: 2 },
  selected: { tintLift: 0.08, borderLift: 0.12 },
  disabled: { opacity: 0.45 },
  loading: { opacity: 0.72 },
  invalid: { ringWidth: 2 },
} as const;

export const zDepth = {
  base: 0,
  raised: 10,
  sticky: 100,
  nav: 200,
  dock: 300,
  dropdown: 400,
  popover: 500,
  tooltip: 600,
  toast: 700,
  sheet: 800,
  modal: 900,
  command: 950,
} as const;

export const breakpoints = {
  compact: 0,
  phone: 360,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
} as const;

export const density = {
  compact: { scale: 0.88, controlHeight: 36, gap: 8 },
  regular: { scale: 1, controlHeight: 44, gap: 12 },
  spacious: { scale: 1.12, controlHeight: 52, gap: 16 },
} as const;

export const accessibilityTokens = {
  minTouchTarget: 44,
  minContrast: {
    body: 4.5,
    largeText: 3,
    nonText: 3,
  },
  fontScale: {
    min: 0.85,
    max: 1.4,
    iconMax: 1.15,
  },
  transparency: {
    reducedTintOpacity: 0.94,
    reducedBlur: 0,
  },
} as const;

export const hapticTokens = {
  selection: 'selection',
  press: 'light',
  commit: 'medium',
  destructive: 'heavy',
  boundary: 'rigid',
  success: 'success',
  warning: 'warning',
  error: 'error',
} as const;

export const componentTokens = {
  button: {
    defaultMaterial: 'regular',
    defaultRadius: 'md',
    minHeight: accessibilityTokens.minTouchTarget,
  },
  field: {
    defaultMaterial: 'thin',
    defaultRadius: 'lg',
    minHeight: accessibilityTokens.minTouchTarget,
  },
  overlay: {
    backdropOpacity: 0.56,
    material: 'sheet',
    shadow: shadows.xl,
  },
  navigation: {
    material: 'bar',
    minHeight: 56,
  },
} as const;

export type MaterialTokens = typeof materialTokens;
export type MaterialRecipe = keyof MaterialTokens;
export type StateTokens = typeof stateTokens;
export type ZDepth = typeof zDepth;
export type Breakpoints = typeof breakpoints;
export type Density = typeof density;
export type DensityMode = keyof Density;
export type AccessibilityTokens = typeof accessibilityTokens;
export type HapticTokens = typeof hapticTokens;
export type ComponentTokens = typeof componentTokens;
