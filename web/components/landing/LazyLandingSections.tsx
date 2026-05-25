'use client';

import dynamic from 'next/dynamic';

const ComponentShowcase = dynamic(
  () => import('./ComponentShowcase').then((mod) => mod.ComponentShowcase),
  { loading: SectionFallback },
);

const CodeSection = dynamic(
  () => import('./CodeSection').then((mod) => mod.CodeSection),
  { loading: SectionFallback },
);

const Performance = dynamic(
  () => import('./Performance').then((mod) => mod.Performance),
  { loading: SectionFallback },
);

export function LazyLandingSections() {
  return (
    <>
      <ComponentShowcase />
      <CodeSection />
      <Performance />
    </>
  );
}

function SectionFallback() {
  return (
    <section className="relative overflow-hidden py-24 section-bg">
      <div className="mx-auto h-80 max-w-7xl animate-pulse rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--glass-subtle)] px-4 sm:px-6 lg:px-8" />
    </section>
  );
}
