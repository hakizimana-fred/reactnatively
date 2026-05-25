import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Capability Detection',
  description: 'How Reactnatively detects platform blur capability and gracefully degrades on Android and web.',
};

export default function CapabilityPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Capability Detection</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        The glass engine detects blur capability at startup and adjusts rendering
        automatically. Components degrade gracefully on platforms that don't support
        native blur — you never need to write platform branches yourself.
      </p>

      <h2 id="levels" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Capability levels
      </h2>
      <div className="space-y-3 mb-6">
        {[
          {
            level: 'full',
            flag: 'IS_FULL_GLASS',
            badge: 'iOS',
            desc: 'Full native blur via expo-blur BlurView. All 8 glass layers render at full fidelity. Glow effects are enabled. This is the target experience.',
            color: 'emerald',
          },
          {
            level: 'partial',
            flag: 'IS_PARTIAL_GLASS',
            badge: 'Android 12+ / Web',
            desc: 'BlurView renders but at 65% intensity to stay within Android RenderEffect constraints. All diffusion and sheen layers render normally. Glow is disabled.',
            color: 'blue',
          },
          {
            level: 'none',
            flag: 'IS_NO_GLASS',
            badge: 'Android < 12',
            desc: 'Blur is disabled entirely. Surfaces fall back to a solid semi-transparent tint with full diffusion and sheen layers still active, maintaining a premium look without blur cost.',
            color: 'amber',
          },
        ].map((cap) => (
          <div key={cap.level} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="flex items-center gap-3 mb-2">
              <code className="text-violet-300 font-mono text-sm font-bold">{cap.level}</code>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border
                ${cap.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                  cap.color === 'blue' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                  'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                {cap.badge}
              </span>
              <code className="text-white/30 font-mono text-xs">{cap.flag} = true</code>
            </div>
            <p className="text-sm text-white/55 leading-relaxed">{cap.desc}</p>
          </div>
        ))}
      </div>

      <h2 id="flags" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Exported capability flags
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Import these constants from{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">reactnatively/glass</code>{' '}
        (or from <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">reactnatively</code>)
        to branch on capability in your own code:
      </p>
      <CodeBlock
        language="typescript"
        code={`import {
  GLASS_CAPABILITY,  // 'full' | 'partial' | 'none'
  SUPPORTS_BLUR,     // true when capability !== 'none'
  IS_FULL_GLASS,     // true on iOS
  IS_PARTIAL_GLASS,  // true on Android 12+ and web
  IS_NO_GLASS,       // true on Android < 12
} from 'reactnatively/glass';

// Use in layout decisions
if (IS_NO_GLASS) {
  // Increase text contrast since there's no blur separation
}`}
      />

      <h2 id="adjust-blur" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        adjustBlurForCapability
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        The engine automatically adjusts blur values using{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">adjustBlurForCapability</code>.
        Use it yourself if you're calling{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">resolveGlass</code>{' '}
        directly:
      </p>
      <CodeBlock
        language="typescript"
        code={`import { adjustBlurForCapability } from 'reactnatively/glass';

// full capability  → returns intensity unchanged
// partial         → returns Math.round(intensity * 0.65)
// none            → returns 0
const adjustedBlur = adjustBlurForCapability(54); // elevation 3 blur`}
      />

      <h2 id="platform-table" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Platform summary
      </h2>
      <div className="overflow-x-auto rounded-xl border border-white/[0.08] mb-6">
        <table className="w-full text-sm">
          <thead className="border-b border-white/[0.08] bg-white/[0.03]">
            <tr>
              {['Platform', 'Capability', 'Blur method', 'Blur intensity'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider text-white/40 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { platform: 'iOS', cap: 'full', method: 'expo-blur (UIVisualEffectView)', intensity: '100%' },
              { platform: 'Android 12+ (API 31+)', cap: 'partial', method: 'expo-blur (dimezisBlurView)', intensity: '65%' },
              { platform: 'Android < 12', cap: 'none', method: 'solid tint fallback', intensity: '0%' },
              { platform: 'Web', cap: 'partial', method: 'CSS backdrop-filter', intensity: '65%' },
            ].map((row) => (
              <tr key={row.platform} className="border-t border-white/[0.04]">
                <td className="px-4 py-3 text-white/60 text-xs">{row.platform}</td>
                <td className="px-4 py-3 font-mono text-violet-300 text-xs">{row.cap}</td>
                <td className="px-4 py-3 text-white/50 text-xs">{row.method}</td>
                <td className="px-4 py-3 font-mono text-white/60 text-xs">{row.intensity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/docs/glass-engine/material-provider"
          className="flex items-center gap-2 px-4 h-9 rounded-xl bg-white/[0.08] border border-white/[0.10] text-white text-sm hover:bg-white/[0.12] transition-all"
        >
          Material Provider
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/docs/glass-engine/elevation"
          className="flex items-center gap-2 px-4 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/70 text-sm hover:bg-white/[0.09] transition-all"
        >
          Elevation system
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
