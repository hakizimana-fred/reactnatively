import type { StyleProp, ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface BlurSurfaceProps {
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
  variant?: 'surface' | 'frosted' | 'elevated' | 'ultraThin';
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}
