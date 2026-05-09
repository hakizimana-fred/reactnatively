import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type SlideDirection = 'up' | 'down' | 'left' | 'right';

export interface SlideProps {
  in?:        boolean;
  direction?: SlideDirection;
  distance?:  number;
  duration?:  number;
  children:   ReactNode;
  style?:     StyleProp<ViewStyle>;
}
