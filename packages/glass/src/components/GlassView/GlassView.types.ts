import type { StyleProp, ViewStyle, AccessibilityRole } from 'react-native';
import type { ReactNode } from 'react';
import type {
  GlassElevation,
  GlassTintVariant,
  GlassHighlight,
  MaterialRecipe,
} from 'reactnatively-theme';
import type { GlassSurfacePriority } from '../../engine/GlassMaterialProvider';

export interface GlassViewProps {
  elevation?:    GlassElevation;
  variant?:      GlassTintVariant;
  material?:     MaterialRecipe;
  priority?:     GlassSurfacePriority;
  highlight?:    GlassHighlight | boolean;
  border?:       boolean;
  borderWidth?:  number;
  borderRadius?: number;
  blurOverride?: number;
  tintOverride?: string;

  glow?: {
    color:    string;
    radius?:  number;
    opacity?: number;
  } | false;

  style?:        StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  children?:     ReactNode;
  testID?:       string;

  animated?:    boolean;

  accessible?:            boolean;
  accessibilityLabel?:    string;
  accessibilityRole?:     AccessibilityRole;
}
