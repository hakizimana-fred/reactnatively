# reactnatively-hooks

## 4.0.0

### Major Changes

- Refine GlassView rendering engine toward Apple liquid glass aesthetic

  Reduces shadow opacity and grows shadow radius for soft ambient depth instead of card-style drop shadows. Tint values are cut ~35% across all variants so surfaces stay highly translucent. Adds per-variant optical multipliers so ultraThin renders as nearly invisible and frosted renders with stronger haze. Splits the top highlight into a tight specular peak layer and a broader falloff layer to simulate curved-surface light refraction. Narrows the internal diffusion bands to leave a transparent gap at the surface midpoint. Reduces Android elevation to near-zero.

### Patch Changes

- Updated dependencies
  - reactnatively-theme@4.0.0
  - reactnatively-utils@4.0.0

## 3.0.0

### Patch Changes

- Updated dependencies
  - reactnatively-theme@3.0.0

## 2.1.2

### Patch Changes

- 096ae6e: Improve Expo Go compatibility for GlassView by removing the react-native-linear-gradient runtime dependency and using Metro-visible expo-blur resolution.
- Updated dependencies [096ae6e]
  - reactnatively-theme@2.1.2
  - reactnatively-utils@2.1.2

## 2.1.0

### Minor Changes

- Clarify recommended root package install and optional subpath imports.

### Patch Changes

- Updated dependencies
  - reactnatively-theme@2.1.0
  - reactnatively-utils@2.1.0

## 2.0.0

### Major Changes

- Refactor architecture, unify exports, and improve liquid glass foundation
- import change

### Patch Changes

- Updated dependencies
- Updated dependencies
  - reactnatively-theme@2.0.0
  - reactnatively-utils@2.0.0

## 1.0.0

### Major Changes

- Brief summary of changes:
  - Added platform-level material tokens: materials, states, z-depth, density, breakpoints, accessibility, haptics.
  - Added `createRecipe` / `extendRecipe` for future component recipe styling.
  - Added `GlassPlatformProvider` with glass quality, reduced transparency, power mode, blur budget, and priority controls.
  - Updated `GlassView` to support `material` and `priority`.
  - Added `InteractionProvider` and connected press animations to shared interaction policy.
  - Added `AccessibilityProvider`, `useAccessibilityPolicy`, and `VisuallyHidden`.
  - Added root `ReactnativelyProvider`.
  - Re-exported new APIs from `reactnatively`, including `palette`.
  - Removed `private: true` from publishable subpackages.
  - Fixed TypeScript health by pinning React types and removing deprecated `@types/react-native`.
  - Verified `pnpm turbo typecheck` and `pnpm turbo build` pass.

### Patch Changes

- Updated dependencies
  - reactnatively-theme@1.0.0
  - reactnatively-utils@1.0.0
