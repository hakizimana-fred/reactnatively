'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';

const principles = [
  {
    number: '01',
    title: 'Glass is a material, not a style.',
    body: 'Liquid Glass isn\'t about frosted decorations. It\'s a rendering philosophy — surfaces that reveal depth, respond to light, and adapt to their context. Every blur is intentional. Every layer is load-bearing.',
    accent: '#3b82f6',
  },
  {
    number: '02',
    title: 'Motion is the fifth dimension.',
    body: 'Flat design removed depth. Motion returns it. When elements enter with spring physics and dismiss with graceful arcs, users understand the space they inhabit. Reactnatively treats motion as first-class architecture.',
    accent: '#8b5cf6',
  },
  {
    number: '03',
    title: 'Emotional design is a performance feature.',
    body: 'Apps that feel premium get used more. Smoother interactions build trust. Cinematic transitions reduce cognitive load. The glass aesthetic isn\'t vanity — it\'s UX strategy at the rendering level.',
    accent: '#06b6d4',
  },
  {
    number: '04',
    title: 'Adaptability over fidelity.',
    body: 'A beautiful design that destroys battery life or janks on mid-range devices is a bad design. Reactnatively degrades gracefully. Blur surfaces know their budget. Animations respect reduced motion. Glass bends, never breaks.',
    accent: '#10b981',
  },
];

export function Philosophy() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#060610] via-[#0c0c22] to-[#060610] pointer-events-none" />

      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div
          className="text-[20vw] font-black text-white/[0.015] select-none leading-none tracking-tight"
          style={{ transform: 'rotate(-5deg)' }}
        >
          GLASS
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="max-w-xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs text-white/50 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            Philosophy
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Built on principles,{' '}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              not trends.
            </span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            The Liquid Glass philosophy is a set of deeply held beliefs about how
            native apps should feel. Not how they should look.
          </p>
        </motion.div>

        {/* Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principles.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <GlassCard className="p-7 h-full group" hover>
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(ellipse 60% 60% at 0% 0%, ${p.accent}08, transparent)`,
                  }}
                />
                <div className="relative z-10">
                  <div
                    className="text-xs font-mono mb-4 font-bold"
                    style={{ color: p.accent }}
                  >
                    {p.number}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed text-sm">{p.body}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <GlassCard variant="subtle" className="max-w-3xl mx-auto py-10 px-8">
            <p className="text-2xl font-medium text-white/80 leading-relaxed italic">
              "The best interface is the one that gets out of the way — but glass
              is the exception. Glass doesn't get out of the way. It becomes the
              experience."
            </p>
            <div className="mt-4 text-sm text-white/30">— Liquid Glass design principle</div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
