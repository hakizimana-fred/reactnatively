import type { ReactNode } from 'react';

export interface CommandItem {
  id:           string;
  label:        string;
  description?: string;
  icon?:        ReactNode;
  shortcut?:    string;
  onSelect:     () => void;
  group?:       string;
}

export interface CommandPaletteProps {
  isOpen:       boolean;
  onClose:      () => void;
  items:        CommandItem[];
  placeholder?: string;
  glass?:       boolean;
}
