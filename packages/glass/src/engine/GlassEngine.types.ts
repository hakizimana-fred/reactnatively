import type {
  GlassElevation,
  GlassTintVariant,
  GlassHighlight,
  MaterialRecipe,
} from 'reactnatively-theme';
import type { GlassCapability } from './CapabilityDetector';
import type { GlassSurfacePriority } from './GlassMaterialProvider';

export type { GlassCapability };

export interface GlassConfig {
  elevation?:   GlassElevation;
  variant?:     GlassTintVariant;
  material?:    MaterialRecipe;
  priority?:    GlassSurfacePriority;
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
  blurAmount:             number;
  blurTint:               'light' | 'dark' | 'default';
  tintColor:              string;
  diffusionColor:         string;
  diffusionOpacity:       number;
  lowerDiffusionColor:    string;
  lowerDiffusionOpacity:  number;
  highlightColor:         string;
  highlightOpacity:       number;
  highlightFadeOpacity:   number;
  edgeHighlightColor:     string;
  edgeHighlightOpacity:   number;
  borderColor:            string;
  borderWidth:            number;
  innerBorderColor:       string;
  shadowColor:            string;
  shadowOpacity:          number;
  shadowRadius:           number;
  shadowOffset:           { width: number; height: number };
  androidElevation: number;
  capability:             GlassCapability;
}
