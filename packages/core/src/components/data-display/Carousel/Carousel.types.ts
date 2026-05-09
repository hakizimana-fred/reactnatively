import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface CarouselProps {
  data: any[];
  renderItem: (info: { item: any; index: number }) => ReactNode;
  /** Defaults to screen width */
  itemWidth?: number;
  /** Gap between items in px */
  gap?: number;
  showDots?: boolean;
  autoPlay?: boolean;
  /** Interval in ms between auto-advances — default 3000 */
  autoPlayInterval?: number;
  loop?: boolean;
  onIndexChange?: (index: number) => void;
  glass?: boolean;
  style?: StyleProp<ViewStyle>;
}
