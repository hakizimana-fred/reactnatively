// Imperative Toast API — zero external dependencies.
// Uses a minimal pub-sub pattern. ToastProvider subscribes to these events.
// Call toast.success('Done!') from anywhere in the app.

import type { ToastOptions, ToastItem } from './Toast.types';

type ShowListener    = (item: ToastItem) => void;
type DismissListener = (id: string) => void;

const showListeners:    Set<ShowListener>    = new Set();
const dismissListeners: Set<DismissListener> = new Set();

let counter = 0;
function uid(): string {
  return `toast_${Date.now()}_${++counter}`;
}

function show(options: ToastOptions): string {
  const id = options.id ?? uid();
  const item: ToastItem = {
    id,
    message:  options.message,
    type:     options.type     ?? 'default',
    duration: options.duration ?? 4000,
    position: options.position ?? 'bottom',
    glass:    options.glass    ?? true,
    action:   options.action,
    icon:     options.icon,
  };
  showListeners.forEach((fn) => fn(item));
  return id;
}

export const toast = {
  show,
  success(message: string, options?: Partial<ToastOptions>): string {
    return show({ type: 'success', duration: 4000, ...options, message });
  },
  error(message: string, options?: Partial<ToastOptions>): string {
    return show({ type: 'error', duration: 5000, ...options, message });
  },
  warning(message: string, options?: Partial<ToastOptions>): string {
    return show({ type: 'warning', duration: 4500, ...options, message });
  },
  info(message: string, options?: Partial<ToastOptions>): string {
    return show({ type: 'info', duration: 4000, ...options, message });
  },
  dismiss(id: string): void {
    dismissListeners.forEach((fn) => fn(id));
  },
  // Internal — used by ToastProvider to subscribe
  _onShow(fn: ShowListener): () => void {
    showListeners.add(fn);
    return () => showListeners.delete(fn);
  },
  _onDismiss(fn: DismissListener): () => void {
    dismissListeners.add(fn);
    return () => dismissListeners.delete(fn);
  },
};
