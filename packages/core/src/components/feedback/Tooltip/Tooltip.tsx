import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  type LayoutRectangle,
  type StyleProp,
  type ViewStyle,

} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { GlassView } from 'reactnatively-glass';
import { useIsDark } from 'reactnatively-theme';
import { SPRING_SNAPPY, TIMING_FAST, TIMING_EXIT } from 'reactnatively-animations';
import type { TooltipProps, TooltipPlacement } from './Tooltip.types';

const TOOLTIP_GAP   = 8;
const ARROW_SIZE    = 8;

export const Tooltip = React.memo<TooltipProps>(
  ({
    content,
    placement = 'top',
    children,
    delay     = 500,
    glass     = false,
    style,
  }) => {
    const isDark       = useIsDark();
    const [shown, setShown]     = useState(false);
    const [layout, setLayout]   = useState<LayoutRectangle | null>(null);
    const [tipSize, setTipSize] = useState({ width: 0, height: 0 });

    const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
    const opacity    = useSharedValue(0);
    const scale      = useSharedValue(0.9);

    const show = useCallback(() => {
      timerRef.current = setTimeout(() => {
        setShown(true);
        opacity.value = withSpring(1, SPRING_SNAPPY);
        scale.value   = withSpring(1, SPRING_SNAPPY);
      }, delay);
    }, [delay, opacity, scale]);

    const hide = useCallback(() => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      opacity.value = withTiming(0, TIMING_EXIT, () => {});
      scale.value   = withTiming(0.9, TIMING_EXIT);
      // hide after animation
      setTimeout(() => setShown(false), TIMING_EXIT.duration ?? 150);
    }, [opacity, scale]);

    const tooltipStyle = useAnimatedStyle(() => {
      'worklet';
      return {
        opacity:   opacity.value,
        transform: [{ scale: scale.value }],
      };
    });

    // Compute tooltip position relative to trigger
    const computePosition = (): ViewStyle => {
      if (!layout || !tipSize.width) return { opacity: 0 };
      const { x, y, width, height } = layout;

      switch (placement) {
        case 'top':
          return {
            bottom: height + TOOLTIP_GAP + ARROW_SIZE,
            left:   width / 2 - tipSize.width / 2,
          };
        case 'bottom':
          return {
            top:  height + TOOLTIP_GAP + ARROW_SIZE,
            left: width / 2 - tipSize.width / 2,
          };
        case 'left':
          return {
            right: width + TOOLTIP_GAP + ARROW_SIZE,
            top:   height / 2 - tipSize.height / 2,
          };
        case 'right':
          return {
            left: width + TOOLTIP_GAP + ARROW_SIZE,
            top:  height / 2 - tipSize.height / 2,
          };
        default:
          return {};
      }
    };

    const arrowStyle = arrowStyles(placement, isDark, glass);
    const tooltipBg  = isDark ? '#1e293b' : '#1a1a2e';

    const tipContent = (
      <View
        style={styles.tipInner}
        onLayout={(e) => setTipSize({ width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height })}
      >
        {typeof content === 'string' ? (
          <Text style={styles.tipText}>{content}</Text>
        ) : (
          content
        )}
      </View>
    );

    return (
      <View
        style={[styles.triggerWrap, style]}
        onLayout={(e) => setLayout(e.nativeEvent.layout)}
      >
        <Pressable
          onLongPress={show}
          onPressOut={hide}
          onHoverIn={show}
          onHoverOut={hide}
          delayLongPress={0}
          accessibilityHint={typeof content === 'string' ? content : undefined}
        >
          {children}
        </Pressable>

        {shown && (
          <Animated.View
            style={[styles.tooltipAbs, computePosition(), tooltipStyle]}
            pointerEvents="none"
          >
            {/* Arrow */}
            <View style={[styles.arrow, arrowStyle]} />

            {glass ? (
              <GlassView elevation={2} borderRadius={8}>
                {tipContent}
              </GlassView>
            ) : (
              <View style={[styles.solidTip, { backgroundColor: tooltipBg }]}>
                {tipContent}
              </View>
            )}
          </Animated.View>
        )}
      </View>
    );
  },
);

Tooltip.displayName = 'Tooltip';

function arrowStyles(
  placement: TooltipPlacement,
  isDark: boolean,
  glass: boolean,
): ViewStyle {
  const color = glass
    ? 'rgba(255,255,255,0.15)'
    : isDark ? '#1e293b' : '#1a1a2e';

  const base: ViewStyle = {
    width:       0,
    height:      0,
    position:    'absolute',
    borderStyle: 'solid',
  };

  switch (placement) {
    case 'top':
      return {
        ...base,
        bottom:             -ARROW_SIZE,
        alignSelf:          'center',
        borderTopWidth:     ARROW_SIZE,
        borderTopColor:     color,
        borderLeftWidth:    ARROW_SIZE,
        borderLeftColor:    'transparent',
        borderRightWidth:   ARROW_SIZE,
        borderRightColor:   'transparent',
      };
    case 'bottom':
      return {
        ...base,
        top:                -ARROW_SIZE,
        alignSelf:          'center',
        borderBottomWidth:  ARROW_SIZE,
        borderBottomColor:  color,
        borderLeftWidth:    ARROW_SIZE,
        borderLeftColor:    'transparent',
        borderRightWidth:   ARROW_SIZE,
        borderRightColor:   'transparent',
      };
    case 'left':
      return {
        ...base,
        right:              -ARROW_SIZE,
        alignSelf:          'center',
        borderLeftWidth:    ARROW_SIZE,
        borderLeftColor:    color,
        borderTopWidth:     ARROW_SIZE,
        borderTopColor:     'transparent',
        borderBottomWidth:  ARROW_SIZE,
        borderBottomColor:  'transparent',
      };
    case 'right':
      return {
        ...base,
        left:               -ARROW_SIZE,
        alignSelf:          'center',
        borderRightWidth:   ARROW_SIZE,
        borderRightColor:   color,
        borderTopWidth:     ARROW_SIZE,
        borderTopColor:     'transparent',
        borderBottomWidth:  ARROW_SIZE,
        borderBottomColor:  'transparent',
      };
    default:
      return base;
  }
}

const styles = StyleSheet.create({
  triggerWrap: {
    position: 'relative',
  },
  tooltipAbs: {
    position: 'absolute',
    zIndex:   9999,
    alignItems: 'center',
  },
  arrow: {},
  solidTip: {
    borderRadius: 8,
    shadowColor:   '#000',
    shadowOffset:  { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius:  6,
    elevation:     4,
  },
  tipInner: {
    paddingHorizontal: 10,
    paddingVertical:   6,
    maxWidth:          200,
  },
  tipText: {
    fontSize:   12,
    fontWeight: '500',
    color:      '#fff',
    lineHeight: 16,
  },
});
