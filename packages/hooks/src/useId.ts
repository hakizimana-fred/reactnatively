import * as React from 'react';

let counter = 0;

function generateId(prefix: string): string {
  counter += 1;
  return `${prefix}-${counter}`;
}

/**
 * Returns a stable unique ID suitable for accessibility label pairing (aria-labelledby, etc.).
 * Uses React.useId() in React 18+ and falls back to a module-level counter otherwise.
 */
export function useId(prefix: string = 'rn'): string {
  // React 18+ provides useId natively
  if (typeof (React as { useId?: () => string }).useId === 'function') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const id = (React as { useId: () => string }).useId();
    return `${prefix}${id}`;
  }

  // Fallback: stable counter-based ID (not SSR-safe, but RN has no SSR)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const idRef = React.useRef<string | null>(null);
  if (idRef.current === null) {
    idRef.current = generateId(prefix);
  }
  return idRef.current;
}
