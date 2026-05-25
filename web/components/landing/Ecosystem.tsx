import Link from 'next/link';
import { ArrowRight, Box, Layers, Palette, Zap, Package2, Wrench, GitBranch } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

const packages = [
  {
    name: 'reactnatively',
    description: 'Core bundle with components, providers, and public subpath exports.',
    icon: Package2,
    accent: '#6366f1',
    status: 'stable',
    size: '~45kb',
    href: '/docs/getting-started/installation',
  },
  {
    name: 'reactnatively/glass',
    description: 'Blur, vibrancy, capability detection, and elevation depth.',
    icon: Layers,
    accent: '#3b82f6',
    status: 'stable',
    size: '~12kb',
    href: '/docs/packages/glass',
  },
  {
    name: 'reactnatively/primitives',
    description: 'Surface, portal, slot, glass pressable, and accessibility primitives.',
    icon: Box,
    accent: '#8b5cf6',
    status: 'stable',
    size: '~28kb',
    href: '/docs/packages/core',
  },
  {
    name: 'reactnatively/theme',
    description: 'Semantic tokens, themes, recipes, density, and color schemes.',
    icon: Palette,
    accent: '#06b6d4',
    status: 'stable',
    size: '~8kb',
    href: '/docs/packages/theme',
  },
  {
    name: 'reactnatively/animations',
    description: 'Spring presets, press animation, entrance animation, reduced motion.',
    icon: Zap,
    accent: '#f59e0b',
    status: 'stable',
    size: '~10kb',
    href: '/docs/packages/animations',
  },
  {
    name: 'reactnatively/hooks',
    description: 'Disclosure, controllable state, scroll, keyboard, dimensions, haptics.',
    icon: Wrench,
    accent: '#10b981',
    status: 'stable',
    size: '~5kb',
    href: '/docs/packages/hooks',
  },
  {
    name: 'reactnatively/utils',
    description: 'Merge helpers, platform guards, variants, and shared TypeScript helpers.',
    icon: GitBranch,
    accent: '#ec4899',
    status: 'stable',
    size: '~4kb',
    href: '/docs/packages/primitives',
  },
];

const roadmap = [
  { item: 'CLI scaffolder', status: 'planned' },
  { item: 'Figma kit', status: 'planned' },
  { item: 'Storybook integration', status: 'planned' },
  { item: 'Chart components', status: 'in progress' },
  { item: 'AI component generation', status: 'planned' },
];

export function Ecosystem() {
  return (
    <section className="relative overflow-hidden py-24 section-bg">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs text-white/50 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Ecosystem
          </div>
          <h2 className="text-4xl sm:text-5xl font-semibold text-[color:var(--text-primary)] mb-4 tracking-tight">
            The ecosystem is small pieces,{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              cleanly exported.
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-[color:var(--text-muted)] text-lg">
            Use the single `reactnatively` package in product code, or import public
            subpaths when you want framework layers without the entire component set.
          </p>
        </div>

        {/* Packages grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
          {packages.map((pkg) => {
            const Icon = pkg.icon;
            return (
              <div key={pkg.name}>
                <Link href={pkg.href}>
                  <GlassCard variant="subtle" hover className="p-5 h-full group">
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(ellipse 60% 50% at 10% 10%, ${pkg.accent}08, transparent)`,
                      }}
                    />
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{
                            background: `${pkg.accent}18`,
                            border: `1px solid ${pkg.accent}28`,
                          }}
                        >
                          <Icon className="w-4 h-4" style={{ color: pkg.accent }} />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span
                            className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                            style={{
                              color: pkg.status === 'stable' ? '#10b981' : '#f59e0b',
                              background: pkg.status === 'stable' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                              border: `1px solid ${pkg.status === 'stable' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}`,
                            }}
                          >
                            {pkg.status}
                          </span>
                        </div>
                      </div>
                      <div className="font-mono text-xs text-[color:var(--text-secondary)] mb-1">{pkg.name}</div>
                      <div className="text-xs text-[color:var(--text-muted)] leading-relaxed mb-2">{pkg.description}</div>
                      <div className="text-[10px] text-[color:var(--text-faint)] font-mono">{pkg.size} gzipped</div>
                    </div>
                  </GlassCard>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Roadmap */}
        <div>
          <GlassCard className="p-8">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
              <div>
                <h3 className="text-xl font-semibold text-[color:var(--text-primary)] mb-1">Roadmap</h3>
                <p className="text-sm text-[color:var(--text-muted)]">Planned ecosystem work</p>
              </div>
              <Link
                href="https://github.com/hakizimana-fred/reactnatively"
                target="_blank"
                className="flex items-center gap-1 text-sm text-white/40 hover:text-white/70 transition-colors"
              >
                View all
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {roadmap.map((item) => (
                <div
                  key={item.item}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                >
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      background: item.status === 'in progress' ? '#f59e0b' : '#ffffff30',
                      boxShadow: item.status === 'in progress' ? '0 0 8px rgba(245,158,11,0.4)' : 'none',
                    }}
                  />
                  <span className="text-xs text-white/50">{item.item}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
