export function defineVariants<V extends string, T>(map: Record<V, T>) {
  return function resolve(variant: V): T {
    const result = map[variant];
    if (result === undefined) {
      throw new Error(`Unknown variant: "${variant}". Valid variants: ${Object.keys(map).join(', ')}`);
    }
    return result;
  };
}

export function defineCompoundVariants<
  Variants extends Record<string, string>,
  Output,
>(
  _variants: Variants,
  compound: Array<{ conditions: Partial<Variants>; style: Output }>,
  defaultOutput: Output,
): (input: Partial<Variants>) => Output {
  return (input) => {
    for (const { conditions, style } of compound) {
      const match = Object.entries(conditions).every(
        ([k, v]) => input[k as keyof Variants] === v,
      );
      if (match) return style;
    }
    return defaultOutput;
  };
}
