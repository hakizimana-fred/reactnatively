import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface BreadcrumbItem {
  label: string;
  onPress?: () => void;
  icon?: ReactNode;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode | string;
  maxItems?: number;
  style?: StyleProp<ViewStyle>;
}
