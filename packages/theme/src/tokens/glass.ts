// GLASS TOKEN SYSTEM — the visual identity engine of the entire framework.
// Every component that touches glass references ONLY these values.
// This file is the source of truth for all glass aesthetics.

export const glassTokens = {
  // Blur intensity scale — maps to expo-blur `intensity` (0-100)
  blur: {
    none:    0,
    hairline: 4,
    subtle:  10,
    light:   20,
    medium:  35,
    heavy:   55,
    intense: 72,
    extreme: 90,
  },

  // Tint: semi-transparent color applied over the blur layer
  tint: {
    light: {
      ultraThin: 'rgba(255,255,255,0.45)',
      thin:      'rgba(255,255,255,0.60)',
      surface:   'rgba(255,255,255,0.72)',
      elevated:  'rgba(255,255,255,0.82)',
      overlay:   'rgba(255,255,255,0.92)',
      frosted:   'rgba(240,242,250,0.68)',
      tinted:    'rgba(59,130,246,0.12)',
    },
    dark: {
      ultraThin: 'rgba(20,20,30,0.45)',
      thin:      'rgba(20,20,30,0.58)',
      surface:   'rgba(25,25,38,0.72)',
      elevated:  'rgba(30,30,48,0.80)',
      overlay:   'rgba(15,15,25,0.88)',
      frosted:   'rgba(22,24,40,0.70)',
      tinted:    'rgba(99,102,241,0.15)',
    },
  },

  // Elevation: the glass depth system (0 = flat, 5 = floating modal)
  // Each level defines the complete glass rendering recipe
  elevation: {
    0: {
      blur:          0,
      tintOpacity:   0.95,
      shadowOpacity: 0,
      shadowRadius:  0,
      shadowY:       0,
    },
    1: {
      blur:          12,
      tintOpacity:   0.82,
      shadowOpacity: 0.06,
      shadowRadius:  8,
      shadowY:       2,
    },
    2: {
      blur:          24,
      tintOpacity:   0.72,
      shadowOpacity: 0.12,
      shadowRadius:  16,
      shadowY:       4,
    },
    3: {
      blur:          40,
      tintOpacity:   0.65,
      shadowOpacity: 0.18,
      shadowRadius:  24,
      shadowY:       8,
    },
    4: {
      blur:          55,
      tintOpacity:   0.55,
      shadowOpacity: 0.24,
      shadowRadius:  36,
      shadowY:       12,
    },
    5: {
      blur:          72,
      tintOpacity:   0.45,
      shadowOpacity: 0.32,
      shadowRadius:  48,
      shadowY:       20,
    },
  } as const,

  // Highlight: top-edge shimmer — creates the "wet glass" refraction
  highlight: {
    none:    'transparent',
    subtle:  'rgba(255,255,255,0.20)',
    medium:  'rgba(255,255,255,0.38)',
    strong:  'rgba(255,255,255,0.55)',
    intense: 'rgba(255,255,255,0.72)',
  },

  // Highlight gradient: gradient from highlight to transparent (vertical)
  highlightGradientEnd: 'transparent',

  // Border: glass edge line — makes glass surfaces feel distinct
  border: {
    light: {
      subtle:  'rgba(255,255,255,0.20)',
      medium:  'rgba(255,255,255,0.32)',
      strong:  'rgba(255,255,255,0.50)',
    },
    dark: {
      subtle:  'rgba(255,255,255,0.08)',
      medium:  'rgba(255,255,255,0.14)',
      strong:  'rgba(255,255,255,0.22)',
    },
  },

  // Glow: ambient glow emitted from glass surfaces
  glow: {
    primary: { color: '#6366f1', radius: 24, opacity: 0.35 },
    blue:    { color: '#3b82f6', radius: 24, opacity: 0.35 },
    cyan:    { color: '#06b6d4', radius: 20, opacity: 0.40 },
    rose:    { color: '#f43f5e', radius: 20, opacity: 0.35 },
    success: { color: '#10b981', radius: 20, opacity: 0.30 },
    warning: { color: '#f59e0b', radius: 20, opacity: 0.30 },
  },

  // Vibrancy mode — controls how aggressively colors pop through glass
  vibrancy: {
    none:    { saturation: 1.0, brightness: 1.0 },
    subtle:  { saturation: 1.1, brightness: 1.02 },
    medium:  { saturation: 1.2, brightness: 1.04 },
    vivid:   { saturation: 1.4, brightness: 1.06 },
  },
} as const;

export type GlassTokens = typeof glassTokens;
export type GlassElevation = 0 | 1 | 2 | 3 | 4 | 5;
export type GlassTintVariant = keyof typeof glassTokens.tint.light;
export type GlassBlurLevel = keyof typeof glassTokens.blur;
export type GlassHighlight = keyof typeof glassTokens.highlight;
