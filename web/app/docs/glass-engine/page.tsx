import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Glass Engine',
  description: 'How the Reactnatively Liquid Glass rendering system works.',
};

export default function GlassEnginePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Glass Engine</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        The Liquid Glass engine is the rendering heart of Reactnatively. It manages
        blur surfaces, elevation depth, tint overlays, and edge highlights — adapting
        automatically to platform capability and device power state.
      </p>

      <h2 id="architecture" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Architecture
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Every glass surface is composed of eight rendering layers, stacked bottom-to-top:
      </p>
      <div className="space-y-2 mb-6">
        {[
          { n: '1', label: 'Ambient shadow shell', desc: 'Soft separation shadow and optional glow (no overflow:hidden, so it renders correctly on Android)' },
          { n: '2', label: 'Clip shell', desc: 'Clips all optical layers to the border radius' },
          { n: '3', label: 'BlurView', desc: 'Native platform blur via expo-blur (skipped when blur is unavailable)' },
          { n: '4', label: 'Tint body', desc: 'Very low-opacity color overlay — keeps the surface barely tinted' },
          { n: '5', label: 'Internal diffusion', desc: 'Three overlapping haze views: a full-frame haze, an upper warm-white zone, and a lower atmospheric-blue zone — these create optical depth' },
          { n: '6', label: 'Directional sheen', desc: 'Three specular layers: a tight specular peak, a broader falloff, and hairline edge lines along the top and sides — simulating curved-glass light response' },
          { n: '7', label: 'Soft border ring', desc: 'An outer border and an inner hairline border — near-invisible optical edge' },
          { n: '8', label: 'Content', desc: 'Children rendered above all material layers' },
        ].map((layer) => (
          <div key={layer.n} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="w-6 h-6 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center shrink-0 text-xs font-bold text-violet-400">
              {layer.n}
            </div>
            <div>
              <span className="text-sm font-medium text-white/80">{layer.label}</span>
              <span className="text-sm text-white/40 ml-2">— {layer.desc}</span>
            </div>
          </div>
        ))}
      </div>

      <h2 id="elevation-system" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Elevation system
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        The elevation system maps a single integer (0–5) to a complete glass rendering
        recipe — blur intensity, tint opacity, shadow, and more:
      </p>
      <div className="overflow-x-auto rounded-xl border border-white/[0.08] mb-6">
        <table className="w-full text-sm">
          <thead className="border-b border-white/[0.08] bg-white/[0.03]">
            <tr>
              {['Elevation', 'Blur', 'Tint Opacity', 'Shadow', 'Use case'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider text-white/40 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { e: '0', blur: '0', tint: '0.20', shadow: 'none', use: 'Flat / opaque background' },
              { e: '1', blur: '22', tint: '0.32', shadow: 'subtle (r 38)', use: 'Subtle surface card' },
              { e: '2', blur: '38', tint: '0.38', shadow: 'light (r 54)', use: 'Standard card (default)' },
              { e: '3', blur: '54', tint: '0.44', shadow: 'medium (r 70)', use: 'Floating panel' },
              { e: '4', blur: '68', tint: '0.50', shadow: 'heavy (r 86)', use: 'Modal / sheet' },
              { e: '5', blur: '82', tint: '0.54', shadow: 'deep (r 108)', use: 'Top-level overlay' },
            ].map((row) => (
              <tr key={row.e} className="border-t border-white/[0.04]">
                <td className="px-4 py-3 font-mono text-violet-300">{row.e}</td>
                <td className="px-4 py-3 font-mono text-white/60">{row.blur}</td>
                <td className="px-4 py-3 font-mono text-white/60">{row.tint}</td>
                <td className="px-4 py-3 text-white/50">{row.shadow}</td>
                <td className="px-4 py-3 text-white/40 text-xs">{row.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="capability-detection" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Capability detection
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        The engine auto-detects platform capability and adjusts rendering accordingly:
      </p>
      <CodeBlock
        language="typescript"
        code={`import {
  GLASS_CAPABILITY,
  SUPPORTS_BLUR,
  IS_FULL_GLASS,
  IS_PARTIAL_GLASS,
  IS_NO_GLASS,
} from 'reactnatively/glass';

// Capability values
// FULL_GLASS  — iOS with expo-blur (best)
// PARTIAL_GLASS — Android with BlurView (good)
// NO_GLASS   — fallback: solid tint only

console.log(GLASS_CAPABILITY); // 'FULL_GLASS' | 'PARTIAL_GLASS' | 'NO_GLASS'
console.log(SUPPORTS_BLUR);    // true | false`}
      />

      <h2 id="render-budget" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Render budget
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Use <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">GlassPlatformProvider</code>{' '}
        to set a global blur surface limit:
      </p>
      <CodeBlock
        language="tsx"
        code={`import { GlassPlatformProvider } from 'reactnatively/glass';

export function App() {
  return (
    <GlassPlatformProvider
      material={{
        quality: 'balanced',
        powerMode: 'auto',
      }}
      budget={{
        maxBlurSurfaces: 8,
      }}
    >
      <YourApp />
    </GlassPlatformProvider>
  );
}`}
      />

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/docs/glass-engine/glass-view"
          className="flex items-center gap-2 px-4 h-9 rounded-xl bg-white/[0.08] border border-white/[0.10] text-white text-sm hover:bg-white/[0.12] transition-all"
        >
          GlassView API
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/docs/glass-engine/elevation"
          className="flex items-center gap-2 px-4 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/70 text-sm hover:bg-white/[0.09] transition-all"
        >
          Elevation deep dive
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
