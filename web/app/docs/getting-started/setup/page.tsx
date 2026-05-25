import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Project Setup',
  description: 'Configure your React Native or Expo project to use Reactnatively with TypeScript, aliases, and provider setup.',
};

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 p-4 rounded-xl border border-blue-500/20 bg-blue-500/[0.05] flex gap-3">
      <span className="shrink-0 mt-0.5 text-sm text-blue-400">ℹ</span>
      <div className="text-sm text-white/60 leading-relaxed">{children}</div>
    </div>
  );
}

function Warn({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 p-4 rounded-xl border border-amber-500/20 bg-amber-500/[0.05] flex gap-3">
      <span className="shrink-0 mt-0.5 text-sm text-amber-400">⚠</span>
      <div className="text-sm text-white/60 leading-relaxed">{children}</div>
    </div>
  );
}

export default function SetupPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Project Setup</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        A complete walkthrough for configuring a new or existing React Native / Expo
        project to work with Reactnatively — TypeScript, Reanimated, providers, and
        optional dependencies included.
      </p>

      <h2 id="expo-recommended" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Expo (recommended)
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Start from the Expo Router template for the best out-of-the-box experience:
      </p>
      <CodeBlock
        language="bash"
        code={`npx create-expo-app my-app --template tabs
cd my-app
pnpm add reactnatively react-native-reanimated expo-blur`}
      />

      <h2 id="bare-react-native" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Bare React Native
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        For bare React Native projects, install the required dependencies and link natives:
      </p>
      <CodeBlock
        language="bash"
        code={`pnpm add reactnatively react-native-reanimated react-native-gesture-handler

# iOS — install native modules
cd ios && pod install && cd ..`}
      />

      <h2 id="babel" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Babel configuration
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        The Reanimated Babel plugin must be the <strong className="text-white/80">last plugin</strong> in your
        Babel config:
      </p>
      <CodeBlock
        filename="babel.config.js"
        language="javascript"
        code={`module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // other plugins first ...
      'react-native-reanimated/plugin', // must be last
    ],
  };
};`}
      />
      <Warn>
        If <code className="font-mono text-amber-300">react-native-reanimated/plugin</code> is not
        last, animated hooks will crash with worklet errors at runtime.
      </Warn>

      <h2 id="typescript" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        TypeScript configuration
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Reactnatively ships full TypeScript types. No additional{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">@types</code>{' '}
        package is required. Ensure your{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">tsconfig.json</code>{' '}
        targets ES2020 or newer:
      </p>
      <CodeBlock
        filename="tsconfig.json"
        language="json"
        code={`{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "moduleResolution": "bundler"
  }
}`}
      />

      <h2 id="provider" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Root provider
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Wrap the root of your app in{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">ReactnativelyProvider</code>.
        This single provider composes{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">ThemeProvider</code>,{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">GlassPlatformProvider</code>, and{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">InteractionProvider</code>:
      </p>
      <CodeBlock
        filename="app/_layout.tsx"
        language="tsx"
        showLineNumbers
        code={`import { Stack } from 'expo-router';
import { ReactnativelyProvider } from 'reactnatively';

export default function RootLayout() {
  return (
    <ReactnativelyProvider
      colorScheme="system"
      glass={{ material: { quality: 'balanced' } }}
      interaction={{ intensity: 'standard', enableHaptics: true }}
      withToasts
    >
      <Stack />
    </ReactnativelyProvider>
  );
}`}
      />
      <Note>
        <strong className="text-white/80">colorScheme="system"</strong> makes the theme follow the
        device setting automatically. Pass <code className="font-mono text-violet-300">"light"</code>{' '}
        or <code className="font-mono text-violet-300">"dark"</code> to override.
      </Note>

      <h2 id="gesture-handler" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Gesture handler (required for sheets and drawers)
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Components like BottomSheet and Drawer require{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">GestureHandlerRootView</code>{' '}
        at the very root of your tree (above the provider):
      </p>
      <CodeBlock
        filename="app/_layout.tsx"
        language="tsx"
        showLineNumbers
        code={`import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ReactnativelyProvider } from 'reactnatively';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ReactnativelyProvider>
        <Stack />
      </ReactnativelyProvider>
    </GestureHandlerRootView>
  );
}`}
      />

      <h2 id="expo-go" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Expo Go vs development builds
      </h2>
      <div className="overflow-x-auto rounded-xl border border-white/[0.08] mb-4">
        <table className="w-full text-sm">
          <thead className="border-b border-white/[0.08] bg-white/[0.03]">
            <tr>
              {['Environment', 'Native blur', 'Gesture handler', 'Haptics'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider text-white/40 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { env: 'Expo Go', blur: '✓ (expo-blur included)', gesture: '✓', haptics: '✓' },
              { env: 'Dev build (iOS)', blur: '✓ Full quality', gesture: '✓', haptics: '✓' },
              { env: 'Dev build (Android 12+)', blur: '✓ Partial (65% intensity)', gesture: '✓', haptics: '✓' },
              { env: 'Dev build (Android <12)', blur: '✗ Solid fallback', gesture: '✓', haptics: '✓' },
            ].map((row) => (
              <tr key={row.env} className="border-t border-white/[0.04]">
                <td className="px-4 py-3 font-mono text-violet-300 text-xs">{row.env}</td>
                <td className="px-4 py-3 text-white/60 text-xs">{row.blur}</td>
                <td className="px-4 py-3 text-white/60 text-xs">{row.gesture}</td>
                <td className="px-4 py-3 text-white/60 text-xs">{row.haptics}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="verify" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Verify your setup
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Add a quick smoke test to your home screen:
      </p>
      <CodeBlock
        filename="app/(tabs)/index.tsx"
        language="tsx"
        showLineNumbers
        code={`import { Box, GlassView, Heading, Text } from 'reactnatively';

export default function HomeScreen() {
  return (
    <Box flex={1} alignItems="center" justifyContent="center" padding="lg">
      <GlassView elevation={2} style={{ padding: 24, borderRadius: 20 }}>
        <Heading level="h2" style={{ marginBottom: 8 }}>
          Reactnatively
        </Heading>
        <Text variant="body" color="secondary">
          Glass engine is working.
        </Text>
      </GlassView>
    </Box>
  );
}`}
      />

      <div className="mt-10 flex items-center justify-between p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
        <div>
          <div className="text-sm font-medium text-white mb-0.5">Next step</div>
          <div className="text-sm text-white/50">Explore the Glass Engine</div>
        </div>
        <Link
          href="/docs/glass-engine"
          className="flex items-center gap-2 px-4 h-9 rounded-xl bg-white/[0.08] border border-white/[0.10] text-white text-sm hover:bg-white/[0.12] transition-all"
        >
          Glass Engine
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
