import { glassTokens } from 'reactnatively-theme';
import type { ResolvedColorScheme } from 'reactnatively-theme';
import type { GlassConfig, ResolvedGlassStyle } from './GlassEngine.types';
import { GLASS_CAPABILITY, adjustBlurForCapability } from './CapabilityDetector';

// Core resolver: takes a GlassConfig + color scheme, returns a fully
// resolved style recipe that GlassView uses to render all layers.
export function resolveGlass(
  config: GlassConfig,
  colorScheme: ResolvedColorScheme,
): ResolvedGlassStyle {
  const {
    elevation    = 2,
    variant      = 'surface',
    highlight    = true,
    border       = true,
    borderWidth  = 1,
    blurOverride,
    tintOverride,
  } = config;

  const elevationConfig = glassTokens.elevation[elevation];

  // Blur
  const rawBlur  = blurOverride ?? elevationConfig.blur;
  const blurAmount = adjustBlurForCapability(rawBlur);

  // Tint
  const tintColor = tintOverride ?? glassTokens.tint[colorScheme][variant];

  // Highlight
  let highlightColor = 'transparent';
  if (highlight === true) {
    highlightColor = glassTokens.highlight.medium;
  } else if (highlight !== false && highlight !== 'none') {
    highlightColor = glassTokens.highlight[highlight];
  }

  // Border
  const borderColor = border
    ? glassTokens.border[colorScheme].medium
    : 'transparent';

  // Shadow — glass shadows use a deep, soft spread
  const shadowColor   = colorScheme === 'dark' ? '#000' : '#1a1a2e';
  const shadowOpacity = elevationConfig.shadowOpacity;
  const shadowRadius  = elevationConfig.shadowRadius;
  const shadowOffset  = { width: 0, height: elevationConfig.shadowY };
  const androidElevation = Math.round(elevation * 3);

  // BlurView tint hint — 'light' | 'dark' | 'default'
  const blurTint = colorScheme === 'dark' ? 'dark' : 'light';

  return {
    blurAmount,
    blurTint,
    tintColor,
    highlightColor,
    borderColor,
    borderWidth,
    shadowColor,
    shadowOpacity,
    shadowRadius,
    shadowOffset,
    androidElevation,
    capability: GLASS_CAPABILITY,
  };
}
