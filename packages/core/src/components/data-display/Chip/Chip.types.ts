import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type ChipVariant = 'solid' | 'outline' | 'subtle' | 'glass';

export interface ChipProps {
  label: string;
  /** Leading avatar slot */
  avatar?: ReactNode;
  /** Leading icon slot (shown after avatar if both provided) */
  icon?: ReactNode;
  /** Trailing icon slot (shown before dismiss button) */
  trailingIcon?: ReactNode;
  /** When provided a dismiss (✕) button is rendered on the right */
  onDismiss?: () => void;
  isSelected?: boolean;
  onPress?: () => void;
  variant?: ChipVariant;
  size?: 'sm' | 'md' | 'lg';
  /** Custom tint color — overrides status-based colors */
  color?: string;
  glass?: boolean;
  isDisabled?: boolean;
  style?: StyleProp<ViewStyle>;
}
