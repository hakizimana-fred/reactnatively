import React, { useRef, useState, useCallback } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  type LayoutRectangle,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { GlassView } from 'reactnatively-glass';
import { useIsDark } from 'reactnatively-theme';
import { SPRING_SNAPPY, TIMING_EXIT } from 'reactnatively-animations';
import type { PopoverProps } from './Popover.types';
import type { TooltipPlacement } from '../Tooltip/Tooltip.types';

const { width: SW, height: SH } = Dimensions.get('window');
const POPOVER_GAP    = 8;
const MAX_POP_WIDTH  = 280;
const MAX_POP_HEIGHT = 320;

export const Popover = React.memo<PopoverProps>(
  ({
    trigger,
    content,
    placement     = 'bottom',
    isDismissible = true,
    glass         = false,
    style,
  }) => {
    const isDark     = useIsDark();
    const [isOpen, setIsOpen]       = useState(false);
    const [triggerLayout, setTriggerLayout] = useState<LayoutRectangle & { pageX: number; pageY: number } | null>(null);
    const triggerRef = useRef<View>(null);

    const opacity = useSharedValue(0);
    const scale   = useSharedValue(0.9);

    const open = useCallback(() => {
      triggerRef.current?.measureInWindow((x, y, width, height) => {
        setTriggerLayout({ x, y: y, width, height, pageX: x, pageY: y });
        setIsOpen(true);
        opacity.value = withSpring(1, SPRING_SNAPPY);
        scale.value   = withSpring(1, SPRING_SNAPPY);
      });
    }, [opacity, scale]);

    const close = useCallback(() => {
      opacity.value = withTiming(0, TIMING_EXIT);
      scale.value   = withTiming(0.9, TIMING_EXIT);
      const dur = (TIMING_EXIT.duration ?? 150) as number;
      setTimeout(() => setIsOpen(false), dur);
    }, [opacity, scale]);

    const toggle = useCallback(() => {
      if (isOpen) close();
      else open();
    }, [isOpen, open, close]);

    const animStyle = useAnimatedStyle(() => {
      'worklet';
      return {
        opacity:   opacity.value,
        transform: [{ scale: scale.value }],
      };
    });

    const popoverPosition = computePosition(triggerLayout, placement);
    const popBg = isDark ? '#1e293b' : '#ffffff';

    const triggerEl =
      typeof trigger === 'function'
        ? trigger({ onPress: toggle, isOpen })
        : (
          <Pressable onPress={toggle} accessibilityRole="button">
            {trigger}
          </Pressable>
        );

    return (
      <>
        <View ref={triggerRef} collapsable={false}>
          {triggerEl}
        </View>

        {isOpen && (
          <Modal
            visible={isOpen}
            transparent
            animationType="none"
            statusBarTranslucent
            onRequestClose={isDismissible ? close : undefined}
          >
            <View style={styles.overlay} pointerEvents="box-none">
              {isDismissible && (
                <Pressable style={StyleSheet.absoluteFill} onPress={close} />
              )}

              <Animated.View
                style={[
                  styles.popover,
                  popoverPosition,
                  animStyle,
                  style,
                ]}
                pointerEvents="box-none"
              >
                {glass ? (
                  <GlassView elevation={3} borderRadius={14} style={styles.popInner}>
                    <ScrollView
                      style={styles.scroll}
                      showsVerticalScrollIndicator={false}
                      keyboardShouldPersistTaps="handled"
                    >
                      {content}
                    </ScrollView>
                  </GlassView>
                ) : (
                  <View style={[styles.popInner, styles.solidPop, { backgroundColor: popBg }]}>
                    <ScrollView
                      style={styles.scroll}
                      showsVerticalScrollIndicator={false}
                      keyboardShouldPersistTaps="handled"
                    >
                      {content}
                    </ScrollView>
                  </View>
                )}
              </Animated.View>
            </View>
          </Modal>
        )}
      </>
    );
  },
);

Popover.displayName = 'Popover';

function computePosition(
  layout: (LayoutRectangle & { pageX: number; pageY: number }) | null,
  placement: TooltipPlacement,
): Record<string, number> {
  if (!layout) return { top: 0, left: 0 };

  const { pageX, pageY, width, height } = layout;

  switch (placement) {
    case 'bottom':
      return {
        top:  pageY + height + POPOVER_GAP,
        left: Math.min(pageX + width / 2 - MAX_POP_WIDTH / 2, SW - MAX_POP_WIDTH - 8),
      };
    case 'top':
      return {
        top:  Math.max(pageY - MAX_POP_HEIGHT - POPOVER_GAP, 8),
        left: Math.min(pageX + width / 2 - MAX_POP_WIDTH / 2, SW - MAX_POP_WIDTH - 8),
      };
    case 'right':
      return {
        top:  pageY + height / 2 - MAX_POP_HEIGHT / 2,
        left: pageX + width + POPOVER_GAP,
      };
    case 'left':
      return {
        top:  pageY + height / 2 - MAX_POP_HEIGHT / 2,
        left: Math.max(pageX - MAX_POP_WIDTH - POPOVER_GAP, 8),
      };
    default:
      return { top: pageY + height + POPOVER_GAP, left: pageX };
  }
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  popover: {
    position:  'absolute',
    width:     MAX_POP_WIDTH,
    maxHeight: MAX_POP_HEIGHT,
    zIndex:    9999,
  },
  popInner: {
    borderRadius: 14,
    overflow:     'hidden',
  },
  solidPop: {
    shadowColor:   '#000',
    shadowOffset:  { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius:  16,
    elevation:     8,
  },
  scroll: {
    maxHeight: MAX_POP_HEIGHT,
  },
});
