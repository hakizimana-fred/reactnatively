import React, { useMemo } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { spacing } from '@reactnatively/theme';
import type { SpacingKey } from '@reactnatively/theme';
import type { FlexProps } from './Flex.types';

function resolveSpacing(value: SpacingKey | number | undefined): number | undefined {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return value;
  return spacing[value as SpacingKey] ?? undefined;
}

export const Flex = React.memo<FlexProps>(
  ({
    direction = 'row',
    gap,
    align,
    justify,
    wrap = false,
    flex,
    grow,
    shrink,
    basis,
    children,
    style,
    testID,
  }) => {
    const computedStyle = useMemo((): ViewStyle => ({
      flexDirection: direction,
      gap: resolveSpacing(gap),
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap ? 'wrap' : 'nowrap',
      ...(flex !== undefined ? { flex } : undefined),
      ...(grow !== undefined ? { flexGrow: grow } : undefined),
      ...(shrink !== undefined ? { flexShrink: shrink } : undefined),
      ...(basis !== undefined ? { flexBasis: basis as ViewStyle['flexBasis'] } : undefined),
    }), [direction, gap, align, justify, wrap, flex, grow, shrink, basis]);

    return (
      <View testID={testID} style={[computedStyle, style]}>
        {children}
      </View>
    );
  },
);

Flex.displayName = 'Flex';

// Module-level stylesheet (empty — styles computed via useMemo)
const styles = StyleSheet.create({});
