import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type BadgeVariant = 'solid' | 'outline' | 'subtle' | 'glass';
export type BadgeStatus = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';

export interface BadgeProps {
  /** Numeric badge count */
  count?: number;
  /** Dot indicator — renders a small circle with no content */
  dot?: boolean;
  /** Text label for non-numeric badges */
  label?: string;
  status?: BadgeStatus;
  variant?: BadgeVariant;
  /** Clamps count display — defaults to 99, shows "99+" when exceeded */
  maxCount?: number;
  size?: 'sm' | 'md' | 'lg';
  /** When provided, badge is absolutely positioned over the child */
  children?: ReactNode;
  placement?: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';
  style?: StyleProp<ViewStyle>;
}
