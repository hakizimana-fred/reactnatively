import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { TooltipPlacement } from '../Tooltip/Tooltip.types';

export interface PopoverProps {
  trigger: ReactNode | ((props: { onPress: () => void; isOpen: boolean }) => ReactNode);
  content: ReactNode;
  placement?: TooltipPlacement;
  isDismissible?: boolean;
  glass?: boolean;
  style?: StyleProp<ViewStyle>;
}
