import type { StyleProp, ViewStyle } from 'react-native';

export interface SliderSizeConfig {
  trackHeight: number;
  thumbSize:   number;
}

export interface SliderProps {
  value?:        number;
  defaultValue?: number;
  min?:          number;
  max?:          number;
  step?:         number;
  onChange?:     (value: number) => void;
  onChangeEnd?:  (value: number) => void;
  size?:         'sm' | 'md' | 'lg';
  color?:        string;
  trackColor?:   string;
  thumbSize?:    number;
  showValue?:    boolean;
  marks?:        boolean | number[];
  isDisabled?:   boolean;
  style?:        StyleProp<ViewStyle>;
}
