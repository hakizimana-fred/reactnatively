import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated as RNAnimated } from 'react-native';
import { GlassView } from '@reactnatively/glass';
import { useTheme, useIsDark } from '@reactnatively/theme';
import type { TimelineProps, TimelineItem, TimelineItemStatus } from './Timeline.types';

// ─── Dot sizes ────────────────────────────────────────────────────────────────

const DOT_SIZE       = 14;
const DOT_OUTER_SIZE = 22;  // pulsing ring diameter

// ─── Pulsing dot for "active" status ─────────────────────────────────────────

const PulsingDot = React.memo<{ color: string }>(({ color }) => {
  const scale   = useRef(new RNAnimated.Value(1)).current;
  const opacity = useRef(new RNAnimated.Value(0.8)).current;

  useEffect(() => {
    const anim = RNAnimated.loop(
      RNAnimated.parallel([
        RNAnimated.sequence([
          RNAnimated.timing(scale,   { toValue: 1.5, duration: 900, useNativeDriver: true }),
          RNAnimated.timing(scale,   { toValue: 1.0, duration: 900, useNativeDriver: true }),
        ]),
        RNAnimated.sequence([
          RNAnimated.timing(opacity, { toValue: 0.3, duration: 900, useNativeDriver: true }),
          RNAnimated.timing(opacity, { toValue: 0.8, duration: 900, useNativeDriver: true }),
        ]),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, []);

  return (
    <View style={styles.dotOuter}>
      {/* Pulsing ring */}
      <RNAnimated.View
        style={[
          styles.pulseRing,
          {
            backgroundColor: color,
            transform: [{ scale }],
            opacity,
          },
        ]}
      />
      {/* Solid dot */}
      <View style={[styles.dot, { backgroundColor: color }]} />
    </View>
  );
});
PulsingDot.displayName = 'Timeline.PulsingDot';

// ─── Static dot ───────────────────────────────────────────────────────────────

const StaticDot = React.memo<{ status: TimelineItemStatus; primaryColor: string }>(
  ({ status, primaryColor }) => {
    const isDark = useIsDark();
    const color =
      status === 'complete' ? primaryColor
      : status === 'pending' ? (isDark ? '#4b5563' : '#d1d5db')
      : primaryColor;

    if (status === 'active') {
      return <PulsingDot color={primaryColor} />;
    }

    return (
      <View style={styles.dotOuter}>
        <View
          style={[
            styles.dot,
            { backgroundColor: color },
            status === 'pending' && styles.dotPending,
          ]}
        />
      </View>
    );
  },
);
StaticDot.displayName = 'Timeline.Dot';

// ─── Single timeline row ──────────────────────────────────────────────────────

interface TimelineRowProps {
  item: TimelineItem;
  isLast: boolean;
  primaryColor: string;
  connectorColorAbove: string;
  connectorColorBelow: string;
}

const TimelineRow = React.memo<TimelineRowProps>(
  ({ item, isLast, primaryColor, connectorColorAbove, connectorColorBelow }) => {
    const { theme } = useTheme();
    const isDark    = useIsDark();
    const status    = item.status ?? 'pending';

    const isActive   = status === 'active';
    const isComplete = status === 'complete';

    // Line above = primary if complete or active, gray otherwise
    const lineColor = isComplete || isActive ? primaryColor : connectorColorBelow;

    return (
      <View style={styles.row}>
        {/* Left column: dot + connector */}
        <View style={styles.leftCol}>
          {/* Connector line above dot */}
          <View
            style={[
              styles.connector,
              { backgroundColor: connectorColorAbove },
            ]}
          />

          {/* Dot / icon */}
          {item.icon ? (
            <View
              style={[
                styles.iconDot,
                { backgroundColor: isComplete ? primaryColor : (isDark ? '#374151' : '#e5e7eb') },
              ]}
            >
              {item.icon}
            </View>
          ) : (
            <StaticDot status={status} primaryColor={primaryColor} />
          )}

          {/* Connector line below dot */}
          {!isLast && (
            <View
              style={[
                styles.connectorBottom,
                { backgroundColor: lineColor },
              ]}
            />
          )}
        </View>

        {/* Right column: timestamp + title + description */}
        <View style={styles.rightCol}>
          {item.timestamp != null && (
            <Text style={[styles.timestamp, { color: theme.colors.textMuted }]}>
              {item.timestamp}
            </Text>
          )}
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {item.title}
          </Text>
          {item.description != null && (
            <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
              {item.description}
            </Text>
          )}
        </View>
      </View>
    );
  },
);
TimelineRow.displayName = 'Timeline.Row';

// ─── Timeline ─────────────────────────────────────────────────────────────────

export const Timeline = React.memo<TimelineProps>(
  ({ items, glass = false, style }) => {
    const { theme } = useTheme();
    const isDark    = useIsDark();

    const primaryColor = theme.colors.primary;
    const pendingLine  = isDark ? '#374151' : '#e5e7eb';

    // Find the last complete/active index to determine where line color switches
    const lastActiveIdx = items.reduce((acc, item, i) => {
      const s = item.status ?? 'pending';
      return s === 'complete' || s === 'active' ? i : acc;
    }, -1);

    const inner = (
      <View>
        {items.map((item, index) => {
          const connAbove   = index <= lastActiveIdx ? primaryColor : pendingLine;
          const connBelow   = index < lastActiveIdx  ? primaryColor : pendingLine;

          return (
            <TimelineRow
              key={index}
              item={item}
              isLast={index === items.length - 1}
              primaryColor={primaryColor}
              connectorColorAbove={index === 0 ? 'transparent' : connAbove}
              connectorColorBelow={connBelow}
            />
          );
        })}
      </View>
    );

    if (glass) {
      return (
        <GlassView
          borderRadius={16}
          style={style}
          contentStyle={styles.glassPad}
        >
          {inner}
        </GlassView>
      );
    }

    return <View style={style}>{inner}</View>;
  },
);
Timeline.displayName = 'Timeline';

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    minHeight:     60,
  },
  leftCol: {
    width:          DOT_OUTER_SIZE,
    alignItems:     'center',
    marginRight:    14,
  },
  connector: {
    width:     2,
    height:    16,
    borderRadius: 1,
  },
  connectorBottom: {
    flex:      1,
    width:     2,
    minHeight: 12,
    borderRadius: 1,
    marginTop: 2,
  },
  dotOuter: {
    width:          DOT_OUTER_SIZE,
    height:         DOT_OUTER_SIZE,
    alignItems:     'center',
    justifyContent: 'center',
  },
  dot: {
    width:        DOT_SIZE,
    height:       DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    position:     'absolute',
  },
  dotPending: {
    borderWidth: 2,
    borderColor: 'transparent',
  },
  pulseRing: {
    width:        DOT_OUTER_SIZE,
    height:       DOT_OUTER_SIZE,
    borderRadius: DOT_OUTER_SIZE / 2,
    position:     'absolute',
  },
  iconDot: {
    width:          DOT_OUTER_SIZE,
    height:         DOT_OUTER_SIZE,
    borderRadius:   DOT_OUTER_SIZE / 2,
    alignItems:     'center',
    justifyContent: 'center',
  },
  rightCol: {
    flex:           1,
    paddingBottom:  16,
    gap:            2,
  },
  timestamp: {
    fontSize:   11,
    fontWeight: '500',
    letterSpacing: 0.2,
    textAlign:  'right',
    alignSelf:  'flex-end',
    marginBottom: 2,
  },
  title: {
    fontSize:    14,
    fontWeight:  '600',
    lineHeight:  20,
    letterSpacing: -0.1,
  },
  description: {
    fontSize:   13,
    fontWeight: '400',
    lineHeight: 18,
    marginTop:  2,
  },
  glassPad: {
    padding: 16,
  },
});
