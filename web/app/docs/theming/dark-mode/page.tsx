import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Dark Mode',
  description: 'Configure and respond to light/dark mode in Reactnatively using colorScheme and theme hooks.',
};

export default function DarkModePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Dark Mode</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        Reactnatively has first-class dark mode support. The glass engine, semantic colors,
        diffusion layers, tint values, and border tones all adapt automatically when the
        color scheme changes. You configure the behavior once at the provider and never
        branch on{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono">colorScheme</code>{' '}
        inside individual components.
      </p>

      <h2 id="color-scheme-options" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        colorScheme options
      </h2>
      <div className="space-y-2 mb-6">
        {[
          { value: '"system"', desc: 'Follows the device / OS color scheme preference. Switches automatically when the user toggles the system setting. Recommended for most apps.' },
          { value: '"dark"', desc: 'Forces dark mode regardless of device preference.' },
          { value: '"light"', desc: 'Forces light mode regardless of device preference.' },
        ].map((item) => (
          <div key={item.value} className="flex gap-3 items-start p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <code className="font-mono text-violet-300 text-sm shrink-0">{item.value}</code>
            <span className="text-sm text-white/50">{item.desc}</span>
          </div>
        ))}
      </div>

      <h2 id="setup" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Setup
      </h2>
      <CodeBlock
        filename="app/_layout.tsx"
        language="tsx"
        code={`import { ReactnativelyProvider } from 'reactnatively';

export default function RootLayout() {
  return (
    // Follows system preference automatically
    <ReactnativelyProvider colorScheme="system">
      <Stack />
    </ReactnativelyProvider>
  );
}`}
      />

      <h2 id="reading-scheme" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Reading the color scheme
      </h2>
      <CodeBlock
        filename="ThemeToggle.tsx"
        language="tsx"
        showLineNumbers
        code={`import { useColorScheme, useIsDark } from 'reactnatively';

export function ThemeAwareIcon() {
  const scheme = useColorScheme(); // 'light' | 'dark'
  const isDark = useIsDark();      // true | false

  return (
    <Icon
      name={isDark ? 'moon' : 'sun'}
      color={isDark ? '#fff' : '#000'}
    />
  );
}`}
      />

      <h2 id="per-scheme-colors" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Per-scheme colors in createTheme
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Override colors per scheme by providing a{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">light</code>{' '}
        and{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">dark</code>{' '}
        variant in your theme definition:
      </p>
      <CodeBlock
        filename="theme.ts"
        language="typescript"
        showLineNumbers
        code={`import { createTheme } from 'reactnatively/theme';

export const theme = createTheme({
  // These apply in both schemes
  colors: {
    primary: '#6366f1',
  },

  // Light-specific overrides
  light: {
    colors: {
      background: '#f8f8fa',
      surface:    '#ffffff',
      text:       '#0a0a0b',
    },
  },

  // Dark-specific overrides
  dark: {
    colors: {
      background: '#09090b',
      surface:    'rgba(255,255,255,0.06)',
      text:       '#fafafa',
    },
  },
});`}
      />

      <h2 id="adaptive-styles" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Adaptive styles in components
      </h2>
      <CodeBlock
        filename="AdaptiveCard.tsx"
        language="tsx"
        showLineNumbers
        code={`import { useTheme, useIsDark } from 'reactnatively';
import { View, Text } from 'react-native';

export function AdaptiveCard({ label }: { label: string }) {
  const { theme } = useTheme();
  const isDark = useIsDark();

  return (
    <View style={{
      backgroundColor: isDark
        ? 'rgba(255,255,255,0.06)'
        : 'rgba(0,0,0,0.04)',
      borderColor: isDark
        ? 'rgba(255,255,255,0.08)'
        : 'rgba(0,0,0,0.08)',
      borderWidth: 1,
      borderRadius: theme.radii.lg,
      padding: theme.spacing[4],
    }}>
      <Text style={{ color: theme.colors.text }}>{label}</Text>
    </View>
  );
}`}
      />

      <h2 id="glass-dark-mode" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Glass engine and dark mode
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        The glass engine reads{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">colorScheme</code>{' '}
        from the theme context and adjusts these values automatically:
      </p>
      <div className="space-y-2 mb-6">
        {[
          { what: 'Tint color', detail: 'Slightly cooler / warmer base tint per scheme' },
          { what: 'Border color', detail: 'Separate subtle/medium/strong values per scheme' },
          { what: 'Diffusion', detail: 'Warm white upper haze / atmospheric-blue lower haze — same structure, tuned per scheme' },
          { what: 'Shadow color', detail: 'Black in dark mode, blue-grey in light mode for softer shadows' },
          { what: 'BlurView tint hint', detail: '"dark" tint in dark mode, "default" in light mode' },
        ].map((item) => (
          <div key={item.what} className="flex gap-3 items-start p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <span className="text-sm font-medium text-white/70 shrink-0 w-32">{item.what}</span>
            <span className="text-sm text-white/40">{item.detail}</span>
          </div>
        ))}
      </div>
      <p className="text-white/60 leading-relaxed">
        No action is required from you — wrapping your app in{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">ReactnativelyProvider</code>{' '}
        with <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">colorScheme="system"</code>{' '}
        is sufficient for full dark mode support.
      </p>
    </div>
  );
}
