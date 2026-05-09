import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type DrawerPlacement = 'left' | 'right';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  placement?: DrawerPlacement;
  width?: number;
  children: ReactNode;
  glass?: boolean;
  backdrop?: boolean;
  style?: StyleProp<ViewStyle>;
}
