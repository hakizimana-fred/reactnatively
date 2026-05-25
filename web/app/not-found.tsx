import Link from 'next/link';
import { Navigation } from '@/components/shared/Navigation';

export default function NotFound() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div
            className="text-[120px] font-black text-white/[0.04] leading-none mb-8 select-none"
            aria-hidden
          >
            404
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Page not found</h1>
          <p className="text-white/50 mb-8 max-w-sm">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/"
              className="px-5 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white text-sm font-medium flex items-center hover:opacity-90 transition-opacity"
            >
              Back home
            </Link>
            <Link
              href="/docs"
              className="px-5 h-10 rounded-xl bg-white/[0.06] border border-white/[0.10] text-white text-sm font-medium flex items-center hover:bg-white/[0.10] transition-all"
            >
              Documentation
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
