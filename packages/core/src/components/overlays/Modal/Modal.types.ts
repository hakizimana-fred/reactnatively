import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
  isOpen:           boolean;
  onClose:          () => void;
  children:         ReactNode;
  title?:           string;
  size?:            ModalSize;
  glass?:           boolean;
  isDismissible?:   boolean;
  showCloseButton?: boolean;
  style?:           StyleProp<ViewStyle>;
}
