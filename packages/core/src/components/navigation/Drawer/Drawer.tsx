import React, { useCallback, useEffect, useRef } from 'react';
import {
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useIsDark } from '@reactnatively/theme';
import { GlassView } from '@reactnatively/glass';
import { SPRING_SNAPPY } from '@reactnatively/animations';
import type { DrawerProps } from './Drawer.types';

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_WIDTH = 280;
const DRAG_CLOSE_THRESHOLD = 80;

// ─── Component ───────────────────────────────────────────────────────────────

export const Drawer = React.memo<DrawerProps>(
  ({
    isOpen,
    onClose,
    placement = 'left',
    width = DEFAULT_WIDTH,
    children,
    glass = false,
    backdrop = true,
    style,
  }) => {
    const isDark = useIsDark();

    // translateX: 0 = fully open, -width (left) or +width (right) = hidden
    const translateX = useSharedValue(placement === 'left' ? -width : width);
    const backdropOpacity = useSharedValue(0);

    // Keep track of whether modal is mounted so we can animate after open
    const [visible, setVisible] = React.useState(isOpen);

    useEffect(() => {
      if (isOpen) {
        setVisible(true);
        // Animate in
        translateX.value = withSpring(0, SPRING_SNAPPY);
        backdropOpacity.value = withSpring(1, SPRING_SNAPPY);
      } else {
        // Animate out then unmount
        const target = placement === 'left' ? -width : width;
        translateX.value = withSpring(target, SPRING_SNAPPY, (finished) => {
          'worklet';
          if (finished) runOnJS(setVisible)(false);
        });
        backdropOpacity.value = withSpring(0, SPRING_SNAPPY);
      }
    }, [isOpen, width, placement]);

    // PanResponder for swipe-to-close
    const dragOffset = useRef(0);

    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
          // Capture horizontal drags
          return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 8;
        },
        onPanResponderMove: (_, gestureState) => {
          const dx = gestureState.dx;
          if (placement === 'left') {
            // Only allow dragging left (negative direction)
            const clamped = Math.min(0, dx);
            translateX.value = clamped;
          } else {
            // Only allow dragging right (positive direction)
            const clamped = Math.max(0, dx);
            translateX.value = clamped;
          }
          dragOffset.current = Math.abs(dx);
        },
        onPanResponderRelease: (_, gestureState) => {
          const shouldClose = Math.abs(gestureState.dx) > DRAG_CLOSE_THRESHOLD;
          if (shouldClose) {
            runOnJS(onClose)();
          } else {
            // Snap back
            translateX.value = withSpring(0, SPRING_SNAPPY);
          }
        },
      }),
    ).current;

    const panelAnimStyle = useAnimatedStyle((): ViewStyle => {
      'worklet';
      return { transform: [{ translateX: translateX.value }] };
    });

    const backdropAnimStyle = useAnimatedStyle((): ViewStyle => {
      'worklet';
      return { opacity: backdropOpacity.value };
    });

    if (!visible) return null;

    const panelContent = (
      <Animated.View
        style={[
          styles.panel,
          {
            width,
            [placement]: 0,
          },
          panelAnimStyle,
        ]}
        {...panResponder.panHandlers}
      >
        {glass ? (
          <GlassView elevation={3} borderRadius={0} style={[styles.panelInner, style]}>
            {children}
          </GlassView>
        ) : (
          <View
            style={[
              styles.panelInner,
              styles.solidPanel,
              {
                backgroundColor: isDark ? '#1a1a2e' : '#ffffff',
                shadowColor: placement === 'left' ? '#000' : '#000',
              },
              style,
            ]}
          >
            {children}
          </View>
        )}
      </Animated.View>
    );

    return (
      <Modal
        visible={visible}
        transparent
        animationType="none"
        onRequestClose={onClose}
        statusBarTranslucent
      >
        <View style={styles.root}>
          {/* Backdrop */}
          {backdrop && (
            <Animated.View
              style={[styles.backdrop, backdropAnimStyle]}
              pointerEvents="auto"
            >
              <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
            </Animated.View>
          )}

          {/* Drawer panel */}
          {panelContent}
        </View>
      </Modal>
    );
  },
);

Drawer.displayName = 'Drawer';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  panel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  panelInner: {
    flex: 1,
  },
  solidPanel: {
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 16,
  },
});
