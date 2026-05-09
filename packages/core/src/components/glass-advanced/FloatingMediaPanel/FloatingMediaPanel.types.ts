import type { StyleProp, ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export type MediaPanelState = 'mini' | 'expanded';

export interface FloatingMediaPanelProps {
  state?: MediaPanelState;
  defaultState?: MediaPanelState;
  onStateChange?: (state: MediaPanelState) => void;
  /** Album art / thumbnail */
  artwork?: ReactNode;
  title?: string;
  subtitle?: string;
  isPlaying?: boolean;
  onPlayPause?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  /** Playback progress 0–1 */
  progress?: number;
  style?: StyleProp<ViewStyle>;
}
