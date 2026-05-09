import type { ReactNode } from 'react';
import type { StyleProp, TextStyle, ViewStyle, TextInputProps as RNTextInputProps } from 'react-native';

export type TextInputSize = 'sm' | 'md' | 'lg';
export type TextInputVariant = 'outline' | 'filled' | 'glass' | 'underline';

export interface TextInputSizeConfig {
  height:     number;
  fontSize:   number;
  px:         number;
}

export interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
  /** Label text (floating label inside the input, animates up when focused/has value). */
  label?:         string;
  placeholder?:   string;
  helperText?:    string;
  errorText?:     string;

  /** Node rendered on the left side of the input (icon). */
  leftIcon?:      ReactNode;
  /** Node rendered on the right side of the input (icon). */
  rightIcon?:     ReactNode;
  /** Non-icon prefix element (e.g. text, select). */
  leftAddon?:     ReactNode;
  /** Non-icon suffix element. */
  rightAddon?:    ReactNode;

  size?:          TextInputSize;
  variant?:       TextInputVariant;
  /** Shorthand for variant='glass'. */
  glass?:         boolean;

  isRequired?:    boolean;
  isDisabled?:    boolean;
  isReadOnly?:    boolean;
  isInvalid?:     boolean;

  /** Show a clear (×) button when the input has a value. */
  clearable?:     boolean;
  onClear?:       () => void;

  style?:         StyleProp<ViewStyle>;
  inputStyle?:    StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}
