import type { SpacingKey } from 'reactnatively-theme';

export interface SpacerProps {
  size?: SpacingKey | number;
  axis?: 'horizontal' | 'vertical' | 'both';
}
