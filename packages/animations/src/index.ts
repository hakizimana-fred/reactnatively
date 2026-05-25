export { SPRING_SNAPPY, SPRING_LIQUID, SPRING_REVEAL, SPRING_BOUNCE, SPRING_PRECISE, springs } from './presets/spring';
export { TIMING_FAST, TIMING_NORMAL, TIMING_SLOW, TIMING_ENTER, TIMING_EXIT, TIMING_BLUR_IN, TIMING_BLUR_OUT } from './presets/timing';
export { useReducedMotion, useSpring, useDuration } from './hooks/useReducedMotion';
export { usePressAnimation } from './hooks/usePressAnimation';
export type { PressAnimationConfig, PressAnimationResult } from './hooks/usePressAnimation';
export { useEntranceAnimation } from './hooks/useEntranceAnimation';
export type { EntranceVariant, EntranceAnimationConfig } from './hooks/useEntranceAnimation';
export { InteractionProvider, useInteraction } from './InteractionProvider';
export type {
  InteractionProviderProps,
  InteractionPolicy,
  InteractionContextValue,
  InteractionIntensity,
  HapticIntent,
} from './InteractionProvider';
