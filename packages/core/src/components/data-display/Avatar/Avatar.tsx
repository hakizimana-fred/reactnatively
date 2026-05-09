import React, { useState, useMemo } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useTheme, useIsDark } from '@reactnatively/theme';
import { defineVariants } from '@reactnatively/utils';
import type { AvatarProps, AvatarSize } from './Avatar.types';

const SIZE_PX = defineVariants<string, number>({
  xs:  24,
  sm:  32,
  md:  44,
  lg:  56,
  xl:  72,
  '2xl': 96,
});

function resolveSizePx(size: AvatarSize): number {
  if (typeof size === 'number') return size;
  return SIZE_PX(size);
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return (parts[0]?.[0] ?? '').toUpperCase();
  return ((parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase();
}

// Deterministic color from name — same name always gets the same color
const AVATAR_COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e',
  '#f59e0b', '#10b981', '#06b6d4', '#3b82f6',
];

function colorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length] ?? AVATAR_COLORS[0]!;
}

const INDICATOR_COLORS: Record<string, string> = {
  online:  '#22c55e',
  offline: '#6b7280',
  busy:    '#ef4444',
  away:    '#f59e0b',
};

// ─── Avatar ───────────────────────────────────────────────────────────────────

export const Avatar = React.memo<AvatarProps>(
  ({
    src,
    name,
    size        = 'md',
    online,
    bordered    = false,
    borderColor,
    fallbackBg,
    fallbackColor = '#fff',
    style,
    imageStyle,
    testID,
  }) => {
    const { theme } = useTheme();
    const isDark = useIsDark();
    const [imgError, setImgError] = useState(false);
    const sizePx = resolveSizePx(size);
    const fontSize = Math.round(sizePx * 0.38);

    const bgColor = useMemo(
      () => fallbackBg ?? (name ? colorFromName(name) : theme.colors.neutral),
      [fallbackBg, name, theme.colors.neutral],
    );

    const showImage = src != null && !imgError;
    const showInitials = !showImage && name != null;

    const borderStyle = bordered
      ? {
          borderWidth: 2.5,
          borderColor: borderColor ?? (isDark ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.85)'),
        }
      : {};

    // Online indicator size scales with avatar
    const indicatorSize  = Math.max(10, Math.round(sizePx * 0.24));
    const indicatorBorder = Math.ceil(indicatorSize * 0.2);

    const indicatorColor = (() => {
      if (!online) return null;
      if (online === true) return INDICATOR_COLORS['online']!;
      return INDICATOR_COLORS[online] ?? INDICATOR_COLORS['online']!;
    })();

    return (
      <View
        testID={testID}
        style={[
          {
            width:        sizePx,
            height:       sizePx,
            borderRadius: sizePx / 2,
          },
          style,
        ]}
      >
        {/* Background + content */}
        <View
          style={[
            styles.container,
            {
              width:           sizePx,
              height:          sizePx,
              borderRadius:    sizePx / 2,
              backgroundColor: showImage ? 'transparent' : bgColor,
            },
            borderStyle,
          ]}
        >
          {showImage && (
            <Image
              source={src!}
              style={[
                StyleSheet.absoluteFill,
                { width: sizePx, height: sizePx, borderRadius: sizePx / 2 },
                imageStyle,
              ]}
              onError={() => setImgError(true)}
            />
          )}

          {showInitials && (
            <Text
              style={{
                fontSize,
                fontWeight: '700',
                color:      fallbackColor,
                letterSpacing: -0.5,
              }}
              allowFontScaling={false}
            >
              {getInitials(name!)}
            </Text>
          )}
        </View>

        {/* Online indicator */}
        {indicatorColor != null && (
          <View
            style={[
              styles.indicator,
              {
                width:         indicatorSize,
                height:        indicatorSize,
                borderRadius:  indicatorSize / 2,
                backgroundColor: indicatorColor,
                borderWidth:   indicatorBorder,
                borderColor:   isDark ? '#13131f' : '#fff',
                bottom:        borderStyle.borderWidth ? -1 : 0,
                right:         borderStyle.borderWidth ? -1 : 0,
              },
            ]}
          />
        )}
      </View>
    );
  },
);

Avatar.displayName = 'Avatar';

const styles = StyleSheet.create({
  container: {
    alignItems:     'center',
    justifyContent: 'center',
    overflow:       'hidden',
  },
  indicator: {
    position: 'absolute',
  },
});
