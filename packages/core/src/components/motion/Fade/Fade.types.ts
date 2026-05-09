import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface FadeProps {
  in?:        boolean;
  duration?:  number;
  delay?:     number;
  children:   ReactNode;
  style?:     StyleProp<ViewStyle>;
  onEntered?: () => void;
  onExited?:  () => void;
}
