import type { Metadata } from 'next';
import { Navigation } from '@/components/shared/Navigation';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Architecture } from '@/components/landing/Architecture';
import { Ecosystem } from '@/components/landing/Ecosystem';
import { Footer } from '@/components/landing/Footer';
import { LazyLandingSections } from '@/components/landing/LazyLandingSections';
import { absoluteUrl, defaultDescription, defaultTitle, seoKeywords } from '@/lib/seo';

export const metadata: Metadata = {
  title: defaultTitle,
  description: defaultDescription,
  keywords: seoKeywords,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: absoluteUrl('/'),
    images: [absoluteUrl('/opengraph-image')],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: [absoluteUrl('/opengraph-image')],
  },
};

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Features />
        <Architecture />
        <LazyLandingSections />
        <Ecosystem />
      </main>
      <Footer />
    </>
  );
}
