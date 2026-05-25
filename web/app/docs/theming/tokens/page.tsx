import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Design Tokens',
  description: 'Complete reference for all Reactnatively design tokens — spacing, radii, colors, typography, motion, and glass.',
};

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 id={id} className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">{title}</h2>
      {children}
    </div>
  );
}

export default function TokensPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Design Tokens</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        Tokens are the raw values behind every visual decision in the framework.
        Components read from them via the theme context. You can import any token
        group directly from{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono">reactnatively/theme</code>{' '}
        for use in custom styles or logic.
      </p>

      <Section id="spacing" title="Spacing">
        <p className="text-white/60 leading-relaxed mb-4">4px base grid, Tailwind-compatible numeric keys.</p>
        <CodeBlock
          language="typescript"
          code={`import { spacing } from 'reactnatively/theme';

// spacing[4]  → 16
// spacing[6]  → 24
// spacing[8]  → 32
// spacing[12] → 48
// spacing[16] → 64

// Named semantic aliases (via theme context):
// xs: 4    sm: 8    md: 16    lg: 24    xl: 40`}
        />
      </Section>

      <Section id="radii" title="Radii">
        <p className="text-white/60 leading-relaxed mb-4">Border radius scale for consistent rounded corners.</p>
        <CodeBlock
          language="typescript"
          code={`import { radii } from 'reactnatively/theme';

// radii.none   → 0
// radii.xs     → 4
// radii.sm     → 8
// radii.md     → 12
// radii.lg     → 16
// radii.xl     → 20
// radii.xxl    → 28
// radii.full   → 9999`}
        />
      </Section>

      <Section id="typography" title="Typography">
        <p className="text-white/60 leading-relaxed mb-4">Font family, size, weight, line height, and letter spacing scales.</p>
        <CodeBlock
          language="typescript"
          code={`import { fontSize, fontWeight, lineHeight, letterSpacing } from 'reactnatively/theme';

// fontSize.xs  → 11   fontSize.sm → 13   fontSize.md → 15
// fontSize.lg  → 17   fontSize.xl → 20   fontSize.xxl → 24
// fontSize.display → 32

// fontWeight.regular → '400'   fontWeight.medium → '500'
// fontWeight.semibold → '600'  fontWeight.bold → '700'

// lineHeight.tight → 1.2   lineHeight.normal → 1.5   lineHeight.loose → 1.8`}
        />
      </Section>

      <Section id="glass" title="Glass tokens">
        <p className="text-white/60 leading-relaxed mb-4">
          Raw values for the glass rendering engine. In most cases you'll use the{' '}
          <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">elevation</code>{' '}
          prop instead of referencing these directly.
        </p>
        <CodeBlock
          language="typescript"
          code={`import { glassTokens } from 'reactnatively/theme';

// glassTokens.blur        → { none: 0, hairline: 4, subtle: 10, ... extreme: 90 }
// glassTokens.elevation   → { 0: { blur: 0, ... }, 1: { blur: 22, ... }, ... 5: { blur: 82 } }
// glassTokens.highlight   → { none: 'transparent', subtle, medium, strong, intense }
// glassTokens.tint.dark   → { ultraThin, thin, surface, elevated, overlay, frosted, tinted }
// glassTokens.border.dark → { subtle, medium, strong }
// glassTokens.glow        → { primary, blue, cyan, rose, success, warning }`}
        />
      </Section>

      <Section id="motion" title="Motion tokens">
        <p className="text-white/60 leading-relaxed mb-4">Duration, easing, and spring config values.</p>
        <CodeBlock
          language="typescript"
          code={`import { duration, easing, springs } from 'reactnatively/theme';

// duration.fast  → 120ms    duration.normal → 220ms    duration.slow → 380ms
// duration.enter → 280ms    duration.exit   → 180ms

// springs.snappy  → { damping: 28, stiffness: 340 }  fast, precise
// springs.liquid  → { damping: 24, stiffness: 260 }  smooth, organic
// springs.reveal  → { damping: 22, stiffness: 200 }  entrance reveal
// springs.bounce  → { damping: 14, stiffness: 280 }  playful
// springs.precise → { damping: 36, stiffness: 400 }  exact timing`}
        />
      </Section>

      <Section id="z-depth" title="Z-depth">
        <p className="text-white/60 leading-relaxed mb-4">Overlay stacking levels for correct z-order composition.</p>
        <CodeBlock
          language="typescript"
          code={`import { zDepth } from 'reactnatively/theme';

// zDepth.base      → 0
// zDepth.raised    → 10
// zDepth.dropdown  → 100
// zDepth.sticky    → 200
// zDepth.overlay   → 300
// zDepth.modal     → 400
// zDepth.toast     → 500
// zDepth.tooltip   → 600`}
        />
      </Section>

      <Section id="importing" title="Importing tokens directly">
        <p className="text-white/60 leading-relaxed mb-4">
          All tokens are also available as top-level exports from{' '}
          <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">reactnatively</code>{' '}
          for use outside of component render functions:
        </p>
        <CodeBlock
          language="typescript"
          code={`import {
  spacing, radii, typography, shadows,
  glassTokens, materialTokens, stateTokens,
  motion, springs, zDepth, breakpoints,
} from 'reactnatively';

// For StyleSheet.create or static values:
const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,        // 16
    padding: spacing[4],           // 16
  },
});`}
        />
      </Section>
    </div>
  );
}
