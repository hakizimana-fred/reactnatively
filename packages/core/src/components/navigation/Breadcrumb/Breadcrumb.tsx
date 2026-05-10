import React, { useMemo } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from 'reactnatively-theme';
import type { BreadcrumbItem, BreadcrumbProps } from './Breadcrumb.types';

// ─── Component ───────────────────────────────────────────────────────────────

export const Breadcrumb = React.memo<BreadcrumbProps>(
  ({ items, separator = '/', maxItems, style }) => {
    const { theme } = useTheme();

    // Build the visible list (applying maxItems truncation if needed)
    const visibleItems = useMemo((): Array<BreadcrumbItem | null> => {
      if (!maxItems || items.length <= maxItems) return items;

      // Show first item, ellipsis (null), then last (maxItems - 1) items
      const tail = items.slice(items.length - (maxItems - 1));
      return [items[0]!, null, ...tail];
    }, [items, maxItems]);

    const renderSeparator = (key: string) => {
      if (typeof separator === 'string') {
        return (
          <Text
            key={key}
            style={[styles.separator, { color: theme.colors.textMuted }]}
            allowFontScaling={false}
          >
            {separator}
          </Text>
        );
      }
      return <View key={key} style={styles.separatorView}>{separator}</View>;
    };

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.container, style]}
      >
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          const sepKey = `sep-${index}`;

          // Ellipsis placeholder
          if (item === null) {
            return (
              <React.Fragment key="ellipsis">
                <Text
                  style={[styles.ellipsis, { color: theme.colors.textMuted }]}
                  allowFontScaling={false}
                >
                  ...
                </Text>
                {renderSeparator(sepKey)}
              </React.Fragment>
            );
          }

          const crumb = (
            <React.Fragment key={`crumb-${index}`}>
              {isLast ? (
                // Last item — not pressable, bold
                <View style={styles.crumb}>
                  {item.icon != null && <View style={styles.crumbIcon}>{item.icon}</View>}
                  <Text
                    style={[
                      styles.crumbLabel,
                      styles.crumbLabelActive,
                      { color: theme.colors.text },
                    ]}
                    numberOfLines={1}
                    allowFontScaling={false}
                  >
                    {item.label}
                  </Text>
                </View>
              ) : (
                // Earlier items — pressable, subdued
                <Pressable
                  onPress={item.onPress}
                  accessibilityRole="link"
                  style={({ pressed }) => [
                    styles.crumb,
                    pressed && styles.crumbPressed,
                  ]}
                >
                  {item.icon != null && (
                    <View style={styles.crumbIcon}>{item.icon}</View>
                  )}
                  <Text
                    style={[
                      styles.crumbLabel,
                      { color: theme.colors.textSecondary },
                    ]}
                    numberOfLines={1}
                    allowFontScaling={false}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              )}
              {!isLast && renderSeparator(sepKey)}
            </React.Fragment>
          );

          return crumb;
        })}
      </ScrollView>
    );
  },
);

Breadcrumb.displayName = 'Breadcrumb';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  crumb: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  crumbPressed: {
    opacity: 0.65,
  },
  crumbIcon: {
    marginRight: 4,
  },
  crumbLabel: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  crumbLabelActive: {
    fontWeight: '600',
  },
  separator: {
    fontSize: 14,
    lineHeight: 20,
    marginHorizontal: 6,
  },
  separatorView: {
    marginHorizontal: 6,
  },
  ellipsis: {
    fontSize: 14,
    lineHeight: 20,
  },
});
