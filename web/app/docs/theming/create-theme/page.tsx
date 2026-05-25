import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'createTheme',
  description: 'How to extend the Reactnatively base theme with your own tokens using createTheme.',
};

export default function CreateThemePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">createTheme</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono">createTheme</code>{' '}
        deep-merges your token overrides onto the base theme. The return type is inferred,
        so your custom tokens are fully typed and autocompletable everywhere they're used.
      </p>

      <h2 id="signature" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Signature
      </h2>
      <CodeBlock
        language="typescript"
        code={`import { createTheme } from 'reactnatively/theme';

function createTheme<T extends DeepPartial<BaseTheme>>(overrides: T): BaseTheme & T`}
      />

      <h2 id="basic-usage" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Basic usage
      </h2>
      <CodeBlock
        filename="theme.ts"
        language="typescript"
        showLineNumbers
        code={`import { createTheme } from 'reactnatively/theme';

export const theme = createTheme({
  colors: {
    primary:   '#6366f1',   // indigo
    secondary: '#8b5cf6',   // violet
    accent:    '#06b6d4',   // cyan
  },
  radii: {
    card:   20,
    button: 12,
    badge:  6,
  },
  spacing: {
    // override specific values
    screenPadding: 20,
  },
});

// TypeScript knows theme.colors.primary is '#6366f1'
// and theme.radii.card is 20`}
      />

      <h2 id="provider" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Passing to the provider
      </h2>
      <CodeBlock
        filename="app/_layout.tsx"
        language="tsx"
        showLineNumbers
        code={`import { ReactnativelyProvider } from 'reactnatively';
import { theme } from './theme';

export default function RootLayout() {
  return (
    <ReactnativelyProvider theme={theme} colorScheme="system">
      <Stack />
    </ReactnativelyProvider>
  );
}`}
      />

      <h2 id="using-in-components" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Using custom tokens in components
      </h2>
      <CodeBlock
        filename="MyComponent.tsx"
        language="tsx"
        showLineNumbers
        code={`import { useTheme } from 'reactnatively';
import { View } from 'react-native';

export function MyCard() {
  const { theme } = useTheme();

  return (
    <View style={{
      borderRadius: theme.radii.card,    // 20 — your custom value
      padding: theme.spacing[4],          // 16 — from base theme
      backgroundColor: theme.colors.primary, // '#6366f1'
    }} />
  );
}`}
      />

      <h2 id="infer-theme" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Typing your theme
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Use <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">InferTheme</code>{' '}
        to extract the exact type of your theme for re-exporting or strict prop typing:
      </p>
      <CodeBlock
        filename="theme.ts"
        language="typescript"
        code={`import { createTheme, type InferTheme } from 'reactnatively/theme';

const themeFactory = () => createTheme({
  colors: { brand: '#6366f1' },
});

export type MyTheme = InferTheme<typeof themeFactory>;
// MyTheme.colors.brand → string`}
      />

      <h2 id="deep-merge" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Deep merge behavior
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">createTheme</code>{' '}
        uses a deep merge — nested objects are merged, not replaced. You only need to
        specify the tokens you want to change; all other base theme values are inherited.
      </p>
      <CodeBlock
        language="typescript"
        code={`// You override one spacing value → all other spacing values come from the base theme
createTheme({
  spacing: {
    // Only this key changes. spacing[4], spacing[8], etc. remain as-is.
    20: 80,
  },
});`}
      />
    </div>
  );
}
