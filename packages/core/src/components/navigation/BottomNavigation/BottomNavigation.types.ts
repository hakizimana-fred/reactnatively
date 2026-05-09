import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface BottomNavigationItem {
  label: string;
  icon: ReactNode;
  activeIcon?: ReactNode;
  value: string;
  badge?: number | boolean;
}

export interface BottomNavigationProps {
  items: BottomNavigationItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  glass?: boolean;
  showLabel?: boolean;
  style?: StyleProp<ViewStyle>;
}
