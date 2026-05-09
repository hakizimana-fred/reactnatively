import type { StyleProp, TextStyle, TextProps as RNTextProps } from 'react-native';
import type { ReactNode } from 'react';

export interface LinkProps extends Omit<RNTextProps, 'style'> {
  href?: string;
  onPress?: () => void;
  color?: string;
  underline?: boolean;
  external?: boolean;
  children?: ReactNode;
  style?: StyleProp<TextStyle>;
}
