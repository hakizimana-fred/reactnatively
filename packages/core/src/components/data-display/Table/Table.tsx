import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import { GlassView } from '@reactnatively/glass';
import { useTheme, useIsDark } from '@reactnatively/theme';
import type { TableProps, TableColumn } from './Table.types';

// ─── Sort indicator ───────────────────────────────────────────────────────────

interface SortIconProps {
  active: boolean;
  direction: 'asc' | 'desc';
  color: string;
}

const SortIcon = React.memo<SortIconProps>(({ active, direction, color }) => (
  <Text
    style={[
      styles.sortIcon,
      { color: active ? color : 'rgba(150,150,150,0.45)' },
    ]}
  >
    {active ? (direction === 'asc' ? '↑' : '↓') : '↕'}
  </Text>
));
SortIcon.displayName = 'Table.SortIcon';

// ─── Cell alignment helper ────────────────────────────────────────────────────

function textAlign(align: TableColumn['align']): 'left' | 'center' | 'right' {
  return align ?? 'left';
}

// ─── Table ────────────────────────────────────────────────────────────────────

export const Table = React.memo<TableProps>(
  ({
    columns,
    data,
    onSort,
    glass    = false,
    striped  = false,
    bordered = false,
    stickyHeader = false,
    style,
  }) => {
    const { theme } = useTheme();
    const isDark    = useIsDark();

    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

    const handleHeaderPress = useCallback(
      (col: TableColumn) => {
        if (!col.sortable) return;
        const next: 'asc' | 'desc' =
          sortKey === col.key && sortDir === 'asc' ? 'desc' : 'asc';
        setSortKey(col.key);
        setSortDir(next);
        onSort?.(col.key, next);
      },
      [sortKey, sortDir, onSort],
    );

    const borderColor = isDark
      ? 'rgba(255,255,255,0.09)'
      : 'rgba(0,0,0,0.09)';

    const headerBg = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.035)';

    const rowBg = (index: number) =>
      striped && index % 2 === 1
        ? (isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.025)')
        : 'transparent';

    const cellBorderStyle = bordered
      ? {
          borderRightWidth: StyleSheet.hairlineWidth,
          borderRightColor: borderColor,
        }
      : {};

    // ── Header row ────────────────────────────────────────────────────────────

    const headerRow = (
      <View
        style={[
          styles.headerRow,
          {
            backgroundColor:  headerBg,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: borderColor,
          },
          stickyHeader && styles.stickyHeader,
        ]}
      >
        {columns.map((col, ci) => (
          <Pressable
            key={col.key}
            onPress={() => handleHeaderPress(col)}
            disabled={!col.sortable}
            style={[
              styles.headerCell,
              { width: col.width ?? 120 },
              ci < columns.length - 1 ? cellBorderStyle : {},
            ]}
          >
            <Text
              style={[
                styles.headerText,
                { color: theme.colors.textSecondary, textAlign: textAlign(col.align) },
              ]}
              numberOfLines={2}
            >
              {col.title}
            </Text>
            {col.sortable && (
              <SortIcon
                active={sortKey === col.key}
                direction={sortDir}
                color={theme.colors.primary}
              />
            )}
          </Pressable>
        ))}
      </View>
    );

    // ── Data rows ─────────────────────────────────────────────────────────────

    const dataRows = data.map((row, ri) => (
      <View
        key={ri}
        style={[
          styles.dataRow,
          { backgroundColor: rowBg(ri) },
          ri < data.length - 1 && {
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: borderColor,
          },
        ]}
      >
        {columns.map((col, ci) => {
          const cellValue = row[col.key];
          return (
            <View
              key={col.key}
              style={[
                styles.dataCell,
                { width: col.width ?? 120 },
                ci < columns.length - 1 ? cellBorderStyle : {},
              ]}
            >
              {col.renderCell ? (
                col.renderCell(cellValue, row)
              ) : (
                <Text
                  style={[
                    styles.cellText,
                    { color: theme.colors.text, textAlign: textAlign(col.align) },
                  ]}
                  numberOfLines={3}
                >
                  {cellValue == null ? '' : String(cellValue)}
                </Text>
              )}
            </View>
          );
        })}
      </View>
    ));

    // ── Outer border ──────────────────────────────────────────────────────────

    const outerBorder = bordered
      ? {
          borderWidth:  StyleSheet.hairlineWidth,
          borderColor,
          borderRadius: 12,
          overflow:     'hidden' as const,
        }
      : { borderRadius: 12, overflow: 'hidden' as const };

    const tableInner = (
      <ScrollView horizontal showsHorizontalScrollIndicator={Platform.OS !== 'web'}>
        <View>
          {headerRow}
          <ScrollView
            nestedScrollEnabled
            showsVerticalScrollIndicator
            style={styles.bodyScroll}
          >
            {dataRows}
          </ScrollView>
        </View>
      </ScrollView>
    );

    if (glass) {
      return (
        <GlassView
          borderRadius={12}
          style={style}
          contentStyle={styles.glassContent}
        >
          {tableInner}
        </GlassView>
      );
    }

    return (
      <View style={[outerBorder, style]}>
        {tableInner}
      </View>
    );
  },
);
Table.displayName = 'Table';

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  stickyHeader: {
    // On native, sticky positioning in ScrollView is done per-platform;
    // this flag just signals intent — full sticky requires SectionList headers
  },
  headerRow: {
    flexDirection: 'row',
  },
  headerCell: {
    flexDirection:     'row',
    alignItems:        'center',
    paddingHorizontal: 12,
    paddingVertical:   11,
    minHeight:         44,
  },
  headerText: {
    fontSize:    12,
    fontWeight:  '600',
    letterSpacing: 0.4,
    flex:        1,
  },
  sortIcon: {
    fontSize:   14,
    marginLeft: 4,
    fontWeight: '700',
  },
  dataRow: {
    flexDirection: 'row',
  },
  dataCell: {
    paddingHorizontal: 12,
    paddingVertical:   10,
    justifyContent:    'center',
    minHeight:         44,
  },
  cellText: {
    fontSize:   14,
    fontWeight: '400',
    lineHeight: 20,
  },
  bodyScroll: {
    maxHeight: 400,
  },
  glassContent: {
    overflow: 'hidden',
  },
});
