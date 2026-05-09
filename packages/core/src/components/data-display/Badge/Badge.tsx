import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { GlassView } from '@reactnatively/glass';
import { useTheme, useIsDark } from '@reactnatively/theme';
import { SPRING_BOUNCE } from '@reactnatively/animations';
import type { BadgeProps, BadgeStatus, BadgeVariant } from './Badge.types';

// ─── Size tables ──────────────────────────────────────────────────────────────

const DOT_SIZE   = { sm: 8,  md: 10, lg: 12 } as const;
const BADGE_H    = { sm: 18, md: 22, lg: 26 } as const;
const FONT_SIZE  = { sm: 10, md: 12, lg: 13 } as const;
const H_PADDING  = { sm: 5,  md: 7,  lg: 9  } as const;

// ─── Color resolution ─────────────────────────────────────────────────────────

function useStatusColors(
  status: BadgeStatus,
  variant: BadgeVariant,
  isDark: boolean,
  primaryColor: string,
) {
  const STATUS_SOLID: Record<BadgeStatus, string> = {
    primary:   primaryColor,
    secondary: isDark ? '#8b5cf6' : '#7c3aed',
    success:   isDark ? '#22c55e' : '#16a34a',
    warning:   isDark ? '#f59e0b' : '#d97706',
    error:     isDark ? '#ef4444' : '#dc2626',
    neutral:   isDark ? '#6b7280' : '#4b5563',
  };

  const STATUS_TEXT: Record<BadgeStatus, string> = {
    primary:   '#fff',
    secondary: '#fff',
    success:   '#fff',
    warning:   '#fff',
    error:     '#fff',
    neutral:   '#fff',
  };

  const STATUS_SUBTLE_BG: Record<BadgeStatus, string> = {
    primary:   isDark ? 'rgba(99,102,241,0.22)' : 'rgba(99,102,241,0.12)',
    secondary: isDark ? 'rgba(139,92,246,0.22)' : 'rgba(139,92,246,0.12)',
    success:   isDark ? 'rgba(34,197,94,0.22)'  : 'rgba(22,163,74,0.12)',
    warning:   isDark ? 'rgba(245,158,11,0.22)' : 'rgba(217,119,6,0.12)',
    error:     isDark ? 'rgba(239,68,68,0.22)'  : 'rgba(220,38,38,0.12)',
    neutral:   isDark ? 'rgba(107,114,128,0.22)': 'rgba(75,85,99,0.12)',
  };

  const STATUS_SUBTLE_TEXT: Record<BadgeStatus, string> = {
    primary:   isDark ? '#a5b4fc' : '#4f46e5',
    secondary: isDark ? '#c4b5fd' : '#7c3aed',
    success:   isDark ? '#86efac' : '#15803d',
    warning:   isDark ? '#fcd34d' : '#b45309',
    error:     isDark ? '#fca5a5' : '#b91c1c',
    neutral:   isDark ? '#d1d5db' : '#374151',
  };

  const solidBg   = STATUS_SOLID[status];
  const solidText = STATUS_TEXT[status];
  const subtleBg  = STATUS_SUBTLE_BG[status];
  const subtleText = STATUS_SUBTLE_TEXT[status];
  const outlineBorder = STATUS_SOLID[status];

  switch (variant) {
    case 'solid':
      return { bg: solidBg, text: solidText, border: 'transparent' };
    case 'subtle':
      return { bg: subtleBg, text: subtleText, border: 'transparent' };
    case 'outline':
      return {
        bg: 'transparent',
        text: outlineBorder,
        border: outlineBorder,
      };
    case 'glass':
      return {
        bg: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.60)',
        text: isDark ? '#e2e8f0' : '#1e293b',
        border: isDark ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.80)',
      };
  }
}

// ─── Badge pill / dot ─────────────────────────────────────────────────────────

interface BadgePillProps {
  count?: number;
  dot?: boolean;
  label?: string;
  status: BadgeStatus;
  variant: BadgeVariant;
  maxCount: number;
  size: 'sm' | 'md' | 'lg';
}

const BadgePill = React.memo<BadgePillProps>(
  ({ count, dot, label, status, variant, maxCount, size }) => {
    const { theme } = useTheme();
    const isDark    = useIsDark();
    const scale     = useSharedValue(1);

    const colors = useStatusColors(status, variant, isDark, theme.colors.primary);

    // Scale pop when count changes
    useEffect(() => {
      if (count == null) return;
      scale.value = withSpring(1.25, SPRING_BOUNCE, () => {
        'worklet';
        scale.value = withSpring(1, SPRING_BOUNCE);
      });
    }, [count]);

    const animStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    if (dot) {
      const dotSize = DOT_SIZE[size];
      if (variant === 'glass') {
        return (
          <Animated.View style={animStyle}>
            <GlassView
              borderRadius={dotSize / 2}
              style={{ width: dotSize, height: dotSize }}
            />
          </Animated.View>
        );
      }
      return (
        <Animated.View
          style={[
            animStyle,
            {
              width:           dotSize,
              height:          dotSize,
              borderRadius:    dotSize / 2,
              backgroundColor: colors.bg,
              borderWidth:     variant === 'outline' ? 1.5 : 0,
              borderColor:     colors.border,
            },
          ]}
        />
      );
    }

    const height   = BADGE_H[size];
    const fontSize = FONT_SIZE[size];
    const px       = H_PADDING[size];

    let displayText = label ?? '';
    if (count != null) {
      displayText = count > maxCount ? `${maxCount}+` : String(count);
    }
    const minWidth = height;

    if (variant === 'glass') {
      return (
        <Animated.View style={animStyle}>
          <GlassView
            borderRadius={height / 2}
            style={{ height, minWidth, paddingHorizontal: px }}
            contentStyle={styles.pillContent}
          >
            <Text
              style={[styles.pillText, { fontSize, color: colors.text }]}
              allowFontScaling={false}
              numberOfLines={1}
            >
              {displayText}
            </Text>
          </GlassView>
        </Animated.View>
      );
    }

    return (
      <Animated.View
        style={[
          animStyle,
          {
            height,
            minWidth,
            borderRadius:    height / 2,
            backgroundColor: colors.bg,
            paddingHorizontal: px,
            borderWidth:     variant === 'outline' ? 1.5 : 0,
            borderColor:     colors.border,
          },
          styles.pillContent,
        ]}
      >
        <Text
          style={[styles.pillText, { fontSize, color: colors.text }]}
          allowFontScaling={false}
          numberOfLines={1}
        >
          {displayText}
        </Text>
      </Animated.View>
    );
  },
);
BadgePill.displayName = 'Badge.Pill';

// ─── Placement helpers ────────────────────────────────────────────────────────

type Placement = NonNullable<BadgeProps['placement']>;

function placementStyle(placement: Placement, size: 'sm' | 'md' | 'lg') {
  const offset = -(DOT_SIZE[size] / 2);
  switch (placement) {
    case 'topRight':    return { top: offset, right: offset };
    case 'topLeft':     return { top: offset, left: offset };
    case 'bottomRight': return { bottom: offset, right: offset };
    case 'bottomLeft':  return { bottom: offset, left: offset };
  }
}

// ─── Badge (root) ─────────────────────────────────────────────────────────────

export const Badge = React.memo<BadgeProps>(
  ({
    count,
    dot    = false,
    label,
    status  = 'primary',
    variant = 'solid',
    maxCount = 99,
    size    = 'md',
    children,
    placement = 'topRight',
    style,
  }) => {
    const pill = (
      <BadgePill
        count={count}
        dot={dot}
        label={label}
        status={status}
        variant={variant}
        maxCount={maxCount}
        size={size}
      />
    );

    if (!children) {
      return <View style={style}>{pill}</View>;
    }

    return (
      <View style={[styles.wrapper, style]}>
        {children}
        <View style={[styles.positioned, placementStyle(placement, size)]}>
          {pill}
        </View>
      </View>
    );
  },
);
Badge.displayName = 'Badge';

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  positioned: {
    position: 'absolute',
    zIndex:   10,
  },
  pillContent: {
    alignItems:     'center',
    justifyContent: 'center',
    flexDirection:  'row',
  },
  pillText: {
    fontWeight:  '700',
    letterSpacing: -0.2,
    textAlign:   'center',
  },
});
