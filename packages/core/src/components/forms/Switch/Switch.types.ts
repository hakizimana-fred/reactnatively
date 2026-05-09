import type { StyleProp, ViewStyle } from 'react-native';

export type SwitchSize = 'sm' | 'md' | 'lg';
export type SwitchColor = 'primary' | 'success' | 'warning' | 'error';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: SwitchSize;
  color?: SwitchColor;
  label?: string;
  labelPosition?: 'left' | 'right';
  glass?: boolean;
  isDisabled?: boolean;
  style?: StyleProp<ViewStyle>;
}
