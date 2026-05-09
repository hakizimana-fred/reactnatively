import type { StyleProp, ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface InteractiveGlassSurfaceProps {
  children?: ReactNode;
  /** Tilt strength 0–1, default 0.05 */
  parallaxStrength?: number;
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
  style?: StyleProp<ViewStyle>;
}
