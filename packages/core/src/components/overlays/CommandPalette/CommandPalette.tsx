import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useIsDark } from 'reactnatively-theme';
import { GlassView } from 'reactnatively-glass';
import { SPRING_SNAPPY, TIMING_EXIT } from 'reactnatively-animations';
import type { CommandPaletteProps, CommandItem } from './CommandPalette.types';

// ─── Component ────────────────────────────────────────────────────────────────
export const CommandPalette = React.memo<CommandPaletteProps>(
  ({
    isOpen,
    onClose,
    items,
    placeholder = 'Search commands…',
    glass       = false,
  }) => {
    const isDark  = useIsDark();
    const [query, setQuery] = useState('');

    const scale   = useSharedValue(0.94);
    const opacity = useSharedValue(0);

    const runClose = useCallback(() => {
      setQuery('');
      onClose();
    }, [onClose]);

    useEffect(() => {
      if (isOpen) {
        scale.value   = withSpring(1, SPRING_SNAPPY);
        opacity.value = withSpring(1, SPRING_SNAPPY);
        setQuery('');
      }
    }, [isOpen]);

    const handleClose = useCallback(() => {
      scale.value   = withTiming(0.94, TIMING_EXIT, (finished) => {
        if (finished) runOnJS(runClose)();
      });
      opacity.value = withTiming(0, TIMING_EXIT);
    }, [runClose]);

    const animatedStyle = useAnimatedStyle((): ViewStyle => {
      'worklet';
      return {
        opacity: opacity.value,
        transform: [{ scale: scale.value }],
      };
    });

    // Filter items
    const filtered = useMemo(() => {
      const q = query.trim().toLowerCase();
      if (!q) return items;
      return items.filter(
        (item) =>
          item.label.toLowerCase().includes(q) ||
          (item.description?.toLowerCase().includes(q) ?? false),
      );
    }, [query, items]);

    // Group items
    const grouped = useMemo(() => {
      const groupMap = new Map<string, CommandItem[]>();
      for (const item of filtered) {
        const key = item.group ?? '';
        const arr = groupMap.get(key) ?? [];
        arr.push(item);
        groupMap.set(key, arr);
      }
      return groupMap;
    }, [filtered]);

    const cardBg        = isDark ? '#1e1e30' : '#ffffff';
    const textBase      = isDark ? '#f1f5f9' : '#0f172a';
    const subText       = isDark ? '#94a3b8' : '#64748b';
    const inputBg       = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)';
    const divider       = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)';
    const groupLabelClr = isDark ? '#64748b' : '#94a3b8';
    const highlightBg   = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)';

    const renderItems = () => {
      if (filtered.length === 0) {
        return (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: subText }]}>
              No commands found
            </Text>
          </View>
        );
      }

      const sections: React.ReactNode[] = [];
      let first = true;

      grouped.forEach((groupItems, groupKey) => {
        if (!first) {
          sections.push(
            <View key={`divider-${groupKey}`} style={[styles.sectionDivider, { backgroundColor: divider }]} />,
          );
        }
        first = false;

        if (groupKey) {
          sections.push(
            <Text key={`header-${groupKey}`} style={[styles.groupLabel, { color: groupLabelClr }]}>
              {groupKey.toUpperCase()}
            </Text>,
          );
        }

        sections.push(
          ...groupItems.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => {
                item.onSelect();
                handleClose();
              }}
              style={({ pressed }) => [
                styles.itemRow,
                pressed && { backgroundColor: highlightBg },
              ]}
              accessibilityRole="button"
              accessibilityLabel={item.label}
            >
              {item.icon != null && (
                <View style={styles.itemIcon}>{item.icon}</View>
              )}
              <View style={styles.itemText}>
                <Text style={[styles.itemLabel, { color: textBase }]} numberOfLines={1}>
                  {item.label}
                </Text>
                {item.description != null && (
                  <Text style={[styles.itemDescription, { color: subText }]} numberOfLines={1}>
                    {item.description}
                  </Text>
                )}
              </View>
              {item.shortcut != null && (
                <View style={[styles.shortcutBadge, { backgroundColor: inputBg }]}>
                  <Text style={[styles.shortcutText, { color: subText }]}>
                    {item.shortcut}
                  </Text>
                </View>
              )}
            </Pressable>
          )),
        );
      });

      return sections;
    };

    const cardContent = (
      <>
        {/* Search bar */}
        <View style={[styles.searchRow, { borderBottomColor: divider }]}>
          <Text style={[styles.searchIcon, { color: subText }]}>⌕</Text>
          <TextInput
            style={[styles.searchInput, { color: textBase }]}
            value={query}
            onChangeText={setQuery}
            placeholder={placeholder}
            placeholderTextColor={subText}
            autoFocus
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
          <Pressable onPress={handleClose} style={styles.closeBtn} accessibilityLabel="Close">
            <Text style={[styles.closeText, { color: subText }]}>✕</Text>
          </Pressable>
        </View>

        {/* Results */}
        <ScrollView
          style={[styles.list, { maxHeight: 400 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {renderItems()}
          <View style={styles.listBottom} />
        </ScrollView>
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
            accessibilityLabel="Close command palette"
          />

          <Animated.View style={[styles.card, animatedStyle]}>
            {glass ? (
              <GlassView elevation={3} borderRadius={16} style={styles.glassCard}>
                {cardContent}
              </GlassView>
            ) : (
              <View style={[styles.solidCard, { backgroundColor: cardBg }]}>
                {cardContent}
              </View>
            )}
          </Animated.View>
        </View>
      </Modal>
    );
  },
);

CommandPalette.displayName = 'CommandPalette';

const styles = StyleSheet.create({
  backdrop: {
    flex:            1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    alignItems:      'center',
    justifyContent:  'flex-start',
    paddingTop:      80,
    paddingHorizontal: 16,
  },
  card: {
    width:    '100%',
    maxWidth: 600,
  },
  solidCard: {
    borderRadius:  16,
    overflow:      'hidden',
    shadowColor:   '#000',
    shadowOffset:  { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius:  32,
    elevation:     16,
  },
  glassCard: {
    overflow: 'hidden',
  },
  searchRow: {
    flexDirection:   'row',
    alignItems:      'center',
    paddingVertical: 12,
    paddingLeft:     14,
    paddingRight:    8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  searchIcon: {
    fontSize:    20,
    marginRight: 10,
  },
  searchInput: {
    flex:       1,
    fontSize:   16,
    lineHeight: 22,
    height:     36,
    padding:    0,
  },
  closeBtn: {
    padding: 8,
    marginLeft: 4,
  },
  closeText: {
    fontSize: 14,
  },
  list: {},
  listBottom: {
    height: 8,
  },
  sectionDivider: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 14,
    marginVertical: 4,
  },
  groupLabel: {
    fontSize:       11,
    fontWeight:     '700',
    letterSpacing:  0.8,
    paddingTop:     12,
    paddingBottom:  4,
    paddingHorizontal: 14,
  },
  itemRow: {
    flexDirection:     'row',
    alignItems:        'center',
    paddingVertical:   10,
    paddingHorizontal: 14,
  },
  itemIcon: {
    marginRight: 12,
    width:       24,
    alignItems:  'center',
  },
  itemText: {
    flex: 1,
  },
  itemLabel: {
    fontSize:   15,
    fontWeight: '500',
    lineHeight: 20,
  },
  itemDescription: {
    fontSize:  13,
    lineHeight: 18,
    marginTop:  1,
  },
  shortcutBadge: {
    paddingHorizontal: 6,
    paddingVertical:   2,
    borderRadius:      5,
    marginLeft:        10,
  },
  shortcutText: {
    fontSize:   11,
    fontWeight: '600',
    fontFamily: 'monospace',
  },
  emptyState: {
    alignItems:      'center',
    justifyContent:  'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize:   15,
    fontWeight: '500',
  },
});
