import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface ScaleProps {
  in?:       boolean;
  from?:     number;
  to?:       number;
  duration?: number;
  children:  ReactNode;
  style?:    StyleProp<ViewStyle>;
}
