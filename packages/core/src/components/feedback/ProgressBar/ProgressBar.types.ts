import type { StyleProp, ViewStyle } from 'react-native';

export type ProgressBarVariant = 'solid' | 'striped' | 'gradient' | 'glass';

export interface ProgressBarProps {
  value?: number;
  max?: number;
  variant?: ProgressBarVariant;
  color?: string;
  trackColor?: string;
  height?: number;
  borderRadius?: number;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  indeterminate?: boolean;
  glass?: boolean;
  style?: StyleProp<ViewStyle>;
}
