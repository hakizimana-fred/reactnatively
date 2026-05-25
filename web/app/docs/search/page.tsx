import type { Metadata } from 'next';
import { DocsSearch } from '@/components/docs/DocsSearch';
import { docsNav } from '@/lib/docs';
import { guides } from '@/lib/guides';

export const metadata: Metadata = {
  title: 'Search Reactnatively Docs',
  description:
    'Search Reactnatively documentation, React Native components, Expo guides, glass UI APIs, motion hooks, and design token articles.',
  alternates: {
    canonical: '/docs/search',
  },
};

export default function DocsSearchPage() {
  const docs = docsNav.flatMap((section) =>
    section.items.flatMap((item) => [
      {
        title: item.title,
        category: section.title,
        href: item.href,
        description: `${item.title} documentation for React Native and Expo apps.`,
      },
      ...(item.items?.map((child) => ({
        title: child.title,
        category: section.title,
        href: child.href,
        description: `${child.title} documentation for React Native and Expo apps.`,
      })) ?? []),
    ]),
  );
  const guideResults = guides.map((guide) => ({
    title: guide.title,
    category: 'Guide',
    href: `/guides/${guide.slug}`,
    description: guide.description,
  }));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">Search documentation</h1>
        <p className="mt-3 text-white/60">
          Find React Native components, Expo integration guides, glass UI APIs, animation hooks,
          design tokens, and implementation examples.
        </p>
      </div>
      <DocsSearch results={[...docs, ...guideResults]} />
    </div>
  );
}
