import type { ReactNode } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default';
export type ToastPosition = 'top' | 'bottom';

export interface ToastAction {
  label:   string;
  onPress: () => void;
}

export interface ToastOptions {
  message:    string;
  type?:      ToastType;
  duration?:  number;   // ms, 0 = persistent until dismissed
  position?:  ToastPosition;
  icon?:      ReactNode;
  action?:    ToastAction;
  glass?:     boolean;  // use GlassView backing (default: true)
  // Internal
  id?:        string;
}

export interface ToastItem extends Required<Omit<ToastOptions, 'action' | 'icon'>> {
  id:      string;
  action?: ToastAction;
  icon?:   ReactNode;
}
