import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react';

type AsProp<C extends ElementType> = { as?: C };
type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicComponentProp<
  C extends ElementType,
  Props = Record<string, never>,
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<ComponentPropsWithRef<C>, PropsToOmit<C, Props>>;

export type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>['ref'];

export type PolymorphicComponentPropWithRef<
  C extends ElementType,
  Props = Record<string, never>,
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

export type { ReactNode };
