import React, { useCallback, useMemo } from 'react';
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  type ViewStyle,
  type GestureResponderEvent,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { useTheme } from '@reactnatively/theme';
import { GlassView } from '@reactnatively/glass';
import { usePressAnimation, useEntranceAnimation } from '@reactnatively/animations';
import type { FABProps, FABSize, FABPosition } from './FAB.types';

// ─── Size system ─────────────────────────────────────────────────────────────
const SIZE_MAP: Record<FABSize, number> = {
  sm: 48,
  md: 56,
  lg: 64,
};

// ─── Position map ─────────────────────────────────────────────────────────────
const POSITION_STYLES: Record<FABPosition, ViewStyle> = {
  bottomRight:  { position: 'absolute', bottom: 24, right: 24 },
  bottomLeft:   { position: 'absolute', bottom: 24, left: 24 },
  bottomCenter: { position: 'absolute', bottom: 24, alignSelf: 'center' },
  topRight:     { position: 'absolute', top: 24, right: 24 },
};

// ─── Component ───────────────────────────────────────────────────────────────
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const FAB = React.memo<FABProps>(
  ({
    icon,
    label,
    size       = 'md',
    variant    = 'solid',
    color,
    position,
    onPress,
    isDisabled = false,
    style,
  }) => {
    const { theme }    = useTheme();
    const dim          = SIZE_MAP[size];
    const isExtended   = label != null;
    const activeColor  = color ?? theme.colors.primary;

    const { animatedStyle, handlers } = usePressAnimation({
      pressedScale:   0.94,
      pressedOpacity: 0.85,
      disabled:       isDisabled,
    });

    const entranceStyle = useEntranceAnimation({ variant: 'scale' });

    const handlePressIn  = useCallback(() => { handlers.onPressIn();  }, [handlers]);
    const handlePressOut = useCallback(() => { handlers.onPressOut(); }, [handlers]);

    // Shadow styles (iOS + Android)
    const shadowStyle = useMemo((): ViewStyle => ({
      shadowColor:   '#000',
      shadowOffset:  { width: 0, height: 4 },
      shadowOpacity: 0.22,
      shadowRadius:  6,
      elevation:     6,
    }), []);

    // Base container — round when no label, pill when extended
    const containerBase = useMemo((): ViewStyle => {
      if (isExtended) {
        return {
          height:       dim,
          paddingHorizontal: 20,
          borderRadius: dim / 2,
          flexDirection: 'row',
          alignItems:   'center',
          alignSelf:    'flex-start',
        };
      }
      return {
        width:        dim,
        height:       dim,
        borderRadius: dim / 2,
        alignItems:   'center',
        justifyContent: 'center',
      };
    }, [isExtended, dim]);

    const positionStyle = position ? POSITION_STYLES[position] : undefined;

    const innerContent = (
      <>
        {icon}
        {isExtended && label != null && (
          <Text
            style={[styles.label, { color: variant === 'glass' ? theme.colors.text : '#fff' }]}
            allowFontScaling={false}
            numberOfLines={1}
          >
            {label}
          </Text>
        )}
      </>
    );

    if (variant === 'glass') {
      return (
        <Animated.View style={[entranceStyle, positionStyle, shadowStyle, style]}>
          <AnimatedPressable
            onPress={isDisabled ? undefined : onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={isDisabled}
            accessible
            accessibilityRole="button"
            accessibilityLabel={label ?? 'Floating action button'}
            accessibilityState={{ disabled: isDisabled }}
            style={[
              { opacity: isDisabled ? 0.45 : 1, alignSelf: 'flex-start' },
              animatedStyle,
            ]}
          >
            <GlassView elevation={2} borderRadius={isExtended ? dim / 2 : dim / 2}>
              <View style={[containerBase]}>
                {innerContent}
              </View>
            </GlassView>
          </AnimatedPressable>
        </Animated.View>
      );
    }

    // Solid variant
    return (
      <Animated.View style={[entranceStyle, positionStyle, shadowStyle, style]}>
        <AnimatedPressable
          onPress={isDisabled ? undefined : onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={isDisabled}
          accessible
          accessibilityRole="button"
          accessibilityLabel={label ?? 'Floating action button'}
          accessibilityState={{ disabled: isDisabled }}
          style={[
            containerBase,
            { backgroundColor: activeColor, opacity: isDisabled ? 0.45 : 1 },
            animatedStyle,
          ]}
        >
          {innerContent}
        </AnimatedPressable>
      </Animated.View>
    );
  },
);

FAB.displayName = 'FAB';

const styles = StyleSheet.create({
  label: {
    marginLeft:  10,
    fontSize:    15,
    fontWeight:  '600',
    letterSpacing: 0.2,
  },
});
