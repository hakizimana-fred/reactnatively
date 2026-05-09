import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  snapPoints?: number[];
  initialSnap?: number;
  title?: string;
  children?: ReactNode;
  isDismissible?: boolean;
  showHandle?: boolean;
  glass?: boolean;
  style?: StyleProp<ViewStyle>;
}
