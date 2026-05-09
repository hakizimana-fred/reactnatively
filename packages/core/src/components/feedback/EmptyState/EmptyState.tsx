import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { GlassView } from '@reactnatively/glass';
import { useTheme, useIsDark } from '@reactnatively/theme';
import { useEntranceAnimation } from '@reactnatively/animations';
import type { EmptyStateProps } from './EmptyState.types';

export const EmptyState = React.memo<EmptyStateProps>(
  ({
    illustration,
    icon,
    title,
    description,
    action,
    secondaryAction,
    glass = false,
    style,
  }) => {
    const { theme } = useTheme();
    const isDark    = useIsDark();

    const animStyle = useEntranceAnimation({ variant: 'fade' });

    const iconBg    = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
    const titleColor = isDark ? '#f1f5f9' : '#0f172a';
    const descColor  = isDark ? '#94a3b8' : '#64748b';

    const defaultIcon = (
      <View style={[styles.defaultIconWrap, { backgroundColor: iconBg }]}>
        <Text style={styles.defaultIconText}>📭</Text>
      </View>
    );

    const content = (
      <Animated.View style={[styles.inner, animStyle]}>
        {/* Illustration / Icon slot */}
        {illustration != null ? (
          <View style={styles.illustrationSlot}>{illustration}</View>
        ) : (
          <View style={styles.iconSlot}>
            {icon ?? defaultIcon}
          </View>
        )}

        {/* Text */}
        {title != null && (
          <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
        )}
        {description != null && (
          <Text style={[styles.description, { color: descColor }]}>{description}</Text>
        )}

        {/* Actions */}
        {(action != null || secondaryAction != null) && (
          <View style={styles.actionsRow}>
            {action != null && (
              <Pressable
                onPress={action.onPress}
                style={[
                  styles.actionBtn,
                  action.variant === 'outline'
                    ? [styles.outlineBtn, { borderColor: theme.colors.primary }]
                    : [styles.solidBtn, { backgroundColor: theme.colors.primary }],
                ]}
                accessibilityRole="button"
              >
                <Text
                  style={[
                    styles.actionText,
                    { color: action.variant === 'outline' ? theme.colors.primary : '#fff' },
                  ]}
                >
                  {action.label}
                </Text>
              </Pressable>
            )}

            {secondaryAction != null && (
              <Pressable
                onPress={secondaryAction.onPress}
                style={styles.ghostBtn}
                accessibilityRole="button"
              >
                <Text style={[styles.ghostText, { color: descColor }]}>
                  {secondaryAction.label}
                </Text>
              </Pressable>
            )}
          </View>
        )}
      </Animated.View>
    );

    if (glass) {
      return (
        <GlassView elevation={1} borderRadius={20} style={[styles.glassWrapper, style]}>
          {content}
        </GlassView>
      );
    }

    return (
      <View style={[styles.wrapper, style]}>
        {content}
      </View>
    );
  },
);

EmptyState.displayName = 'EmptyState';

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  glassWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    alignItems: 'center',
    width: '100%',
    padding: 32,
  },
  illustrationSlot: {
    maxHeight:    120,
    alignItems:   'center',
    marginBottom: 20,
    overflow:     'hidden',
  },
  iconSlot: {
    marginBottom: 20,
    alignItems:   'center',
  },
  defaultIconWrap: {
    width:          64,
    height:         64,
    borderRadius:   32,
    alignItems:     'center',
    justifyContent: 'center',
  },
  defaultIconText: {
    fontSize: 28,
  },
  title: {
    fontSize:     18,
    fontWeight:   '700',
    lineHeight:   24,
    textAlign:    'center',
    marginBottom: 8,
  },
  description: {
    fontSize:     14,
    lineHeight:   20,
    textAlign:    'center',
    marginBottom: 24,
    maxWidth:     300,
  },
  actionsRow: {
    alignItems: 'center',
    gap:        12,
  },
  actionBtn: {
    paddingVertical:   12,
    paddingHorizontal: 24,
    borderRadius:      12,
    alignItems:        'center',
    justifyContent:    'center',
    minWidth:          140,
  },
  solidBtn: {},
  outlineBtn: {
    borderWidth: 1.5,
    backgroundColor: 'transparent',
  },
  actionText: {
    fontSize:   15,
    fontWeight: '600',
  },
  ghostBtn: {
    paddingVertical:   8,
    paddingHorizontal: 16,
  },
  ghostText: {
    fontSize:   14,
    fontWeight: '500',
  },
});
