import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Installation',
  description: 'Install Reactnatively in your Expo or React Native project.',
};

export default function InstallationPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Installation</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        Get Reactnatively up and running in your Expo or React Native project.
      </p>

      <h2 id="quick-install" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Quick install
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Install the full framework with a single package:
      </p>
      <CodeBlock code="pnpm add reactnatively" language="bash" />

      <p className="text-white/60 leading-relaxed mt-4 mb-4">
        Or with npm / yarn:
      </p>
      <CodeBlock code={`npm install reactnatively\n# or\nyarn add reactnatively`} language="bash" />

      <h2 id="peer-deps" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Peer dependencies
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Reactnatively requires the following peer dependencies:
      </p>
      <CodeBlock
        code={`# Required
pnpm add react-native-reanimated

# Recommended (for native blur and gradient effects)
pnpm add expo-blur react-native-linear-gradient`}
        language="bash"
      />
      <div className="my-4 p-4 rounded-xl border border-blue-500/20 bg-blue-500/[0.05] flex gap-3">
        <span className="shrink-0 mt-0.5 text-sm text-blue-400">ℹ</span>
        <div className="text-sm text-white/60 leading-relaxed">
          <strong className="text-white/80">expo-blur</strong> enables native platform blur via
          {' '}<code className="px-1 py-0.5 rounded bg-white/[0.06] text-violet-300 font-mono text-xs">BlurView</code>.
          Without it, Reactnatively falls back to solid semi-transparent backgrounds.{' '}
          <strong className="text-white/80">react-native-linear-gradient</strong> enables the glass
          highlight shimmer effect.
        </div>
      </div>

      <h2 id="babel" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Babel / Metro config
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Add <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">react-native-reanimated/plugin</code>{' '}
        to your <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">babel.config.js</code>{' '}
        (must be last):
      </p>
      <CodeBlock
        filename="babel.config.js"
        language="javascript"
        code={`module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // ... other plugins
      'react-native-reanimated/plugin', // must be last
    ],
  };
};`}
      />

      <h2 id="provider" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Provider setup
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Wrap your app with the required providers at the root:
      </p>
      <CodeBlock
        filename="app/_layout.tsx"
        language="tsx"
        code={`import { ReactnativelyProvider } from 'reactnatively';

export default function RootLayout() {
  return (
    <ReactnativelyProvider>
      <Stack />
    </ReactnativelyProvider>
  );
}`}
      />
      <p className="text-white/60 leading-relaxed mt-4 mb-4">
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">ReactnativelyProvider</code>{' '}
        composes <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">ThemeProvider</code>,{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">GlassPlatformProvider</code>,{' '}
        and <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">InteractionProvider</code>{' '}
        into a single top-level provider.
      </p>

      <h2 id="subpath-imports" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Subpath imports
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Install `reactnatively` once, then use focused subpaths when you want a
        narrower import surface:
      </p>
      <CodeBlock
        language="typescript"
        code={`import { Button, GlassView } from 'reactnatively';
import { resolveGlass } from 'reactnatively/glass';
import { createTheme } from 'reactnatively/theme';
import { useDisclosure } from 'reactnatively/hooks';
import { Fade } from 'reactnatively/animations';`}
      />

      <div className="mt-10 flex items-center justify-between p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
        <div>
          <div className="text-sm font-medium text-white mb-0.5">Next step</div>
          <div className="text-sm text-white/50">Quick start guide</div>
        </div>
        <Link
          href="/docs/getting-started/quick-start"
          className="flex items-center gap-2 px-4 h-9 rounded-xl bg-white/[0.08] border border-white/[0.10] text-white text-sm hover:bg-white/[0.12] transition-all"
        >
          Quick start
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
