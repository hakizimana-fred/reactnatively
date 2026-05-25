// ─── Surface ──────────────────────────────────────────────────────────────────
export { Surface } from './Surface';
export type { SurfaceProps, GlassSurfaceConfig } from './Surface';

// ─── GlassPressable ───────────────────────────────────────────────────────────
export { GlassPressable } from './GlassPressable';
export type { GlassPressableProps } from './GlassPressable';

// ─── Portal system ────────────────────────────────────────────────────────────
export { Portal, PortalHost, PortalProvider, usePortal } from './Portal';
export type { PortalContextValue, PortalEntry } from './Portal';

// ─── Slot ─────────────────────────────────────────────────────────────────────
export { Slot } from './Slot';

// ─── GlassText ────────────────────────────────────────────────────────────────
export { GlassText } from './GlassText';
export type { GlassTextProps, GlassTextVariant, GlassTextWeight } from './GlassText';

// ─── Accessibility ───────────────────────────────────────────────────────────
export {
  AccessibilityProvider,
  useAccessibilityPolicy,
  VisuallyHidden,
} from './AccessibilityProvider';
export type {
  AccessibilityProviderProps,
  AccessibilityPolicy,
  AccessibilityContextValue,
  VisuallyHiddenProps,
} from './AccessibilityProvider';
