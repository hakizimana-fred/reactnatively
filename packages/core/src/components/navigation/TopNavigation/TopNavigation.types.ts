import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

export interface TopNavigationProps {
  title?: string;
  subtitle?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  glass?: boolean;
  blur?: boolean;
  scrollY?: SharedValue<number>;
  style?: StyleProp<ViewStyle>;
}
