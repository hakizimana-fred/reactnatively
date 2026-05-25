import { deepMerge, type DeepPartial } from 'reactnatively-utils';
import { baseTheme, type BaseTheme } from './themes/base';
import type { MaterialRecipe } from './tokens/materials';

export type RecipeState =
  | 'base'
  | 'pressed'
  | 'hovered'
  | 'focused'
  | 'selected'
  | 'disabled'
  | 'loading'
  | 'invalid';

export interface ComponentRecipe<Variant extends string = string, Size extends string = string> {
  material?: MaterialRecipe;
  base?: Record<string, unknown>;
  variants?: Partial<Record<Variant, Record<string, unknown>>>;
  sizes?: Partial<Record<Size, Record<string, unknown>>>;
  states?: Partial<Record<RecipeState, Record<string, unknown>>>;
  defaults?: {
    variant?: Variant;
    size?: Size;
    material?: MaterialRecipe;
  };
}

export interface ResolveRecipeOptions<Variant extends string = string, Size extends string = string> {
  variant?: Variant;
  size?: Size;
  states?: RecipeState[];
  material?: MaterialRecipe;
  theme?: BaseTheme;
}

export interface ResolvedRecipe {
  material: MaterialRecipe;
  style: Record<string, unknown>;
}

export function createRecipe<Variant extends string, Size extends string>(
  recipe: ComponentRecipe<Variant, Size>,
) {
  return function resolveRecipe({
    variant,
    size,
    states = [],
    material,
    theme = baseTheme,
  }: ResolveRecipeOptions<Variant, Size> = {}): ResolvedRecipe {
    const resolvedMaterial =
      material ??
      recipe.defaults?.material ??
      recipe.material ??
      'regular';

    const resolvedVariant = variant ?? recipe.defaults?.variant;
    const resolvedSize = size ?? recipe.defaults?.size;

    let style: Record<string, unknown> = {
      ...(recipe.base ?? {}),
      material: theme.materials[resolvedMaterial],
    };

    if (resolvedVariant && recipe.variants?.[resolvedVariant]) {
      style = deepMerge(style, recipe.variants[resolvedVariant] as Record<string, unknown>);
    }

    if (resolvedSize && recipe.sizes?.[resolvedSize]) {
      style = deepMerge(style, recipe.sizes[resolvedSize] as Record<string, unknown>);
    }

    for (const state of states) {
      if (recipe.states?.[state]) {
        style = deepMerge(style, recipe.states[state] as Record<string, unknown>);
      }
    }

    return {
      material: resolvedMaterial,
      style,
    };
  };
}

export function extendRecipe<Variant extends string, Size extends string>(
  recipe: ComponentRecipe<Variant, Size>,
  extension: DeepPartial<ComponentRecipe<Variant, Size>>,
): ComponentRecipe<Variant, Size> {
  return deepMerge(
    recipe as unknown as Record<string, unknown>,
    extension as unknown as Record<string, unknown>,
  ) as unknown as ComponentRecipe<Variant, Size>;
}
