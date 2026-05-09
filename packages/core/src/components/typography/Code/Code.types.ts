import type { StyleProp, ViewStyle, TextStyle } from 'react-native';

export interface CodeProps {
  children?: string;
  block?: boolean;
  language?: string;
  glass?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}
