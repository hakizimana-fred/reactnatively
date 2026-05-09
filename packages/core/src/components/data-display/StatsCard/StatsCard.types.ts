import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type TrendDirection = 'up' | 'down' | 'neutral';

export interface StatsCardProps {
  value: string | number;
  label: string;
  prefix?: string;
  suffix?: string;
  trend?: {
    value: string;
    direction: TrendDirection;
  };
  /** Icon rendered in the top-right corner */
  icon?: ReactNode;
  glass?: boolean;
  style?: StyleProp<ViewStyle>;
}
