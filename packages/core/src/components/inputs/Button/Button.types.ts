import type { PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { ReactNode } from 'react';
import type { GlassElevation, GlassTintVariant } from '@reactnatively/theme';

export type ButtonVariant =
  | 'solid'       // filled background, primary action
  | 'outline'     // border only, transparent background
  | 'ghost'       // no border, transparent — subtle action
  | 'glass'       // liquid glass backing — premium feel
  | 'tinted'      // light tinted background (ghost but with fill)
  | 'destructive'; // red variant for delete/danger actions

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'danger'    // alias for error
  | 'neutral';

export interface ButtonSizeConfig {
  paddingVertical:   number;
  paddingHorizontal: number;
  fontSize:          number;
  lineHeight:        number;
  borderRadius:      number;
  iconSize:          number;
  loaderSize:        'small' | 'large';
}

export interface GlassButtonConfig {
  elevation?:  GlassElevation;
  variant?:    GlassTintVariant;
  glow?:       boolean;
  glowColor?:  string;
}

export interface ButtonProps extends Omit<PressableProps, 'style' | 'children'> {
  // Variant system
  variant?:      ButtonVariant;
  size?:         ButtonSize;
  color?:        ButtonColor;

  // Content — use label for simple text, children for custom content
  label?:        string;
  children?:     ReactNode;
  leftIcon?:     ReactNode;
  rightIcon?:    ReactNode;

  // State
  loading?:      boolean;
  disabled?:     boolean;

  // Layout
  fullWidth?:    boolean;
  flex?:         number;

  // Glass config — only used when variant="glass"
  glass?:        GlassButtonConfig;

  // Style overrides
  style?:        StyleProp<ViewStyle>;
  textStyle?:    StyleProp<TextStyle>;
  pressedStyle?: StyleProp<ViewStyle>;

  // Accessibility
  accessibilityLabel?: string;
  accessibilityHint?:  string;
}
