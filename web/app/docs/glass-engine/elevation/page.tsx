import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Elevation System',
  description: 'How the Reactnatively elevation system maps depth levels to blur, tint, sheen, and shadow values.',
};

export default function ElevationPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Elevation System</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        Elevation is a single integer (0–5) that encodes depth. Each level maps to a
        full glass rendering recipe: blur intensity, tint opacity, diffusion weight, sheen
        strength, and ambient shadow. Higher elevation = more blur, more separation, more
        visual presence.
      </p>

      <h2 id="token-table" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Elevation token table
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        These are the exact values from <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">glassTokens.elevation</code>:
      </p>
      <div className="overflow-x-auto rounded-xl border border-white/[0.08] mb-6">
        <table className="w-full text-sm">
          <thead className="border-b border-white/[0.08] bg-white/[0.03]">
            <tr>
              {['Level', 'Blur', 'Tint opacity', 'Sheen opacity', 'Shadow radius', 'Use case'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider text-white/40 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { e: 0, blur: 0,  tint: '0.20', sheen: '0.016', shadow: '0',   use: 'Flat / no glass' },
              { e: 1, blur: 22, tint: '0.32', sheen: '0.058', shadow: '38',  use: 'Subtle card, inline surface' },
              { e: 2, blur: 38, tint: '0.38', sheen: '0.078', shadow: '54',  use: 'Standard card (default)' },
              { e: 3, blur: 54, tint: '0.44', sheen: '0.095', shadow: '70',  use: 'Floating panel, header' },
              { e: 4, blur: 68, tint: '0.50', sheen: '0.112', shadow: '86',  use: 'Modal, bottom sheet' },
              { e: 5, blur: 82, tint: '0.54', sheen: '0.132', shadow: '108', use: 'Top-level overlay, dialog' },
            ].map((row) => (
              <tr key={row.e} className="border-t border-white/[0.04]">
                <td className="px-4 py-3 font-mono text-violet-300 font-bold">{row.e}</td>
                <td className="px-4 py-3 font-mono text-white/60">{row.blur}</td>
                <td className="px-4 py-3 font-mono text-white/60">{row.tint}</td>
                <td className="px-4 py-3 font-mono text-white/60">{row.sheen}</td>
                <td className="px-4 py-3 font-mono text-white/60">{row.shadow}</td>
                <td className="px-4 py-3 text-white/40 text-xs">{row.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="blur-is-depth" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Blur drives perceived depth
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        In liquid glass design, blur is the primary depth signal — not shadow intensity or
        opacity. A more blurred surface appears physically higher above the content it floats
        over. Shadow is secondary: it provides soft ambient separation without making surfaces
        look like cards stuck to the screen.
      </p>
      <p className="text-white/60 leading-relaxed mb-4">
        Tint opacity stays very low ({'< 0.55'}) across all levels. The apparent visual body
        of the surface comes from the diffusion layers — internal haze views — not from the
        tint. This keeps the glass optically transparent while still feeling solid.
      </p>

      <h2 id="usage" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Using elevation
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Pass <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">elevation</code> to{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">GlassView</code> or any
        glass-aware component that accepts glass props:
      </p>
      <CodeBlock
        language="tsx"
        showLineNumbers
        code={`import { GlassView, BlurSurface, FrostPanel } from 'reactnatively';

// Inline content card
<GlassView elevation={2} borderRadius={16} style={{ padding: 20 }}>
  <Text>Standard card</Text>
</GlassView>

// Floating modal container
<GlassView elevation={4} borderRadius={24} style={{ padding: 24 }}>
  <Text>Modal content</Text>
</GlassView>

// Full-width header panel
<FrostPanel elevation={3} edges={['bottom']} style={{ paddingTop: 56 }}>
  <Text>Header</Text>
</FrostPanel>`}
      />

      <h2 id="material-tokens" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Material presets
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Instead of setting <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">elevation</code> directly,
        you can pass a{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">material</code>{' '}
        preset, which bundles an elevation + variant into a semantic recipe:
      </p>
      <CodeBlock
        language="tsx"
        code={`// Material preset overrides the elevation prop
<GlassView material="modal" style={{ padding: 24 }}>
  <Text>Modal surface</Text>
</GlassView>`}
      />

      <h2 id="overrides" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Manual overrides
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Override specific parameters of the elevation recipe without abandoning the elevation
        system entirely:
      </p>
      <CodeBlock
        language="tsx"
        code={`// Use elevation 2 base, but increase blur for extra depth
<GlassView
  elevation={2}
  blurOverride={60}
  tintOverride="rgba(120, 160, 255, 0.06)"
  style={{ padding: 20 }}
>
  <Text>Custom-tinted surface</Text>
</GlassView>`}
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
