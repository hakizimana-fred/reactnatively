// ─── Layout ───────────────────────────────────────────────────────────────────
export { Box } from './components/layout/Box';
export type { BoxProps } from './components/layout/Box';

export { Stack, HStack, VStack } from './components/layout/Stack';
export type { StackProps } from './components/layout/Stack';

// ─── Inputs ───────────────────────────────────────────────────────────────────
export { Button } from './components/inputs/Button';
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  ButtonColor,
  GlassButtonConfig,
} from './components/inputs/Button';

// ─── Data Display ─────────────────────────────────────────────────────────────
export { LiquidCard } from './components/data-display/Card';
export type {
  LiquidCardProps,
  LiquidCardHeaderProps,
  LiquidCardBodyProps,
  LiquidCardFooterProps,
  LiquidCardImageProps,
} from './components/data-display/Card';

export { Avatar } from './components/data-display/Avatar';
export type { AvatarProps, AvatarSize } from './components/data-display/Avatar';

// ─── Feedback ─────────────────────────────────────────────────────────────────
export { Toast, ToastProvider, toast } from './components/feedback/Toast';
export type {
  ToastOptions,
  ToastItem,
  ToastType,
  ToastPosition,
  ToastAction,
} from './components/feedback/Toast';

export { Skeleton } from './components/feedback/Skeleton';
export type { SkeletonProps, SkeletonVariant } from './components/feedback/Skeleton';

// ─── Re-exports from sub-packages for convenience ─────────────────────────────
// Consumers can import everything from @reactnatively/core
export {
  ThemeProvider,
  useTheme,
  useColorScheme,
  useIsDark,
  useToken,
  createTheme,
  baseTheme,
  glassTokens,
  spacing,
  radii,
  typography,
  shadows,
  motion,
  springs,
} from '@reactnatively/theme';

export type {
  BaseTheme,
  ThemeColors,
  GlassElevation,
  GlassTintVariant,
  ColorSchemePreference,
  ResolvedColorScheme,
  InferTheme,
} from '@reactnatively/theme';

export {
  GlassView,
  FrostPanel,
  GLASS_CAPABILITY,
  SUPPORTS_BLUR,
  IS_FULL_GLASS,
  IS_PARTIAL_GLASS,
  IS_NO_GLASS,
  useGlassStyle,
} from '@reactnatively/glass';

export type {
  GlassViewProps,
  FrostPanelProps,
  GlassConfig,
  ResolvedGlassStyle,
} from '@reactnatively/glass';

export {
  usePressAnimation,
  useEntranceAnimation,
  useReducedMotion,
  useSpring,
  useDuration,
  SPRING_SNAPPY,
  SPRING_LIQUID,
  SPRING_REVEAL,
  SPRING_BOUNCE,
  SPRING_PRECISE,
  TIMING_FAST,
  TIMING_NORMAL,
  TIMING_SLOW,
  TIMING_ENTER,
  TIMING_EXIT,
} from '@reactnatively/animations';
