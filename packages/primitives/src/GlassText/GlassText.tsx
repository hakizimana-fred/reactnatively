import React, { useMemo } from 'react';
import { Text, StyleSheet, type TextStyle } from 'react-native';
import { useTheme } from 'reactnatively-theme';
import { fontSize as fontSizeTokens, fontWeight as fontWeightTokens, lineHeight as lineHeightTokens } from 'reactnatively-theme';
import type { ThemeColorKey } from 'reactnatively-theme';
import type { TextProps } from 'react-native';
import type { ReactNode } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

/** Semantic text roles — map to predefined size + weight + line-height combos */
export type GlassTextVariant =
  | 'display'    // 52px / black  — large hero text
  | 'heading1'   // 40px / bold   — page title
  | 'heading2'   // 32px / bold   — section title
  | 'heading3'   // 26px / semibold
  | 'heading4'   // 22px / semibold
  | 'heading'    // alias → heading3
  | 'body'       // 15px / normal — default body copy
  | 'bodyLarge'  // 17px / normal
  | 'label'      // 13px / medium — UI labels, tabs
  | 'caption'    // 12px / normal — secondary info
  | 'overline'   // 10px / semibold / uppercased — category labels
  | 'code';      // 13px / mono   — code snippets

export type GlassTextWeight = keyof typeof fontWeightTokens;

export interface GlassTextProps extends Omit<TextProps, 'style'> {
  /** Semantic variant. Defaults to 'body'. */
  variant?:  GlassTextVariant;
  /** Theme color key or any valid CSS/RN color string */
  color?:    ThemeColorKey | string;
  /** Override font weight token */
  weight?:   GlassTextWeight;
  /** Override font size in pixels */
  size?:     number;
  /** Override line height multiplier */
  leading?:  keyof typeof lineHeightTokens;
  /** Uppercase transform (auto-applied for 'overline' variant) */
  uppercase?: boolean;
  style?:    TextStyle | TextStyle[];
  children?: ReactNode;
}

// ─── Variant definitions ──────────────────────────────────────────────────────

interface VariantStyle {
  fontSize:   number;
  fontWeight: TextStyle['fontWeight'];
  lineHeight: number;
  fontFamily?: string;
  letterSpacing?: number;
  textTransform?: TextStyle['textTransform'];
}

function buildVariantStyle(variant: GlassTextVariant): VariantStyle {
  switch (variant) {
    case 'display':
      return {
        fontSize:   fontSizeTokens['6xl'],
        fontWeight: fontWeightTokens.black,
        lineHeight: fontSizeTokens['6xl'] * lineHeightTokens.tight,
      };
    case 'heading1':
      return {
        fontSize:   fontSizeTokens['5xl'],
        fontWeight: fontWeightTokens.bold,
        lineHeight: fontSizeTokens['5xl'] * lineHeightTokens.tight,
      };
    case 'heading2':
      return {
        fontSize:   fontSizeTokens['4xl'],
        fontWeight: fontWeightTokens.bold,
        lineHeight: fontSizeTokens['4xl'] * lineHeightTokens.tight,
      };
    case 'heading3':
    case 'heading':
      return {
        fontSize:   fontSizeTokens['3xl'],
        fontWeight: fontWeightTokens.semibold,
        lineHeight: fontSizeTokens['3xl'] * lineHeightTokens.snug,
      };
    case 'heading4':
      return {
        fontSize:   fontSizeTokens['2xl'],
        fontWeight: fontWeightTokens.semibold,
        lineHeight: fontSizeTokens['2xl'] * lineHeightTokens.snug,
      };
    case 'bodyLarge':
      return {
        fontSize:   fontSizeTokens.lg,
        fontWeight: fontWeightTokens.normal,
        lineHeight: fontSizeTokens.lg * lineHeightTokens.normal,
      };
    case 'body':
      return {
        fontSize:   fontSizeTokens.base,
        fontWeight: fontWeightTokens.normal,
        lineHeight: fontSizeTokens.base * lineHeightTokens.normal,
      };
    case 'label':
      return {
        fontSize:      fontSizeTokens.sm,
        fontWeight:    fontWeightTokens.medium,
        lineHeight:    fontSizeTokens.sm * lineHeightTokens.snug,
        letterSpacing: 0.1,
      };
    case 'caption':
      return {
        fontSize:   fontSizeTokens.xs,
        fontWeight: fontWeightTokens.normal,
        lineHeight: fontSizeTokens.xs * lineHeightTokens.normal,
      };
    case 'overline':
      return {
        fontSize:      fontSizeTokens['2xs'],
        fontWeight:    fontWeightTokens.semibold,
        lineHeight:    fontSizeTokens['2xs'] * lineHeightTokens.normal,
        letterSpacing: 0.8,
        textTransform: 'uppercase',
      };
    case 'code':
      return {
        fontSize:   fontSizeTokens.sm,
        fontWeight: fontWeightTokens.normal,
        lineHeight: fontSizeTokens.sm * lineHeightTokens.relaxed,
        fontFamily: 'Courier',
      };
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * GlassText — theme-aware text primitive.
 *
 * Automatically applies typography scale tokens and theme colors.
 * All variants are memoized; only re-resolves when props change.
 *
 * ```tsx
 * <GlassText variant="heading" color="primary">Hello</GlassText>
 * <GlassText variant="caption" color="textMuted">Fine print</GlassText>
 * <GlassText size={20} weight="bold">Custom size</GlassText>
 * ```
 */
export const GlassText = React.memo<GlassTextProps>(
  ({
    variant  = 'body',
    color,
    weight,
    size,
    leading,
    uppercase = false,
    style,
    children,
    ...textProps
  }) => {
    const { theme } = useTheme();

    const resolvedStyle = useMemo((): TextStyle => {
      const base = buildVariantStyle(variant);

      // Resolve color: theme key → theme color → fallback to raw string
      const resolvedColor =
        color !== undefined
          ? ((theme.colors as unknown as Record<string, string>)[color] ?? color)
          : theme.colors.text;

      const resolvedSize       = size    ?? base.fontSize;
      const resolvedWeight     = weight  ? fontWeightTokens[weight] : base.fontWeight;
      const resolvedLineHeight = leading
        ? resolvedSize * lineHeightTokens[leading]
        : base.lineHeight;

      return {
        color:         resolvedColor,
        fontSize:      resolvedSize,
        fontWeight:    resolvedWeight,
        lineHeight:    resolvedLineHeight,
        fontFamily:    base.fontFamily,
        letterSpacing: base.letterSpacing,
        textTransform: (uppercase || base.textTransform === 'uppercase')
          ? 'uppercase'
          : base.textTransform,
      };
    }, [variant, color, weight, size, leading, uppercase, theme]);

    return (
      <Text
        style={[resolvedStyle, style]}
        allowFontScaling={false}
        {...textProps}
      >
        {children}
      </Text>
    );
  },
);

GlassText.displayName = 'GlassText';

// Exported for consumers who need a static baseline without the hook
export const _styles = StyleSheet.create({
  // Reserved for potential future static style helpers
});
