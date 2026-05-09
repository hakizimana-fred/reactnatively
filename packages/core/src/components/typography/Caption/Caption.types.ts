import type { StyleProp, TextStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface CaptionProps {
  color?: string;
  align?: 'left' | 'center' | 'right';
  style?: StyleProp<TextStyle>;
  children?: ReactNode;
}
