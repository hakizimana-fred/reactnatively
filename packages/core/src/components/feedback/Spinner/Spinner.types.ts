import type { StyleProp, ViewStyle } from 'react-native';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
  trackColor?: string;
  thickness?: number;
  duration?: number;
  style?: StyleProp<ViewStyle>;
  label?: string;
}
