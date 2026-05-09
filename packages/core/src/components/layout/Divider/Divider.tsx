import React, { useMemo } from 'react';
import { View, Text, StyleSheet, type ViewStyle, type TextStyle } from 'react-native';
import { spacing } from '@reactnatively/theme';
import { useIsDark } from '@reactnatively/theme';
import type { SpacingKey } from '@reactnatively/theme';
import type { DividerProps } from './Divider.types';

function resolveSpacing(value: SpacingKey | number | undefined): number | undefined {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return value;
  return spacing[value as SpacingKey] ?? undefined;
}

export const Divider = React.memo<DividerProps>(
  ({
    orientation = 'horizontal',
    thickness = StyleSheet.hairlineWidth,
    color,
    spacing: spacingProp,
    label,
    labelStyle,
    style,
  }) => {
    const isDark = useIsDark();
    const resolvedSpacing = resolveSpacing(spacingProp);

    const defaultColor = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)';
    const resolvedColor = color ?? defaultColor;

    const isHorizontal = orientation === 'horizontal';

    const lineStyle = useMemo((): ViewStyle => {
      if (isHorizontal) {
        return {
          height: thickness,
          backgroundColor: resolvedColor,
          ...(resolvedSpacing !== undefined
            ? { marginVertical: resolvedSpacing }
            : undefined),
        };
      }
      return {
        width: thickness,
        backgroundColor: resolvedColor,
        ...(resolvedSpacing !== undefined
          ? { marginHorizontal: resolvedSpacing }
          : undefined),
      };
    }, [isHorizontal, thickness, resolvedColor, resolvedSpacing]);

    if (label && isHorizontal) {
      return (
        <View style={[styles.labelContainer, style]}>
          <View style={[styles.labelLine, { backgroundColor: resolvedColor, height: thickness }]} />
          <Text style={[styles.labelText, labelStyle]}>{label}</Text>
          <View style={[styles.labelLine, { backgroundColor: resolvedColor, height: thickness }]} />
        </View>
      );
    }

    return <View style={[lineStyle, isHorizontal ? styles.stretchH : styles.stretchV, style]} />;
  },
);

Divider.displayName = 'Divider';

const styles = StyleSheet.create({
  stretchH: {
    alignSelf: 'stretch',
  },
  stretchV: {
    alignSelf: 'stretch',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelLine: {
    flex: 1,
  },
  labelText: {
    marginHorizontal: 12,
    fontSize: 12,
    color: 'rgba(128,128,128,0.8)',
  },
});
