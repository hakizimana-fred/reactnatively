function isPlainObject(val: unknown): val is Record<string, unknown> {
  return typeof val === 'object' && val !== null && !Array.isArray(val);
}

export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  source: Partial<T>,
): T {
  const result: Record<string, unknown> = { ...target };

  for (const key in source) {
    const sourceVal = source[key];
    const targetVal = result[key];

    if (sourceVal === undefined) continue;

    if (isPlainObject(sourceVal) && isPlainObject(targetVal)) {
      result[key] = deepMerge(
        targetVal as Record<string, unknown>,
        sourceVal as Record<string, unknown>,
      );
    } else {
      result[key] = sourceVal;
    }
  }

  return result as T;
}

export function shallowMerge<T extends object>(target: T, source: Partial<T>): T {
  return { ...target, ...source };
}
