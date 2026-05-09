import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type TabVariant = 'line' | 'enclosed' | 'pills' | 'glass';
export type TabOrientation = 'horizontal' | 'vertical';

export interface TabsProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  variant?: TabVariant;
  orientation?: TabOrientation;
  glass?: boolean;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export interface TabProps {
  value: string;
  label: string;
  icon?: ReactNode;
  isDisabled?: boolean;
}

export interface TabPanelProps {
  value: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export interface TabListProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  variant: TabVariant;
  orientation: TabOrientation;
}
