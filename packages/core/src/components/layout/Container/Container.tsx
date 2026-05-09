import React, { useMemo } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { spacing } from '@reactnatively/theme';
import type { SpacingKey } from '@reactnatively/theme';
import type { ContainerProps, ContainerMaxWidth } from './Container.types';

const MAX_WIDTH_VALUES: Record<ContainerMaxWidth, number> = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
};

function resolveSpacing(value: SpacingKey | number | undefined): number | undefined {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return value;
  return spacing[value as SpacingKey] ?? undefined;
}

function resolveMaxWidth(value: number | ContainerMaxWidth | undefined): number | undefined {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return value;
  return MAX_WIDTH_VALUES[value];
}

export const Container = React.memo<ContainerProps>(
  ({
    maxWidth,
    px = 16,
    py,
    center = true,
    children,
    style,
  }) => {
    const resolvedMaxWidth = resolveMaxWidth(maxWidth);
    const resolvedPx = resolveSpacing(px);
    const resolvedPy = resolveSpacing(py);

    const computedStyle = useMemo((): ViewStyle => ({
      width: '100%',
      ...(resolvedMaxWidth !== undefined ? { maxWidth: resolvedMaxWidth } : undefined),
      ...(resolvedPx !== undefined ? { paddingHorizontal: resolvedPx } : undefined),
      ...(resolvedPy !== undefined ? { paddingVertical: resolvedPy } : undefined),
      ...(center ? styles.centered : undefined),
    }), [resolvedMaxWidth, resolvedPx, resolvedPy, center]);

    return (
      <View style={[computedStyle, style]}>
        {children}
      </View>
    );
  },
);

Container.displayName = 'Container';

const styles = StyleSheet.create({
  centered: {
    alignSelf: 'center',
  },
});
