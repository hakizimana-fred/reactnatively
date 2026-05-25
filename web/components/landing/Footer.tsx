import Link from 'next/link';
import { GithubIcon } from '@/components/ui/GithubIcon';
import { BrandMark } from '@/components/shared/BrandMark';

const footerLinks = {
  Docs: [
    { href: '/docs/getting-started/installation', label: 'Installation' },
    { href: '/docs/getting-started/quick-start', label: 'Quick start' },
    { href: '/docs/components/glass-view', label: 'Components' },
    { href: '/docs/theming/overview', label: 'Theming' },
    { href: '/docs/glass-engine', label: 'Glass engine' },
  ],
  Packages: [
    { href: '/docs/packages/glass', label: 'Glass' },
    { href: '/docs/packages/core', label: 'Core' },
    { href: '/docs/packages/theme', label: 'Theme' },
    { href: '/docs/packages/animations', label: 'Animations' },
    { href: '/docs/packages/hooks', label: 'Hooks' },
  ],
  Community: [
    { href: 'https://github.com/hakizimana-fred/reactnatively', label: 'GitHub', external: true },
    { href: 'https://github.com/hakizimana-fred/reactnatively/issues', label: 'Issues', external: true },
    { href: 'https://github.com/hakizimana-fred/reactnatively/discussions', label: 'Discussions', external: true },
    { href: '/playground', label: 'Playground' },
  ],
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[color:var(--border-subtle)] bg-[color:var(--surface-0)]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <BrandMark />
              <span className="font-semibold text-[color:var(--text-primary)]">reactnatively</span>
            </Link>
            <p className="text-sm text-[color:var(--text-muted)] leading-relaxed max-w-xs">
              Typed React Native components, adaptive glass rendering, theme tokens,
              and motion APIs for Expo apps.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <Link
                href="https://github.com/hakizimana-fred/reactnatively"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[color:var(--glass-subtle)] border border-[color:var(--border-subtle)] flex items-center justify-center text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--glass-panel)] transition-all"
              >
                <GithubIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <div className="text-xs uppercase tracking-widest text-[color:var(--text-faint)] font-medium mb-4">
                {category}
              </div>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={'external' in link && link.external ? '_blank' : undefined}
                      rel={'external' in link && link.external ? 'noopener noreferrer' : undefined}
                      className="text-sm text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[color:var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[color:var(--text-faint)]">
            © {new Date().getFullYear()} Reactnatively. MIT License.
          </p>
          {/* <div className="flex items-center gap-1 text-xs text-[color:var(--text-faint)]">
            <span>Built with</span>
            <span className="text-[color:var(--text-muted)]">Next.js</span>
            <span>+</span>
            <span className="text-[color:var(--text-muted)]">Framer Motion</span>
            <span>+</span>
            <span className="text-[color:var(--text-muted)]">Tailwind</span>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
