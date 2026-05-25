import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'GlassView',
  description: 'The foundational Liquid Glass rendering primitive.',
};

const props = [
  { name: 'elevation', type: '0 | 1 | 2 | 3 | 4 | 5', default: '2', description: 'Glass depth level. Controls blur, shadow, and tint intensity.' },
  { name: 'variant', type: 'GlassTintVariant', default: '"surface"', description: 'Tint preset: ultraThin, thin, surface, elevated, overlay, frosted, tinted.' },
  { name: 'material', type: 'MaterialRecipe', default: 'undefined', description: 'Override both elevation and variant via a named material recipe.' },
  { name: 'priority', type: 'GlassSurfacePriority', default: '"normal"', description: 'Blur budget priority: critical, high, normal, low, background.' },
  { name: 'highlight', type: 'boolean | GlassHighlight', default: 'true', description: 'Top-edge refraction shimmer. Pass false to disable.' },
  { name: 'border', type: 'boolean', default: 'true', description: 'Glass edge border ring.' },
  { name: 'borderWidth', type: 'number', default: '1', description: 'Border line width in logical pixels.' },
  { name: 'borderRadius', type: 'number', default: '16', description: 'Corner radius in logical pixels.' },
  { name: 'blurOverride', type: 'number', default: 'undefined', description: 'Override blur intensity (0-100). Bypasses the elevation system.' },
  { name: 'tintOverride', type: 'string', default: 'undefined', description: 'Override tint color. Bypasses the variant system.' },
  { name: 'glow', type: 'GlowConfig | false', default: 'undefined', description: 'Outer glow effect with color, radius, and opacity.' },
  { name: 'style', type: 'StyleProp<ViewStyle>', default: 'undefined', description: 'Applied to the outer shadow shell.' },
  { name: 'contentStyle', type: 'StyleProp<ViewStyle>', default: 'undefined', description: 'Applied to the inner content container.' },
  { name: 'children', type: 'ReactNode', default: 'undefined', description: 'Content rendered above all glass layers.' },
];

export default function GlassViewPage() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 mb-5">
        reactnatively/glass
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">GlassView</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        The foundational rendering primitive of the Liquid Glass system. Composes
        a native blur layer, tint overlay, edge highlight, and drop shadow into a
        single adaptable surface.
      </p>

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock
        language="typescript"
        code={`import { GlassView } from 'reactnatively';
// or
import { GlassView } from 'reactnatively/glass';`}
      />

      <h2 id="basic-usage" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Basic usage
      </h2>
      <CodeBlock
        filename="MyCard.tsx"
        language="tsx"
        code={`import { GlassView } from 'reactnatively';
import { Text } from 'react-native';

export function MyCard() {
  return (
    <GlassView
      elevation={2}
      variant="surface"
      borderRadius={20}
      style={{ padding: 20 }}
    >
      <Text style={{ color: 'white' }}>
        A glass surface
      </Text>
    </GlassView>
  );
}`}
        showLineNumbers
      />

      <h2 id="with-glow" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        With glow
      </h2>
      <CodeBlock
        language="tsx"
        code={`<GlassView
  elevation={3}
  glow={{
    color: '#6366f1',
    radius: 32,
    opacity: 0.3,
  }}
  borderRadius={24}
  style={{ padding: 24 }}
>
  {/* Floating glass modal */}
</GlassView>`}
      />

      <div className="my-5 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/[0.05] flex gap-3">
        <span className="shrink-0 mt-0.5 text-sm text-yellow-400">⚠</span>
        <div className="text-sm text-white/60 leading-relaxed">
          Glow is iOS-only. On Android, the glow prop is silently ignored. Use{' '}
          <code className="px-1 py-0.5 rounded bg-white/[0.06] text-violet-300 font-mono text-xs">Platform.OS === &#39;ios&#39;</code>{' '}
          to conditionally apply glow where needed.
        </div>
      </div>

      <h2 id="priority-and-budget" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Priority & budget
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        The <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">priority</code> prop
        integrates with <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">GlassPlatformProvider</code>&apos;s
        render budget. When the budget is exhausted, lower-priority surfaces fall back
        to solid tint:
      </p>
      <CodeBlock
        language="tsx"
        code={`// This surface will always blur (critical)
<GlassView priority="critical" elevation={4}>
  <Modal />
</GlassView>

// This will drop blur if budget exceeded (background)
<GlassView priority="background" elevation={1}>
  <BackgroundDecoration />
</GlassView>`}
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
                <td className="px-4 py-3 font-mono text-white/30 text-xs">{row.default}</td>
                <td className="px-4 py-3 text-white/50 text-xs">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
