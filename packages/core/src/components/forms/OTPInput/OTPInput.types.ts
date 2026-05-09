import type { StyleProp, ViewStyle } from 'react-native';

export interface OTPInputProps {
  length?:      number;
  value?:       string;
  onChange?:    (value: string) => void;
  onComplete?:  (value: string) => void;
  type?:        'numeric' | 'alphanumeric';
  glass?:       boolean;
  isInvalid?:   boolean;
  isDisabled?:  boolean;
  autoFocus?:   boolean;
  style?:       StyleProp<ViewStyle>;
}
