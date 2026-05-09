import React, { useEffect, useCallback } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { GlassView } from '@reactnatively/glass';
import { useTheme, useIsDark } from '@reactnatively/theme';
import { SPRING_SNAPPY, TIMING_EXIT } from '@reactnatively/animations';
import type { DialogProps } from './Dialog.types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SIZE_MAX_WIDTH: Record<NonNullable<DialogProps['size']>, number | string> = {
  sm:   300,
  md:   360,
  lg:   480,
  full: SCREEN_WIDTH * 0.9,
};

export const Dialog = React.memo<DialogProps>(
  ({
    isOpen,
    onClose,
    title,
    description,
    children,
    actions,
    isDismissible = true,
    glass         = false,
    size          = 'md',
    style,
  }) => {
    const { theme } = useTheme();
    const isDark    = useIsDark();

    const opacity    = useSharedValue(0);
    const scale      = useSharedValue(0.85);
    const [visible, setVisible] = React.useState(isOpen);

    const openDialog = useCallback(() => {
      setVisible(true);
      opacity.value = withSpring(1, SPRING_SNAPPY);
      scale.value   = withSpring(1, SPRING_SNAPPY);
    }, [opacity, scale]);

    const closeDialog = useCallback(() => {
      opacity.value = withTiming(0, TIMING_EXIT, () => {
        runOnJS(setVisible)(false);
        runOnJS(onClose)();
      });
      scale.value = withTiming(0.85, TIMING_EXIT);
    }, [opacity, scale, onClose]);

    useEffect(() => {
      if (isOpen) {
        openDialog();
      } else {
        if (visible) {
          closeDialog();
        }
      }
    }, [isOpen]);

    const backdropStyle = useAnimatedStyle(() => {
      'worklet';
      return { opacity: opacity.value * 0.5 };
    });

    const cardStyle = useAnimatedStyle(() => {
      'worklet';
      return {
        opacity:   opacity.value,
        transform: [{ scale: scale.value }],
      };
    });

    if (!visible && !isOpen) return null;

    const maxWidth = SIZE_MAX_WIDTH[size];
    const cardBg   = isDark ? '#1e293b' : '#ffffff';

    const actionButtons = actions?.map((action, i) => {
      const isLast        = i === actions.length - 1;
      const actionColor   = action.color ?? (action.isDestructive ? theme.colors.error : theme.colors.primary);
      const variant       = action.variant ?? (i === actions.length - 1 ? 'solid' : 'ghost');

      let btnStyle   = {};
      let textColor  = actionColor;

      if (variant === 'solid') {
        btnStyle  = { backgroundColor: actionColor, borderRadius: 10 };
        textColor = '#fff';
      } else if (variant === 'outline') {
        btnStyle  = { borderWidth: 1.5, borderColor: actionColor, borderRadius: 10, backgroundColor: 'transparent' };
      }

      return (
        <Pressable
          key={`action-${i}`}
          onPress={action.onPress}
          style={[styles.actionBtn, btnStyle, !isLast && styles.actionBtnMargin]}
          accessibilityRole="button"
        >
          <Text style={[styles.actionText, { color: textColor }]}>{action.label}</Text>
        </Pressable>
      );
    });

    const cardContent = (
      <>
        {title != null && (
          <Text style={[styles.title, { color: isDark ? '#f1f5f9' : '#0f172a' }]}>
            {title}
          </Text>
        )}
        {description != null && (
          <Text style={[styles.description, { color: isDark ? '#94a3b8' : '#64748b' }]}>
            {description}
          </Text>
        )}
        {children != null && <View style={styles.childrenWrap}>{children}</View>}
        {actions != null && actions.length > 0 && (
          <View style={styles.actionsRow}>{actionButtons}</View>
        )}
      </>
    );

    return (
      <Modal
        visible={visible}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={isDismissible ? closeDialog : undefined}
      >
        <View style={styles.overlay}>
          {/* Backdrop */}
          <Animated.View style={[StyleSheet.absoluteFill, styles.backdrop, backdropStyle]} />

          {/* Dismiss area */}
          {isDismissible && (
            <Pressable style={StyleSheet.absoluteFill} onPress={closeDialog} />
          )}

          {/* Card */}
          <Animated.View
            style={[styles.cardWrapper, { maxWidth } as any, cardStyle]}
            pointerEvents="box-none"
          >
            {glass ? (
              <GlassView elevation={3} borderRadius={20} style={[styles.card, style]}>
                {cardContent}
              </GlassView>
            ) : (
              <View
                style={[
                  styles.card,
                  styles.solidCard,
                  { backgroundColor: cardBg },
                  style,
                ]}
              >
                {cardContent}
              </View>
            )}
          </Animated.View>
        </View>
      </Modal>
    );
  },
);

Dialog.displayName = 'Dialog';

const styles = StyleSheet.create({
  overlay: {
    flex:            1,
    alignItems:      'center',
    justifyContent:  'center',
  },
  backdrop: {
    backgroundColor: '#000',
  },
  cardWrapper: {
    width:   '100%',
    padding: 16,
  },
  card: {
    padding:      24,
    borderRadius: 20,
  },
  solidCard: {
    shadowColor:   '#000',
    shadowOffset:  { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius:  24,
    elevation:     12,
  },
  title: {
    fontSize:     18,
    fontWeight:   '700',
    lineHeight:   24,
    marginBottom: 8,
  },
  description: {
    fontSize:     14,
    lineHeight:   20,
    marginBottom: 8,
  },
  childrenWrap: {
    marginVertical: 8,
  },
  actionsRow: {
    flexDirection:   'row',
    justifyContent:  'flex-end',
    marginTop:       16,
    flexWrap:        'wrap',
    gap:             8,
  },
  actionBtn: {
    paddingVertical:   10,
    paddingHorizontal: 18,
    alignItems:        'center',
    justifyContent:    'center',
  },
  actionBtnMargin: {
    marginRight: 4,
  },
  actionText: {
    fontSize:   14,
    fontWeight: '600',
  },
});
