import type { StyleProp, ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export type DynamicIslandState = 'compact' | 'expanded' | 'minimal';

export interface DynamicIslandProps {
  state?: DynamicIslandState;
  defaultState?: DynamicIslandState;
  onStateChange?: (state: DynamicIslandState) => void;
  /** Small content for compact pill */
  compactContent?: ReactNode;
  /** Rich content for expanded state */
  expandedContent?: ReactNode;
  /** Tiny indicator dot */
  minimalContent?: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}
