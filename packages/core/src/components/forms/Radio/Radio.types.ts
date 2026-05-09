import type { StyleProp, ViewStyle } from 'react-native';

export type RadioSize = 'sm' | 'md' | 'lg';

export interface RadioGroupContextValue {
  value:       string;
  onChange:    (v: string) => void;
  isDisabled?: boolean;
  isInvalid?:  boolean;
  size?:       RadioSize;
}

export interface RadioGroupProps {
  value?:       string;
  defaultValue?: string;
  onChange?:    (v: string) => void;
  direction?:   'row' | 'column';
  children:     React.ReactNode;
  isDisabled?:  boolean;
  isInvalid?:   boolean;
  size?:        RadioSize;
  style?:       StyleProp<ViewStyle>;
}

export interface RadioProps {
  value:       string;
  label?:      string;
  isDisabled?: boolean;
  style?:      StyleProp<ViewStyle>;
}
