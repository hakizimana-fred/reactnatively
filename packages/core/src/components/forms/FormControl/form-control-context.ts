import { createContext, useContext } from 'react';

export interface FormControlContextValue {
  id:          string;
  isRequired:  boolean;
  isDisabled:  boolean;
  isInvalid:   boolean;
  isReadOnly:  boolean;
  label?:      string;
  helperText?: string;
  errorText?:  string;
}

export const FormControlContext = createContext<FormControlContextValue | null>(null);

export function useFormControl(): FormControlContextValue | null {
  return useContext(FormControlContext);
}

export function useFormControlValue(): FormControlContextValue {
  return useContext(FormControlContext) ?? {
    id:         '',
    isRequired: false,
    isDisabled: false,
    isInvalid:  false,
    isReadOnly: false,
  };
}
