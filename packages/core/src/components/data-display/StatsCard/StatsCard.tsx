import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { GlassView } from '@reactnatively/glass';
import { useTheme, useIsDark } from '@reactnatively/theme';
import { useEntranceAnimation } from '@reactnatively/animations';
import type { StatsCardProps, TrendDirection } from './StatsCard.types';

// ─── Trend indicator ──────────────────────────────────────────────────────────

const TREND_ARROW: Record<TrendDirection, string> = {
  up:      '↑',
  down:    '↓',
  neutral: '→',
};

interface TrendProps {
  value: string;
  direction: TrendDirection;
}

const TrendBadge = React.memo<TrendProps>(({ value, direction }) => {
  const { theme } = useTheme();
  const isDark    = useIsDark();

  const trendColor =
    direction === 'up'
      ? (isDark ? '#4ade80' : '#16a34a')
      : direction === 'down'
      ? (isDark ? '#f87171' : '#dc2626')
      : (isDark ? '#94a3b8' : '#64748b');

  const trendBg =
    direction === 'up'
      ? (isDark ? 'rgba(74,222,128,0.12)' : 'rgba(22,163,74,0.10)')
      : direction === 'down'
      ? (isDark ? 'rgba(248,113,113,0.12)' : 'rgba(220,38,38,0.10)')
      : (isDark ? 'rgba(148,163,184,0.12)' : 'rgba(100,116,139,0.10)');

  return (
    <View style={[styles.trendBadge, { backgroundColor: trendBg }]}>
      <Text style={[styles.trendText, { color: trendColor }]}>
        {TREND_ARROW[direction]} {value}
      </Text>
    </View>
  );
});
TrendBadge.displayName = 'StatsCard.Trend';

// ─── StatsCard ────────────────────────────────────────────────────────────────

export const StatsCard = React.memo<StatsCardProps>(
  ({
    value,
    label,
    prefix,
    suffix,
    trend,
    icon,
    glass = false,
    style,
  }) => {
    const { theme } = useTheme();

    const entranceStyle = useEntranceAnimation({ variant: 'slideUp' });

    const cardContent = (
      <>
        {/* Top row: label + icon */}
        <View style={styles.topRow}>
          <Text
            style={[styles.label, { color: theme.colors.textSecondary }]}
            numberOfLines={1}
          >
            {label}
          </Text>
          {icon != null && (
            <View style={styles.iconSlot}>{icon}</View>
          )}
        </View>

        {/* Value */}
        <Text
          style={[styles.value, { color: theme.colors.text }]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {prefix && (
            <Text style={[styles.valueAffix, { color: theme.colors.textSecondary }]}>
              {prefix}
            </Text>
          )}
          {String(value)}
          {suffix && (
            <Text style={[styles.valueAffix, { color: theme.colors.textSecondary }]}>
              {suffix}
            </Text>
          )}
        </Text>

        {/* Trend */}
        {trend != null && (
          <TrendBadge value={trend.value} direction={trend.direction} />
        )}
      </>
    );

    if (glass) {
      return (
        <Animated.View style={[entranceStyle, style]}>
          <GlassView
            borderRadius={16}
            contentStyle={styles.cardPad}
          >
            {cardContent}
          </GlassView>
        </Animated.View>
      );
    }

    return (
      <Animated.View
        style={[
          entranceStyle,
          styles.card,
          {
            backgroundColor: theme.colors.surface,
            borderColor:     theme.colors.border,
          },
          style,
        ]}
      >
        {cardContent}
      </Animated.View>
    );
  },
);
StatsCard.displayName = 'StatsCard';

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    borderRadius:  16,
    padding:       20,
    borderWidth:   StyleSheet.hairlineWidth,
  },
  cardPad: {
    padding: 20,
  },
  topRow: {
    flexDirection:  'row',
    alignItems:     'flex-start',
    justifyContent: 'space-between',
    marginBottom:   8,
  },
  label: {
    fontSize:    13,
    fontWeight:  '500',
    letterSpacing: 0.1,
    flex:        1,
  },
  iconSlot: {
    marginLeft:     8,
    alignItems:     'center',
    justifyContent: 'center',
  },
  value: {
    fontSize:    32,
    fontWeight:  '700',
    letterSpacing: -1,
    lineHeight:  38,
    marginBottom: 10,
  },
  valueAffix: {
    fontSize:    20,
    fontWeight:  '500',
    letterSpacing: -0.5,
  },
  trendBadge: {
    alignSelf:     'flex-start',
    paddingHorizontal: 8,
    paddingVertical:   4,
    borderRadius:  20,
  },
  trendText: {
    fontSize:   12,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
});
