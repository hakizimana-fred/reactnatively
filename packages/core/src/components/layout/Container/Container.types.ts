import type { StyleProp, ViewStyle } from 'react-native';
import type { ReactNode } from 'react';
import type { SpacingKey } from '@reactnatively/theme';

export type ContainerMaxWidth = 'sm' | 'md' | 'lg' | 'xl';

export interface ContainerProps {
  maxWidth?: number | ContainerMaxWidth;
  px?: SpacingKey | number;
  py?: SpacingKey | number;
  center?: boolean;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}
