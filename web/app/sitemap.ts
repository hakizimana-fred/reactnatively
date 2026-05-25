import type { MetadataRoute } from 'next';
import { docsNav } from '@/lib/docs';
import { guides } from '@/lib/guides';
import { siteUrl } from '@/lib/seo';

const staticRoutes = [
  '/',
  '/docs',
  '/docs/search',
  '/docs/getting-started/installation',
  '/docs/getting-started/quick-start',
  '/docs/glass-engine',
  '/docs/glass-engine/glass-view',
  '/playground',
  '/guides',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const docsRoutes = docsNav.flatMap((section) =>
    section.items.flatMap((item) => [
      item.href,
      ...(item.items?.map((child) => child.href) ?? []),
    ]),
  );
  const guideRoutes = guides.map((guide) => `/guides/${guide.slug}`);
  const routes = Array.from(new Set([...staticRoutes, ...docsRoutes, ...guideRoutes]));

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route.startsWith('/docs') ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route.startsWith('/docs/components') ? 0.82 : 0.72,
  }));
}
