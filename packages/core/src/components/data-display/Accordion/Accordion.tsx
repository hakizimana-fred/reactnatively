import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { GlassView } from '@reactnatively/glass';
import { useTheme, useIsDark } from '@reactnatively/theme';
import { SPRING_SNAPPY } from '@reactnatively/animations';
import type {
  AccordionProps,
  AccordionItemProps,
  AccordionContextValue,
} from './Accordion.types';

// ─── Context ──────────────────────────────────────────────────────────────────

const AccordionContext = createContext<AccordionContextValue>({
  openItems: [],
  toggle:    () => {},
  glass:     false,
});

function useAccordion() {
  return useContext(AccordionContext);
}

// ─── AccordionItem ────────────────────────────────────────────────────────────

const AccordionItem = React.memo<AccordionItemProps>(
  ({ value, title, children, icon, isDisabled = false }) => {
    const { openItems, toggle, glass } = useAccordion();
    const { theme } = useTheme();
    const isDark    = useIsDark();

    const isOpen = openItems.includes(value);

    // Chevron rotation
    const rotation  = useSharedValue(isOpen ? 1 : 0);
    // Content measured height
    const measured   = useRef(0);
    const maxHeight  = useSharedValue(isOpen ? 9999 : 0);
    const opacity    = useSharedValue(isOpen ? 1 : 0);

    const handlePress = useCallback(() => {
      if (isDisabled) return;
      const opening = !isOpen;
      rotation.value = withSpring(opening ? 1 : 0, SPRING_SNAPPY);
      maxHeight.value = withSpring(
        opening ? Math.max(measured.current, 300) : 0,
        SPRING_SNAPPY,
      );
      opacity.value = withSpring(opening ? 1 : 0, SPRING_SNAPPY);
      toggle(value);
    }, [isDisabled, isOpen, toggle, value]);

    const chevronStyle = useAnimatedStyle(() => ({
      transform: [
        { rotate: `${interpolate(rotation.value, [0, 1], [0, 90])}deg` },
      ],
    }));

    const contentStyle = useAnimatedStyle(() => ({
      maxHeight: maxHeight.value,
      opacity:   opacity.value,
      overflow:  'hidden',
    }));

    const borderColor = isDark
      ? 'rgba(255,255,255,0.08)'
      : 'rgba(0,0,0,0.07)';

    const triggerBg = isDark
      ? 'rgba(255,255,255,0.04)'
      : 'rgba(0,0,0,0.02)';

    const trigger = (
      <Pressable
        onPress={handlePress}
        disabled={isDisabled}
        accessible
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen, disabled: isDisabled }}
        style={[
          styles.trigger,
          {
            backgroundColor: isOpen ? triggerBg : 'transparent',
            opacity: isDisabled ? 0.45 : 1,
            borderBottomWidth: isOpen ? StyleSheet.hairlineWidth : 0,
            borderBottomColor: borderColor,
          },
        ]}
      >
        {/* Leading icon */}
        {icon != null && (
          <View style={styles.triggerIcon}>{icon}</View>
        )}

        {/* Title */}
        <Text
          style={[styles.triggerTitle, { color: theme.colors.text, flex: 1 }]}
          numberOfLines={2}
        >
          {title}
        </Text>

        {/* Chevron */}
        <Animated.View style={[styles.chevronWrap, chevronStyle]}>
          <Text style={[styles.chevron, { color: theme.colors.textMuted }]}>
            ›
          </Text>
        </Animated.View>
      </Pressable>
    );

    const contentInner = (
      <Animated.View style={contentStyle}>
        <View
          style={styles.contentPad}
          onLayout={(e) => {
            const h = e.nativeEvent.layout.height;
            if (h > 0) measured.current = h;
          }}
        >
          {children}
        </View>
      </Animated.View>
    );

    if (glass) {
      return (
        <GlassView
          borderRadius={12}
          style={styles.glassItem}
          contentStyle={styles.glassContent}
        >
          {trigger}
          {contentInner}
        </GlassView>
      );
    }

    return (
      <View
        style={[
          styles.item,
          {
            borderWidth:  StyleSheet.hairlineWidth,
            borderColor,
            borderRadius: 12,
          },
        ]}
      >
        {trigger}
        {contentInner}
      </View>
    );
  },
);
AccordionItem.displayName = 'Accordion.Item';

// ─── AccordionRoot ────────────────────────────────────────────────────────────

const AccordionRoot = React.memo<AccordionProps>(
  ({
    allowMultiple  = false,
    defaultValue,
    value:         controlledValue,
    onChange,
    glass          = false,
    children,
    style,
  }) => {
    const [internalOpen, setInternalOpen] = useState<string[]>(() => {
      if (defaultValue == null) return [];
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    });

    const openItems = controlledValue != null
      ? (Array.isArray(controlledValue) ? controlledValue : [controlledValue])
      : internalOpen;

    const toggle = useCallback(
      (val: string) => {
        let next: string[];
        if (openItems.includes(val)) {
          next = openItems.filter((v) => v !== val);
        } else {
          next = allowMultiple ? [...openItems, val] : [val];
        }

        if (controlledValue == null) {
          setInternalOpen(next);
        }
        onChange?.(allowMultiple ? next : (next[0] ?? ''));
      },
      [openItems, allowMultiple, controlledValue, onChange],
    );

    return (
      <AccordionContext.Provider value={{ openItems, toggle, glass }}>
        <View style={[styles.root, style]}>{children}</View>
      </AccordionContext.Provider>
    );
  },
);
AccordionRoot.displayName = 'Accordion';

// ─── Compound export ──────────────────────────────────────────────────────────

export const Accordion = Object.assign(AccordionRoot, { Item: AccordionItem });

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    gap: 8,
  },
  item: {
    overflow: 'hidden',
  },
  glassItem: {
    overflow: 'hidden',
  },
  glassContent: {
    overflow: 'hidden',
  },
  trigger: {
    flexDirection:     'row',
    alignItems:        'center',
    paddingHorizontal: 16,
    paddingVertical:   14,
    minHeight:         52,
  },
  triggerIcon: {
    marginRight:    10,
    alignItems:     'center',
    justifyContent: 'center',
  },
  triggerTitle: {
    fontSize:    15,
    fontWeight:  '500',
    letterSpacing: -0.2,
    lineHeight:  21,
  },
  chevronWrap: {
    marginLeft:     8,
    width:          20,
    height:         20,
    alignItems:     'center',
    justifyContent: 'center',
  },
  chevron: {
    fontSize:   22,
    fontWeight: '300',
    lineHeight: 22,
    marginTop:  -1,
  },
  contentPad: {
    paddingHorizontal: 16,
    paddingBottom:     16,
  },
});
