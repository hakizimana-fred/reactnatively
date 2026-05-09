import type { StyleProp, ViewStyle } from 'react-native';

export interface TimePickerProps {
  value?:        Date;
  defaultValue?: Date;
  onChange?:     (date: Date) => void;
  use24Hour?:    boolean;
  glass?:        boolean;
  isDisabled?:   boolean;
  style?:        StyleProp<ViewStyle>;
}
