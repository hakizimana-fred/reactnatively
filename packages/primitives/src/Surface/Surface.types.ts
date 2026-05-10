import type { StyleProp, ViewStyle, ViewProps } from 'react-native';
import type { ReactNode } from 'react';
import type { GlassElevation, GlassTintVariant, GlassHighlight } from 'reactnatively-theme';
import type { RadiiKey } from 'reactnatively-theme';

/**
 * Full glass configuration for when fine-grained control is needed.
 * Pass this as the `glass` prop to Surface.
 */
export interface GlassSurfaceConfig {
  elevation?:    GlassElevation;
  variant?:      GlassTintVariant;
  highlight?:    GlassHighlight | boolean;
  border?:       boolean;
  borderWidth?:  number;
  blurOverride?: number;
  tintOverride?: string;
  glow?:         { color: string; radius?: number; opacity?: number } | false;
}

/**
 * Surface is the unified rendering unit.
 *
 * - glass={true}                 → GlassView with optional shorthand elevation/variant
 * - glass={GlassSurfaceConfig}   → GlassView with full config
 * - glass={false} | undefined    → plain View with optional bg color
 * - animated={true}              → wraps the output in Reanimated Animated.View
 */
export interface SurfaceProps extends Omit<ViewProps, 'style'> {
  /** Enable glass rendering. Pass true for defaults or a GlassSurfaceConfig for full control. */
  glass?:         boolean | GlassSurfaceConfig;
  /** Shorthand glass elevation — only meaningful when glass=true */
  elevation?:     GlassElevation;
  /** Shorthand glass variant — only meaningful when glass=true */
  variant?:       GlassTintVariant;
  /** Solid background color (used when glass is false or undefined) */
  bg?:            string;
  /** Border radius — accepts a RadiiKey token name or a raw pixel number */
  borderRadius?:  number | RadiiKey;
  /** Show a border ring */
  border?:        boolean;
  /** Border color override */
  borderColor?:   string;
  /** Border width override */
  borderWidth?:   number;
  /** Wrap in Reanimated Animated.View for animated transforms */
  animated?:      boolean;
  style?:         StyleProp<ViewStyle>;
  /** Style applied to the inner content wrapper (passed through to GlassView contentStyle or plain View) */
  contentStyle?:  StyleProp<ViewStyle>;
  children?:      ReactNode;
}
