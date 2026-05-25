'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';

const stats = [
  { value: '< 2ms', label: 'Glass resolve time', desc: 'per surface render' },
  { value: '80+', label: 'Components', desc: 'glass-native from the ground up' },
  { value: '5', label: 'Elevation levels', desc: 'with automatic rendering recipes' },
  { value: '0', label: 'Runtime CSS', desc: 'pure StyleSheet-based rendering' },
];

const optimizations = [
  {
    title: 'GPU-aware blur budgeting',
    desc: 'GlassPlatformProvider tracks active blur surfaces and automatically degrades lower-priority ones when the budget is exceeded.',
  },
  {
    title: 'Capability-first rendering',
    desc: 'Platform capability is detected once at startup. No runtime checks in the render path. Glass degrades before it ever janks.',
  },
  {
    title: 'Reanimated-backed motion',
    desc: 'All press and entrance animations run on the UI thread via react-native-reanimated. Zero JS-thread bottlenecks.',
  },
  {
    title: 'Tree-shakeable packages',
    desc: 'Each package is independently installable. Ship only the glass features your app actually uses.',
  },
];

export function Performance() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative overflow-hidden py-24 section-bg">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs text-white/50 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Performance
          </div>
          <h2 className="text-4xl sm:text-5xl font-semibold text-[color:var(--text-primary)] mb-4 tracking-tight">
            Premium visuals need a rendering budget.{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              This one has one.
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-[color:var(--text-muted)] text-lg">
            Glass surfaces resolve through capability checks, elevation recipes,
            and reduced-motion policy so the UI can stay expressive without
            surprising lower-end devices.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard className="p-6 text-center">
                <div className="text-3xl font-bold text-[color:var(--text-primary)] mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-[color:var(--text-secondary)] mb-0.5">{stat.label}</div>
                <div className="text-xs text-[color:var(--text-faint)]">{stat.desc}</div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Optimizations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {optimizations.map((opt, i) => (
            <motion.div
              key={opt.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
            >
              <GlassCard variant="subtle" className="p-6 h-full">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[color:var(--text-primary)] mb-1.5">{opt.title}</h3>
                    <p className="text-sm text-[color:var(--text-muted)] leading-relaxed">{opt.desc}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
