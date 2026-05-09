import React, { useMemo } from 'react';
import { View, Text, Platform, StyleSheet, type ViewStyle, type TextStyle } from 'react-native';
import { useIsDark } from '@reactnatively/theme';
import { GlassView } from '@reactnatively/glass';
import type { CodeProps } from './Code.types';

const MONOSPACE_FONT = Platform.select<string>({
  ios: 'Menlo',
  android: 'monospace',
  default: 'monospace',
});

export const Code = React.memo<CodeProps>(
  ({
    children,
    block = false,
    language,
    glass = false,
    style,
    textStyle,
  }) => {
    const isDark = useIsDark();

    const bgColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

    const inlineContainerStyle = useMemo((): ViewStyle => ({
      backgroundColor: bgColor,
      borderRadius: 4,
      paddingHorizontal: 6,
      paddingVertical: 2,
      alignSelf: 'baseline' as ViewStyle['alignSelf'],
    }), [bgColor]);

    const blockContainerStyle = useMemo((): ViewStyle => ({
      borderRadius: 12,
      padding: 16,
      ...(!glass ? { backgroundColor: bgColor } : undefined),
    }), [bgColor, glass]);

    const codeTextStyle = useMemo((): TextStyle => ({
      fontFamily: MONOSPACE_FONT,
      fontSize: block ? 13 : 12,
      lineHeight: block ? 20 : undefined,
    }), [block]);

    if (block) {
      if (glass) {
        return (
          <GlassView style={[blockContainerStyle, style]}>
            <Text
              selectable
              style={[codeTextStyle, textStyle]}
            >
              {children}
            </Text>
          </GlassView>
        );
      }

      return (
        <View style={[blockContainerStyle, style]}>
          <Text
            selectable
            style={[codeTextStyle, textStyle]}
          >
            {children}
          </Text>
        </View>
      );
    }

    // Inline code
    return (
      <View style={[inlineContainerStyle, style as ViewStyle]}>
        <Text
          selectable
          style={[codeTextStyle, textStyle]}
        >
          {children}
        </Text>
      </View>
    );
  },
);

Code.displayName = 'Code';

const styles = StyleSheet.create({});
