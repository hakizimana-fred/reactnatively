import React, { useCallback, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useIsDark } from '@reactnatively/theme';
import { GlassView } from '@reactnatively/glass';
import { SPRING_SNAPPY, TIMING_EXIT } from '@reactnatively/animations';
import type { ActionSheetProps } from './ActionSheet.types';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// ─── Component ────────────────────────────────────────────────────────────────
export const ActionSheet = React.memo<ActionSheetProps>(
  ({
    isOpen,
    onClose,
    title,
    message,
    actions,
    cancelLabel = 'Cancel',
    glass       = false,
  }) => {
    const isDark      = useIsDark();
    const translateY  = useSharedValue(SCREEN_HEIGHT);

    const runClose = useCallback(() => {
      onClose();
    }, [onClose]);

    useEffect(() => {
      if (isOpen) {
        translateY.value = withSpring(0, SPRING_SNAPPY);
      }
    }, [isOpen]);

    const handleClose = useCallback(() => {
      translateY.value = withTiming(SCREEN_HEIGHT, TIMING_EXIT, (finished) => {
        if (finished) runOnJS(runClose)();
      });
    }, [runClose]);

    const animatedStyle = useAnimatedStyle((): ViewStyle => {
      'worklet';
      return {
        transform: [{ translateY: translateY.value }],
      };
    });

    const panelBg  = isDark ? '#1e1e30' : '#ffffff';
    const divider  = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
    const textBase = isDark ? '#f1f5f9' : '#0f172a';
    const subText  = isDark ? '#94a3b8' : '#64748b';

    const actionItems = (
      <>
        {(title != null || message != null) && (
          <View style={[styles.header, { borderBottomColor: divider }]}>
            {title != null && (
              <Text style={[styles.headerTitle, { color: subText }]}>{title}</Text>
            )}
            {message != null && (
              <Text style={[styles.headerMessage, { color: subText }]}>{message}</Text>
            )}
          </View>
        )}

        {actions.map((action, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <View style={[styles.divider, { backgroundColor: divider }]} />}
            <Pressable
              onPress={() => {
                if (action.isDisabled) return;
                action.onPress();
                handleClose();
              }}
              style={({ pressed }) => [
                styles.actionRow,
                pressed && styles.actionRowPressed,
              ]}
              disabled={action.isDisabled}
              accessibilityRole="button"
              accessibilityLabel={action.label}
            >
              {action.icon != null && (
                <View style={styles.actionIcon}>{action.icon}</View>
              )}
              <Text
                style={[
                  styles.actionLabel,
                  {
                    color: action.isDestructive
                      ? '#ef4444'
                      : action.isDisabled
                      ? subText
                      : textBase,
                    opacity: action.isDisabled ? 0.45 : 1,
                  },
                ]}
              >
                {action.label}
              </Text>
            </Pressable>
          </React.Fragment>
        ))}
      </>
    );

    return (
      <Modal
        visible={isOpen}
        transparent
        hardwareAccelerated
        animationType="none"
        onRequestClose={handleClose}
        statusBarTranslucent
      >
        <View style={styles.backdrop}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={handleClose}
            accessibilityLabel="Close action sheet"
          />

          <Animated.View style={[styles.container, animatedStyle]}>
            {/* Actions panel */}
            {glass ? (
              <GlassView elevation={3} borderRadius={16} style={styles.panelGlass}>
                {actionItems}
              </GlassView>
            ) : (
              <View
                style={[
                  styles.panel,
                  { backgroundColor: panelBg },
                ]}
              >
                {actionItems}
              </View>
            )}

            {/* Cancel panel (iOS-style separate card) */}
            <View style={styles.cancelSpacing}>
              {glass ? (
                <GlassView elevation={2} borderRadius={16} style={styles.cancelGlass}>
                  <Pressable
                    onPress={handleClose}
                    style={({ pressed }) => [
                      styles.cancelRow,
                      pressed && styles.actionRowPressed,
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel={cancelLabel}
                  >
                    <Text style={[styles.cancelLabel, { color: textBase }]}>
                      {cancelLabel}
                    </Text>
                  </Pressable>
                </GlassView>
              ) : (
                <View style={[styles.cancelPanel, { backgroundColor: panelBg }]}>
                  <Pressable
                    onPress={handleClose}
                    style={({ pressed }) => [
                      styles.cancelRow,
                      pressed && styles.actionRowPressed,
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel={cancelLabel}
                  >
                    <Text style={[styles.cancelLabel, { color: textBase }]}>
                      {cancelLabel}
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>
          </Animated.View>
        </View>
      </Modal>
    );
  },
);

ActionSheet.displayName = 'ActionSheet';

const styles = StyleSheet.create({
  backdrop: {
    flex:            1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent:  'flex-end',
  },
  container: {
    paddingHorizontal: 8,
    paddingBottom:     8,
  },
  panel: {
    borderRadius:  16,
    overflow:      'hidden',
    shadowColor:   '#000',
    shadowOffset:  { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius:  12,
    elevation:     6,
  },
  panelGlass: {
    overflow: 'hidden',
  },
  header: {
    paddingVertical:   14,
    paddingHorizontal: 20,
    alignItems:        'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerTitle: {
    fontSize:     13,
    fontWeight:   '600',
    lineHeight:   18,
    marginBottom: 2,
    textAlign:    'center',
  },
  headerMessage: {
    fontSize:  12,
    lineHeight: 16,
    textAlign: 'center',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 0,
  },
  actionRow: {
    flexDirection:     'row',
    alignItems:        'center',
    paddingVertical:   18,
    paddingHorizontal: 20,
  },
  actionRowPressed: {
    opacity: 0.6,
  },
  actionIcon: {
    marginRight: 14,
  },
  actionLabel: {
    fontSize:   17,
    fontWeight: '400',
    lineHeight: 22,
    textAlign:  'center',
    flex:       1,
  },
  cancelSpacing: {
    marginTop: 8,
  },
  cancelPanel: {
    borderRadius:  16,
    overflow:      'hidden',
    shadowColor:   '#000',
    shadowOffset:  { width: 0, height: -1 },
    shadowOpacity: 0.08,
    shadowRadius:  8,
    elevation:     4,
  },
  cancelGlass: {
    overflow: 'hidden',
  },
  cancelRow: {
    paddingVertical:   18,
    paddingHorizontal: 20,
    alignItems:        'center',
    justifyContent:    'center',
  },
  cancelLabel: {
    fontSize:   17,
    fontWeight: '600',
    lineHeight: 22,
  },
});
