import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface BlurTransitionProps {
  in?:         boolean;
  blurAmount?: number;
  duration?:   number;
  children:    ReactNode;
  style?:      StyleProp<ViewStyle>;
}
