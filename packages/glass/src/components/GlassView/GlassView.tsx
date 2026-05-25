import React, { useMemo } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  type ViewStyle,
} from 'react-native';
import { BlurView as ExpoBlurView } from 'expo-blur';
import { materialTokens, useTheme } from 'reactnatively-theme';
import { resolveGlass } from '../../engine/GlassEngine';
import { IS_NO_GLASS, ANDROID_BLUR_METHOD } from '../../engine/CapabilityDetector';
import { useBlurSurfaceBudget, useGlassPlatform } from '../../engine/GlassMaterialProvider';
import type { GlassViewProps } from './GlassView.types';

const PADDING_KEYS = [
  'padding',
  'paddingBottom',
  'paddingEnd',
  'paddingHorizontal',
  'paddingLeft',
  'paddingRight',
  'paddingStart',
  'paddingTop',
  'paddingVertical',
] as const satisfies readonly (keyof ViewStyle)[];

function splitOuterAndContentStyle(style: GlassViewProps['style']) {
  const flatStyle = StyleSheet.flatten(style);
  if (!flatStyle) {
    return {
      outerStyle: undefined,
      contentPaddingStyle: undefined,
    };
  }

  const outerStyle: ViewStyle = { ...flatStyle };
  const contentPaddingStyle: ViewStyle = {};
  let hasPadding = false;

  for (const key of PADDING_KEYS) {
    const value = flatStyle[key];
    if (value !== undefined) {
      hasPadding = true;
      (contentPaddingStyle as Record<string, unknown>)[key] = value;
      delete (outerStyle as Record<string, unknown>)[key];
    }
  }

  return {
    outerStyle,
    contentPaddingStyle: hasPadding ? contentPaddingStyle : undefined,
  };
}

/**
 * GlassView — the foundational rendering primitive of the Liquid Glass system.
 *
 * Layer stack (bottom → top):
 *   1. Ambient shell       — large soft separation, no hard card shadow
 *   2. Clip shell          — clips optical material to border radius
 *   3. BlurView            — native platform blur
 *   4. Low-opacity tint    — barely-there color body
 *   5. Internal diffusion  — haze and depth inside the material
 *   6. Directional sheen   — top-edge light and curved edge response
 *   7. Soft border ring    — near-invisible optical edge
 *   8. Content             — children above all material layers
 */
export const GlassView = React.memo<GlassViewProps>(
  ({
    elevation    = 2,
    variant      = 'surface',
    material,
    priority     = 'normal',
    highlight    = true,
    border       = true,
    borderWidth  = 1,
    borderRadius = 16,
    blurOverride,
    tintOverride,
    glow,
    style,
    contentStyle,
    children,
    testID,
    accessible,
    accessibilityLabel,
    accessibilityRole,
  }) => {
    const { colorScheme } = useTheme();
    const glassPlatform = useGlassPlatform();
    const withinBlurBudget = useBlurSurfaceBudget(priority);

    const materialRecipe = material ? materialTokens[material] : null;
    const resolvedElevation = materialRecipe?.elevation ?? elevation;
    const resolvedVariant = materialRecipe?.variant ?? variant;

    const resolved = useMemo(
      () => {
        const glassStyle = resolveGlass(
          {
            elevation: resolvedElevation,
            variant: resolvedVariant,
            highlight,
            border,
            borderWidth,
            blurOverride,
            tintOverride,
            priority,
          },
          colorScheme,
        );

        return {
          ...glassStyle,
          blurAmount: withinBlurBudget
            ? glassPlatform.adjustBlur(glassStyle.blurAmount, priority)
            : 0,
        };
      },
      [
        resolvedElevation,
        resolvedVariant,
        highlight,
        border,
        borderWidth,
        blurOverride,
        tintOverride,
        priority,
        colorScheme,
        withinBlurBudget,
        glassPlatform,
      ],
    );

    const shadowStyle = useMemo((): ViewStyle => {
      if (Platform.OS === 'android') {
        return { elevation: resolved.androidElevation };
      }
      return {
        shadowColor:   resolved.shadowColor,
        shadowOffset:  resolved.shadowOffset,
        shadowOpacity: resolved.shadowOpacity,
        shadowRadius:  resolved.shadowRadius,
      };
    }, [resolved]);

    const glowStyle = useMemo((): ViewStyle => {
      if (!glow || Platform.OS !== 'ios') return {};
      return {
        shadowColor:   glow.color,
        shadowOffset:  { width: 0, height: 0 },
        shadowOpacity: glow.opacity ?? 0.35,
        shadowRadius:  glow.radius ?? 24,
      };
    }, [glow]);

    const { outerStyle, contentPaddingStyle } = useMemo(
      () => splitOuterAndContentStyle(style),
      [style],
    );

    const shouldRenderBlur = !IS_NO_GLASS && resolved.blurAmount > 0;

    return (
      <View
        testID={testID}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole={accessibilityRole}
        style={[styles.shadowShell, { borderRadius }, shadowStyle, glowStyle, outerStyle]}
      >
        <View style={[styles.clipShell, { borderRadius }]}>
          {/* Layer 1: Native blur */}
          {shouldRenderBlur ? (
            <ExpoBlurView
              intensity={resolved.blurAmount}
              tint={resolved.blurTint}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore — experimentalBlurMethod is Android-only, conditionally applied
              experimentalBlurMethod={ANDROID_BLUR_METHOD}
              style={StyleSheet.absoluteFill}
            />
          ) : null}

          {/* Layer 2: Low-opacity tint body */}
          <View
            pointerEvents="none"
            style={[StyleSheet.absoluteFill, { backgroundColor: resolved.tintColor }]}
          />

          {/* Layer 3: Internal diffusion */}
          <View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: resolved.diffusionColor,
                opacity: resolved.diffusionOpacity,
              },
            ]}
          />
          <View
            pointerEvents="none"
            style={[
              styles.upperDiffusion,
              {
                backgroundColor: resolved.diffusionColor,
                opacity: resolved.diffusionOpacity * 0.7,
              },
            ]}
          />
          <View
            pointerEvents="none"
            style={[
              styles.lowerDiffusion,
              {
                backgroundColor: resolved.lowerDiffusionColor,
                opacity: resolved.lowerDiffusionOpacity,
              },
            ]}
          />

          {/* Layer 4: Directional sheen — peak specular + falloff + optical edge lines */}
          {resolved.highlightOpacity > 0 && (
            <>
              {/* Tight specular peak at the very top edge */}
              <View
                pointerEvents="none"
                style={[
                  styles.topSheenPeak,
                  {
                    backgroundColor: resolved.highlightColor,
                    opacity: resolved.highlightOpacity,
                  },
                ]}
              />
              {/* Broader falloff zone — simulates curved-surface light diffusion */}
              <View
                pointerEvents="none"
                style={[
                  styles.topSheenFade,
                  {
                    backgroundColor: resolved.highlightColor,
                    opacity: resolved.highlightFadeOpacity,
                  },
                ]}
              />
              {/* Hairline optical edge lines along top and sides */}
              <View
                pointerEvents="none"
                style={[
                  styles.edgeSheen,
                  {
                    borderColor: resolved.edgeHighlightColor,
                    opacity: resolved.edgeHighlightOpacity,
                  },
                ]}
              />
            </>
          )}

          {/* Layer 5: Soft border ring */}
          {border && (
            <>
              <View
                pointerEvents="none"
                style={[
                  StyleSheet.absoluteFill,
                  { borderWidth: resolved.borderWidth, borderColor: resolved.borderColor },
                ]}
              />
              <View
                pointerEvents="none"
                style={[
                  styles.innerBorder,
                  { borderWidth: StyleSheet.hairlineWidth, borderColor: resolved.innerBorderColor },
                ]}
              />
            </>
          )}

          {/* Layer 6: Children */}
          <View style={[styles.content, contentPaddingStyle, contentStyle]}>{children}</View>
        </View>
      </View>
    );
  },
);

GlassView.displayName = 'GlassView';

const styles = StyleSheet.create({
  shadowShell: {
    // Shadow lives here — no overflow:hidden so Android elevation renders
  },
  clipShell: {
    overflow: 'hidden',
  },
  upperDiffusion: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '48%',
  },
  lowerDiffusion: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '42%',
  },
  topSheenPeak: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '14%',
  },
  topSheenFade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '36%',
  },
  edgeSheen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '46%',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  innerBorder: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    position: 'relative',
  },
});
