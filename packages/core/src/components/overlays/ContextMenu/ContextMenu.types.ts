import type { ReactNode } from 'react';

export interface ContextMenuItem {
  label:          string;
  icon?:          ReactNode;
  onPress:        () => void;
  isDestructive?: boolean;
  isDisabled?:    boolean;
}

export interface ContextMenuProps {
  items:    ContextMenuItem[];
  children: ReactNode;
  glass?:   boolean;
}
