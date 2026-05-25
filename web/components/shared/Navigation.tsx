'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { GithubIcon } from '@/components/ui/GithubIcon';
import { cn } from '@/lib/utils';
import { GlassButton } from '@/components/ui/GlassButton';
import { ThemeToggle } from './ThemeToggle';
import { BrandMark } from './BrandMark';

const navLinks = [
  { href: '/docs', label: 'Docs' },
  { href: '/docs/components/glass-view', label: 'Components' },
  { href: '/guides', label: 'Guides' },
  { href: '/docs/search', label: 'Search' },
  { href: '/playground', label: 'Playground' },
  { href: 'https://github.com/hakizimana-fred/reactnatively', label: 'GitHub', external: true },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-[rgb(var(--background-rgb)/0.78)] backdrop-blur-2xl border-b border-[color:var(--border-subtle)]'
            : 'bg-transparent',
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
            >
              <BrandMark />
              <span className="font-semibold text-[color:var(--text-primary)] tracking-tight">
                reactnatively
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className={cn(
                    'px-3.5 py-2 rounded-lg text-sm transition-all duration-200',
                    pathname === link.href || pathname.startsWith(link.href + '/')
                      ? 'text-[color:var(--text-primary)] bg-[color:var(--glass-subtle)]'
                      : 'text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--glass-subtle)]',
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Link
                href="https://github.com/hakizimana-fred/reactnatively"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GlassButton variant="glass" size="sm">
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </GlassButton>
              </Link>
              <Link href="/docs/getting-started/installation">
                <GlassButton variant="primary" size="sm" glow>
                  Get started
                </GlassButton>
              </Link>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-all"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
            <div
              className="absolute inset-0 bg-[rgb(var(--background-rgb)/0.90)] backdrop-blur-2xl"
              onClick={() => setMenuOpen(false)}
            />
            <div
              className="absolute top-16 left-0 right-0 p-4 border-b border-[color:var(--border-subtle)] bg-[rgb(var(--background-rgb)/0.78)]"
            >
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--glass-subtle)] transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-3 mt-2 border-t border-[color:var(--border-subtle)]">
                  <ThemeToggle className="mb-3" />
                  <Link
                    href="/docs/getting-started/installation"
                    className="block"
                    onClick={() => setMenuOpen(false)}
                  >
                    <GlassButton variant="primary" className="w-full" glow>
                      Get started
                    </GlassButton>
                  </Link>
                </div>
              </nav>
            </div>
        </div>
      )}
    </>
  );
}
