import type { StyleProp, TextStyle, TextProps as RNTextProps } from 'react-native';
import type { ReactNode } from 'react';
import type { TextWeight } from '../Text/Text.types';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps extends Omit<RNTextProps, 'style'> {
  level?: HeadingLevel;
  weight?: TextWeight;
  color?: string;
  align?: 'left' | 'center' | 'right';
  style?: StyleProp<TextStyle>;
  children?: ReactNode;
}
