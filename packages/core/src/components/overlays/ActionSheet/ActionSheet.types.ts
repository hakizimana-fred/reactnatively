import type { ReactNode } from 'react';

export interface ActionSheetAction {
  label:          string;
  onPress:        () => void;
  icon?:          ReactNode;
  isDestructive?: boolean;
  isDisabled?:    boolean;
}

export interface ActionSheetProps {
  isOpen:       boolean;
  onClose:      () => void;
  title?:       string;
  message?:     string;
  actions:      ActionSheetAction[];
  cancelLabel?: string;
  glass?:       boolean;
}
