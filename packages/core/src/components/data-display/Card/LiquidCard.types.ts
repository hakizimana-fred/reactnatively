import type { StyleProp, ViewStyle, ImageStyle } from 'react-native';
import type { ReactNode } from 'react';
import type { GlassElevation, GlassTintVariant } from 'reactnatively-theme';

export interface LiquidCardProps {
  // Glass configuration
  elevation?:    GlassElevation;
  variant?:      GlassTintVariant;
  borderRadius?: number;
  glow?: {
    color:    string;
    radius?:  number;
    opacity?: number;
  } | false;
  border?:       boolean;

  // Interaction
  pressable?:    boolean;
  onPress?:      () => void;
  onLongPress?:  () => void;

  // Layout
  fullWidth?:    boolean;
  style?:        StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  children?:     ReactNode;
  testID?:       string;

  // Accessibility
  accessibilityLabel?: string;
  accessibilityHint?:  string;
}

export interface LiquidCardHeaderProps {
  children?:  ReactNode;
  style?:     StyleProp<ViewStyle>;
  bordered?:  boolean;
  compact?:   boolean;
}

export interface LiquidCardBodyProps {
  children?:  ReactNode;
  style?:     StyleProp<ViewStyle>;
  compact?:   boolean;
}

export interface LiquidCardFooterProps {
  children?:  ReactNode;
  style?:     StyleProp<ViewStyle>;
  bordered?:  boolean;
  compact?:   boolean;
}

export interface LiquidCardImageProps {
  source:     { uri: string } | number;
  height?:    number;
  style?:     StyleProp<ImageStyle>;
  rounded?:   boolean;
}
