import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Theming Overview',
  description: 'How the Reactnatively theme system works — tokens, ThemeProvider, createTheme, and dark mode.',
};

export default function ThemingOverviewPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Theming</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        Reactnatively ships a complete design token system. Tokens cover colors, spacing,
        radius, typography, shadow, motion, glass, and material recipes. Components read
        from these tokens automatically via the theme context — you customize once and
        every component updates.
      </p>

      <h2 id="architecture" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Theme architecture
      </h2>
      <div className="space-y-2 mb-6">
        {[
          { layer: 'Base theme', desc: 'Default values for every token — colors, spacing, radius, typography, motion, glass.' },
          { layer: 'createTheme', desc: 'Deep-merges your overrides onto the base theme. TypeScript infers your exact token shape.' },
          { layer: 'ThemeProvider', desc: 'Puts the resolved theme into React context, handles color scheme, and exposes useTheme().' },
          { layer: 'useTheme / useToken', desc: 'Hooks that components call to read live token values from the nearest ThemeProvider.' },
          { layer: 'createRecipe', desc: 'Typed variant + state resolver used internally by components — also available for your own components.' },
        ].map((item, i) => (
          <div key={item.layer} className="flex gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="w-6 h-6 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center shrink-0 text-xs font-bold text-violet-400">{i + 1}</div>
            <div>
              <span className="text-sm font-medium text-white/80">{item.layer}</span>
              <span className="text-sm text-white/40 ml-2">— {item.desc}</span>
            </div>
          </div>
        ))}
      </div>

      <h2 id="quick-setup" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Quick setup
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        The simplest path: wrap your app in{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">ReactnativelyProvider</code>{' '}
        and start building. The base theme is applied automatically.
      </p>
      <CodeBlock
        filename="app/_layout.tsx"
        language="tsx"
        code={`import { ReactnativelyProvider } from 'reactnatively';

export default function RootLayout() {
  return (
    <ReactnativelyProvider colorScheme="system">
      <App />
    </ReactnativelyProvider>
  );
}`}
      />

      <h2 id="custom-theme" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Custom theme
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Use{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">createTheme</code>{' '}
        to override any token. The return type is inferred — editors autocomplete your custom tokens too.
      </p>
      <CodeBlock
        filename="theme.ts"
        language="typescript"
        showLineNumbers
        code={`import { createTheme } from 'reactnatively/theme';

export const myTheme = createTheme({
  colors: {
    primary: '#6366f1',
    secondary: '#8b5cf6',
  },
  radii: {
    card: 20,
    button: 12,
  },
});`}
      />
      <CodeBlock
        filename="app/_layout.tsx"
        language="tsx"
        code={`import { ReactnativelyProvider } from 'reactnatively';
import { myTheme } from './theme';

export default function RootLayout() {
  return (
    <ReactnativelyProvider theme={myTheme} colorScheme="system">
      <App />
    </ReactnativelyProvider>
  );
}`}
      />

      <h2 id="hooks" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Theme hooks
      </h2>
      <div className="overflow-x-auto rounded-xl border border-white/[0.08] mb-6">
        <table className="w-full text-sm">
          <thead className="border-b border-white/[0.08] bg-white/[0.03]">
            <tr>
              {['Hook', 'Returns', 'Use case'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider text-white/40 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { hook: 'useTheme()', ret: 'Full theme + colorScheme', use: 'Access any token, read current scheme' },
              { hook: 'useColorScheme()', ret: "'light' | 'dark'", use: 'Read scheme without the full theme' },
              { hook: 'useIsDark()', ret: 'boolean', use: 'Quick dark-mode boolean check' },
              { hook: 'useToken(path)', ret: 'Token value', use: "Read a specific token by path, e.g., 'colors.primary'" },
            ].map((row) => (
              <tr key={row.hook} className="border-t border-white/[0.04]">
                <td className="px-4 py-3 font-mono text-violet-300 text-xs whitespace-nowrap">{row.hook}</td>
                <td className="px-4 py-3 font-mono text-blue-300 text-xs">{row.ret}</td>
                <td className="px-4 py-3 text-white/50 text-xs">{row.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { title: 'Design Tokens', desc: 'Full token reference for all scales.', href: '/docs/theming/tokens' },
          { title: 'createTheme', desc: 'API for extending the base theme.', href: '/docs/theming/create-theme' },
          { title: 'createRecipe', desc: 'Variant resolver for your own components.', href: '/docs/theming/create-recipe' },
          { title: 'Dark Mode', desc: 'Color scheme configuration and usage.', href: '/docs/theming/dark-mode' },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] transition-all"
          >
            <div>
              <div className="font-medium text-white text-sm mb-0.5">{link.title}</div>
              <div className="text-xs text-white/40">{link.desc}</div>
            </div>
            <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all" />
          </Link>
        ))}
      </div>
    </div>
  );
}
