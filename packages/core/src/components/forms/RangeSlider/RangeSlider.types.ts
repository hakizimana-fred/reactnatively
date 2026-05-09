import type { StyleProp, ViewStyle } from 'react-native';

export interface RangeSliderProps {
  min?:              number;
  max?:              number;
  step?:             number;
  value?:            [number, number];
  defaultValue?:     [number, number];
  onChange?:         (value: [number, number]) => void;
  onChangeEnd?:      (value: [number, number]) => void;
  trackColor?:       string;
  activeTrackColor?: string;
  thumbSize?:        number;
  glass?:            boolean;
  isDisabled?:       boolean;
  style?:            StyleProp<ViewStyle>;
}
