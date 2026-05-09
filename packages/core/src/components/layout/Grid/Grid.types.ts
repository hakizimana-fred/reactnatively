import type { StyleProp, ViewStyle } from 'react-native';
import type { ReactNode } from 'react';
import type { SpacingKey } from '@reactnatively/theme';

export interface GridProps {
  columns?: number;
  gap?: SpacingKey | number;
  rowGap?: SpacingKey | number;
  columnGap?: SpacingKey | number;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
