import type { StyleProp, ViewStyle } from 'react-native';
import type { ReactNode } from 'react';
import type { SpacingKey, RadiiKey } from '@reactnatively/theme';

export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type FlexAlign    = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
export type FlexJustify  = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
export type FlexWrap     = 'wrap' | 'nowrap' | 'wrap-reverse';

export interface BoxProps {
  // Spacing — accepts spacing token keys or raw numbers
  p?:   SpacingKey | number;
  px?:  SpacingKey | number;
  py?:  SpacingKey | number;
  pt?:  SpacingKey | number;
  pb?:  SpacingKey | number;
  pl?:  SpacingKey | number;
  pr?:  SpacingKey | number;
  m?:   SpacingKey | number;
  mx?:  SpacingKey | number;
  my?:  SpacingKey | number;
  mt?:  SpacingKey | number;
  mb?:  SpacingKey | number;
  ml?:  SpacingKey | number;
  mr?:  SpacingKey | number;

  // Flex layout
  flex?:       number;
  direction?:  FlexDirection;
  align?:      FlexAlign;
  justify?:    FlexJustify;
  wrap?:       FlexWrap;
  gap?:        SpacingKey | number;
  rowGap?:     SpacingKey | number;
  columnGap?:  SpacingKey | number;
  selfAlign?:  FlexAlign | 'auto';

  // Size
  width?:      number | string;
  height?:     number | string;
  minWidth?:   number | string;
  maxWidth?:   number | string;
  minHeight?:  number | string;
  maxHeight?:  number | string;

  // Appearance
  bg?:            string;
  borderRadius?:  RadiiKey | number;
  overflow?:      'visible' | 'hidden' | 'scroll';
  opacity?:       number;

  // Position
  position?:  'relative' | 'absolute';
  top?:       number;
  right?:     number;
  bottom?:    number;
  left?:      number;
  zIndex?:    number;

  // Passthrough
  style?:    StyleProp<ViewStyle>;
  children?: ReactNode;
  testID?:   string;
}
