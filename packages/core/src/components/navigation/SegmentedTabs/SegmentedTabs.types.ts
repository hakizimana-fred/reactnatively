import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type SegmentedTabsSize = 'sm' | 'md' | 'lg';

export interface SegmentedTabsOption {
  label: string;
  value: string;
  icon?: ReactNode;
}

export interface SegmentedTabsProps {
  options: SegmentedTabsOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  glass?: boolean;
  size?: SegmentedTabsSize;
  style?: StyleProp<ViewStyle>;
}
