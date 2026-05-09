import React, { useMemo } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  type ViewStyle,
} from 'react-native';
import { BlurView } from 'expo-blur';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@reactnatively/theme';
import { resolveGlass } from '../../engine/GlassEngine';
import { IS_NO_GLASS, ANDROID_BLUR_METHOD } from '../../engine/CapabilityDetector';
import type { GlassViewProps } from './GlassView.types';

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
            <LinearGradient
              colors={[resolved.highlightColor, 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={[styles.highlightGradient]}
            />
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
          <BlurView
            intensity={resolved.blurAmount}
            tint={resolved.blurTint}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore — experimentalBlurMethod is Android-only, conditionally applied
            experimentalBlurMethod={ANDROID_BLUR_METHOD}
            style={StyleSheet.absoluteFill}
          />

          {/* Layer 2: Tint overlay */}
          <View
            pointerEvents="none"
            style={[StyleSheet.absoluteFill, { backgroundColor: resolved.tintColor }]}
          />

          {/* Layer 3: Top-edge highlight — the "liquid glass" refraction shimmer */}
          {resolved.highlightColor !== 'transparent' && (
            <LinearGradient
              colors={[resolved.highlightColor, 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.highlightGradient}
              pointerEvents="none"
            />
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
