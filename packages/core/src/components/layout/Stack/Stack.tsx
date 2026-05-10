import React, { useMemo, Children, isValidElement } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { spacing } from 'reactnatively-theme';
import type { SpacingKey } from 'reactnatively-theme';
import type { StackProps } from './Stack.types';

function resolveSpacing(value: SpacingKey | number | undefined): number {
  if (value === undefined) return 0;
  if (typeof value === 'number') return value;
  return spacing[value as SpacingKey] ?? 0;
}

export const Stack = React.memo<StackProps>(
  ({
    direction = 'vertical',
    gap       = 4,
    align,
    justify,
    flex,
    wrap      = false,
    divider,
    style,
    children,
    testID,
  }) => {
    const isHorizontal = direction === 'horizontal';
    const gapValue = resolveSpacing(gap);

    const containerStyle = useMemo((): ViewStyle => ({
      flexDirection:  isHorizontal ? 'row' : 'column',
      alignItems:     align,
      justifyContent: justify,
      flex,
      flexWrap:       wrap ? 'wrap' : 'nowrap',
    }), [isHorizontal, align, justify, flex, wrap]);

    const childArray = Children.toArray(children).filter(isValidElement);

    return (
      <View testID={testID} style={[containerStyle, style]}>
        {childArray.map((child, index) => {
          const isLast = index === childArray.length - 1;
          return (
            <React.Fragment key={(child as React.ReactElement).key ?? index}>
              {child}
              {!isLast && gapValue > 0 && (
                <View
                  style={
                    isHorizontal
                      ? { width: gapValue }
                      : { height: gapValue }
                  }
                />
              )}
              {!isLast && divider && (
                <View
                  style={[
                    isHorizontal ? styles.dividerVertical : styles.dividerHorizontal,
                    isHorizontal
                      ? { marginHorizontal: gapValue / 2 }
                      : { marginVertical:   gapValue / 2 },
                  ]}
                />
              )}
            </React.Fragment>
          );
        })}
      </View>
    );
  },
);

Stack.displayName = 'Stack';

// Convenience aliases
export const HStack = React.memo<Omit<StackProps, 'direction'>>((props) => (
  <Stack direction="horizontal" {...props} />
));
HStack.displayName = 'HStack';

export const VStack = React.memo<Omit<StackProps, 'direction'>>((props) => (
  <Stack direction="vertical" {...props} />
));
VStack.displayName = 'VStack';

const styles = StyleSheet.create({
  dividerHorizontal: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0,0,0,0.12)',
    alignSelf: 'stretch',
  },
  dividerVertical: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0,0,0,0.12)',
    alignSelf: 'stretch',
  },
});
