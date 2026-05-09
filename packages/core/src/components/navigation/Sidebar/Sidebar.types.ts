import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface SidebarProps {
  isOpen?: boolean;
  defaultOpen?: boolean;
  width?: number;
  collapsedWidth?: number;
  children: ReactNode;
  glass?: boolean;
  style?: StyleProp<ViewStyle>;
}
