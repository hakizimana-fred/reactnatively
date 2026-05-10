import React, { useMemo } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { spacing } from 'reactnatively-theme';
import type { SpacingKey } from 'reactnatively-theme';
import type { GridProps } from './Grid.types';

function resolveSpacing(value: SpacingKey | number | undefined): number {
  if (value === undefined) return 0;
  if (typeof value === 'number') return value;
  return spacing[value as SpacingKey] ?? 0;
}

export const Grid = React.memo<GridProps>(
  ({
    columns = 2,
    gap,
    rowGap,
    columnGap,
    children,
    style,
    testID,
  }) => {
    const resolvedGap = resolveSpacing(gap);
    const resolvedRowGap = rowGap !== undefined ? resolveSpacing(rowGap) : resolvedGap;
    const resolvedColumnGap = columnGap !== undefined ? resolveSpacing(columnGap) : resolvedGap;

    const childArray = React.Children.toArray(children);

    const itemWidth = useMemo((): ViewStyle => {
      // Each item occupies 1/columns of the container minus the column gaps
      // Total gap space per row = columnGap * (columns - 1)
      // Per item gap deduction = columnGap * (columns - 1) / columns
      const totalGapPerRow = resolvedColumnGap * (columns - 1);
      const gapDeductionPerItem = totalGapPerRow / columns;
      return {
        width: `${(100 / columns)}%` as ViewStyle['width'],
        paddingHorizontal: resolvedColumnGap / 2,
      };
    }, [columns, resolvedColumnGap]);

    return (
      <View testID={testID} style={[styles.container, style]}>
        {childArray.map((child, index) => {
          const row = Math.floor(index / columns);
          return (
            <View
              key={index}
              style={[
                itemWidth,
                row > 0 ? { marginTop: resolvedRowGap } : undefined,
              ]}
            >
              {child}
            </View>
          );
        })}
      </View>
    );
  },
);

Grid.displayName = 'Grid';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
