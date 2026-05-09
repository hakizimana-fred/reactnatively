import React, { useMemo } from 'react';
import { View, type ViewStyle } from 'react-native';
import { spacing } from '@reactnatively/theme';
import type { SpacingKey } from '@reactnatively/theme';
import type { SpacerProps } from './Spacer.types';

function resolveSpacing(value: SpacingKey | number | undefined): number | undefined {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return value;
  return spacing[value as SpacingKey] ?? undefined;
}

export const Spacer = React.memo<SpacerProps>(
  ({ size, axis = 'both' }) => {
    const resolvedSize = resolveSpacing(size);

    const computedStyle = useMemo((): ViewStyle => {
      if (resolvedSize === undefined) {
        // Flexible spacer
        return { flex: 1 };
      }
      // Fixed spacer
      if (axis === 'horizontal') {
        return { width: resolvedSize };
      }
      if (axis === 'vertical') {
        return { height: resolvedSize };
      }
      // axis === 'both'
      return { width: resolvedSize, height: resolvedSize };
    }, [resolvedSize, axis]);

    return <View style={computedStyle} />;
  },
);

Spacer.displayName = 'Spacer';
