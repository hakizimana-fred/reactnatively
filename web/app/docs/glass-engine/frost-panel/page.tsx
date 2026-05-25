import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'FrostPanel',
  description: 'Full-width glass panel for headers, bottom sheets, sidebars, and anchored surfaces.',
};

const props = [
  { name: 'elevation', type: '0 | 1 | 2 | 3 | 4 | 5', def: '3', desc: 'Glass depth level. FrostPanel defaults to 3 (floating panel depth).' },
  { name: 'variant', type: "'ultraThin' | 'thin' | 'surface' | 'elevated' | 'overlay' | 'frosted' | 'tinted'", def: '"surface"', desc: 'Optical material variant — controls diffusion and sheen character.' },
  { name: 'edges', type: "('top' | 'bottom' | 'left' | 'right')[]", def: 'undefined', desc: 'Which edges get border radius. Omit for full radius. Use [\"top\"] for a bottom sheet panel.' },
  { name: 'borderRadius', type: 'number', def: '20', desc: 'Radius applied to the edges listed in the edges prop (or all edges when edges is omitted).' },
  { name: 'border', type: 'boolean', def: 'true', desc: 'Show the subtle glass border ring.' },
  { name: 'borderWidth', type: 'number', def: '1', desc: 'Border width (clamped to 1px max by the engine).' },
  { name: 'highlight', type: "boolean | 'none' | 'subtle' | 'medium' | 'strong' | 'intense'", def: 'true', desc: 'Top-edge sheen intensity.' },
  { name: 'blurOverride', type: 'number', def: 'undefined', desc: 'Override the blur amount from the elevation recipe.' },
  { name: 'tintOverride', type: 'string', def: 'undefined', desc: 'Override the tint color (rgba string).' },
  { name: 'glow', type: '{ color: string; radius?: number; opacity?: number } | false', def: 'undefined', desc: 'Ambient glow emitted from the panel (iOS only).' },
  { name: 'priority', type: "'low' | 'normal' | 'high' | 'critical'", def: '"normal"', desc: 'Blur budget priority.' },
  { name: 'style', type: 'StyleProp<ViewStyle>', def: 'undefined', desc: 'Applied to the outer panel view — FrostPanel fills width by default.' },
  { name: 'contentStyle', type: 'StyleProp<ViewStyle>', def: 'undefined', desc: 'Applied to the content container inside all glass layers.' },
  { name: 'children', type: 'ReactNode', def: 'undefined', desc: 'Content rendered inside the panel.' },
];

export default function FrostPanelPage() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs text-violet-400 mb-5">
        Glass Engine
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">FrostPanel</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        A full-width glass panel built on top of{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono">GlassView</code>.
        Unlike GlassView (which sizes to its content), FrostPanel fills its parent container
        horizontally and supports selective border radius via the{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono">edges</code>{' '}
        prop — making it ideal for headers, footers, bottom sheets, and sidebars.
      </p>

      <h2 id="architecture" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Architecture layer
      </h2>
      <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 mb-6">
        <div className="flex items-center gap-2 text-sm text-white/50 mb-3 font-mono">
          <span className="text-white/20">reactnatively-glass</span>
        </div>
        <div className="space-y-2">
          {[
            { name: 'GlassView', desc: 'Rendering primitive — raw 8-layer stack', current: false },
            { name: 'FrostPanel', desc: 'Structural layer — full-width panel with edge control', current: true },
          ].map((layer) => (
            <div key={layer.name} className={`flex items-center gap-3 p-2.5 rounded-lg ${layer.current ? 'bg-violet-500/10 border border-violet-500/20' : 'bg-white/[0.02] border border-white/[0.05]'}`}>
              <code className={`font-mono text-sm font-semibold ${layer.current ? 'text-violet-300' : 'text-white/40'}`}>{layer.name}</code>
              <span className={`text-xs ${layer.current ? 'text-violet-400/70' : 'text-white/30'}`}>{layer.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock language="typescript" code={`import { FrostPanel } from 'reactnatively';
// or for narrower imports:
import { FrostPanel } from 'reactnatively/glass';`} />

      <h2 id="basic-usage" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Usage
      </h2>
      <CodeBlock
        filename="AppHeader.tsx"
        language="tsx"
        showLineNumbers
        code={`import { FrostPanel } from 'reactnatively';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function AppHeader({ title }: { title: string }) {
  const { top } = useSafeAreaInsets();

  return (
    <FrostPanel
      elevation={3}
      edges={['bottom']}           // round bottom corners, flat top
      style={{ paddingTop: top }}  // absorb safe area
      contentStyle={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}
    >
      <Text style={{ color: '#fff', fontSize: 17, fontWeight: '600' }}>
        {title}
      </Text>
    </FrostPanel>
  );
}`}
      />

      <h2 id="bottom-sheet" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Bottom sheet panel
      </h2>
      <CodeBlock
        filename="BottomSheetPanel.tsx"
        language="tsx"
        showLineNumbers
        code={`import { FrostPanel } from 'reactnatively';
import { Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function BottomPanel() {
  const { bottom } = useSafeAreaInsets();

  return (
    <FrostPanel
      elevation={4}
      edges={['top']}              // round top corners, flat bottom
      style={{ paddingBottom: bottom }}
      contentStyle={{ padding: 24 }}
    >
      <Text style={{ color: '#fff', fontSize: 15, marginBottom: 16 }}>
        Quick actions
      </Text>
      {/* action list here */}
    </FrostPanel>
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

      <h2 id="vs-glassview" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        FrostPanel vs GlassView
      </h2>
      <div className="overflow-x-auto rounded-xl border border-white/[0.08] mb-6">
        <table className="w-full text-sm">
          <thead className="border-b border-white/[0.08] bg-white/[0.03]">
            <tr>
              {['', 'GlassView', 'FrostPanel'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider text-white/40 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { trait: 'Width', gv: 'Sizes to content', fp: 'Fills container (width: 100%)' },
              { trait: 'Radius control', gv: 'Single borderRadius prop', fp: 'Per-edge radius via edges prop' },
              { trait: 'Default elevation', gv: '2', fp: '3' },
              { trait: 'Use case', gv: 'Cards, overlays, inline surfaces', fp: 'Headers, bottom sheets, sidebars, footers' },
            ].map((row) => (
              <tr key={row.trait} className="border-t border-white/[0.04]">
                <td className="px-4 py-3 text-white/40 text-xs font-medium">{row.trait}</td>
                <td className="px-4 py-3 text-white/60 text-xs">{row.gv}</td>
                <td className="px-4 py-3 text-violet-300 text-xs">{row.fp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/docs/glass-engine/glass-view"
          className="flex items-center gap-2 px-4 h-9 rounded-xl bg-white/[0.08] border border-white/[0.10] text-white text-sm hover:bg-white/[0.12] transition-all"
        >
          GlassView
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/docs/glass-engine/blur-surface"
          className="flex items-center gap-2 px-4 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/70 text-sm hover:bg-white/[0.09] transition-all"
        >
          BlurSurface
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
