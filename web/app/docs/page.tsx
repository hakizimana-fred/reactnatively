import Link from 'next/link';
import { ArrowRight, Layers, Zap, Palette, Box } from 'lucide-react';
import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Reactnatively Documentation - React Native UI Components, Glass UI, Theming, and Motion',
  description:
    'Developer documentation for Reactnatively, a React Native UI framework for Expo with liquid glass components, blur surfaces, motion hooks, theming, design tokens, and typed component APIs.',
  alternates: {
    canonical: '/docs',
  },
  openGraph: {
    title: 'Reactnatively Documentation',
    description:
      'React Native UI framework docs for Expo, glass components, blur surfaces, animation hooks, and design tokens.',
    url: absoluteUrl('/docs'),
    images: [absoluteUrl('/opengraph-image')],
  },
};

const quickLinks = [
  {
    icon: Zap,
    title: 'Installation',
    description: 'Add Reactnatively to your Expo or React Native project.',
    href: '/docs/getting-started/installation',
    accent: '#3b82f6',
  },
  {
    icon: Layers,
    title: 'Glass Engine',
    description: 'Learn how the Liquid Glass rendering system works.',
    href: '/docs/glass-engine',
    accent: '#8b5cf6',
  },
  {
    icon: Palette,
    title: 'Theming',
    description: 'Customize tokens, colors, and material recipes.',
    href: '/docs/theming/overview',
    accent: '#06b6d4',
  },
  {
    icon: Box,
    title: 'Components',
    description: 'Explore all 80+ glass-native components.',
    href: '/docs/components/layout',
    accent: '#10b981',
  },
];

export default function DocsPage() {
  return (
    <div>
      {/* Hero */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs text-white/50 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
          v4.0.0
        </div>
        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
          Introduction
        </h1>
        <p className="text-lg text-white/60 leading-relaxed max-w-2xl">
          Reactnatively is a premium React Native UI framework built around the{' '}
          <strong className="text-white/80">Liquid Glass</strong> design philosophy.
          It brings adaptive blur surfaces, cinematic motion, and immersive visual
          depth to every component.
        </p>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="group relative rounded-xl p-5 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] hover:border-white/[0.13] transition-all duration-200"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: `${link.accent}18`, border: `1px solid ${link.accent}28` }}
              >
                <Icon className="w-4 h-4" style={{ color: link.accent }} />
              </div>
              <h3 className="font-semibold text-white mb-1">{link.title}</h3>
              <p className="text-sm text-white/50">{link.description}</p>
              <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all" />
            </Link>
          );
        })}
      </div>

      {/* What is it */}
      <h2 id="what-is-reactnatively" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        What is Reactnatively?
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Reactnatively is a monorepo of modular packages that together form a complete
        UI design system for React Native. Unlike traditional component libraries,
        Reactnatively is built around a rendering philosophy rather than a visual style.
        Every component understands glass. Every animation is physically grounded.
      </p>
      <p className="text-white/60 leading-relaxed mb-4">
        The framework ships with a complete glass rendering engine, design token
        system, 80+ components, motion system, and accessibility primitives through
        one primary package: <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">reactnatively</code>.
        Focused secondary APIs such as <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">reactnatively/glass</code>
        are available when you want narrower imports.
      </p>

      <h2 id="packages" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Packages
      </h2>
      <div className="overflow-x-auto rounded-xl border border-white/[0.08] mb-6">
        <table className="w-full text-sm">
          <thead className="border-b border-white/[0.08] bg-white/[0.03]">
            <tr>
              {['Package', 'Description', 'Status'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider text-white/40 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'reactnatively', desc: 'Full framework bundle', status: 'stable' },
              { name: 'reactnatively/glass', desc: 'Liquid Glass rendering engine', status: 'stable' },
              { name: 'reactnatively/theme', desc: 'Token system + theme engine', status: 'stable' },
              { name: 'reactnatively/animations', desc: 'Spring presets + motion hooks', status: 'stable' },
              { name: 'reactnatively/hooks', desc: 'Utility hooks', status: 'stable' },
              { name: 'reactnatively/primitives', desc: 'Accessibility primitives', status: 'stable' },
              { name: 'reactnatively/utils', desc: 'Shared utilities', status: 'stable' },
            ].map((row) => (
              <tr key={row.name} className="border-t border-white/[0.04]">
                <td className="px-4 py-3 font-mono text-violet-300 text-xs">{row.name}</td>
                <td className="px-4 py-3 text-white/60">{row.desc}</td>
                <td className="px-4 py-3">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="requirements" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Requirements
      </h2>
      <ul className="space-y-2 mb-6">
        {[
          'React Native 0.73 or later (0.79+ recommended)',
          'Expo SDK 50 or later (SDK 53 recommended)',
          'React 18 or later',
          'react-native-reanimated 3.6+',
          'TypeScript 5.0+ (optional but strongly recommended)',
        ].map((item) => (
          <li key={item} className="text-white/60 flex items-start gap-2 text-sm">
            <span className="mt-2 w-1 h-1 rounded-full bg-white/30 shrink-0 block" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-blue-500/[0.08] to-violet-500/[0.08] border border-white/[0.08]">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h3 className="font-semibold text-white mb-1">Ready to get started?</h3>
            <p className="text-sm text-white/50">Install Reactnatively in under 2 minutes.</p>
          </div>
          <Link
            href="/docs/getting-started/installation"
            className="flex items-center gap-2 px-5 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Installation guide
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
