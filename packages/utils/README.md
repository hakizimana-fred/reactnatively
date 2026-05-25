# reactnatively-utils

Shared utility and type helpers for Reactnatively.

## Install

Most apps should install the full framework:

```sh
npm install reactnatively
```

Install `reactnatively-utils` directly only when you need shared types or
utilities without the full component framework.

Most users should import utilities from `reactnatively`:

```tsx
import {
  deepMerge,
  defineVariants,
  platformSelect,
  IS_IOS,
} from 'reactnatively';
```

Optional subpath:

```tsx
import { deepMerge, platformSelect } from 'reactnatively/utils';
```

## Exports

| Export | Purpose |
|---|---|
| `deepMerge` | Deep object merge for token/theme objects |
| `shallowMerge` | Shallow object merge |
| `defineVariants` | Typed variant resolver |
| `defineCompoundVariants` | Typed compound variant resolver |
| `IS_IOS`, `IS_ANDROID`, `IS_WEB`, `IS_NATIVE` | Platform booleans |
| `getAndroidVersion` | Android API/version helper |
| `platformSelect` | Small typed platform selector |

## Types

Common type exports include:

- `DeepPartial`
- `DeepReadonly`
- `Prettify`
- `PolymorphicComponentProp`
- `PolymorphicComponentPropWithRef`
- `PolymorphicRef`
- `WithChildren`
- `WithTestID`
- `SizeScale`
- `Orientation`
