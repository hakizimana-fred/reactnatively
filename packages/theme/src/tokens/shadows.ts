// Cross-platform shadow system.
// iOS uses shadow* props. Android uses elevation.
// Both are defined per level so components can apply either.

export const shadows = {
  none: {
    ios: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
    },
    android: { elevation: 0 },
  },
  xs: {
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    android: { elevation: 1 },
  },
  sm: {
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
    },
    android: { elevation: 2 },
  },
  md: {
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
    },
    android: { elevation: 4 },
  },
  lg: {
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
    },
    android: { elevation: 8 },
  },
  xl: {
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.18,
      shadowRadius: 24,
    },
    android: { elevation: 12 },
  },
  '2xl': {
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.22,
      shadowRadius: 40,
    },
    android: { elevation: 20 },
  },
  // Glass-specific: colored shadows for glowing surfaces
  glassGlow: {
    ios: {
      shadowColor: '#6366f1',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.40,
      shadowRadius: 24,
    },
    android: { elevation: 12 },
  },
} as const;

export type Shadows = typeof shadows;
export type ShadowKey = keyof Shadows;
