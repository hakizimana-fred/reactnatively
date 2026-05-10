import type { StyleProp, ViewStyle, FlexStyle } from 'react-native';
import type { ReactNode } from 'react';
import type { SpacingKey } from 'reactnatively-theme';

export interface FlexProps {
  direction?: 'row' | 'column';
  gap?: SpacingKey | number;
  align?: FlexStyle['alignItems'];
  justify?: FlexStyle['justifyContent'];
  wrap?: boolean;
  flex?: number;
  grow?: number;
  shrink?: number;
  basis?: number | string;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
