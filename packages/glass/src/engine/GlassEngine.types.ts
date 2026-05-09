import type { GlassElevation, GlassTintVariant, GlassHighlight } from '@reactnatively/theme';
import type { GlassCapability } from './CapabilityDetector';

export type { GlassCapability };

export interface GlassConfig {
  elevation?:   GlassElevation;
  variant?:     GlassTintVariant;
  highlight?:   GlassHighlight | boolean;
  border?:      boolean;
  borderWidth?: number;
  // Override: custom blur intensity (0-100). Bypasses the elevation system.
  blurOverride?: number;
  // Override: custom tint color. Bypasses the variant system.
  tintOverride?: string;
  // Optional glow effect
  glow?: {
    color:   string;
    radius?: number;
    opacity?: number;
  } | false;
}

export interface ResolvedGlassStyle {
  blurAmount:     number;
  blurTint:       'light' | 'dark' | 'default';
  tintColor:      string;
  highlightColor: string;
  borderColor:    string;
  borderWidth:    number;
  shadowColor:    string;
  shadowOpacity:  number;
  shadowRadius:   number;
  shadowOffset:   { width: number; height: number };
  androidElevation: number;
  capability:     GlassCapability;
}
