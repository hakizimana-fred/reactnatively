import type { PressableProps } from 'react-native';
import type { SurfaceProps } from '../Surface/Surface.types';

/**
 * GlassPressable — animated pressable primitive built on Surface.
 *
 * Combines:
 *   - Surface (glass or solid background rendering)
 *   - Press scale + opacity animation via Reanimated
 *   - Optional haptic feedback via expo-haptics
 *
 * Used as the interactive base for all interactive glass components
 * (buttons, cards, pills, chips, etc.)
 */
export interface GlassPressableProps
  extends Omit<PressableProps, 'style' | 'children'>,
    Omit<SurfaceProps, 'animated'> {
  /** Scale factor applied on press. Default: 0.97 */
  pressedScale?:   number;
  /** Opacity applied on press. Default: 0.90 */
  pressedOpacity?: number;
  /** Fire a haptic impact on press (requires expo-haptics). Default: false */
  haptic?:         boolean;
  /** Show a loading state (disables interactions and passes through to children). Default: false */
  loading?:        boolean;
  /** Disable all interactions. Default: false */
  disabled?:       boolean;
}
