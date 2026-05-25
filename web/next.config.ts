import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: '/docs/button',
        destination: '/docs/components/button',
        permanent: true,
      },
      {
        source: '/docs/card',
        destination: '/docs/components/card',
        permanent: true,
      },
      {
        source: '/docs/glass-view',
        destination: '/docs/glass-engine/glass-view',
        permanent: true,
      },
      {
        source: '/docs/tabs',
        destination: '/docs/components/tabs',
        permanent: true,
      },
      {
        source: '/docs/avatar',
        destination: '/docs/components/avatar',
        permanent: true,
      },
    ];
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
