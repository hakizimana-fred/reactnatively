import type { StyleProp, TextStyle, TextProps as RNTextProps } from 'react-native';

export interface GradientTextProps extends Omit<RNTextProps, 'style'> {
  colors?: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  children?: string;
  style?: StyleProp<TextStyle>;
}
