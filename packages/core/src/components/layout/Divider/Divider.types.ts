import type { StyleProp, ViewStyle, TextStyle } from 'react-native';
import type { SpacingKey } from 'reactnatively-theme';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  thickness?: number;
  color?: string;
  spacing?: SpacingKey | number;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}
