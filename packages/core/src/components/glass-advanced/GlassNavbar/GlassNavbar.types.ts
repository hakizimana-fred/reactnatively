import type { StyleProp, ViewStyle } from 'react-native';
import type { ReactNode } from 'react';
import type { SharedValue } from 'react-native-reanimated';

export interface GlassNavbarProps {
  title?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  /** SharedValue from useScrollHandler — controls glass intensity with scroll */
  scrollY?: SharedValue<number>;
  style?: StyleProp<ViewStyle>;
}
