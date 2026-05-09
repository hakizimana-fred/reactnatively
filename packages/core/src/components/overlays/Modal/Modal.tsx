import React, { useCallback, useEffect } from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '@reactnatively/theme';
import { useIsDark } from '@reactnatively/theme';
import { GlassView } from '@reactnatively/glass';
import { SPRING_SNAPPY, TIMING_EXIT } from '@reactnatively/animations';
import type { ModalProps, ModalSize } from './Modal.types';

// ─── Size map ─────────────────────────────────────────────────────────────────
const { width: SCREEN_WIDTH } = Dimensions.get('window');

function resolveMaxWidth(size: ModalSize): number | string {
  switch (size) {
    case 'sm': return 320;
    case 'md': return 480;
    case 'lg': return 640;
    case 'xl': return 768;
    case 'full': return '95%';
    default: return 480;
  }
}

// ─── Component ────────────────────────────────────────────────────────────────
export const Modal = React.memo<ModalProps>(
  ({
    isOpen,
    onClose,
    children,
    title,
    size            = 'md',
    glass           = false,
    isDismissible   = true,
    showCloseButton = true,
    style,
  }) => {
    const isDark   = useIsDark();
    const scale    = useSharedValue(0.9);
    const opacity  = useSharedValue(0);

    const runClose = useCallback(() => {
      onClose();
    }, [onClose]);

    // Entrance animation when isOpen becomes true
    useEffect(() => {
      if (isOpen) {
        scale.value   = withSpring(1, SPRING_SNAPPY);
        opacity.value = withSpring(1, SPRING_SNAPPY);
      }
    }, [isOpen]);

    const handleClose = useCallback(() => {
      scale.value   = withTiming(0.9, TIMING_EXIT, (finished) => {
        if (finished) runOnJS(runClose)();
      });
      opacity.value = withTiming(0, TIMING_EXIT);
    }, [runClose]);

    const handleBackdropPress = useCallback(() => {
      if (isDismissible) handleClose();
    }, [isDismissible, handleClose]);

    const animatedCardStyle = useAnimatedStyle((): ViewStyle => {
      'worklet';
      return {
        opacity:   opacity.value,
        transform: [{ scale: scale.value }],
      };
    });

    const maxWidth = resolveMaxWidth(size);
    const cardBg   = isDark ? '#1e1e30' : '#ffffff';

    const headerRow = (showCloseButton || title != null) ? (
      <View style={styles.headerRow}>
        {title != null ? (
          <Text
            style={[styles.title, { color: isDark ? '#f1f5f9' : '#0f172a' }]}
            numberOfLines={2}
          >
            {title}
          </Text>
        ) : (
          <View style={styles.flex} />
        )}
        {showCloseButton && (
          <Pressable
            onPress={handleClose}
            style={styles.closeBtn}
            accessibilityLabel="Close modal"
            accessibilityRole="button"
          >
            <Text style={[styles.closeText, { color: isDark ? '#94a3b8' : '#64748b' }]}>
              ✕
            </Text>
          </Pressable>
        )}
      </View>
    ) : null;

    const cardContent = (
      <>
        {headerRow}
        {children}
      </>
    );

    return (
      <RNModal
        visible={isOpen}
        transparent
        hardwareAccelerated
        animationType="none"
        onRequestClose={isDismissible ? handleClose : undefined}
        statusBarTranslucent
      >
        <View style={styles.backdrop}>
          {/* Backdrop touch target */}
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={handleBackdropPress}
            accessibilityLabel="Close modal backdrop"
          />

          <Animated.View
            style={[
              styles.card,
              { maxWidth: maxWidth as any, backgroundColor: glass ? 'transparent' : cardBg },
              animatedCardStyle,
              style,
            ]}
          >
            {glass ? (
              <GlassView elevation={3} borderRadius={20} style={styles.glassCard}>
                {cardContent}
              </GlassView>
            ) : (
              cardContent
            )}
          </Animated.View>
        </View>
      </RNModal>
    );
  },
);

Modal.displayName = 'Modal';

const styles = StyleSheet.create({
  backdrop: {
    flex:            1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems:      'center',
    justifyContent:  'center',
    padding:         16,
  },
  card: {
    width:        '100%',
    borderRadius: 20,
    overflow:     'hidden',
    shadowColor:  '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius:  24,
    elevation:     10,
  },
  glassCard: {
    borderRadius: 20,
  },
  headerRow: {
    flexDirection:  'row',
    alignItems:     'center',
    paddingTop:     16,
    paddingLeft:    20,
    paddingRight:   12,
    paddingBottom:  8,
  },
  flex: {
    flex: 1,
  },
  title: {
    flex:       1,
    fontSize:   18,
    fontWeight: '700',
    lineHeight: 24,
  },
  closeBtn: {
    width:           36,
    height:          36,
    borderRadius:    18,
    alignItems:      'center',
    justifyContent:  'center',
    marginLeft:      8,
  },
  closeText: {
    fontSize:   16,
    lineHeight: 20,
    fontWeight: '600',
  },
});
