import type { StyleProp, ViewStyle } from 'react-native';

export type SearchBarSize = 'sm' | 'md' | 'lg';

export interface SearchBarProps {
  value?: string;
  defaultValue?: string;
  onChangeText?: (text: string) => void;
  onSearch?: (text: string) => void;
  onCancel?: () => void;
  placeholder?: string;
  showCancel?: boolean;
  autoFocus?: boolean;
  glass?: boolean;
  size?: SearchBarSize;
  style?: StyleProp<ViewStyle>;
}
