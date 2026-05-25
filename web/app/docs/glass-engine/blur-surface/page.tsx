import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'BlurSurface',
  description: 'Semantic glass surface with a simplified API for cards, panels, and elevated UI regions.',
};

const props = [
  { name: 'elevation', type: '0 | 1 | 2 | 3 | 4 | 5', def: '2', desc: 'Glass depth level.' },
  { name: 'variant', type: "'surface' | 'frosted' | 'elevated' | 'ultraThin'", def: '"surface"', desc: 'Optical material variant.' },
  { name: 'borderRadius', type: 'number', def: '16', desc: 'Corner radius applied to all edges.' },
  { name: 'border', type: 'boolean', def: 'true', desc: 'Show the subtle glass border ring.' },
  { name: 'borderWidth', type: 'number', def: '1', desc: 'Border width (clamped to 1px max).' },
  { name: 'glow', type: 'boolean', def: 'false', desc: 'Enable a primary color ambient glow (iOS only).' },
  { name: 'style', type: 'StyleProp<ViewStyle>', def: 'undefined', desc: 'Style applied to the outer container.' },
  { name: 'contentStyle', type: 'StyleProp<ViewStyle>', def: 'undefined', desc: 'Style applied inside all glass layers.' },
  { name: 'children', type: 'ReactNode', def: 'undefined', desc: 'Content rendered on top of the glass material.' },
];

export default function BlurSurfacePage() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs text-violet-400 mb-5">
        Glass Engine
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">BlurSurface</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        The semantic glass surface for everyday use. BlurSurface is a simplified wrapper
        around{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono">GlassView</code>{' '}
        that exposes a focused subset of props — enough for cards, panels, overlays, and
        elevated surfaces without exposing low-level rendering knobs.
      </p>

      <h2 id="architecture" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Architecture layer
      </h2>
      <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 mb-6">
        <div className="space-y-2">
          {[
            { pkg: 'reactnatively-glass', name: 'GlassView', desc: 'Rendering primitive — raw 8-layer stack', current: false },
            { pkg: 'reactnatively-glass', name: 'FrostPanel', desc: 'Structural layout — full-width panel', current: false },
            { pkg: 'reactnatively (core)', name: 'BlurSurface', desc: 'Semantic material layer — simplified API', current: true },
          ].map((layer) => (
            <div key={layer.name} className={`flex items-start gap-3 p-2.5 rounded-lg ${layer.current ? 'bg-violet-500/10 border border-violet-500/20' : 'bg-white/[0.02] border border-white/[0.05]'}`}>
              <div>
                <code className={`font-mono text-sm font-semibold ${layer.current ? 'text-violet-300' : 'text-white/40'}`}>{layer.name}</code>
                <span className={`ml-2 text-xs ${layer.current ? 'text-violet-400/70' : 'text-white/30'}`}>{layer.desc}</span>
                <div className={`text-[10px] mt-0.5 font-mono ${layer.current ? 'text-violet-400/40' : 'text-white/20'}`}>{layer.pkg}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2 id="when-to-use" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        When to use BlurSurface
      </h2>
      <div className="space-y-3 mb-6">
        <div className="p-4 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/20">
          <div className="text-xs font-semibold text-emerald-400 mb-2 uppercase tracking-wide">Use BlurSurface when</div>
          <ul className="space-y-1.5 text-sm text-white/55">
            <li>Building a card, info panel, settings group, or elevated container</li>
            <li>You want the standard glass look with minimal configuration</li>
            <li>Content-sized surfaces (not full-width panels)</li>
          </ul>
        </div>
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <div className="text-xs font-semibold text-white/30 mb-2 uppercase tracking-wide">Use GlassView instead when</div>
          <ul className="space-y-1.5 text-sm text-white/55">
            <li>You need low-level control: <code className="font-mono text-xs text-violet-300">blurOverride</code>, <code className="font-mono text-xs text-violet-300">tintOverride</code>, <code className="font-mono text-xs text-violet-300">highlight</code>, <code className="font-mono text-xs text-violet-300">priority</code>, <code className="font-mono text-xs text-violet-300">material</code></li>
            <li>Building a custom glass component that extends the engine</li>
          </ul>
        </div>
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <div className="text-xs font-semibold text-white/30 mb-2 uppercase tracking-wide">Use FrostPanel instead when</div>
          <ul className="space-y-1.5 text-sm text-white/55">
            <li>Building a header, bottom sheet, sidebar, or any full-width anchored surface</li>
            <li>You need selective border radius on specific edges</li>
          </ul>
        </div>
      </div>

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock language="typescript" code={`import { BlurSurface } from 'reactnatively';`} />

      <h2 id="basic-usage" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Usage
      </h2>
      <CodeBlock
        filename="ProfileCard.tsx"
        language="tsx"
        showLineNumbers
        code={`import { BlurSurface } from 'reactnatively';
import { Text, View } from 'react-native';

export function ProfileCard({ name, role }: { name: string; role: string }) {
  return (
    <BlurSurface
      elevation={2}
      borderRadius={20}
      style={{ margin: 16 }}
      contentStyle={{ padding: 20 }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{
          width: 44, height: 44, borderRadius: 22,
          backgroundColor: 'rgba(139, 92, 246, 0.3)',
        }} />
        <View>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>{name}</Text>
          <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{role}</Text>
        </View>
      </View>
    </BlurSurface>
  );
}`}
      />

      <h2 id="variants" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Variant comparison
      </h2>
      <CodeBlock
        filename="BlurSurfaceVariants.tsx"
        language="tsx"
        showLineNumbers
        code={`import { BlurSurface } from 'reactnatively';
import { Text, View } from 'react-native';

const variants = ['ultraThin', 'surface', 'elevated', 'frosted'] as const;

export function VariantShowcase() {
  return (
    <View style={{ gap: 12, padding: 16 }}>
      {variants.map((variant) => (
        <BlurSurface
          key={variant}
          variant={variant}
          elevation={2}
          contentStyle={{ padding: 16 }}
        >
          <Text style={{ color: '#fff', fontWeight: '500' }}>{variant}</Text>
        </BlurSurface>
      ))}
    </View>
  );
}`}
      />

      <h2 id="props" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Props
      </h2>
      <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
        <table className="w-full text-sm">
          <thead className="border-b border-white/[0.08] bg-white/[0.03]">
            <tr>
              {['Prop', 'Type', 'Default', 'Description'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider text-white/40 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.map((row) => (
              <tr key={row.name} className="border-t border-white/[0.04]">
                <td className="px-4 py-3 font-mono text-violet-300 text-xs whitespace-nowrap">{row.name}</td>
                <td className="px-4 py-3 font-mono text-blue-300 text-xs">{row.type}</td>
                <td className="px-4 py-3 font-mono text-white/30 text-xs">{row.def}</td>
                <td className="px-4 py-3 text-white/50 text-xs leading-relaxed">{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 text-sm text-white/50">
        <strong className="text-white/70">Need more control?</strong> BlurSurface intentionally omits advanced props like{' '}
        <code className="font-mono text-violet-300 text-xs">blurOverride</code>,{' '}
        <code className="font-mono text-violet-300 text-xs">tintOverride</code>,{' '}
        <code className="font-mono text-violet-300 text-xs">priority</code>, and{' '}
        <code className="font-mono text-violet-300 text-xs">material</code>. Use{' '}
        <Link href="/docs/glass-engine/glass-view" className="text-violet-400 hover:text-violet-300">GlassView</Link> directly for full access.
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/docs/glass-engine/glass-view"
          className="flex items-center gap-2 px-4 h-9 rounded-xl bg-white/[0.08] border border-white/[0.10] text-white text-sm hover:bg-white/[0.12] transition-all"
        >
          GlassView (full API)
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/docs/glass-engine/frost-panel"
          className="flex items-center gap-2 px-4 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/70 text-sm hover:bg-white/[0.09] transition-all"
        >
          FrostPanel
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
