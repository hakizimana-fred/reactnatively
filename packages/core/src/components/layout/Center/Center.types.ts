import type { StyleProp, ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface CenterProps {
  flex?: number;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
