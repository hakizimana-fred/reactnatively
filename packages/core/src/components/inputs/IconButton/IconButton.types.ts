import type { ReactNode } from 'react';
import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import type { ButtonColor } from '../Button/Button.types';

export type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconButtonVariant = 'solid' | 'outline' | 'ghost' | 'glass';

export interface IconButtonProps {
  icon:               ReactNode;
  size?:              IconButtonSize;
  variant?:           IconButtonVariant;
  color?:             ButtonColor;
  isDisabled?:        boolean;
  isLoading?:         boolean;
  onPress?:           (e: GestureResponderEvent) => void;
  accessibilityLabel: string;
  borderRadius?:      number;
  glass?:             boolean;
  style?:             StyleProp<ViewStyle>;
}
