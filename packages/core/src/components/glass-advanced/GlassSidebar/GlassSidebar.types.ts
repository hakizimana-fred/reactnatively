import type { StyleProp, ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface GlassSidebarItem {
  label: string;
  icon: ReactNode;
  value: string;
  badge?: number;
}

export interface GlassSidebarProps {
  items: GlassSidebarItem[];
  activeItem?: string;
  onItemPress?: (value: string) => void;
  isCollapsed?: boolean;
  width?: number;
  collapsedWidth?: number;
  style?: StyleProp<ViewStyle>;
}
