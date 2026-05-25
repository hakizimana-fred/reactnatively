import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { StyleSheet, Text, type TextProps, type ViewStyle } from 'react-native';
import { accessibilityTokens } from 'reactnatively-theme';

export interface AccessibilityPolicy {
  minTouchTarget: number;
  allowFontScaling: boolean;
  maxFontSizeMultiplier: number;
  reduceTransparency: boolean;
}

export interface AccessibilityContextValue extends AccessibilityPolicy {
  touchTargetStyle: ViewStyle;
  textProps: Pick<TextProps, 'allowFontScaling' | 'maxFontSizeMultiplier'>;
}

const defaultPolicy: AccessibilityPolicy = {
  minTouchTarget: accessibilityTokens.minTouchTarget,
  allowFontScaling: true,
  maxFontSizeMultiplier: accessibilityTokens.fontScale.max,
  reduceTransparency: false,
};

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

export interface AccessibilityProviderProps {
  policy?: Partial<AccessibilityPolicy>;
  children: ReactNode;
}

export function AccessibilityProvider({ policy, children }: AccessibilityProviderProps) {
  const value = useMemo<AccessibilityContextValue>(() => {
    const resolved = { ...defaultPolicy, ...policy };
    return {
      ...resolved,
      touchTargetStyle: {
        minWidth: resolved.minTouchTarget,
        minHeight: resolved.minTouchTarget,
      },
      textProps: {
        allowFontScaling: resolved.allowFontScaling,
        maxFontSizeMultiplier: resolved.maxFontSizeMultiplier,
      },
    };
  }, [policy]);

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibilityPolicy(): AccessibilityContextValue {
  const ctx = useContext(AccessibilityContext);
  if (ctx) return ctx;
  return {
    ...defaultPolicy,
    touchTargetStyle: {
      minWidth: defaultPolicy.minTouchTarget,
      minHeight: defaultPolicy.minTouchTarget,
    },
    textProps: {
      allowFontScaling: defaultPolicy.allowFontScaling,
      maxFontSizeMultiplier: defaultPolicy.maxFontSizeMultiplier,
    },
  };
}

export interface VisuallyHiddenProps extends TextProps {
  children: ReactNode;
}

export function VisuallyHidden({ children, style, ...props }: VisuallyHiddenProps) {
  return (
    <Text
      {...props}
      style={[styles.visuallyHidden, style]}
      accessible
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  visuallyHidden: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
});
