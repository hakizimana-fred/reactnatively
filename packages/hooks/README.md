# reactnatively-hooks

Shared UI hooks for Reactnatively.

## Install

Most apps should install the full framework:

```sh
npm install reactnatively
```

Install `reactnatively-hooks` directly only when you need the hooks package
without the full component framework.

Most users should import hooks from `reactnatively`:

```tsx
import {
  useDisclosure,
  useControllable,
  useHaptic,
  useContainerQuery,
  useScrollHandler,
} from 'reactnatively';
```

Optional subpath:

```tsx
import { useDisclosure, useScrollHandler } from 'reactnatively/hooks';
```

## Hooks

| Hook | Purpose |
|---|---|
| `useControllable` | Controlled/uncontrolled value state |
| `useDisclosure` | Open/close/toggle state |
| `useId` | Stable ids |
| `usePrevious` | Previous value tracking |
| `useDebounce` | Debounced values |
| `useThrottle` | Throttled values |
| `useKeyboard` | Keyboard visibility/height |
| `useDimensions` | Window dimensions and breakpoint |
| `useAccessibility` | Accessibility environment state |
| `useHaptic` | Optional haptic feedback helper |
| `useContainerQuery` | Container-based responsive state |
| `useScrollHandler` | Reanimated scroll values |

## Example

```tsx
const disclosure = useDisclosure();

<Button label="Open" onPress={disclosure.open} />
<Modal isOpen={disclosure.isOpen} onClose={disclosure.close} />
```
