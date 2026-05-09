import type { StyleProp, ViewStyle } from 'react-native';

export type BannerStatus = 'info' | 'success' | 'warning' | 'error' | 'neutral';

export interface BannerProps {
  status?: BannerStatus;
  title?: string;
  description?: string;
  action?: { label: string; onPress: () => void };
  secondaryAction?: { label: string; onPress: () => void };
  isDismissible?: boolean;
  onDismiss?: () => void;
  glass?: boolean;
  style?: StyleProp<ViewStyle>;
}
