import React, { useState, useCallback, useMemo } from 'react';
import { View, type LayoutChangeEvent, type ViewStyle } from 'react-native';
import type { AspectRatioProps } from './AspectRatio.types';

export const AspectRatio = React.memo<AspectRatioProps>(
  ({ ratio, children, style }) => {
    const [width, setWidth] = useState<number>(0);

    const onLayout = useCallback((event: LayoutChangeEvent) => {
      const { width: measuredWidth } = event.nativeEvent.layout;
      setWidth(measuredWidth);
    }, []);

    const innerStyle = useMemo((): ViewStyle => ({
      width: '100%',
      height: width > 0 ? width / ratio : undefined,
    }), [width, ratio]);

    return (
      <View style={[style]} onLayout={onLayout}>
        <View style={innerStyle}>
          {children}
        </View>
      </View>
    );
  },
);

AspectRatio.displayName = 'AspectRatio';
