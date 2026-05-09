import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface MagneticPressableProps {
  children:  ReactNode;
  strength?: number;
  onPress?:  () => void;
  style?:    StyleProp<ViewStyle>;
}
