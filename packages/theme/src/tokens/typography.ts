export const fontFamily = {
  sans:  'System',
  mono:  'Courier',
  // Override with custom fonts via ThemeProvider:
  // fontFamily: { sans: 'Inter_400Regular', ... }
} as const;

export const fontSize = {
  '2xs': 10,
  xs:    12,
  sm:    13,
  base:  15,
  md:    15,
  lg:    17,
  xl:    19,
  '2xl': 22,
  '3xl': 26,
  '4xl': 32,
  '5xl': 40,
  '6xl': 52,
  '7xl': 64,
} as const;

export const lineHeight = {
  none:    1,
  tight:   1.2,
  snug:    1.35,
  normal:  1.5,
  relaxed: 1.625,
  loose:   2,
} as const;

export const fontWeight = {
  thin:       '100' as const,
  extralight: '200' as const,
  light:      '300' as const,
  normal:     '400' as const,
  medium:     '500' as const,
  semibold:   '600' as const,
  bold:       '700' as const,
  extrabold:  '800' as const,
  black:      '900' as const,
};

export const letterSpacing = {
  tighter: -0.8,
  tight:   -0.4,
  normal:  0,
  wide:    0.4,
  wider:   0.8,
  widest:  1.6,
} as const;

export const typography = {
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  letterSpacing,
} as const;

export type Typography = typeof typography;
