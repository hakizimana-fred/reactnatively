import { Boxes, Gauge, Layers, Palette, ShieldCheck, SplitSquareHorizontal } from 'lucide-react';

const capabilities = [
  {
    icon: Boxes,
    title: 'Components',
    detail: 'Buttons, inputs, cards, navigation, feedback, overlays, and layout primitives.',
    proof: '80+ documented surfaces',
  },
  {
    icon: Layers,
    title: 'Glass engine',
    detail: 'Elevation recipes, platform capability checks, tint variants, and blur fallback policy.',
    proof: 'Native blur with fallback',
  },
  {
    icon: Palette,
    title: 'Theme tokens',
    detail: 'Semantic colors, spacing, radii, typography, and material recipes shared across packages.',
    proof: 'createTheme + recipes',
  },
  {
    icon: Gauge,
    title: 'Motion',
    detail: 'Press and entrance hooks built around reduced-motion policy and spring presets.',
    proof: 'Reanimated-friendly APIs',
  },
  {
    icon: SplitSquareHorizontal,
    title: 'Subpath exports',
    detail: 'Import the whole framework or target the glass, theme, hooks, animation, and utility layers.',
    proof: 'reactnatively/*',
  },
  {
    icon: ShieldCheck,
    title: 'Operational defaults',
    detail: 'TypeScript-first props, accessibility considerations, and documented rendering constraints.',
    proof: 'Strict TS contracts',
  },
];

const constraints = [
  'Best with Expo SDK 50+ and React Native 0.73+',
  'Glass glow is iOS-only; Android silently falls back',
  'Heavy blur surfaces should be budgeted on low-end devices',
];

export function Features() {
  return (
    <section className="border-b border-[color:var(--border-subtle)] bg-[color:var(--surface-0)] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--text-faint)]">
            What is included
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--text-primary)] sm:text-4xl">
            A component system with clear runtime layers.
          </h2>
          <p className="mt-4 text-base leading-7 text-[color:var(--text-muted)]">
            The framework is split around practical native-app concerns: component
            APIs, glass rendering, theme tokens, animation hooks, and smaller public
            imports when you do not need the full bundle.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[color:var(--border-subtle)]">
          <div className="grid bg-[color:var(--surface-1)] text-xs font-medium uppercase tracking-[0.12em] text-[color:var(--text-faint)] md:grid-cols-[0.8fr_1.4fr_0.8fr]">
            <div className="px-5 py-3">Layer</div>
            <div className="hidden px-5 py-3 md:block">What it handles</div>
            <div className="hidden px-5 py-3 md:block">Evidence</div>
          </div>
          {capabilities.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="grid border-t border-[color:var(--border-subtle)] bg-[color:var(--glass-subtle)] px-5 py-5 md:grid-cols-[0.8fr_1.4fr_0.8fr] md:items-center"
              >
                <div className="mb-2 flex items-center gap-3 md:mb-0">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[color:var(--border-subtle)] bg-[color:var(--surface-elevated)]">
                    <Icon className="h-4 w-4 text-blue-400" />
                  </div>
                  <h3 className="font-medium text-[color:var(--text-primary)]">{item.title}</h3>
                </div>
                <p className="text-sm leading-6 text-[color:var(--text-muted)]">{item.detail}</p>
                <div className="mt-3 font-mono text-xs text-[color:var(--text-secondary)] md:mt-0">
                  {item.proof}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 grid gap-3 rounded-2xl border border-yellow-500/20 bg-yellow-500/[0.04] p-5 text-sm text-[color:var(--text-muted)] md:grid-cols-3">
          {constraints.map((item) => (
            <div key={item} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
