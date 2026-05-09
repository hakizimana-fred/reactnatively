import React from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { GlassView } from '../GlassView';
import type { GlassViewProps } from '../GlassView/GlassView.types';

// FrostPanel: full-width glass surface for bottom sheets, headers, sidebars.
// Unlike GlassView (which sizes to content), FrostPanel fills its container.
export interface FrostPanelProps extends Omit<GlassViewProps, 'style'> {
  style?: StyleProp<ViewStyle>;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}

export const FrostPanel = React.memo<FrostPanelProps>(
  ({ style, edges, borderRadius, children, ...glassProps }) => {
    // For panels, we typically want sharp edges on some sides
    // e.g., bottom sheet: round top, flat bottom (or vice versa)
    const radiusStyle = edges
      ? {
          borderTopLeftRadius:     edges.includes('top')    ? (borderRadius ?? 20) : 0,
          borderTopRightRadius:    edges.includes('top')    ? (borderRadius ?? 20) : 0,
          borderBottomLeftRadius:  edges.includes('bottom') ? (borderRadius ?? 20) : 0,
          borderBottomRightRadius: edges.includes('bottom') ? (borderRadius ?? 20) : 0,
        }
      : { borderRadius: borderRadius ?? 20 };

    return (
      <GlassView
        elevation={glassProps.elevation ?? 3}
        style={[styles.panel, style]}
        borderRadius={0} // We handle radius manually for panels
        {...glassProps}
      >
        <View style={radiusStyle}>
          {children}
        </View>
      </GlassView>
    );
  },
);

FrostPanel.displayName = 'FrostPanel';

const styles = StyleSheet.create({
  panel: {
    width: '100%',
  },
});
