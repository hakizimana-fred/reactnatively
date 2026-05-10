import type { StyleProp, ViewStyle } from 'react-native';
import type { ReactNode } from 'react';
import type { SpacingKey } from 'reactnatively-theme';

export interface StackProps {
  direction?:  'vertical' | 'horizontal';
  gap?:        SpacingKey | number;
  align?:      ViewStyle['alignItems'];
  justify?:    ViewStyle['justifyContent'];
  flex?:       number;
  wrap?:       boolean;
  divider?:    boolean;
  style?:      StyleProp<ViewStyle>;
  children?:   ReactNode;
  testID?:     string;
}
