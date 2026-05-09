import React, { useCallback, useRef, useState } from 'react';
import {
  Platform,
  Modal,
  View,
  Pressable,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useIsDark } from '@reactnatively/theme';
import { GlassView } from '@reactnatively/glass';
import { TIMING_FAST, TIMING_EXIT } from '@reactnatively/animations';
import type { HoverCardProps, HoverCardPlacement } from './HoverCard.types';

const CARD_OFFSET = 8;

function resolvePosition(
  placement: HoverCardPlacement,
  trigX: number,
  trigY: number,
  trigW: number,
  trigH: number,
): { left: number; top: number } {
  switch (placement) {
    case 'top':
      return { left: trigX, top: trigY - CARD_OFFSET };
    case 'bottom':
      return { left: trigX, top: trigY + trigH + CARD_OFFSET };
    case 'left':
      return { left: trigX - CARD_OFFSET, top: trigY };
    case 'right':
      return { left: trigX + trigW + CARD_OFFSET, top: trigY };
    default:
      return { left: trigX, top: trigY + trigH + CARD_OFFSET };
  }
}

// ─── Component ────────────────────────────────────────────────────────────────
export const HoverCard = React.memo<HoverCardProps>(
  ({ trigger, content, placement = 'bottom', glass = false }) => {
    const isDark     = useIsDark();
    const triggerRef = useRef<View>(null);
    const [visible, setVisible]   = useState(false);
    const [position, setPosition] = useState({ left: 0, top: 0 });

    const opacity = useSharedValue(0);

    const show = useCallback(() => {
      triggerRef.current?.measureInWindow((x, y, w, h) => {
        const pos = resolvePosition(placement, x, y, w, h);
        setPosition(pos);
        setVisible(true);
        opacity.value = withTiming(1, TIMING_FAST);
      });
    }, [placement]);

    const hide = useCallback(() => {
      opacity.value = withTiming(0, TIMING_EXIT, (finished) => {
        if (finished) {
          // runOnJS alternative: set state via JS thread callback
        }
      });
      // Hide after animation
      setTimeout(() => setVisible(false), 120);
    }, []);

    const animatedStyle = useAnimatedStyle((): ViewStyle => {
      'worklet';
      return { opacity: opacity.value };
    });

    const cardBg = isDark ? '#1e1e30' : '#ffffff';

    // Web: onMouseEnter / onMouseLeave
    const isWeb = Platform.OS === 'web';
    const webProps = isWeb
      ? {
          onMouseEnter: show,
          onMouseLeave: hide,
        }
      : {};

    const cardContent = (
      <Animated.View
        style={[
          styles.card,
          { position: 'absolute', left: position.left, top: position.top },
          animatedStyle,
        ]}
        pointerEvents="box-none"
      >
        {glass ? (
          <GlassView elevation={2} borderRadius={12} style={styles.glassCard}>
            {content}
          </GlassView>
        ) : (
          <View style={[styles.solidCard, { backgroundColor: cardBg }]}>
            {content}
          </View>
        )}
      </Animated.View>
    );

    if (isWeb) {
      // Web: inline positioning with hover events
      return (
        <View style={styles.triggerWrap}>
          {/* Trigger with mouse events */}
          {React.createElement(
            Pressable as any,
            {
              ref: triggerRef,
              ...webProps,
              style: styles.triggerInner,
            },
            trigger,
          )}
          {visible && cardContent}
        </View>
      );
    }

    // Mobile: long press to show, press out to hide
    return (
      <View style={styles.triggerWrap}>
        <Pressable
          ref={triggerRef as any}
          onLongPress={show}
          onPressOut={hide}
          delayLongPress={500}
          style={styles.triggerInner}
        >
          {trigger}
        </Pressable>

        <Modal
          visible={visible}
          transparent
          hardwareAccelerated
          animationType="none"
          onRequestClose={hide}
          statusBarTranslucent
        >
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={hide}
            accessibilityLabel="Close hover card"
          />
          {cardContent}
        </Modal>
      </View>
    );
  },
);

HoverCard.displayName = 'HoverCard';

const styles = StyleSheet.create({
  triggerWrap: {
    alignSelf: 'flex-start',
  },
  triggerInner: {
    alignSelf: 'flex-start',
  },
  card: {
    zIndex: 9999,
    minWidth: 160,
    maxWidth: 320,
  },
  solidCard: {
    borderRadius:  12,
    padding:       12,
    shadowColor:   '#000',
    shadowOffset:  { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius:  12,
    elevation:     6,
  },
  glassCard: {
    borderRadius: 12,
    padding:      12,
  },
});
