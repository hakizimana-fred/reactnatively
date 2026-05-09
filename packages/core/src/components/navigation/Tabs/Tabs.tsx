import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '@reactnatively/theme';
import { GlassView } from '@reactnatively/glass';
import { SPRING_SNAPPY } from '@reactnatively/animations';
import type {
  TabListProps,
  TabPanelProps,
  TabProps,
  TabsContextValue,
  TabsProps,
} from './Tabs.types';

// ─── Context ─────────────────────────────────────────────────────────────────

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs sub-components must be used inside <Tabs>');
  return ctx;
}

// ─── TabList ─────────────────────────────────────────────────────────────────

const TabList = React.memo<TabListProps>(({ children, style }) => {
  const { variant, orientation } = useTabsContext();
  const { theme } = useTheme();

  const containerStyle = useMemo((): ViewStyle => {
    const base: ViewStyle = {
      flexDirection: orientation === 'vertical' ? 'column' : 'row',
    };
    if (variant === 'enclosed') {
      return {
        ...base,
        backgroundColor: theme.colors.backgroundDeep,
        borderRadius: 12,
        padding: 4,
      };
    }
    if (variant === 'pills') {
      return { ...base };
    }
    if (variant === 'line') {
      return {
        ...base,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: theme.colors.border,
      };
    }
    if (variant === 'glass') {
      return { ...base };
    }
    return base;
  }, [variant, orientation, theme]);

  return (
    <ScrollView
      horizontal={orientation !== 'vertical'}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[containerStyle, style]}
    >
      {children}
    </ScrollView>
  );
});

TabList.displayName = 'Tabs.List';

// ─── Tab ─────────────────────────────────────────────────────────────────────

const Tab = React.memo<TabProps>(({ value, label, icon, isDisabled = false }) => {
  const { activeTab, setActiveTab, variant } = useTabsContext();
  const { theme } = useTheme();
  const isActive = activeTab === value;

  // Per-tab indicator animation for 'line' variant
  const indicatorOpacity = useSharedValue(isActive ? 1 : 0);
  const bgScale = useSharedValue(isActive ? 1 : 0);

  React.useEffect(() => {
    if (variant === 'line') {
      indicatorOpacity.value = withSpring(isActive ? 1 : 0, SPRING_SNAPPY);
    }
    if (variant === 'pills' || variant === 'enclosed') {
      bgScale.value = withSpring(isActive ? 1 : 0, SPRING_SNAPPY);
    }
  }, [isActive, variant]);

  const indicatorStyle = useAnimatedStyle((): ViewStyle => {
    'worklet';
    return { opacity: indicatorOpacity.value };
  });

  const pillBgStyle = useAnimatedStyle((): ViewStyle => {
    'worklet';
    return { opacity: bgScale.value };
  });

  const handlePress = useCallback(() => {
    if (!isDisabled) setActiveTab(value);
  }, [isDisabled, setActiveTab, value]);

  const labelColor = isActive
    ? theme.colors.primary
    : isDisabled
    ? theme.colors.textDisabled
    : theme.colors.textSecondary;

  if (variant === 'glass') {
    return (
      <Pressable
        onPress={handlePress}
        disabled={isDisabled}
        accessibilityRole="tab"
        accessibilityState={{ selected: isActive, disabled: isDisabled }}
        style={[styles.tab, styles.tabGlass]}
      >
        {isActive ? (
          <GlassView elevation={2} borderRadius={10}>
            <View style={styles.tabInner}>
              {icon != null && <View style={styles.tabIcon}>{icon}</View>}
              <Text
                style={[styles.tabLabel, { color: theme.colors.primary, fontWeight: '600' }]}
                allowFontScaling={false}
              >
                {label}
              </Text>
            </View>
          </GlassView>
        ) : (
          <View style={styles.tabInner}>
            {icon != null && <View style={styles.tabIcon}>{icon}</View>}
            <Text
              style={[styles.tabLabel, { color: labelColor }]}
              allowFontScaling={false}
            >
              {label}
            </Text>
          </View>
        )}
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive, disabled: isDisabled }}
      style={styles.tab}
    >
      {(variant === 'pills' || variant === 'enclosed') && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.pillBg,
            { backgroundColor: variant === 'enclosed' ? theme.colors.surface : theme.colors.primaryMuted },
            pillBgStyle,
          ]}
        />
      )}
      <View style={styles.tabInner}>
        {icon != null && <View style={styles.tabIcon}>{icon}</View>}
        <Text
          style={[
            styles.tabLabel,
            { color: labelColor, fontWeight: isActive ? '600' : '400' },
          ]}
          allowFontScaling={false}
        >
          {label}
        </Text>
      </View>
      {variant === 'line' && (
        <Animated.View
          style={[
            styles.lineIndicator,
            { backgroundColor: theme.colors.primary },
            indicatorStyle,
          ]}
        />
      )}
    </Pressable>
  );
});

Tab.displayName = 'Tabs.Tab';

// ─── TabPanel ────────────────────────────────────────────────────────────────

const TabPanel = React.memo<TabPanelProps>(({ value, children, style }) => {
  const { activeTab } = useTabsContext();
  if (activeTab !== value) return null;
  return <View style={[styles.panel, style]}>{children}</View>;
});

TabPanel.displayName = 'Tabs.Panel';

// ─── TabsRoot ────────────────────────────────────────────────────────────────

const TabsRoot = React.memo<TabsProps>(
  ({
    value,
    defaultValue = '',
    onChange,
    variant = 'line',
    orientation = 'horizontal',
    glass = false,
    children,
    style,
  }) => {
    const [internalTab, setInternalTab] = useState(defaultValue);
    const activeTab = value !== undefined ? value : internalTab;

    const setActiveTab = useCallback(
      (next: string) => {
        if (value === undefined) setInternalTab(next);
        onChange?.(next);
      },
      [value, onChange],
    );

    const ctx = useMemo(
      (): TabsContextValue => ({ activeTab, setActiveTab, variant, orientation }),
      [activeTab, setActiveTab, variant, orientation],
    );

    const Container = glass ? GlassView : View;
    const containerProps = glass
      ? { elevation: 1 as const, borderRadius: 16 }
      : {};

    return (
      <TabsContext.Provider value={ctx}>
        {glass ? (
          <GlassView elevation={1} borderRadius={16} style={style}>
            {children}
          </GlassView>
        ) : (
          <View style={[styles.root, style]}>{children}</View>
        )}
      </TabsContext.Provider>
    );
  },
);

TabsRoot.displayName = 'Tabs';

// ─── Compound assembly ────────────────────────────────────────────────────────

export const Tabs = Object.assign(TabsRoot, {
  Tab,
  Panel: TabPanel,
  List: TabList,
});

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flexShrink: 1,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  tabGlass: {
    overflow: 'hidden',
  },
  tabInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabIcon: {
    marginRight: 6,
  },
  tabLabel: {
    fontSize: 14,
    lineHeight: 20,
  },
  pillBg: {
    borderRadius: 10,
  },
  lineIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 8,
    right: 8,
    height: 2,
    borderRadius: 1,
  },
  panel: {
    flex: 1,
  },
});
