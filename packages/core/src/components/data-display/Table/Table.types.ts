import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface TableColumn {
  key: string;
  title: string;
  width?: number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  renderCell?: (value: any, row: Record<string, any>) => ReactNode;
}

export interface TableProps {
  columns: TableColumn[];
  data: Record<string, any>[];
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  glass?: boolean;
  striped?: boolean;
  bordered?: boolean;
  stickyHeader?: boolean;
  style?: StyleProp<ViewStyle>;
}
