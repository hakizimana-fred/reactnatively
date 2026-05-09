import React, { useEffect, useRef, useCallback, useState } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  PanResponder,
  Animated as RNAnimated,
  Dimensions,
  Platform,
} from 'react-native';
import { GlassView } from '@reactnatively/glass';
import { useIsDark } from '@reactnatively/theme';
import type { BottomSheetProps } from './BottomSheet.types';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const CLOSE_THRESHOLD = 80;

export const BottomSheet = React.memo<BottomSheetProps>(
  ({
    isOpen,
    onClose,
    snapPoints   = [300],
    initialSnap  = 0,
    title,
    children,
    isDismissible = true,
    showHandle    = true,
    glass         = false,
    style,
  }) => {
    const isDark        = useIsDark();
    const [visible, setVisible] = useState(isOpen);

    const snapHeight    = snapPoints[initialSnap] ?? snapPoints[0] ?? 300;
    // translateY: 0 = fully open at snapHeight, positive = moving down (closing)
    const translateY    = useRef(new RNAnimated.Value(snapHeight)).current;
    const backdropOpacity = useRef(new RNAnimated.Value(0)).current;

    const openSheet = useCallback(() => {
      setVisible(true);
      RNAnimated.parallel([
        RNAnimated.spring(translateY, {
          toValue:         0,
          tension:         180,
          friction:        20,
          useNativeDriver: true,
        }),
        RNAnimated.timing(backdropOpacity, {
          toValue:         0.5,
          duration:        250,
          useNativeDriver: true,
        }),
      ]).start();
    }, [translateY, backdropOpacity]);

    const closeSheet = useCallback(() => {
      RNAnimated.parallel([
        RNAnimated.timing(translateY, {
          toValue:         snapHeight + 50,
          duration:        260,
          useNativeDriver: true,
        }),
        RNAnimated.timing(backdropOpacity, {
          toValue:         0,
          duration:        220,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setVisible(false);
        onClose();
      });
    }, [translateY, backdropOpacity, snapHeight, onClose]);

    useEffect(() => {
      if (isOpen) {
        openSheet();
      } else if (visible) {
        closeSheet();
      }
    }, [isOpen]);

    // Drag offset accumulated during a gesture
    const dragOffset = useRef(0);

    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gs) =>
          Math.abs(gs.dy) > 5 && Math.abs(gs.dy) > Math.abs(gs.dx),
        onPanResponderGrant: () => {
          dragOffset.current = 0;
          translateY.stopAnimation((v) => {
            dragOffset.current = v;
          });
        },
        onPanResponderMove: (_, gs) => {
          const next = Math.max(0, dragOffset.current + gs.dy);
          translateY.setValue(next);
          const progress = Math.max(0, 1 - next / snapHeight);
          backdropOpacity.setValue(progress * 0.5);
        },
        onPanResponderRelease: (_, gs) => {
          const currentY = dragOffset.current + gs.dy;
          if (currentY > CLOSE_THRESHOLD || gs.vy > 0.8) {
            // Find nearest snap point
            const targetSnap = findNearestSnap(snapPoints, currentY, gs.vy);
            if (targetSnap === null || gs.dy > CLOSE_THRESHOLD || gs.vy > 1.2) {
              closeSheet();
            } else {
              RNAnimated.spring(translateY, {
                toValue:         snapHeight - targetSnap,
                tension:         180,
                friction:        20,
                useNativeDriver: true,
              }).start();
              const progress = targetSnap / snapHeight;
              RNAnimated.timing(backdropOpacity, {
                toValue:         Math.min(progress * 0.5, 0.5),
                duration:        200,
                useNativeDriver: true,
              }).start();
            }
          } else {
            // Spring back to nearest snap point
            RNAnimated.spring(translateY, {
              toValue:         0,
              tension:         180,
              friction:        20,
              useNativeDriver: true,
            }).start();
            RNAnimated.timing(backdropOpacity, {
              toValue:         0.5,
              duration:        200,
              useNativeDriver: true,
            }).start();
          }
        },
      }),
    ).current;

    if (!visible && !isOpen) return null;

    const sheetBg = isDark ? '#1e293b' : '#ffffff';

    const sheetContent = (
      <>
        {showHandle && (
          <View style={styles.handleWrap}>
            <View style={styles.handle} />
          </View>
        )}
        {title != null && (
          <Text style={[styles.title, { color: isDark ? '#f1f5f9' : '#0f172a' }]}>
            {title}
          </Text>
        )}
        <View style={styles.content}>{children}</View>
      </>
    );

    return (
      <Modal
        visible={visible}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={isDismissible ? closeSheet : undefined}
      >
        <View style={styles.overlay} pointerEvents="box-none">
          {/* Backdrop */}
          <RNAnimated.View
            style={[StyleSheet.absoluteFill, styles.backdrop, { opacity: backdropOpacity }]}
          />
          {isDismissible && (
            <Pressable style={StyleSheet.absoluteFill} onPress={closeSheet} />
          )}

          {/* Sheet */}
          <RNAnimated.View
            style={[
              styles.sheet,
              { height: snapHeight, transform: [{ translateY }] },
            ]}
            {...panResponder.panHandlers}
          >
            {glass ? (
              <GlassView
                elevation={4}
                borderRadius={24}
                style={[styles.sheetInner, style]}
              >
                {sheetContent}
              </GlassView>
            ) : (
              <View
                style={[
                  styles.sheetInner,
                  styles.solidSheet,
                  { backgroundColor: sheetBg },
                  style,
                ]}
              >
                {sheetContent}
              </View>
            )}
          </RNAnimated.View>
        </View>
      </Modal>
    );
  },
);

BottomSheet.displayName = 'BottomSheet';

function findNearestSnap(
  snapPoints: number[],
  draggedY: number,
  velocity: number,
): number | null {
  if (!snapPoints.length) return null;
  // sorted descending (largest = most open)
  const sorted = [...snapPoints].sort((a, b) => b - a);
  // draggedY ~ distance dragged down from open position
  // velocity: positive = dragging down
  const openHeight = sorted[0]!;
  const currentH = openHeight - draggedY;
  // find nearest
  let best = sorted[0]!;
  let bestDiff = Math.abs(best - currentH);
  for (const pt of sorted) {
    const diff = Math.abs(pt - currentH);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = pt;
    }
  }
  return best;
}

const styles = StyleSheet.create({
  overlay: {
    flex:            1,
    justifyContent:  'flex-end',
  },
  backdrop: {
    backgroundColor: '#000',
  },
  sheet: {
    position: 'absolute',
    bottom:   0,
    left:     0,
    right:    0,
  },
  sheetInner: {
    flex:             1,
    borderTopLeftRadius:  24,
    borderTopRightRadius: 24,
    overflow:         'hidden',
  },
  solidSheet: {
    shadowColor:   '#000',
    shadowOffset:  { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius:  20,
    elevation:     12,
  },
  handleWrap: {
    alignItems:     'center',
    paddingTop:     12,
    paddingBottom:  8,
  },
  handle: {
    width:        36,
    height:       4,
    borderRadius: 2,
    backgroundColor: 'rgba(128,128,128,0.4)',
  },
  title: {
    fontSize:         17,
    fontWeight:       '700',
    paddingHorizontal: 20,
    paddingBottom:    12,
    lineHeight:       24,
  },
  content: {
    flex: 1,
  },
});
