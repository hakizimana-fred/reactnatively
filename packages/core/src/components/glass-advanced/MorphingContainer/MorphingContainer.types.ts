import type { StyleProp, ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface MorphingContainerShape {
  width: number;
  height: number;
  borderRadius: number;
}

export interface MorphingContainerProps {
  shape?: MorphingContainerShape;
  glass?: boolean;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}
