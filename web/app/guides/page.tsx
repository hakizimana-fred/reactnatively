import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { guides } from '@/lib/guides';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'React Native UI Guides - Glassmorphism, Blur, Motion, Design Tokens, and Expo',
  description:
    'Technical guides for building React Native UI systems with Expo, glassmorphism, GPU-aware blur, motion hooks, theming, and design tokens.',
  alternates: {
    canonical: '/guides',
  },
  openGraph: {
    title: 'Reactnatively Guides',
    description: 'React Native UI framework guides for glass UI, blur, design tokens, motion, and Expo integration.',
    url: absoluteUrl('/guides'),
    images: [absoluteUrl('/opengraph-image')],
  },
};

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-[color:var(--surface-0)] px-4 py-24 text-[color:var(--text-primary)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 max-w-3xl">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--text-faint)]">
            React Native UI guides
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Technical articles for building better React Native interfaces.
          </h1>
          <p className="mt-5 text-lg leading-8 text-[color:var(--text-muted)]">
            Learn how to build liquid glass UI, Expo blur surfaces, animation systems,
            design tokens, and performance-conscious mobile interfaces with Reactnatively.
          </p>
        </div>

        <div className="grid gap-4">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--glass-subtle)] p-6 transition-colors hover:bg-[color:var(--glass-panel)]"
            >
              <h2 className="text-xl font-semibold">{guide.title}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[color:var(--text-muted)]">
                {guide.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {guide.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-[color:var(--border-subtle)] px-2.5 py-1 text-xs text-[color:var(--text-secondary)]"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#1f8bca]">
                Read guide
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
