import React, { useMemo } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import type { CenterProps } from './Center.types';

export const Center = React.memo<CenterProps>(
  ({ flex, children, style, testID }) => {
    const computedStyle = useMemo((): ViewStyle => ({
      ...styles.center,
      ...(flex !== undefined ? { flex } : undefined),
    }), [flex]);

    return (
      <View testID={testID} style={[computedStyle, style]}>
        {children}
      </View>
    );
  },
);

Center.displayName = 'Center';

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
