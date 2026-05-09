import type { WithSpringConfig } from 'react-native-reanimated';
import { springs as springTokens } from '@reactnatively/theme';

// Re-export typed spring configs for Reanimated's withSpring
export const SPRING_SNAPPY: WithSpringConfig  = springTokens.snappy;
export const SPRING_LIQUID: WithSpringConfig  = springTokens.liquid;
export const SPRING_REVEAL: WithSpringConfig  = springTokens.reveal;
export const SPRING_BOUNCE: WithSpringConfig  = springTokens.bounce;
export const SPRING_PRECISE: WithSpringConfig = springTokens.precise;

export { springTokens as springs };
