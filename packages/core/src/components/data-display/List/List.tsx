import React, { useCallback } from 'react';
import { View, Text, FlatList, SectionList, StyleSheet } from 'react-native';
import { GlassView } from 'reactnatively-glass';
import { useTheme, useIsDark } from 'reactnatively-theme';
import { ListItem } from './ListItem';
import type { ListProps, ListItemProps, ListSection } from './List.types';

// ─── Section header ───────────────────────────────────────────────────────────

interface SectionHeaderProps {
  title?: string;
}

const SectionHeader = React.memo<SectionHeaderProps>(({ title }) => {
  const { theme } = useTheme();
  const isDark    = useIsDark();

  if (!title) return null;

  return (
    <View
      style={[
        styles.sectionHeader,
        {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: isDark
            ? 'rgba(255,255,255,0.08)'
            : 'rgba(0,0,0,0.07)',
          backgroundColor: isDark ? theme.colors.backgroundDeep : theme.colors.background,
        },
      ]}
    >
      <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
        {title.toUpperCase()}
      </Text>
    </View>
  );
});
SectionHeader.displayName = 'List.SectionHeader';

// ─── List ─────────────────────────────────────────────────────────────────────

const ListRoot = React.memo<ListProps>(
  ({
    items,
    sections,
    keyExtractor,
    renderItem: customRenderItem,
    glass = false,
    style,
  }) => {
    const defaultKeyExtractor = useCallback(
      (item: ListItemProps, index: number) =>
        keyExtractor ? keyExtractor(item, index) : (item.title + index),
      [keyExtractor],
    );

    const defaultRenderItem = useCallback(
      ({ item }: { item: ListItemProps }) => {
        if (customRenderItem) {
          return <>{customRenderItem(item)}</>;
        }
        return <ListItem {...item} glass={glass} />;
      },
      [customRenderItem, glass],
    );

    const renderSectionHeader = useCallback(
      ({ section }: { section: ListSection }) => (
        <SectionHeader title={section.title} />
      ),
      [],
    );

    const container = sections ? (
      <SectionList<ListItemProps, ListSection>
        sections={sections}
        keyExtractor={defaultKeyExtractor}
        renderItem={defaultRenderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        style={glass ? undefined : style}
        contentContainerStyle={styles.content}
      />
    ) : (
      <FlatList<ListItemProps>
        data={items ?? []}
        keyExtractor={defaultKeyExtractor}
        renderItem={defaultRenderItem}
        showsVerticalScrollIndicator={false}
        style={glass ? undefined : style}
        contentContainerStyle={styles.content}
      />
    );

    if (glass) {
      return (
        <GlassView
          borderRadius={16}
          style={style}
          contentStyle={styles.glassContent}
        >
          {container}
        </GlassView>
      );
    }

    return container;
  },
);
ListRoot.displayName = 'List';

// ─── Compound export ──────────────────────────────────────────────────────────

export const List = Object.assign(ListRoot, { Item: ListItem });

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
  glassContent: {
    overflow: 'hidden',
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical:   8,
  },
  sectionTitle: {
    fontSize:    11,
    fontWeight:  '600',
    letterSpacing: 0.8,
  },
});
