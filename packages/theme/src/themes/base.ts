import { palette } from '../tokens/colors';
import { glassTokens } from '../tokens/glass';
import { spacing } from '../tokens/spacing';
import { radii } from '../tokens/radii';
import { typography } from '../tokens/typography';
import { shadows } from '../tokens/shadows';
import { motion } from '../tokens/motion';

// Colors are typed as string — NOT as const literal — so dark mode
// overrides can supply any color value without literal type conflicts.
export interface ThemeColors {
  primary:         string;
  primaryHover:    string;
  primaryFocused:  string;
  primarySubtle:   string;
  primaryMuted:    string;
  secondary:       string;
  secondaryHover:  string;
  secondarySubtle: string;
  success:         string;
  successSubtle:   string;
  successText:     string;
  warning:         string;
  warningSubtle:   string;
  warningText:     string;
  error:           string;
  errorHover:      string;
  errorSubtle:     string;
  errorText:       string;
  info:            string;
  infoSubtle:      string;
  infoText:        string;
  background:      string;
  backgroundDeep:  string;
  surface:         string;
  surfaceRaised:   string;
  surfaceOverlay:  string;
  text:            string;
  textSecondary:   string;
  textMuted:       string;
  textDisabled:    string;
  textInverted:    string;
  border:          string;
  borderSubtle:    string;
  borderStrong:    string;
  neutral:         string;
  neutralSubtle:   string;
}

const lightColors: ThemeColors = {
  primary:         palette.indigo[500],
  primaryHover:    palette.indigo[600],
  primaryFocused:  palette.indigo[400],
  primarySubtle:   palette.indigo[50],
  primaryMuted:    'rgba(99,102,241,0.12)',
  secondary:       palette.violet[500],
  secondaryHover:  palette.violet[600],
  secondarySubtle: palette.violet[50],
  success:         palette.emerald[500],
  successSubtle:   palette.emerald[50],
  successText:     palette.emerald[700],
  warning:         palette.amber[500],
  warningSubtle:   palette.amber[50],
  warningText:     palette.amber[700],
  error:           palette.rose[500],
  errorHover:      palette.rose[600],
  errorSubtle:     palette.rose[50],
  errorText:       palette.rose[700],
  info:            palette.cyan[500],
  infoSubtle:      palette.cyan[50],
  infoText:        palette.cyan[700],
  background:      palette.neutral[50],
  backgroundDeep:  palette.neutral[100],
  surface:         palette.neutral[0],
  surfaceRaised:   palette.neutral[0],
  surfaceOverlay:  palette.neutral[0],
  text:            palette.neutral[900],
  textSecondary:   palette.neutral[600],
  textMuted:       palette.neutral[400],
  textDisabled:    palette.neutral[300],
  textInverted:    palette.neutral[0],
  border:          palette.neutral[200],
  borderSubtle:    palette.neutral[100],
  borderStrong:    palette.neutral[300],
  neutral:         palette.neutral[600],
  neutralSubtle:   palette.neutral[100],
};

export interface BaseTheme {
  colors:     ThemeColors;
  glass:      typeof glassTokens;
  spacing:    typeof spacing;
  radii:      typeof radii;
  typography: typeof typography;
  shadows:    typeof shadows;
  motion:     typeof motion;
}

export const baseTheme: BaseTheme = {
  colors:     lightColors,
  glass:      glassTokens,
  spacing,
  radii,
  typography,
  shadows,
  motion,
};

export type ThemeColorKey = keyof ThemeColors;
