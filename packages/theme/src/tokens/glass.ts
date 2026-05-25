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

  // Tint: low-opacity color applied over the blur layer. Liquid glass should
  // remain optically transparent; haze/diffusion does more work than opacity.
  tint: {
    light: {
      ultraThin: 'rgba(255,255,255,0.02)',
      thin:      'rgba(255,255,255,0.038)',
      surface:   'rgba(255,255,255,0.055)',
      elevated:  'rgba(255,255,255,0.072)',
      overlay:   'rgba(255,255,255,0.09)',
      frosted:   'rgba(248,250,255,0.125)',
      tinted:    'rgba(120,170,255,0.062)',
    },
    dark: {
      ultraThin: 'rgba(255,255,255,0.016)',
      thin:      'rgba(255,255,255,0.028)',
      surface:   'rgba(255,255,255,0.042)',
      elevated:  'rgba(255,255,255,0.056)',
      overlay:   'rgba(255,255,255,0.07)',
      frosted:   'rgba(220,230,255,0.088)',
      tinted:    'rgba(140,150,255,0.058)',
    },
  },

  // Elevation: the glass depth system (0 = flat, 5 = floating modal).
  // Depth comes from blur separation and translucency, not shadow strength.
  elevation: {
    0: {
      blur:             0,
      tintOpacity:      0.20,
      diffusionOpacity: 0.008,
      sheenOpacity:     0.016,
      shadowOpacity:    0,
      shadowRadius:     0,
      shadowY:          0,
      androidElevation: 0,
    },
    1: {
      blur:             22,
      tintOpacity:      0.32,
      diffusionOpacity: 0.022,
      sheenOpacity:     0.058,
      shadowOpacity:    0.008,
      shadowRadius:     38,
      shadowY:          4,
      androidElevation: 0,
    },
    2: {
      blur:             38,
      tintOpacity:      0.38,
      diffusionOpacity: 0.036,
      sheenOpacity:     0.078,
      shadowOpacity:    0.012,
      shadowRadius:     54,
      shadowY:          6,
      androidElevation: 0,
    },
    3: {
      blur:             54,
      tintOpacity:      0.44,
      diffusionOpacity: 0.050,
      sheenOpacity:     0.095,
      shadowOpacity:    0.016,
      shadowRadius:     70,
      shadowY:          8,
      androidElevation: 1,
    },
    4: {
      blur:             68,
      tintOpacity:      0.50,
      diffusionOpacity: 0.064,
      sheenOpacity:     0.112,
      shadowOpacity:    0.022,
      shadowRadius:     86,
      shadowY:          10,
      androidElevation: 1,
    },
    5: {
      blur:             82,
      tintOpacity:      0.54,
      diffusionOpacity: 0.078,
      sheenOpacity:     0.132,
      shadowOpacity:    0.028,
      shadowRadius:     108,
      shadowY:          12,
      androidElevation: 1,
    },
  } as const,

  // Highlight: directional top-edge sheen simulating refracted light on curved glass.
  highlight: {
    none:    'transparent',
    subtle:  'rgba(255,255,255,0.10)',
    medium:  'rgba(255,255,255,0.18)',
    strong:  'rgba(255,255,255,0.26)',
    intense: 'rgba(255,255,255,0.36)',
  },

  // Highlight gradient: gradient from highlight to transparent (vertical)
  highlightGradientEnd: 'transparent',

  // Border: near-invisible optical edge. Avoid obvious outlines.
  border: {
    light: {
      subtle:  'rgba(255,255,255,0.06)',
      medium:  'rgba(255,255,255,0.085)',
      strong:  'rgba(255,255,255,0.12)',
    },
    dark: {
      subtle:  'rgba(255,255,255,0.055)',
      medium:  'rgba(255,255,255,0.075)',
      strong:  'rgba(255,255,255,0.105)',
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
