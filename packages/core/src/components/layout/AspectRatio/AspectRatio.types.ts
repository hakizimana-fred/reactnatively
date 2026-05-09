import type { StyleProp, ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface AspectRatioProps {
  ratio: number;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}
