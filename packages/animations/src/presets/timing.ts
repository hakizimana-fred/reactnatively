import { Easing, type WithTimingConfig } from 'react-native-reanimated';
import { duration as durationTokens, easing as easingTokens } from 'reactnatively-theme';

function bezier(arr: readonly number[]): ReturnType<typeof Easing.bezier> {
  const [x1 = 0, y1 = 0, x2 = 1, y2 = 1] = arr;
  return Easing.bezier(x1, y1, x2, y2);
}

export const TIMING_FAST: WithTimingConfig = {
  duration: durationTokens.fast,
  easing:   bezier(easingTokens.standard),
};

export const TIMING_NORMAL: WithTimingConfig = {
  duration: durationTokens.normal,
  easing:   bezier(easingTokens.standard),
};

export const TIMING_SLOW: WithTimingConfig = {
  duration: durationTokens.slow,
  easing:   bezier(easingTokens.standard),
};

export const TIMING_ENTER: WithTimingConfig = {
  duration: durationTokens.enter,
  easing:   bezier(easingTokens.decelerate),
};

export const TIMING_EXIT: WithTimingConfig = {
  duration: durationTokens.exit,
  easing:   bezier(easingTokens.accelerate),
};

export const TIMING_BLUR_IN: WithTimingConfig = {
  duration: durationTokens.blurIn,
  easing:   bezier(easingTokens.decelerate),
};

export const TIMING_BLUR_OUT: WithTimingConfig = {
  duration: durationTokens.blurOut,
  easing:   bezier(easingTokens.accelerate),
};
