import React, { type ReactNode } from 'react';
import {
  ThemeProvider,
  type ColorSchemePreference,
  type BaseTheme,
} from 'reactnatively-theme';
import type { DeepPartial } from 'reactnatively-utils';
import {
  GlassPlatformProvider,
  type GlassMaterialPolicy,
  type RenderBudgetPolicy,
} from 'reactnatively-glass';
import {
  InteractionProvider,
  type InteractionPolicy,
} from 'reactnatively-animations';
import {
  AccessibilityProvider,
  PortalProvider,
  type AccessibilityPolicy,
} from 'reactnatively-primitives';
import { ToastProvider } from '../components/feedback/Toast';

export interface ReactnativelyProviderProps<T extends BaseTheme = BaseTheme> {
  children: ReactNode;
  theme?: DeepPartial<T>;
  colorScheme?: ColorSchemePreference;
  glass?: {
    material?: Partial<GlassMaterialPolicy>;
    budget?: Partial<RenderBudgetPolicy>;
  };
  interaction?: Partial<InteractionPolicy>;
  accessibility?: Partial<AccessibilityPolicy>;
  withToasts?: boolean;
}

export function ReactnativelyProvider<T extends BaseTheme = BaseTheme>({
  children,
  theme,
  colorScheme,
  glass,
  interaction,
  accessibility,
  withToasts = true,
}: ReactnativelyProviderProps<T>) {
  const content = withToasts ? (
    <ToastProvider>{children}</ToastProvider>
  ) : (
    children
  );

  return (
    <ThemeProvider theme={theme} colorScheme={colorScheme}>
      <AccessibilityProvider policy={accessibility}>
        <InteractionProvider policy={interaction}>
          <GlassPlatformProvider material={glass?.material} budget={glass?.budget}>
            <PortalProvider>{content}</PortalProvider>
          </GlassPlatformProvider>
        </InteractionProvider>
      </AccessibilityProvider>
    </ThemeProvider>
  );
}
