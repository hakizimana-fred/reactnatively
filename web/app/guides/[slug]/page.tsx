import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getGuide, guides } from '@/lib/guides';
import { absoluteUrl, jsonLd, siteName } from '@/lib/seo';

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  const canonical = `/guides/${guide.slug}`;

  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: absoluteUrl(canonical),
      type: 'article',
      images: [absoluteUrl('/opengraph-image')],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
      images: [absoluteUrl('/opengraph-image')],
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const canonical = `/guides/${guide.slug}`;
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: guide.title,
    description: guide.description,
    url: absoluteUrl(canonical),
    keywords: guide.keywords.join(', '),
    mainEntityOfPage: absoluteUrl(canonical),
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: absoluteUrl('/'),
    },
  };

  return (
    <main className="min-h-screen bg-[color:var(--surface-0)] px-4 py-24 text-[color:var(--text-primary)] sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleJsonLd)} />
      <article className="mx-auto max-w-3xl">
        <Link
          href="/guides"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Guides
        </Link>
        <div className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--text-faint)]">
          React Native guide
        </div>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{guide.title}</h1>
        <p className="mt-5 text-lg leading-8 text-[color:var(--text-muted)]">{guide.description}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {guide.keywords.map((keyword) => (
            <span
              key={keyword}
              className="rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--glass-subtle)] px-2.5 py-1 text-xs text-[color:var(--text-secondary)]"
            >
              {keyword}
            </span>
          ))}
        </div>

        <div className="mt-12 space-y-10">
          {guide.sections.map((section) => (
            <section key={section.id} aria-labelledby={section.id}>
              <h2 id={section.id} className="border-t border-[color:var(--border-subtle)] pt-6 text-2xl font-semibold">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-8 text-[color:var(--text-muted)]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
