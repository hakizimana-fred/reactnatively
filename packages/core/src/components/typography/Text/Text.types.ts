import type { StyleProp, TextStyle, TextProps as RNTextProps } from 'react-native';
import type { ReactNode } from 'react';

export type TextVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold';

export interface TextProps extends Omit<RNTextProps, 'style'> {
  variant?: TextVariant;
  weight?: TextWeight;
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
  children?: ReactNode;
}
