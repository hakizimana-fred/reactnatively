import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface ListItemProps {
  title: string;
  subtitle?: string;
  description?: string;
  /** Leading slot — avatar, icon, image */
  leading?: ReactNode;
  /** Trailing slot — badge, chevron, action */
  trailing?: ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  isDisabled?: boolean;
  glass?: boolean;
  showDivider?: boolean;
  style?: StyleProp<ViewStyle>;
}

export interface ListSection {
  title?: string;
  data: ListItemProps[];
}

export interface ListProps {
  /** Simple flat list of items */
  items?: ListItemProps[];
  /** Sectioned list — mutually exclusive with items */
  sections?: ListSection[];
  keyExtractor?: (item: ListItemProps, index: number) => string;
  renderItem?: (item: ListItemProps) => ReactNode;
  glass?: boolean;
  style?: StyleProp<ViewStyle>;
}
