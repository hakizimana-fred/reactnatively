import { useState, useCallback, useRef } from 'react';

export interface UseControllableOptions<T> {
  /** The controlled value. When provided the hook operates in controlled mode. */
  value?: T;
  /** The default value for uncontrolled mode. */
  defaultValue?: T;
  /** Called when the value changes in uncontrolled mode. */
  onChange?: (value: T) => void;
}

/**
 * Bridges controlled and uncontrolled component patterns.
 * Returns [resolvedValue, setValue] — handles both controlled and uncontrolled.
 */
export function useControllable<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableOptions<T>): [T | undefined, (next: T) => void] {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<T | undefined>(defaultValue);

  // Keep a stable ref to onChange to avoid re-creating setValue
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) {
        setInternalValue(next);
      }
      onChangeRef.current?.(next);
    },
    [isControlled],
  );

  return [isControlled ? value : internalValue, setValue];
}
