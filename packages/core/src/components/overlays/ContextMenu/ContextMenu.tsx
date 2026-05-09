import React, { useCallback, useRef, useState } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  type LayoutRectangle,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useIsDark } from '@reactnatively/theme';
import { GlassView } from '@reactnatively/glass';
import { SPRING_SNAPPY } from '@reactnatively/animations';
import type { ContextMenuProps } from './ContextMenu.types';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
const MENU_WIDTH  = 220;
const ITEM_HEIGHT = 46;

// ─── Component ────────────────────────────────────────────────────────────────
export const ContextMenu = React.memo<ContextMenuProps>(
  ({ items, children, glass = false }) => {
    const isDark   = useIsDark();
    const triggerRef = useRef<View>(null);

    const [visible, setVisible]   = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const scale   = useSharedValue(0.8);
    const opacity = useSharedValue(0);

    const openMenu = useCallback(() => {
      triggerRef.current?.measureInWindow((x, y, w, h) => {
        // Position the menu near the trigger, keeping it on screen
        let menuX = x;
        let menuY = y + h + 6;

        if (menuX + MENU_WIDTH > SCREEN_W - 8) {
          menuX = SCREEN_W - MENU_WIDTH - 8;
        }
        const menuHeight = items.length * ITEM_HEIGHT + 16;
        if (menuY + menuHeight > SCREEN_H - 8) {
          menuY = y - menuHeight - 6;
        }

        setPosition({ x: menuX, y: menuY });
        setVisible(true);
        scale.value   = withSpring(1, SPRING_SNAPPY);
        opacity.value = withSpring(1, SPRING_SNAPPY);
      });
    }, [items.length]);

    const closeMenu = useCallback(() => {
      scale.value   = withSpring(0.8, SPRING_SNAPPY);
      opacity.value = withSpring(0, SPRING_SNAPPY);
      // Slight delay before hiding to let animation play
      setTimeout(() => setVisible(false), 150);
    }, []);

    const animatedStyle = useAnimatedStyle((): ViewStyle => {
      'worklet';
      return {
        opacity:   opacity.value,
        transform: [{ scale: scale.value }],
      };
    });

    const cardBg   = isDark ? '#1e1e30' : '#ffffff';
    const textBase = isDark ? '#f1f5f9' : '#0f172a';
    const subText  = isDark ? '#94a3b8' : '#64748b';
    const divider  = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)';
    const pressedBg = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)';

    const menuItems = (
      <View style={styles.menuInner}>
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && (
              <View style={[styles.itemDivider, { backgroundColor: divider }]} />
            )}
            <Pressable
              onPress={() => {
                if (item.isDisabled) return;
                closeMenu();
                item.onPress();
              }}
              style={({ pressed }) => [
                styles.menuItem,
                pressed && { backgroundColor: pressedBg },
                item.isDisabled && styles.disabledItem,
              ]}
              disabled={item.isDisabled}
              accessibilityRole="menuitem"
              accessibilityLabel={item.label}
            >
              {item.icon != null && (
                <View style={styles.menuItemIcon}>{item.icon}</View>
              )}
              <Text
                style={[
                  styles.menuItemLabel,
                  {
                    color: item.isDestructive
                      ? '#ef4444'
                      : item.isDisabled
                      ? subText
                      : textBase,
                  },
                ]}
                numberOfLines={1}
              >
                {item.label}
              </Text>
            </Pressable>
          </React.Fragment>
        ))}
      </View>
    );

    return (
      <>
        <Pressable
          ref={triggerRef as any}
          onLongPress={openMenu}
          delayLongPress={300}
          accessibilityRole="button"
          accessibilityHint="Long press to open context menu"
        >
          {children}
        </Pressable>

        <Modal
          visible={visible}
          transparent
          hardwareAccelerated
          animationType="none"
          onRequestClose={closeMenu}
          statusBarTranslucent
        >
          {/* Backdrop */}
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={closeMenu}
            accessibilityLabel="Close context menu"
          />

          <Animated.View
            style={[
              styles.menuCard,
              {
                left: position.x,
                top:  position.y,
              },
              animatedStyle,
            ]}
          >
            {glass ? (
              <GlassView elevation={3} borderRadius={12} style={styles.glassMenu}>
                {menuItems}
              </GlassView>
            ) : (
              <View style={[styles.solidMenu, { backgroundColor: cardBg }]}>
                {menuItems}
              </View>
            )}
          </Animated.View>
        </Modal>
      </>
    );
  },
);

ContextMenu.displayName = 'ContextMenu';

const styles = StyleSheet.create({
  menuCard: {
    position:  'absolute',
    width:     MENU_WIDTH,
  },
  solidMenu: {
    borderRadius:  12,
    overflow:      'hidden',
    shadowColor:   '#000',
    shadowOffset:  { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius:  16,
    elevation:     8,
  },
  glassMenu: {
    overflow: 'hidden',
  },
  menuInner: {
    paddingVertical: 6,
  },
  menuItem: {
    flexDirection:     'row',
    alignItems:        'center',
    paddingVertical:   12,
    paddingHorizontal: 14,
    minHeight:         ITEM_HEIGHT,
  },
  menuItemIcon: {
    marginRight: 10,
    width:       20,
    alignItems:  'center',
  },
  menuItemLabel: {
    fontSize:   15,
    fontWeight: '400',
    lineHeight: 20,
    flex:       1,
  },
  itemDivider: {
    height:           StyleSheet.hairlineWidth,
    marginHorizontal: 14,
  },
  disabledItem: {
    opacity: 0.45,
  },
});
