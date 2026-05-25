import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Color System',
  description: 'How Reactnatively manages colors through semantic tokens, palette, and dark mode adaptation.',
};

const semanticColors = [
  { token: 'primary', desc: 'Brand / main interactive color' },
  { token: 'secondary', desc: 'Supporting interactive color' },
  { token: 'accent', desc: 'Highlight / promotional color' },
  { token: 'success', desc: 'Positive / complete state' },
  { token: 'warning', desc: 'Caution / attention state' },
  { token: 'error', desc: 'Error / destructive state' },
  { token: 'info', desc: 'Informational / neutral state' },
  { token: 'neutral', desc: 'Muted / secondary UI elements' },
];

export default function ColorsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Color System</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        Colors in Reactnatively are organized into three layers: the raw{' '}
        <strong className="text-white/80">palette</strong>, the semantic{' '}
        <strong className="text-white/80">theme colors</strong>, and the glass-specific
        tint and border values. Components always reference semantic colors — never raw hex.
      </p>

      <h2 id="semantic-colors" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Semantic color tokens
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        These tokens adapt to light and dark mode automatically. Override them in{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">createTheme</code>{' '}
        to brand the entire component library at once.
      </p>
      <div className="overflow-x-auto rounded-xl border border-white/[0.08] mb-6">
        <table className="w-full text-sm">
          <thead className="border-b border-white/[0.08] bg-white/[0.03]">
            <tr>
              {['Token', 'Use case'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider text-white/40 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {semanticColors.map((row) => (
              <tr key={row.token} className="border-t border-white/[0.04]">
                <td className="px-4 py-3 font-mono text-violet-300 text-xs">{row.token}</td>
                <td className="px-4 py-3 text-white/50 text-xs">{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="override-colors" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Overriding colors
      </h2>
      <CodeBlock
        filename="theme.ts"
        language="typescript"
        showLineNumbers
        code={`import { createTheme } from 'reactnatively/theme';

export const theme = createTheme({
  colors: {
    // All Button, Badge, Chip, etc. pick this up automatically
    primary:   '#6366f1',
    secondary: '#8b5cf6',
    success:   '#10b981',
    error:     '#ef4444',
  },
});`}
      />

      <h2 id="palette" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Raw palette
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        The base palette contains the full spectrum for each hue. Import it directly
        when you need a specific shade in a component:
      </p>
      <CodeBlock
        language="typescript"
        code={`import { palette } from 'reactnatively/theme';

// palette.violet[500]   → '#8b5cf6'
// palette.blue[600]     → '#2563eb'
// palette.emerald[400]  → '#34d399'
// palette.rose[500]     → '#f43f5e'

// Use in StyleSheet.create for static styles
const styles = StyleSheet.create({
  badge: { backgroundColor: palette.emerald[500] },
});`}
      />

      <h2 id="using-in-components" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Using colors in your components
      </h2>
      <CodeBlock
        filename="StatusDot.tsx"
        language="tsx"
        showLineNumbers
        code={`import { useTheme } from 'reactnatively';
import { View } from 'react-native';

type StatusDotProps = {
  status: 'active' | 'warning' | 'error';
};

export function StatusDot({ status }: StatusDotProps) {
  const { theme } = useTheme();

  const color = {
    active:  theme.colors.success,
    warning: theme.colors.warning,
    error:   theme.colors.error,
  }[status];

  return (
    <View style={{
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: color,
    }} />
  );
}`}
      />

      <h2 id="glass-colors" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Glass colors
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Glass surfaces use rgba values, not semantic color tokens. The tint and border
        colors are in{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">glassTokens</code>{' '}
        and adapt to light/dark mode by colorScheme key:
      </p>
      <CodeBlock
        language="typescript"
        code={`import { glassTokens } from 'reactnatively/theme';

// glassTokens.tint.dark.surface     → 'rgba(255,255,255,0.042)'
// glassTokens.tint.light.surface    → 'rgba(255,255,255,0.055)'
// glassTokens.border.dark.medium    → 'rgba(255,255,255,0.075)'
// glassTokens.highlight.medium      → 'rgba(255,255,255,0.18)'`}
      />
    </div>
  );
}
