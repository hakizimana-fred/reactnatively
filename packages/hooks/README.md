# reactnatively-hooks

Shared UI hooks for reactnatively.

This is an internal package of [reactnatively](https://www.npmjs.com/package/reactnatively). Install the main package instead:

```sh
npm install reactnatively
```

---

## What this package does

Provides low-level UI hooks used across components in the system — scroll behaviour, safe area utilities, and interaction state helpers.

### useScrollHandler

Returns a scroll handler and derived animated values (scroll position, direction, velocity) for building scroll-aware UIs like collapsing headers and parallax effects.

```ts
import { useScrollHandler } from 'reactnatively';

const { scrollHandler, scrollY, direction } = useScrollHandler();

// Attach to ScrollView
<Animated.ScrollView onScroll={scrollHandler} scrollEventThrottle={16}>
  ...
</Animated.ScrollView>
```

| Return value | Type | Description |
|---|---|---|
| `scrollHandler` | Reanimated event handler | Attach to `onScroll` |
| `scrollY` | `SharedValue<number>` | Current scroll offset |
| `direction` | `SharedValue<'up' \| 'down'>` | Scroll direction |
| `velocity` | `SharedValue<number>` | Current scroll velocity |
