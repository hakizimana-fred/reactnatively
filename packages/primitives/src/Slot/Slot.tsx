import React, { cloneElement, isValidElement, forwardRef } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { Ref } from 'react';

interface SlotProps {
  children?: React.ReactNode;
  style?:    StyleProp<ViewStyle>;
  [key: string]: unknown;
}

/**
 * Slot — Radix-style render delegation primitive.
 *
 * Merges its own props with the single child element's props, then renders
 * that child (not a wrapper element). Event handlers from both Slot and the
 * child are composed so both fire. Styles are merged with the child's styles
 * taking precedence.
 *
 * Usage — implementing `asChild` on a component:
 * ```tsx
 * function Button({ asChild, ...props }) {
 *   const Comp = asChild ? Slot : Pressable;
 *   return <Comp {...props} />;
 * }
 *
 * // Render a Link as a button:
 * <Button asChild>
 *   <Link href="/home" />
 * </Button>
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Slot = forwardRef<unknown, SlotProps>(function Slot(
  { children, ...slotProps },
  ref,
) {
  if (!isValidElement(children)) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(
        '[Reactnatively] <Slot> received a non-element child and rendered nothing. ' +
        'Pass a single valid React element as the child of Slot.',
      );
    }
    return null;
  }

  // Merge event handlers: compose both so neither is silently dropped.
  const childProps = children.props as Record<string, unknown>;
  const mergedProps: Record<string, unknown> = {};

  // Start with slot props
  for (const key of Object.keys(slotProps)) {
    mergedProps[key] = slotProps[key];
  }

  // Override with child props, composing function handlers
  for (const key of Object.keys(childProps)) {
    const slotHandler  = slotProps[key];
    const childHandler = childProps[key];

    if (
      typeof slotHandler  === 'function' &&
      typeof childHandler === 'function'
    ) {
      // Compose: Slot handler fires first, then child handler
      mergedProps[key] = (...args: unknown[]) => {
        (slotHandler as (...a: unknown[]) => void)(...args);
        (childHandler as (...a: unknown[]) => void)(...args);
      };
    } else {
      // Child prop wins (child is more specific)
      mergedProps[key] = childProps[key] ?? slotProps[key];
    }
  }

  // Style merging: [slotStyle, childStyle] — child style overrides slot style
  if (slotProps.style !== undefined || childProps.style !== undefined) {
    mergedProps['style'] = [slotProps.style, childProps.style].filter(Boolean);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return cloneElement(children as React.ReactElement<any>, {
    ...mergedProps,
    ref: ref as Ref<unknown>,
  });
});

Slot.displayName = 'Slot';
