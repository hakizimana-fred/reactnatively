import type { StyleProp, ViewStyle } from 'react-native';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  helperText?: string;
  errorText?: string;
  size?: CheckboxSize;
  glass?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isIndeterminate?: boolean;
  style?: StyleProp<ViewStyle>;
}
