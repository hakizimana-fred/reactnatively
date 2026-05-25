import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { springs, stateTokens, hapticTokens, type SpringConfig } from 'reactnatively-theme';

export type InteractionIntensity = 'subtle' | 'standard' | 'expressive';
export type HapticIntent = keyof typeof hapticTokens;

export interface InteractionPolicy {
  intensity: InteractionIntensity;
  enableHaptics: boolean;
  pressScale: number;
  pressOpacity: number;
  defaultSpring: keyof typeof springs;
  reduceMotion?: boolean;
}

export interface InteractionContextValue extends InteractionPolicy {
  resolveSpring: (spring?: keyof typeof springs) => SpringConfig;
  resolvePress: (scale?: number, opacity?: number) => {
    scale: number;
    opacity: number;
  };
  resolveHaptic: (intent?: HapticIntent) => string | null;
}

const defaultPolicy: InteractionPolicy = {
  intensity: 'standard',
  enableHaptics: true,
  pressScale: stateTokens.pressed.scale,
  pressOpacity: stateTokens.pressed.opacity,
  defaultSpring: 'snappy',
};

const InteractionContext = createContext<InteractionContextValue | null>(null);

export interface InteractionProviderProps {
  policy?: Partial<InteractionPolicy>;
  children: ReactNode;
}

export function InteractionProvider({ policy, children }: InteractionProviderProps) {
  const resolvedPolicy = useMemo<InteractionPolicy>(
    () => ({ ...defaultPolicy, ...policy }),
    [policy],
  );

  const value = useMemo<InteractionContextValue>(() => {
    const intensityScalar =
      resolvedPolicy.intensity === 'subtle'
        ? 0.5
        : resolvedPolicy.intensity === 'expressive'
          ? 1.25
          : 1;

    return {
      ...resolvedPolicy,
      resolveSpring: (spring = resolvedPolicy.defaultSpring) => springs[spring],
      resolvePress: (scale, opacity) => {
        const targetScale = scale ?? resolvedPolicy.pressScale;
        const targetOpacity = opacity ?? resolvedPolicy.pressOpacity;
        return {
          scale: 1 - (1 - targetScale) * intensityScalar,
          opacity: 1 - (1 - targetOpacity) * intensityScalar,
        };
      },
      resolveHaptic: (intent = 'press') => {
        if (!resolvedPolicy.enableHaptics) return null;
        return hapticTokens[intent];
      },
    };
  }, [resolvedPolicy]);

  return (
    <InteractionContext.Provider value={value}>
      {children}
    </InteractionContext.Provider>
  );
}

export function useInteraction(): InteractionContextValue {
  const ctx = useContext(InteractionContext);
  if (ctx) return ctx;

  return {
    ...defaultPolicy,
    resolveSpring: (spring = defaultPolicy.defaultSpring) => springs[spring],
    resolvePress: (scale, opacity) => ({
      scale: scale ?? defaultPolicy.pressScale,
      opacity: opacity ?? defaultPolicy.pressOpacity,
    }),
    resolveHaptic: (intent = 'press') => hapticTokens[intent],
  };
}
