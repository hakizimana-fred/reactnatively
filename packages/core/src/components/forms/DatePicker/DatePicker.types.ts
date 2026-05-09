import type { StyleProp, ViewStyle } from 'react-native';

export interface DatePickerProps {
  value?:        Date;
  defaultValue?: Date;
  onChange?:     (date: Date) => void;
  minDate?:      Date;
  maxDate?:      Date;
  mode?:         'date' | 'datetime';
  glass?:        boolean;
  isDisabled?:   boolean;
  style?:        StyleProp<ViewStyle>;
}
