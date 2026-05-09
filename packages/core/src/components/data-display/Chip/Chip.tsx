import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { GlassView } from '@reactnatively/glass';
import { useTheme, useIsDark } from '@reactnatively/theme';
import { usePressAnimation } from '@reactnatively/animations';
import type { ChipProps, ChipVariant } from './Chip.types';

// ─── Size tables ──────────────────────────────────────────────────────────────

const CHIP_HEIGHT  = { sm: 28, md: 34, lg: 42 } as const;
const CHIP_FONT    = { sm: 12, md: 13, lg: 15 } as const;
const CHIP_PADDING = { sm: 8,  md: 10, lg: 14 } as const;
const AVATAR_SIZE  = { sm: 20, md: 24, lg: 28 } as const;
const DISMISS_SIZE = { sm: 16, md: 18, lg: 20 } as const;

// ─── Color resolution ─────────────────────────────────────────────────────────

interface ChipColors {
  bg:     string;
  text:   string;
  border: string;
  selectedBg:   string;
  selectedText: string;
}

function useChipColors(
  variant: ChipVariant,
  customColor: string | undefined,
  isDark: boolean,
  primaryColor: string,
): ChipColors {
  const accent = customColor ?? primaryColor;

  switch (variant) {
    case 'solid':
      return {
        bg:           isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.06)',
        text:         isDark ? '#e2e8f0' : '#1e293b',
        border:       'transparent',
        selectedBg:   accent,
        selectedText: '#fff',
      };
    case 'outline':
      return {
        bg:           'transparent',
        text:         isDark ? '#cbd5e1' : '#374151',
        border:       isDark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.18)',
        selectedBg:   accent,
        selectedText: '#fff',
      };
    case 'subtle':
      return {
        bg:           isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.10)',
        text:         isDark ? '#a5b4fc' : '#4f46e5',
        border:       'transparent',
        selectedBg:   accent,
        selectedText: '#fff',
      };
    case 'glass':
      return {
        bg:           isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.55)',
        text:         isDark ? '#e2e8f0' : '#1e293b',
        border:       isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.70)',
        selectedBg:   accent,
        selectedText: '#fff',
      };
  }
}

// ─── Dismiss button ───────────────────────────────────────────────────────────

interface DismissButtonProps {
  onPress: () => void;
  size: 'sm' | 'md' | 'lg';
  color: string;
}

const DismissButton = React.memo<DismissButtonProps>(({ onPress, size, color }) => {
  const dim = DISMISS_SIZE[size];
  return (
    <Pressable
      onPress={onPress}
      hitSlop={6}
      accessibilityLabel="Dismiss"
      accessibilityRole="button"
      style={[
        styles.dismiss,
        { width: dim, height: dim, borderRadius: dim / 2 },
      ]}
    >
      <Text style={[styles.dismissText, { fontSize: dim * 0.55, color }]}>
        ✕
      </Text>
    </Pressable>
  );
});
DismissButton.displayName = 'Chip.DismissButton';

// ─── Chip ─────────────────────────────────────────────────────────────────────

export const Chip = React.memo<ChipProps>(
  ({
    label,
    avatar,
    icon,
    trailingIcon,
    onDismiss,
    isSelected = false,
    onPress,
    variant    = 'solid',
    size       = 'md',
    color,
    glass      = false,
    isDisabled = false,
    style,
  }) => {
    const { theme } = useTheme();
    const isDark    = useIsDark();

    const resolvedVariant: ChipVariant = glass ? 'glass' : variant;
    const colors = useChipColors(resolvedVariant, color, isDark, theme.colors.primary);

    const { animatedStyle, handlers } = usePressAnimation({
      pressedScale:   0.97,
      pressedOpacity: 0.85,
      disabled:       isDisabled || !onPress,
    });

    const height  = CHIP_HEIGHT[size];
    const fontSize = CHIP_FONT[size];
    const px       = CHIP_PADDING[size];
    const avatarSz = AVATAR_SIZE[size];

    const activeBg     = isSelected ? colors.selectedBg   : colors.bg;
    const activeText   = isSelected ? colors.selectedText : colors.text;
    const activeBorder = isSelected ? 'transparent'       : colors.border;

    const inner = (
      <View
        style={[
          styles.row,
          {
            height,
            borderRadius:    height / 2,
            paddingHorizontal: px,
            backgroundColor: resolvedVariant === 'glass' ? 'transparent' : activeBg,
            borderWidth:     activeBorder !== 'transparent' ? 1 : 0,
            borderColor:     activeBorder,
            opacity:         isDisabled ? 0.45 : 1,
          },
        ]}
      >
        {/* Avatar */}
        {avatar != null && (
          <View
            style={[
              styles.avatarSlot,
              { width: avatarSz, height: avatarSz, borderRadius: avatarSz / 2 },
              { marginRight: 6 },
            ]}
          >
            {avatar}
          </View>
        )}

        {/* Leading icon */}
        {icon != null && avatar == null && (
          <View style={[styles.iconSlot, { marginRight: 4 }]}>{icon}</View>
        )}

        {/* Label */}
        <Text
          style={[styles.label, { fontSize, color: activeText }]}
          numberOfLines={1}
          allowFontScaling={false}
        >
          {label}
        </Text>

        {/* Trailing icon */}
        {trailingIcon != null && onDismiss == null && (
          <View style={[styles.iconSlot, { marginLeft: 4 }]}>{trailingIcon}</View>
        )}

        {/* Dismiss button */}
        {onDismiss != null && (
          <DismissButton
            onPress={onDismiss}
            size={size}
            color={activeText}
          />
        )}
      </View>
    );

    const glassInner = resolvedVariant === 'glass' ? (
      <GlassView
        borderRadius={height / 2}
        style={{ overflow: 'hidden' }}
        contentStyle={[
          styles.row,
          {
            height,
            paddingHorizontal: px,
            opacity: isDisabled ? 0.45 : 1,
          },
        ]}
      >
        {avatar != null && (
          <View
            style={[
              styles.avatarSlot,
              { width: avatarSz, height: avatarSz, borderRadius: avatarSz / 2, marginRight: 6 },
            ]}
          >
            {avatar}
          </View>
        )}
        {icon != null && avatar == null && (
          <View style={[styles.iconSlot, { marginRight: 4 }]}>{icon}</View>
        )}
        <Text
          style={[styles.label, { fontSize, color: isSelected ? '#fff' : colors.text }]}
          numberOfLines={1}
          allowFontScaling={false}
        >
          {label}
        </Text>
        {trailingIcon != null && onDismiss == null && (
          <View style={[styles.iconSlot, { marginLeft: 4 }]}>{trailingIcon}</View>
        )}
        {onDismiss != null && (
          <DismissButton
            onPress={onDismiss}
            size={size}
            color={isSelected ? '#fff' : colors.text}
          />
        )}
      </GlassView>
    ) : null;

    if (onPress) {
      return (
        <Pressable
          onPress={onPress}
          onPressIn={handlers.onPressIn}
          onPressOut={handlers.onPressOut}
          disabled={isDisabled}
          accessible
          accessibilityRole="button"
          accessibilityState={{ selected: isSelected, disabled: isDisabled }}
        >
          <Animated.View style={[animatedStyle, style]}>
            {glassInner ?? inner}
          </Animated.View>
        </Pressable>
      );
    }

    return (
      <Animated.View style={[animatedStyle, style]}>
        {glassInner ?? inner}
      </Animated.View>
    );
  },
);
Chip.displayName = 'Chip';

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  row: {
    flexDirection:  'row',
    alignItems:     'center',
    alignSelf:      'flex-start',
    overflow:       'hidden',
  },
  avatarSlot: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSlot: {
    alignItems:     'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight:  '500',
    letterSpacing: -0.1,
  },
  dismiss: {
    marginLeft:     4,
    alignItems:     'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.12)',
  },
  dismissText: {
    fontWeight: '600',
    lineHeight: undefined,
  },
});
