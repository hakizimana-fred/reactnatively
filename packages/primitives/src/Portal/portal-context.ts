import { createContext } from 'react';
import type { ReactNode } from 'react';

export interface PortalEntry {
  key:     string;
  element: ReactNode;
}

export interface PortalContextValue {
  mount:   (key: string, element: ReactNode) => void;
  unmount: (key: string) => void;
  update:  (key: string, element: ReactNode) => void;
}

export const PortalContext = createContext<PortalContextValue | null>(null);
