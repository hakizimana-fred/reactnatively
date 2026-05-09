import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface EmptyStateProps {
  illustration?: ReactNode;
  icon?: ReactNode;
  title?: string;
  description?: string;
  action?: { label: string; onPress: () => void; variant?: 'solid' | 'outline' };
  secondaryAction?: { label: string; onPress: () => void };
  glass?: boolean;
  style?: StyleProp<ViewStyle>;
}
