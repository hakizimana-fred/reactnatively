import React, { useMemo } from 'react';
import { View, type ViewStyle } from 'react-native';
import { spacing, radii } from 'reactnatively-theme';
import type { SpacingKey, RadiiKey } from 'reactnatively-theme';
import type { BoxProps } from './Box.types';

function resolveSpacing(value: SpacingKey | number | undefined): number | undefined {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return value;
  return spacing[value as SpacingKey];
}

function resolveRadius(value: RadiiKey | number | undefined): number | undefined {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return value;
  return radii[value as RadiiKey];
}

export const Box = React.memo<BoxProps>(
  ({
    p, px, py, pt, pb, pl, pr,
    m, mx, my, mt, mb, ml, mr,
    flex, direction, align, justify, wrap, gap, rowGap, columnGap, selfAlign,
    width, height, minWidth, maxWidth, minHeight, maxHeight,
    bg, borderRadius, overflow, opacity,
    position, top, right, bottom, left, zIndex,
    style, children, testID,
  }) => {
    const computedStyle = useMemo((): ViewStyle => {
      const rs = resolveSpacing;
      const rr = resolveRadius;

      return {
        // Padding
        padding:         rs(p),
        paddingHorizontal: rs(px),
        paddingVertical: rs(py),
        paddingTop:      rs(pt),
        paddingBottom:   rs(pb),
        paddingLeft:     rs(pl),
        paddingRight:    rs(pr),
        // Margin
        margin:          rs(m),
        marginHorizontal: rs(mx),
        marginVertical:  rs(my),
        marginTop:       rs(mt),
        marginBottom:    rs(mb),
        marginLeft:      rs(ml),
        marginRight:     rs(mr),
        // Flex
        flex,
        flexDirection:   direction,
        alignItems:      align,
        justifyContent:  justify,
        flexWrap:        wrap,
        gap:             rs(gap),
        rowGap:          rs(rowGap),
        columnGap:       rs(columnGap),
        alignSelf:       selfAlign as ViewStyle['alignSelf'],
        // Size
        width:           width as ViewStyle['width'],
        height:          height as ViewStyle['height'],
        minWidth:        minWidth as ViewStyle['minWidth'],
        maxWidth:        maxWidth as ViewStyle['maxWidth'],
        minHeight:       minHeight as ViewStyle['minHeight'],
        maxHeight:       maxHeight as ViewStyle['maxHeight'],
        // Appearance
        backgroundColor: bg,
        borderRadius:    rr(borderRadius),
        overflow:        overflow as ViewStyle['overflow'],
        opacity,
        // Position
        position:        position as ViewStyle['position'],
        top, right, bottom, left, zIndex,
      };
    }, [
      p, px, py, pt, pb, pl, pr,
      m, mx, my, mt, mb, ml, mr,
      flex, direction, align, justify, wrap, gap, rowGap, columnGap, selfAlign,
      width, height, minWidth, maxWidth, minHeight, maxHeight,
      bg, borderRadius, overflow, opacity,
      position, top, right, bottom, left, zIndex,
    ]);

    return (
      <View testID={testID} style={[computedStyle, style]}>
        {children}
      </View>
    );
  },
);

Box.displayName = 'Box';
