import type { TextInputProps } from '../TextInput/TextInput.types';

export interface TextAreaProps extends Omit<TextInputProps, 'clearable' | 'leftIcon' | 'rightIcon' | 'leftAddon' | 'rightAddon'> {
  /** Number of visible lines when not auto-growing. Default 4. */
  numberOfLines?: number;
  /** Automatically grow the textarea as content increases. Default false. */
  autoGrow?:      boolean;
  /** Maximum height in pixels when autoGrow is enabled. */
  maxHeight?:     number;
}
