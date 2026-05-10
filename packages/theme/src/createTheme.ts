import { deepMerge, type DeepPartial } from 'reactnatively-utils';
import { baseTheme, type BaseTheme } from './themes/base';

// createTheme: user-facing factory with full IntelliSense on the override shape.
// The return type is the merged theme — consumers get autocomplete on every token.
export function createTheme<T extends DeepPartial<BaseTheme>>(overrides: T): BaseTheme & T {
  return deepMerge(
    baseTheme as unknown as Record<string, unknown>,
    overrides as unknown as Record<string, unknown>,
  ) as unknown as BaseTheme & T;
}

// Type helper: infer the exact theme type created by createTheme
export type InferTheme<TFactory extends (...args: any[]) => any> = ReturnType<TFactory>;

// Re-export base theme for consumers who want to extend it without overriding
export { baseTheme };
