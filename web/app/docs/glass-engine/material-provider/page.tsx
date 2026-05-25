import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Material Provider',
  description: 'Control global glass quality, power mode, and blur surface budget with GlassPlatformProvider.',
};

export default function MaterialProviderPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Material Provider</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono">GlassPlatformProvider</code>{' '}
        is the global policy controller for the glass rendering engine. It governs quality
        level, power mode, and how many blur surfaces can be active simultaneously before
        the engine degrades or disables blur.
      </p>

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock
        language="typescript"
        code={`import { GlassPlatformProvider } from 'reactnatively/glass';
// or
import { GlassPlatformProvider } from 'reactnatively';`}
      />

      <h2 id="basic-usage" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Basic usage
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Place it at the root of your app, inside{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">ReactnativelyProvider</code>{' '}
        already wraps this automatically. Only use it standalone when you need a separate
        glass budget for a nested section of your UI.
      </p>
      <CodeBlock
        filename="app/_layout.tsx"
        language="tsx"
        showLineNumbers
        code={`import { GlassPlatformProvider } from 'reactnatively/glass';

export default function RootLayout() {
  return (
    <GlassPlatformProvider
      material={{
        quality: 'balanced',   // 'full' | 'balanced' | 'efficient' | 'off'
        powerMode: 'normal',   // 'normal' | 'save'
      }}
      budget={{
        maxBlurSurfaces: 8,
        degradeStrategy: 'reduce-all-blur', // or 'disable-low-priority-blur'
      }}
    >
      <App />
    </GlassPlatformProvider>
  );
}`}
      />

      <h2 id="material-props" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Material policy props
      </h2>
      <div className="overflow-x-auto rounded-xl border border-white/[0.08] mb-6">
        <table className="w-full text-sm">
          <thead className="border-b border-white/[0.08] bg-white/[0.03]">
            <tr>
              {['Prop', 'Type', 'Default', 'Description'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider text-white/40 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'quality', type: "'full' | 'balanced' | 'efficient' | 'off'", def: '"balanced"', desc: 'Global blur quality scalar. full=100%, balanced=82%, efficient=55%, off=0%.' },
              { name: 'powerMode', type: "'normal' | 'save'", def: '"normal"', desc: 'Save mode reduces all blur by 32% to cut GPU cost.' },
              { name: 'tintDensity', type: 'number', def: '1', desc: 'Multiplier for tint opacity across all glass surfaces (0–2).' },
              { name: 'reduceTransparency', type: 'boolean', def: 'false', desc: 'When true, disables all blur and uses solid surfaces (mirrors system accessibility setting).' },
              { name: 'nestedGlassIntensity', type: 'number', def: '0.72', desc: 'Blur intensity multiplier for glass surfaces nested inside other glass surfaces.' },
            ].map((row) => (
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

      <h2 id="budget-props" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Budget policy props
      </h2>
      <div className="overflow-x-auto rounded-xl border border-white/[0.08] mb-6">
        <table className="w-full text-sm">
          <thead className="border-b border-white/[0.08] bg-white/[0.03]">
            <tr>
              {['Prop', 'Type', 'Default', 'Description'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider text-white/40 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'maxBlurSurfaces', type: 'number', def: '8', desc: 'Maximum simultaneous blur surfaces before the degrade strategy kicks in. critical/high priority surfaces are always allowed.' },
              { name: 'degradeStrategy', type: "'disable-low-priority-blur' | 'reduce-all-blur'", def: '"reduce-all-blur"', desc: 'How to respond when the budget is exceeded. disable-low-priority-blur removes blur from low/normal priority surfaces. reduce-all-blur scales down intensity proportionally.' },
            ].map((row) => (
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

      <h2 id="hooks" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Hooks
      </h2>
      <CodeBlock
        language="typescript"
        code={`import { useGlassPlatform, useBlurSurfaceBudget } from 'reactnatively/glass';

// Read the full platform context
const { material, budget, activeBlurSurfaces, adjustBlur, canUseBlur } = useGlassPlatform();

// Automatically register + deregister a blur surface; returns whether blur is allowed
const withinBudget = useBlurSurfaceBudget('normal'); // priority: 'low' | 'normal' | 'high' | 'critical'`}
      />

      <h2 id="priority" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Surface priority
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Pass a <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">priority</code> prop
        to any{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">GlassView</code>{' '}
        to control how the budget system treats it:
      </p>
      <CodeBlock
        language="tsx"
        code={`// This surface's blur is always preserved, even over budget
<GlassView elevation={4} priority="critical" style={{ padding: 24 }}>
  <Text>Modal — always blurred</Text>
</GlassView>

// Background card — first to lose blur when over budget
<GlassView elevation={2} priority="low" style={{ padding: 16 }}>
  <Text>Background card</Text>
</GlassView>`}
      />

      <h2 id="performance-guide" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Performance guide
      </h2>
      <div className="space-y-3 mb-6">
        {[
          { tip: 'Keep maxBlurSurfaces ≤ 8 for 60 fps on mid-range devices.', level: 'recommended' },
          { tip: 'Use quality="efficient" on Android to reduce blur intensity by 45%.', level: 'android' },
          { tip: 'Set powerMode="save" when detecting low battery or thermal throttling.', level: 'adaptive' },
          { tip: 'Use priority="low" on decorative background surfaces so they degrade first.', level: 'recommended' },
          { tip: 'elevation={0} is free — it renders no blur and no shadow.', level: 'tip' },
        ].map((item) => (
          <div key={item.tip} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <span className="mt-0.5 text-xs px-1.5 py-0.5 rounded-full bg-violet-500/15 text-violet-400 border border-violet-500/20 font-medium whitespace-nowrap">{item.level}</span>
            <p className="text-sm text-white/55">{item.tip}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/docs/glass-engine/glass-view"
          className="flex items-center gap-2 px-4 h-9 rounded-xl bg-white/[0.08] border border-white/[0.10] text-white text-sm hover:bg-white/[0.12] transition-all"
        >
          GlassView API
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/docs/glass-engine/capability"
          className="flex items-center gap-2 px-4 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/70 text-sm hover:bg-white/[0.09] transition-all"
        >
          Capability detection
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
