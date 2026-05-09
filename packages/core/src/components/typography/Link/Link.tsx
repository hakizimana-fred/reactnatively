import React, { useCallback, useMemo } from 'react';
import { Text, Linking, StyleSheet, type TextStyle } from 'react-native';
import { useTheme } from '@reactnatively/theme';
import type { LinkProps } from './Link.types';

export const Link = React.memo<LinkProps>(
  ({
    href,
    onPress,
    color,
    underline = true,
    external = false,
    children,
    style,
    ...rest
  }) => {
    const { theme } = useTheme();
    const resolvedColor = color ?? theme.colors.primary;

    const handlePress = useCallback(() => {
      if (onPress) {
        onPress();
        return;
      }
      if (href) {
        Linking.openURL(href).catch(() => {
          // Silently handle URL open failures
        });
      }
    }, [onPress, href]);

    const computedStyle = useMemo((): TextStyle => ({
      color: resolvedColor,
      ...(underline ? { textDecorationLine: 'underline' as const } : undefined),
    }), [resolvedColor, underline]);

    return (
      <Text
        {...rest}
        accessibilityRole="link"
        onPress={handlePress}
        style={[computedStyle, style]}
      >
        {children}
      </Text>
    );
  },
);

Link.displayName = 'Link';

const styles = StyleSheet.create({});
