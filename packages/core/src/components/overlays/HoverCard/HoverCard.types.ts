import type { ReactNode } from 'react';

export type HoverCardPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface HoverCardProps {
  trigger:    ReactNode;
  content:    ReactNode;
  placement?: HoverCardPlacement;
  glass?:     boolean;
}
