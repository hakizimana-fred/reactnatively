import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { GlassView } from '@reactnatively/glass';
import { radii } from '@reactnatively/theme';
import type { RadiiKey } from '@reactnatively/theme';
import type { SurfaceProps, GlassSurfaceConfig } from './Surface.types';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function resolveRadius(borderRadius?: number | RadiiKey): number | undefined {
  if (borderRadius === undefined) return undefined;
  if (typeof borderRadius === 'number') return borderRadius;
  return radii[borderRadius as RadiiKey];
}

function isGlassConfig(glass: boolean | GlassSurfaceConfig): glass is GlassSurfaceConfig {
  return typeof glass === 'object' && glass !== null;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Surface — the unified rendering primitive.
 *
 * Handles three rendering paths:
 *   1. glass=true/config → GlassView (liquid glass layer stack)
 *   2. solid bg          → plain View with backgroundColor
 *   3. animated=true     → wraps whichever output in Animated.View
 *
 * All hooks are called unconditionally (Rules of Hooks). The glass/solid
 * branch decision happens in the return, not at hook call sites.
 */
export const Surface = React.memo<SurfaceProps>(
  ({
    glass,
    elevation,
    variant,
    bg,
    borderRadius,
    border       = false,
    borderColor,
    borderWidth  = 1,
    animated     = false,
    style,
    contentStyle,
    children,
    ...viewProps
  }) => {
    // ── Hooks (must be called unconditionally) ────────────────────────────────

    const resolvedRadius = useMemo(() => resolveRadius(borderRadius), [borderRadius]);

    // Solid background style — computed regardless of glass mode (cheap, and
    // avoids conditional hook calls which violate the Rules of Hooks).
    // Returned as a plain object; TypeScript infers the shape to avoid
    // phantom type conflicts between multiple react-native version resolutions.
    const solidStyle = useMemo(() => {
      const s: Record<string, unknown> = {};
      if (bg !== undefined)             s['backgroundColor'] = bg;
      if (resolvedRadius !== undefined) s['borderRadius']    = resolvedRadius;
      if (border) {
        s['borderWidth'] = borderWidth;
        s['borderColor'] = borderColor ?? 'transparent';
      }
      return s;
    }, [bg, resolvedRadius, border, borderWidth, borderColor]);

    // ── Glass config resolution ───────────────────────────────────────────────

    const glassConfig = useMemo((): GlassSurfaceConfig | null => {
      if (!glass) return null;
      if (isGlassConfig(glass)) return glass;
      return {
        elevation: elevation ?? 2,
        variant:   variant   ?? 'surface',
      };
    }, [glass, elevation, variant]);

    // ── Render ────────────────────────────────────────────────────────────────

    if (glassConfig !== null) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const GV = GlassView as React.ComponentType<any>;
      const glassEl = (
        <GV
          elevation={glassConfig.elevation ?? 2}
          variant={glassConfig.variant ?? 'surface'}
          highlight={glassConfig.highlight}
          border={glassConfig.border ?? border}
          borderWidth={glassConfig.borderWidth ?? (border ? borderWidth : undefined)}
          borderRadius={resolvedRadius ?? 16}
          blurOverride={glassConfig.blurOverride}
          tintOverride={glassConfig.tintOverride}
          glow={glassConfig.glow}
          contentStyle={contentStyle}
          style={animated ? undefined : style}
          {...viewProps}
        >
          {children}
        </GV>
      );

      if (animated) {
        return (
          <Animated.View style={style}>
            {glassEl}
          </Animated.View>
        );
      }

      return glassEl;
    }

    // ── Solid / plain path ────────────────────────────────────────────────────

    const solidContent = contentStyle ? (
      <View style={[styles.contentWrapper, contentStyle]}>{children}</View>
    ) : children;

    if (animated) {
      return (
        <Animated.View style={[solidStyle, style]} {...viewProps}>
          {solidContent}
        </Animated.View>
      );
    }

    return (
      <View style={[solidStyle, style]} {...viewProps}>
        {solidContent}
      </View>
    );
  },
);

Surface.displayName = 'Surface';

const styles = StyleSheet.create({
  contentWrapper: {
    position: 'relative',
  },
});
