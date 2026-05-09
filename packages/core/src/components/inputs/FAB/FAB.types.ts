import type { ReactNode } from 'react';
import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';

export type FABSize = 'sm' | 'md' | 'lg';
export type FABVariant = 'solid' | 'glass';
export type FABPosition = 'bottomRight' | 'bottomLeft' | 'bottomCenter' | 'topRight';

export interface FABProps {
  icon:        ReactNode;
  label?:      string;
  size?:       FABSize;
  variant?:    FABVariant;
  color?:      string;
  position?:   FABPosition;
  onPress?:    (e: GestureResponderEvent) => void;
  isDisabled?: boolean;
  style?:      StyleProp<ViewStyle>;
}
