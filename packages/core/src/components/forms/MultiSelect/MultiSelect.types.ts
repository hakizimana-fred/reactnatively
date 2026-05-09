import type { StyleProp, ViewStyle } from 'react-native';
import type { SelectOption } from '../Select/Select.types';

export type { SelectOption };

export interface MultiSelectProps {
  options:        SelectOption[];
  value?:         string[];
  defaultValue?:  string[];
  onChange?:      (values: string[]) => void;
  placeholder?:   string;
  maxSelections?: number;
  glass?:         boolean;
  isDisabled?:    boolean;
  isInvalid?:     boolean;
  style?:         StyleProp<ViewStyle>;
}
