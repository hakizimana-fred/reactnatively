import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { GlassView } from '@reactnatively/glass';
import { useIsDark } from '@reactnatively/theme';
import { useEntranceAnimation, useReducedMotion, TIMING_EXIT } from '@reactnatively/animations';
import type { BannerProps, BannerStatus } from './Banner.types';

const STATUS_COLORS: Record<BannerStatus, string> = {
  info:    '#06b6d4',
  success: '#10b981',
  warning: '#f59e0b',
  error:   '#ef4444',
  neutral: '#6b7280',
};

const STATUS_ICONS: Record<BannerStatus, string> = {
  info:    'ℹ',
  success: '✓',
  warning: '⚠',
  error:   '✕',
  neutral: '●',
};

export const Banner = React.memo<BannerProps>(
  ({
    status         = 'info',
    title,
    description,
    action,
    secondaryAction,
    isDismissible  = false,
    onDismiss,
    glass          = false,
    style,
  }) => {
    const isDark     = useIsDark();
    const isReduced  = useReducedMotion();
    const [mounted, setMounted] = useState(true);

    const exitOpacity = useSharedValue(1);

    const entranceStyle = useEntranceAnimation({ variant: 'slideDown' });

    const handleDismiss = useCallback(() => {
      if (isReduced) {
        setMounted(false);
        onDismiss?.();
        return;
      }
      exitOpacity.value = withTiming(0, TIMING_EXIT, () => {
        runOnJS(setMounted)(false);
        if (onDismiss) runOnJS(onDismiss)();
      });
    }, [isReduced, onDismiss, exitOpacity]);

    const exitStyle = useAnimatedStyle(() => {
      'worklet';
      return { opacity: exitOpacity.value };
    });

    if (!mounted) return null;

    const accentColor = STATUS_COLORS[status];
    const iconChar    = STATUS_ICONS[status];
    const textColor   = isDark ? '#f1f5f9' : '#0f172a';
    const subColor    = isDark ? '#94a3b8' : '#475569';

    const inner = (
      <View style={styles.inner}>
        {/* Left color bar */}
        <View style={[styles.colorBar, { backgroundColor: accentColor }]} />

        {/* Icon */}
        <View style={[styles.iconWrap, { backgroundColor: `${accentColor}20` }]}>
          <Text style={[styles.iconText, { color: accentColor }]}>{iconChar}</Text>
        </View>

        {/* Text block */}
        <View style={styles.textBlock}>
          {title != null && (
            <Text style={[styles.title, { color: textColor }]} numberOfLines={2}>
              {title}
            </Text>
          )}
          {description != null && (
            <Text style={[styles.description, { color: subColor }]}>
              {description}
            </Text>
          )}

          {/* Action buttons */}
          {(action != null || secondaryAction != null) && (
            <View style={styles.actionsRow}>
              {action != null && (
                <Pressable onPress={action.onPress} style={styles.actionBtn}>
                  <Text style={[styles.actionText, { color: accentColor }]}>
                    {action.label}
                  </Text>
                </Pressable>
              )}
              {secondaryAction != null && (
                <Pressable onPress={secondaryAction.onPress} style={styles.actionBtn}>
                  <Text style={[styles.secondaryActionText, { color: subColor }]}>
                    {secondaryAction.label}
                  </Text>
                </Pressable>
              )}
            </View>
          )}
        </View>

        {/* Dismiss button */}
        {isDismissible && (
          <Pressable
            onPress={handleDismiss}
            style={styles.closeBtn}
            accessibilityLabel="Dismiss banner"
            accessibilityRole="button"
          >
            <Text style={[styles.closeText, { color: subColor }]}>✕</Text>
          </Pressable>
        )}
      </View>
    );

    if (glass) {
      return (
        <Animated.View style={[styles.wrapper, entranceStyle, exitStyle, style]}>
          <GlassView elevation={1} borderRadius={4}>
            {inner}
          </GlassView>
        </Animated.View>
      );
    }

    return (
      <Animated.View
        style={[
          styles.wrapper,
          styles.solidBg,
          { backgroundColor: isDark ? '#1e293b' : '#f8fafc' },
          entranceStyle,
          exitStyle,
          style,
        ]}
      >
        {inner}
      </Animated.View>
    );
  },
);

Banner.displayName = 'Banner';

const styles = StyleSheet.create({
  wrapper: {
    width:      '100%',
    borderRadius: 4,
    overflow:   'hidden',
  },
  solidBg: {
    shadowColor:   '#000',
    shadowOffset:  { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius:  4,
    elevation:     2,
  },
  inner: {
    flexDirection: 'row',
    alignItems:    'flex-start',
    minHeight:     52,
  },
  colorBar: {
    width:      4,
    alignSelf:  'stretch',
  },
  iconWrap: {
    width:           32,
    height:          32,
    borderRadius:    16,
    alignItems:      'center',
    justifyContent:  'center',
    marginLeft:      12,
    marginTop:       10,
    flexShrink:      0,
  },
  iconText: {
    fontSize:   13,
    fontWeight: '700',
  },
  textBlock: {
    flex:            1,
    paddingLeft:     10,
    paddingTop:      10,
    paddingBottom:   10,
    paddingRight:    4,
  },
  title: {
    fontSize:     14,
    fontWeight:   '700',
    lineHeight:   20,
    marginBottom: 2,
  },
  description: {
    fontSize:   13,
    lineHeight: 18,
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop:     8,
    flexWrap:      'wrap',
  },
  actionBtn: {
    marginRight:     12,
    paddingVertical: 2,
  },
  actionText: {
    fontSize:   13,
    fontWeight: '700',
  },
  secondaryActionText: {
    fontSize:   13,
    fontWeight: '500',
  },
  closeBtn: {
    padding:         10,
    alignSelf:       'flex-start',
    alignItems:      'center',
    justifyContent:  'center',
  },
  closeText: {
    fontSize:   14,
    lineHeight: 18,
  },
});
