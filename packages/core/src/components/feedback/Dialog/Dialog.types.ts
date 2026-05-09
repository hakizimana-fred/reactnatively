import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  actions?: Array<{
    label: string;
    onPress: () => void;
    variant?: 'solid' | 'outline' | 'ghost';
    color?: string;
    isDestructive?: boolean;
  }>;
  isDismissible?: boolean;
  glass?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'full';
  style?: StyleProp<ViewStyle>;
}
