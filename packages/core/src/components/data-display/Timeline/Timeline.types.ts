import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type TimelineItemStatus = 'complete' | 'active' | 'pending';

export interface TimelineItem {
  title: string;
  description?: string;
  timestamp?: string;
  icon?: ReactNode;
  status?: TimelineItemStatus;
}

export interface TimelineProps {
  items: TimelineItem[];
  glass?: boolean;
  style?: StyleProp<ViewStyle>;
}
