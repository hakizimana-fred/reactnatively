# reactnatively (core)

This directory contains the source for the published `reactnatively` npm package — the single entry point for the entire Liquid Glass UI system.

Install from npm:

```sh
npm install reactnatively
```

See the [root README](../../README.md) for the full API reference, component catalogue, and usage examples.

---

## Architecture

`reactnatively` is the public-facing package. It imports from several private internal packages in this monorepo and bundles them all into a single output via tsup:

| Internal package | Responsibility |
|---|---|
| `reactnatively-glass` | GlassView, blur engine, capability detection |
| `reactnatively-theme` | ThemeProvider, tokens, useTheme hooks |
| `reactnatively-animations` | Spring/timing presets, animation hooks |
| `reactnatively-primitives` | Surface, GlassPressable, GlassText |
| `reactnatively-hooks` | useScrollHandler and other UI hooks |
| `reactnatively-utils` | Type helpers, style utilities, color utilities |

The internal packages are **not published to npm** — they exist only to keep the monorepo modular during development. Everything a consumer needs ships inside `reactnatively`.

---

## Building

```sh
pnpm build          # build all packages in dependency order via turbo
pnpm --filter reactnatively build   # build this package only
```

Output goes to `dist/`:

- `dist/index.js` — CommonJS bundle
- `dist/index.mjs` — ESM bundle
- `dist/index.d.ts` — TypeScript declarations

## Source structure

```
src/
  components/
    inputs/          # Button, IconButton, FAB
    forms/           # TextInput, Select, DatePicker, …
    layout/          # Box, Stack, Grid, Divider, …
    typography/      # Heading, Text, Caption, …
    data-display/    # LiquidCard, Avatar, Badge, Chip, …
    feedback/        # Toast, Alert, Skeleton, Dialog, …
    navigation/      # Tabs, BottomNavigation, Drawer, …
    overlays/        # Modal, ActionSheet, CommandPalette, …
    motion/          # Fade, Scale, Slide, MagneticPressable
    glass-advanced/  # GlassNavbar, FloatingDock, DynamicIsland, …
  index.ts           # single export barrel
```
