import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';
import { deepMerge, type DeepPartial } from '@reactnatively/utils';
import { baseTheme, type BaseTheme } from './themes/base';
import { darkColors } from './themes/dark';

export type ColorSchemePreference = 'light' | 'dark' | 'system';
export type ResolvedColorScheme = 'light' | 'dark';

export interface ThemeContextValue<T extends BaseTheme = BaseTheme> {
  theme: T;
  colorScheme: ResolvedColorScheme;
  colorSchemePreference: ColorSchemePreference;
  setColorScheme: (scheme: ColorSchemePreference) => void;
  isDark: boolean;
  isLight: boolean;
}

const ThemeContext = createContext<ThemeContextValue<BaseTheme> | null>(null);

export interface ThemeProviderProps<T extends BaseTheme = BaseTheme> {
  theme?: DeepPartial<T>;
  colorScheme?: ColorSchemePreference;
  children: ReactNode;
}

export function ThemeProvider<T extends BaseTheme = BaseTheme>({
  theme: themeOverrides,
  colorScheme: initialPreference = 'system',
  children,
}: ThemeProviderProps<T>) {
  const systemColorScheme: ResolvedColorScheme =
    useRNColorScheme() === 'dark' ? 'dark' : 'light';

  const [preference, setPreference] = useState<ColorSchemePreference>(initialPreference);

  const resolvedScheme: ResolvedColorScheme =
    preference === 'system' ? systemColorScheme : preference;

  const setColorScheme = useCallback((scheme: ColorSchemePreference) => {
    setPreference(scheme);
  }, []);

  const resolvedTheme = useMemo((): T => {
    let result: BaseTheme = { ...baseTheme };

    // Apply dark color palette first
    if (resolvedScheme === 'dark') {
      result = { ...result, colors: darkColors };
    }

    // Apply user custom overrides on top
    if (themeOverrides) {
      result = deepMerge(
        result as unknown as Record<string, unknown>,
        themeOverrides as unknown as Record<string, unknown>,
      ) as unknown as BaseTheme;
    }

    return result as unknown as T;
  }, [themeOverrides, resolvedScheme]);

  const value = useMemo(
    (): ThemeContextValue<T> => ({
      theme: resolvedTheme,
      colorScheme: resolvedScheme,
      colorSchemePreference: preference,
      setColorScheme,
      isDark: resolvedScheme === 'dark',
      isLight: resolvedScheme === 'light',
    }),
    [resolvedTheme, resolvedScheme, preference, setColorScheme],
  );

  return (
    <ThemeContext.Provider value={value as unknown as ThemeContextValue<BaseTheme>}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme<T extends BaseTheme = BaseTheme>(): ThemeContextValue<T> {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error(
      '[Reactnatively] useTheme must be called within a <ThemeProvider>. ' +
        'Wrap your app root with <ThemeProvider>.',
    );
  }
  return ctx as unknown as ThemeContextValue<T>;
}

export function useColorScheme(): ResolvedColorScheme {
  return useTheme().colorScheme;
}

export function useIsDark(): boolean {
  return useTheme().isDark;
}

export function useToken<K extends keyof BaseTheme>(key: K): BaseTheme[K] {
  const { theme } = useTheme();
  return theme[key] as BaseTheme[K];
}
