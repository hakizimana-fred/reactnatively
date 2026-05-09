import React, { useMemo } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '@reactnatively/theme';
import { resolveGlass } from '../../engine/GlassEngine';
import { IS_NO_GLASS, ANDROID_BLUR_METHOD } from '../../engine/CapabilityDetector';
import type { GlassViewProps } from './GlassView.types';

let BlurViewImpl: typeof import('expo-blur').BlurView | null | undefined;
let LinearGradientImpl:
  | typeof import('react-native-linear-gradient').default
  | null
  | undefined;

function loadBlurView(): typeof import('expo-blur').BlurView | null {
  if (BlurViewImpl !== undefined) return BlurViewImpl;
  try {
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    BlurViewImpl = require('expo-blur').BlurView;
  } catch {
    BlurViewImpl = null;
  }
  return BlurViewImpl;
}

function loadLinearGradient():
  | typeof import('react-native-linear-gradient').default
  | null {
  if (LinearGradientImpl !== undefined) return LinearGradientImpl;
  try {
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    const gradientModule = require('react-native-linear-gradient');
    LinearGradientImpl = gradientModule?.default ?? gradientModule;
  } catch {
    LinearGradientImpl = null;
  }
  return LinearGradientImpl;
}

/**
 * GlassView — the foundational rendering primitive of the Liquid Glass system.
 *
 * Layer stack (bottom → top):
 *   1. Shadow shell   — drop shadow / elevation (outer view, NO overflow:hidden)
 *   2. Clip shell     — clips all glass layers to border radius (overflow:hidden)
 *   3. BlurView       — native platform blur
 *   4. Tint overlay   — semi-transparent color layer
 *   5. Highlight      — top-edge refraction shimmer (LinearGradient)
 *   6. Border ring    — 1px glass edge line
 *   7. Content        — children, above all glass layers
 */
export const GlassView = React.memo<GlassViewProps>(
  ({
    elevation    = 2,
    variant      = 'surface',
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

    const resolved = useMemo(
      () =>
        resolveGlass(
          { elevation, variant, highlight, border, borderWidth, blurOverride, tintOverride },
          colorScheme,
        ),
      [elevation, variant, highlight, border, borderWidth, blurOverride, tintOverride, colorScheme],
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

    const BlurViewComponent = loadBlurView();
    const LinearGradientComponent = loadLinearGradient();

    // Fallback: no-blur devices — solid semi-transparent + gradient only
    if (IS_NO_GLASS) {
      return (
        <View
          testID={testID}
          accessible={accessible}
          accessibilityLabel={accessibilityLabel}
          accessibilityRole={accessibilityRole}
          style={[styles.shadowShell, { borderRadius }, shadowStyle, style]}
        >
          <View style={[styles.clipShell, { borderRadius }]}>
            <View
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: resolved.tintColor },
              ]}
            />
            {resolved.highlightColor !== 'transparent' && (
              LinearGradientComponent ? (
                <LinearGradientComponent
                  colors={[resolved.highlightColor, 'transparent']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.highlightGradient}
                />
              ) : (
                <View
                  pointerEvents="none"
                  style={[
                    styles.highlightGradient,
                    { backgroundColor: resolved.highlightColor, opacity: 0.2 },
                  ]}
                />
              )
            )}
            {border && (
              <View
                pointerEvents="none"
                style={[
                  StyleSheet.absoluteFill,
                  { borderWidth: resolved.borderWidth, borderColor: resolved.borderColor },
                ]}
              />
            )}
            <View style={[styles.content, contentStyle]}>{children}</View>
          </View>
        </View>
      );
    }

    return (
      <View
        testID={testID}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole={accessibilityRole}
        style={[styles.shadowShell, { borderRadius }, shadowStyle, glowStyle, style]}
      >
        <View style={[styles.clipShell, { borderRadius }]}>
          {/* Layer 1: Native blur */}
          {BlurViewComponent ? (
            <BlurViewComponent
              intensity={resolved.blurAmount}
              tint={resolved.blurTint}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore — experimentalBlurMethod is Android-only, conditionally applied
              experimentalBlurMethod={ANDROID_BLUR_METHOD}
              style={StyleSheet.absoluteFill}
            />
          ) : (
            <View
              pointerEvents="none"
              style={[StyleSheet.absoluteFill, { backgroundColor: resolved.tintColor }]}
            />
          )}

          {/* Layer 2: Tint overlay */}
          <View
            pointerEvents="none"
            style={[StyleSheet.absoluteFill, { backgroundColor: resolved.tintColor }]}
          />

          {/* Layer 3: Top-edge highlight — the "liquid glass" refraction shimmer */}
          {resolved.highlightColor !== 'transparent' && (
            LinearGradientComponent ? (
              <LinearGradientComponent
                colors={[resolved.highlightColor, 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.highlightGradient}
                pointerEvents="none"
              />
            ) : (
              <View
                pointerEvents="none"
                style={[
                  styles.highlightGradient,
                  { backgroundColor: resolved.highlightColor, opacity: 0.18 },
                ]}
              />
            )
          )}

          {/* Layer 4: Glass edge border */}
          {border && (
            <View
              pointerEvents="none"
              style={[
                StyleSheet.absoluteFill,
                { borderWidth: resolved.borderWidth, borderColor: resolved.borderColor },
              ]}
            />
          )}

          {/* Layer 5: Children */}
          <View style={[styles.content, contentStyle]}>{children}</View>
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
  highlightGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '35%',
  },
  content: {
    position: 'relative',
  },
});
