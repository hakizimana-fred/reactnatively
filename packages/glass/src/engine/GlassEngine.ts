import { glassTokens } from 'reactnatively-theme';
import type { GlassTintVariant, ResolvedColorScheme } from 'reactnatively-theme';
import type { GlassConfig, ResolvedGlassStyle } from './GlassEngine.types';
import { GLASS_CAPABILITY, adjustBlurForCapability } from './CapabilityDetector';

function withAlpha(color: string, alphaScale: number): string {
  const rgba = color.match(
    /^rgba\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/i,
  );

  if (!rgba) return color;

  const [, r, g, b, alpha] = rgba;
  const nextAlpha = Math.max(0, Math.min(1, Number(alpha) * alphaScale));
  return `rgba(${r},${g},${b},${Number(nextAlpha.toFixed(3))})`;
}

// Per-variant multipliers: each variant behaves as a distinct optical material,
// not just a different tint level. ultraThin → nearly invisible; frosted → hazy.
const VARIANT_MULTIPLIERS: Record<GlassTintVariant, { diffusion: number; sheen: number }> = {
  ultraThin: { diffusion: 0.28, sheen: 0.35 },
  thin:      { diffusion: 0.52, sheen: 0.60 },
  surface:   { diffusion: 0.80, sheen: 0.85 },
  elevated:  { diffusion: 1.00, sheen: 1.00 },
  overlay:   { diffusion: 1.12, sheen: 0.95 },
  frosted:   { diffusion: 1.35, sheen: 1.10 },
  tinted:    { diffusion: 0.88, sheen: 0.88 },
};

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
  const vm = VARIANT_MULTIPLIERS[variant];

  // Blur drives perceived material thickness more than opacity or shadow.
  const rawBlur = blurOverride ?? elevationConfig.blur;
  const blurAmount = adjustBlurForCapability(rawBlur);

  // Tint stays very low-opacity; diffusion layers create the optical body.
  const rawTintColor = tintOverride ?? glassTokens.tint[colorScheme][variant];
  const tintColor = tintOverride
    ? rawTintColor
    : withAlpha(rawTintColor, elevationConfig.tintOpacity);

  // Internal diffusion: warm white haze (upper) and cool atmospheric tint (lower).
  const diffusionColor =
    colorScheme === 'dark'
      ? 'rgba(255,255,255,0.52)'
      : 'rgba(255,255,255,0.78)';
  const lowerDiffusionColor =
    colorScheme === 'dark'
      ? 'rgba(130,155,255,0.38)'
      : 'rgba(188,212,255,0.38)';

  const diffusionOpacity     = elevationConfig.diffusionOpacity * vm.diffusion;
  const lowerDiffusionOpacity = diffusionOpacity * 0.45;

  // Highlight: base sheen from elevation config, scaled by variant optical weight.
  let highlightColor = 'transparent';
  let baseHighlightOpacity = 0;
  if (highlight === true) {
    highlightColor = glassTokens.highlight.medium;
    baseHighlightOpacity = elevationConfig.sheenOpacity;
  } else if (highlight !== false && highlight !== 'none') {
    highlightColor = glassTokens.highlight[highlight];
    baseHighlightOpacity = elevationConfig.sheenOpacity;
  }

  const highlightOpacity     = baseHighlightOpacity * vm.sheen;
  // Falloff layer covers a broader zone at lower intensity to simulate curvature.
  const highlightFadeOpacity = highlightOpacity * 0.44;
  const edgeHighlightOpacity = highlightOpacity * 0.55;

  // Border
  const borderColor = border
    ? glassTokens.border[colorScheme].medium
    : 'transparent';
  const innerBorderColor = border
    ? glassTokens.border[colorScheme].subtle
    : 'transparent';

  // Soft ambient shadow — separation via depth, not a card drop shadow.
  const shadowColor   = colorScheme === 'dark' ? '#000' : '#6b7f95';
  const shadowOpacity = elevationConfig.shadowOpacity;
  const shadowRadius  = elevationConfig.shadowRadius;
  const shadowOffset  = { width: 0, height: elevationConfig.shadowY };
  const androidElevation = elevationConfig.androidElevation;

  // BlurView tint hint — 'light' | 'dark' | 'default'
  const blurTint = colorScheme === 'dark' ? 'dark' : 'default';

  return {
    blurAmount,
    blurTint,
    tintColor,
    diffusionColor,
    diffusionOpacity,
    lowerDiffusionColor,
    lowerDiffusionOpacity,
    highlightColor,
    highlightOpacity,
    highlightFadeOpacity,
    edgeHighlightColor: glassTokens.highlight.subtle,
    edgeHighlightOpacity,
    borderColor,
    borderWidth: Math.min(borderWidth, 1),
    innerBorderColor,
    shadowColor,
    shadowOpacity,
    shadowRadius,
    shadowOffset,
    androidElevation,
    capability: GLASS_CAPABILITY,
  };
}
