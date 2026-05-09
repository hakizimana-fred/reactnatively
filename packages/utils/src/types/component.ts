import type { ReactNode } from 'react';

export interface WithChildren {
  children?: ReactNode;
}

export interface WithTestID {
  testID?: string;
}

export interface WithClassName {
  className?: string;
}

export type SizeScale = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ColorScheme = 'light' | 'dark';
export type Orientation = 'horizontal' | 'vertical';
export type Alignment = 'start' | 'center' | 'end' | 'stretch';
export type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
