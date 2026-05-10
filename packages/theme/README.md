# reactnatively-theme

Token engine and theme system for reactnatively.

This is an internal package of [reactnatively](https://www.npmjs.com/package/reactnatively). Install the main package instead:

```sh
npm install reactnatively
```

---

## What this package does

Provides the design token definitions, `ThemeProvider`, theme hooks, and the `createTheme` factory that powers light/dark mode and custom theming across the entire system.

### ThemeProvider

Wraps the app to make theme context available to all components. Automatically responds to system color scheme changes.

```tsx
import { ThemeProvider } from 'reactnatively';

<ThemeProvider>
  <App />
</ThemeProvider>

// With a custom theme
<ThemeProvider theme={createTheme({ colors: { primary: '#6366f1' } })}>
  <App />
</ThemeProvider>
```

### Hooks

| Hook | Returns | Use |
|---|---|---|
| `useTheme()` | Full theme object (`colors`, `spacing`, `radii`, …) | Access all tokens |
| `useColorScheme()` | `'light' \| 'dark' \| 'auto'` | Current color scheme |
| `useIsDark()` | `boolean` | Dark mode shortcut |
| `useToken(path)` | `any` | Single token by dot-path |

### Design tokens

| Export | Contents |
|---|---|
| `spacing` | Scale from `xs` (4) to `xl` (64) |
| `radii` | `sm` `md` `lg` `xl` `full` |
| `typography` | `fontFamily`, `fontSize`, `fontWeight`, `lineHeight` |
| `shadows` | Depth levels 1–5 |
| `motion` | Duration presets + spring configs |
| `glassTokens` | Per-elevation blur, tint, and shadow values |
| `palette` | Full color palette |
| `baseTheme` | Complete default theme object |

### createTheme

```ts
import { createTheme } from 'reactnatively';

const theme = createTheme({
  colors: {
    primary: '#6366f1',
    secondary: '#8b5cf6',
  },
});
```

Deep-merges your overrides with the base theme, so you only specify what you want to change.
