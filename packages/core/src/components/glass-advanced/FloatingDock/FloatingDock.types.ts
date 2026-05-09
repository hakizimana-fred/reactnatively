import type { StyleProp, ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface DockItem {
  icon: ReactNode;
  label: string;
  onPress: () => void;
}

export interface FloatingDockProps {
  items: DockItem[];
  position?: 'bottom' | 'top';
  glass?: boolean;
  /** Items scale up on touch proximity */
  magnification?: boolean;
  style?: StyleProp<ViewStyle>;
}
