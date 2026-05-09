// Theme engine public API

export { ThemeProvider, useTheme, useColorScheme, useIsDark, useToken } from './ThemeProvider';
export type { ThemeContextValue, ThemeProviderProps, ColorSchemePreference, ResolvedColorScheme } from './ThemeProvider';

export { createTheme, baseTheme } from './createTheme';
export type { InferTheme } from './createTheme';

export type { BaseTheme, ThemeColors, ThemeColorKey } from './themes/base';

// Token exports — for components that need direct token access without the hook
export { palette } from './tokens/colors';
export type { Palette } from './tokens/colors';

export { glassTokens } from './tokens/glass';
export type { GlassTokens, GlassElevation, GlassTintVariant, GlassBlurLevel, GlassHighlight } from './tokens/glass';

export { spacing } from './tokens/spacing';
export type { SpacingScale, SpacingKey, SpacingValue } from './tokens/spacing';

export { radii } from './tokens/radii';
export type { RadiiScale, RadiiKey } from './tokens/radii';

export { typography, fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } from './tokens/typography';
export type { Typography } from './tokens/typography';

export { shadows } from './tokens/shadows';
export type { Shadows, ShadowKey } from './tokens/shadows';

export { motion, duration, easing, springs, reducedMotion } from './tokens/motion';
export type { Motion, SpringConfig } from './tokens/motion';
