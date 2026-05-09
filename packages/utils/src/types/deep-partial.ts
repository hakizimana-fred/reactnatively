export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

export type DeepReadonly<T> = T extends object
  ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
  : T;

export type ExtractKeys<T, K extends keyof T> = T[K];

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
