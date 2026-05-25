# reactnatively

Source for the public `reactnatively` package.

Consumers should normally import everything from this package:

```tsx
import {
  ReactnativelyProvider,
  Button,
  Card,
  GlassView,
  Surface,
  GlassPressable,
  useGlassStyle,
  resolveGlass,
} from 'reactnatively';
```

## Optional Subpaths

The package also exposes focused secondary entry points:

```tsx
import { GlassView } from 'reactnatively/glass';
import { useDisclosure } from 'reactnatively/hooks';
import { Fade } from 'reactnatively/animations';
import { createTheme } from 'reactnatively/theme';
import { Surface } from 'reactnatively/primitives';
import { deepMerge } from 'reactnatively/utils';
```

These subpaths are for power users and docs organization. The primary API is
still the root `reactnatively` import.

## Architecture

`reactnatively` re-exports and composes the workspace packages:

| Workspace package | Responsibility |
|---|---|
| `reactnatively-glass` | Glass renderer and platform policy |
| `reactnatively-theme` | Tokens, themes, recipe engine |
| `reactnatively-animations` | Motion presets, hooks, interaction policy |
| `reactnatively-primitives` | Surface, GlassPressable, portals, accessibility |
| `reactnatively-hooks` | Shared UI hooks |
| `reactnatively-utils` | Utility and type helpers |

## Build

```sh
pnpm --filter reactnatively typecheck
pnpm --filter reactnatively build
```

The build emits:

- `dist/index.*` for the root API
- `dist/glass.*`
- `dist/hooks.*`
- `dist/animations.*`
- `dist/theme.*`
- `dist/primitives.*`
- `dist/utils.*`
