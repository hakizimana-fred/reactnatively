import type { TextInputProps } from '../TextInput/TextInput.types';

export interface PasswordInputProps extends Omit<TextInputProps, 'secureTextEntry' | 'rightIcon'> {
  /** Initial visibility state. Default false (hidden). */
  defaultVisible?: boolean;
}
