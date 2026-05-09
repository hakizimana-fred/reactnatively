import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface FormControlProps {
  /** Explicit HTML-style id forwarded to child inputs via context. Auto-generated if omitted. */
  id?:          string;
  /** Label text rendered above the children. */
  label?:       string;
  /** Supportive text rendered below the children. Hidden when isInvalid and errorText is provided. */
  helperText?:  string;
  /** Error message rendered below the children when isInvalid is true. */
  errorText?:   string;
  /** Marks the field as required — appends " *" to label. */
  isRequired?:  boolean;
  /** Disables child inputs via context. */
  isDisabled?:  boolean;
  /** Marks the field as invalid. Automatically true when errorText is provided. */
  isInvalid?:   boolean;
  /** Marks the field as read-only via context. */
  isReadOnly?:  boolean;
  children?:    ReactNode;
  style?:       StyleProp<ViewStyle>;
}
