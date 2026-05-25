import { ArrowRight, Boxes, Braces, Layers3, Package, Smartphone, Workflow } from 'lucide-react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';

const layers = [
  {
    icon: Package,
    title: 'reactnatively',
    detail: 'Core components, providers, and public subpath exports.',
    code: "import { Button, GlassView } from 'reactnatively';",
  },
  {
    icon: Layers3,
    title: 'reactnatively/glass',
    detail: 'Blur capability detection, elevation recipes, and material policy.',
    code: "import { GlassView } from 'reactnatively/glass';",
  },
  {
    icon: Braces,
    title: 'reactnatively/theme',
    detail: 'Semantic color, spacing, typography, motion, and glass tokens.',
    code: "import { createTheme } from 'reactnatively/theme';",
  },
  {
    icon: Workflow,
    title: 'reactnatively/animations',
    detail: 'Press, entrance, reduced-motion, and spring preset hooks.',
    code: "import { usePressAnimation } from 'reactnatively/animations';",
  },
];

const workflow = [
  'Install the bundle or import subpaths for smaller surfaces.',
  'Wrap the app in ReactnativelyProvider and your app theme.',
  'Compose real RN screens from typed components and StyleSheet.',
  'Let glass capability and reduced-motion policies adapt per device.',
];

export function Architecture() {
  return (
    <section className="relative overflow-hidden py-24 section-bg">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--glass-subtle)] px-3 py-1 text-xs text-[color:var(--text-muted)]">
              <Boxes className="h-3.5 w-3.5 text-blue-400" />
              Framework architecture
            </div>
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-[color:var(--text-primary)] sm:text-5xl">
              A real package system for real React Native apps.
            </h2>
            <p className="max-w-xl text-base leading-8 text-[color:var(--text-muted)] sm:text-lg">
              Reactnatively is organized around the way teams actually build native products:
              primitives, glass rendering, components, tokens, hooks, and motion APIs that can
              be adopted together or one layer at a time.
            </p>

            <div className="mt-8 grid gap-3">
              {workflow.map((item, index) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--glass-panel)] text-xs font-semibold text-[color:var(--text-primary)]">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-6 text-[color:var(--text-secondary)]">{item}</p>
                </div>
              ))}
            </div>

            <Link
              href="/docs/getting-started/quick-start"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300"
            >
              Read the quick start
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div>
            <GlassCard className="p-4 sm:p-5" highlight>
              <div className="grid gap-3">
                {layers.map((layer, index) => {
                  const Icon = layer.icon;

                  return (
                    <div
                      key={layer.title}
                      className="rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--glass-subtle)] p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-mono text-sm font-semibold text-[color:var(--text-primary)]">
                              {layer.title}
                            </h3>
                            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-500">
                              layer {index + 1}
                            </span>
                          </div>
                          <p className="mt-1 text-sm leading-6 text-[color:var(--text-muted)]">
                            {layer.detail}
                          </p>
                          <div className="mt-3 overflow-hidden rounded-lg border border-[color:var(--border-subtle)] bg-[color:var(--code-bg)] px-3 py-2">
                            <code className="text-xs text-slate-100">{layer.code}</code>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--glass-subtle)] p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[color:var(--text-primary)]">
                  <Smartphone className="h-4 w-4 text-violet-400" />
                  Runtime flow
                </div>
                <div className="grid gap-2 text-xs text-[color:var(--text-muted)] sm:grid-cols-4">
                  {['Theme tokens', 'Glass capability', 'Component recipe', 'Native view'].map((step) => (
                    <div key={step} className="rounded-lg bg-[color:var(--surface-elevated)] px-3 py-2 text-center">
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
