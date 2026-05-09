import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface AccordionItemProps {
  /** Unique value used for open/close tracking */
  value: string;
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  isDisabled?: boolean;
}

export interface AccordionProps {
  /** Allow multiple panels open simultaneously */
  allowMultiple?: boolean;
  /** Uncontrolled default open value(s) */
  defaultValue?: string | string[];
  /** Controlled open value(s) */
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  glass?: boolean;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export interface AccordionContextValue {
  openItems: string[];
  toggle: (value: string) => void;
  glass: boolean;
}
