# reactnatively-utils

Shared utilities and TypeScript helpers for reactnatively.

This is an internal package of [reactnatively](https://www.npmjs.com/package/reactnatively). Install the main package instead:

```sh
npm install reactnatively
```

---

## What this package does

Provides type utilities, style helpers, and small pure functions shared across packages in the monorepo. Nothing in here has React Native UI logic — it's all framework-agnostic helpers.

Typical contents include:

- **Type helpers** — conditional types, deep partial, branded types used across the public API
- **Style utilities** — functions for merging styles, resolving responsive values, and converting token names to style values
- **Platform utilities** — thin wrappers around `Platform.select` and `Platform.OS` checks used consistently across components
- **Color utilities** — hex-to-rgba conversion, alpha manipulation, and contrast ratio calculation used by the glass engine and theme system
