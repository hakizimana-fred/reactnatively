import type { StyleProp, ViewStyle } from 'react-native';

export interface SelectOption {
  label:        string;
  value:        string;
  description?: string;
  disabled?:    boolean;
}

export interface SelectProps {
  options:       SelectOption[];
  value?:        string;
  defaultValue?: string;
  onChange?:     (value: string) => void;
  placeholder?:  string;
  label?:        string;
  helperText?:   string;
  errorText?:    string;
  size?:         'sm' | 'md' | 'lg';
  glass?:        boolean;
  isDisabled?:   boolean;
  isInvalid?:    boolean;
  style?:        StyleProp<ViewStyle>;
}
