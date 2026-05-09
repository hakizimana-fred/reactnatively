---
name: Liquid Glass UI Framework — project status
description: Full monorepo architecture, build status, package list, and key technical decisions for the Reactnatively Liquid Glass design system
type: project
---

# Project: @reactnatively Liquid Glass UI Framework

Production-grade Liquid Glass / Frosted Glass React Native UI library built as a Turborepo monorepo with pnpm workspaces.

**Why:** User wants a glass-first, animation-first design system rivaling shadcn/ui / Tamagui in TypeScript DX.

**How to apply:** When suggesting new components or architecture changes, maintain the glass-first principle, use the established token system, and keep the monorepo patterns consistent.

## Monorepo Structure

```
reactnatively/
├── packages/
│   ├── utils/      @reactnatively/utils    — defineVariants, platform helpers, deep types
│   ├── theme/      @reactnatively/theme    — tokens, ThemeProvider, createTheme
│   ├── animations/ @reactnatively/animations — spring/timing presets, press/entrance hooks
│   ├── glass/      @reactnatively/glass    — GlassView, FrostPanel, GlassEngine
│   └── core/       @reactnatively/core     — all components + re-exports
├── apps/
│   └── playground/ — Expo 52 demo app (4 tabs: Glass, Components, Tokens, Motion)
└── tooling/tsconfig/
```

## Build Status (as of 2026-05-09)

- All 5 packages typecheck + build clean (11/11 turbo tasks)
- Playground typechecks clean
- Build outputs: core 37KB CJS / 31KB ESM, glass 12KB, theme 20KB, animations 8KB, utils 4KB

## Key Technical Decisions

1. **shamefully-hoist=true** in .npmrc — required for React types to be shared across workspace packages
2. **@types/react@^19.1.1** in root devDeps — required by react-native@0.85.3 which workspace packages use
3. **playground uses @types/react@^19.1.1** (same as root) to avoid dual-version type conflicts — runtime is still React 18.3.1 (Expo 52)
4. **toast-api.ts** (not toast.ts) — renamed to avoid esbuild case collision with Toast.tsx
5. **ThemeColors is an explicit interface** (not `as const`) — allows dark mode override values to use different strings
6. **Two-container GlassView pattern** — outer View for shadow (no overflow:hidden), inner View for clip/blur
7. **StyleSheet.absoluteFill** (not absoluteFillObject) — the latter not in @types/react-native@0.73.0
8. **useEntranceAnimation** returns AnimatedStyle<ViewStyle> directly (not {animatedStyle}) — consumers call it as `const style = useEntranceAnimation({...})`
9. **Button now has `label` prop** (convenience for string children) and `flex` prop and `danger` color alias for `error`

## CI/CD

- `.github/workflows/ci.yml` — Turborepo pipeline: typecheck+build, tests, Changesets release on main
- Secrets needed: TURBO_TOKEN, TURBO_TEAM (optional remote cache), NPM_TOKEN, GITHUB_TOKEN

## Next Up

- Implement remaining components: Input, Select, Checkbox, Switch, Dialog, BottomSheet, Tabs, SegmentedControl, Badge, Chip, etc.
- Add placeholder assets (icon.png, splash.png) to playground/assets/
- Set up Storybook or Docusaurus docs
