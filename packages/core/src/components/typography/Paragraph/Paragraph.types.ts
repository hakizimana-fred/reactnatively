import type { StyleProp, TextStyle } from 'react-native';
import type { ReactNode } from 'react';

export type ParagraphSize = 'sm' | 'md' | 'lg';

export interface ParagraphProps {
  size?: ParagraphSize;
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  style?: StyleProp<TextStyle>;
  children?: ReactNode;
}
