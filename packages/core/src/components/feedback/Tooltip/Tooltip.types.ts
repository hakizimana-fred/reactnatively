import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: string | ReactNode;
  placement?: TooltipPlacement;
  children: ReactNode;
  delay?: number;
  glass?: boolean;
  style?: StyleProp<ViewStyle>;
}
