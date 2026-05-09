import type { StyleProp, ViewStyle } from 'react-native';

export type StepStatus = 'complete' | 'current' | 'upcoming';
export type StepperOrientation = 'horizontal' | 'vertical';
export type StepperVariant = 'circles' | 'numbers' | 'dots';

export interface StepItem {
  label: string;
  description?: string;
  status?: StepStatus;
}

export interface StepperProps {
  steps: StepItem[];
  activeStep?: number;
  orientation?: StepperOrientation;
  variant?: StepperVariant;
  glass?: boolean;
  style?: StyleProp<ViewStyle>;
}
