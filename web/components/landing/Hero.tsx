import Link from 'next/link';
import { ArrowRight, CheckCircle2, PackageCheck } from 'lucide-react';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { CopyButton } from '@/components/ui/CopyButton';
import { GithubIcon } from '@/components/ui/GithubIcon';

const heroCode = `import { Bell, Moon, Shield } from '@expo/vector-icons';
import {
  ReactnativelyProvider,
  GlassView,
  Heading,
  Text,
  Switch,
  Button,
} from 'reactnatively';

export function NotificationSettings() {
  return (
    <ReactnativelyProvider>
      <GlassView elevation={3} borderRadius={28}>
        <Heading level="h3">Notifications</Heading>
        <Text color="muted">Choose what deserves your attention.</Text>

        <SettingRow icon={<Bell />} label="Product updates" enabled />
        <SettingRow icon={<Shield />} label="Security alerts" enabled />
        <SettingRow icon={<Moon />} label="Quiet hours" />

        <Button color="primary" fullWidth>Save changes</Button>
      </GlassView>
    </ReactnativelyProvider>
  );
}`;

const quickLinks = [
  { href: '/docs/components/button', label: 'Button' },
  { href: '/docs/glass-engine/glass-view', label: 'GlassView' },
  { href: '/docs/components/text-input', label: 'TextInput' },
  { href: '/docs/components/bottom-sheet', label: 'BottomSheet' },
  { href: '/docs/components/tabs', label: 'Tabs' },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--border-subtle)] bg-[color:var(--surface-0)] pt-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:pb-20 lg:pt-16">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--glass-subtle)] px-3 py-1 text-xs font-medium text-[color:var(--text-muted)]">
            <PackageCheck className="h-3.5 w-3.5 text-[#1f8bca]" />
            Expo-first React Native UI framework
          </div>

          <h1 className="mb-5 text-4xl font-semibold leading-[1.08] tracking-tight text-[color:var(--text-primary)] sm:text-5xl lg:text-[3.4rem]">
            React Native UI primitives with glass, theme, and motion built in.
          </h1>

          <p className="mb-7 max-w-xl text-base leading-8 text-[color:var(--text-muted)] sm:text-lg">
            Reactnatively gives Expo teams typed components, adaptive glass surfaces,
            semantic theme tokens, and public subpath exports without hiding normal
            React Native patterns.
          </p>

          <div className="mb-7 flex flex-wrap items-center gap-3">
            <Link
              href="/docs/getting-started/installation"
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-[color:var(--action-border)] bg-[color:var(--action-bg)] px-4 text-sm font-medium text-[color:var(--action-fg)] shadow-[var(--action-shadow)] transition-colors hover:bg-[color:var(--action-bg-hover)]"
            >
              Read the docs
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="https://github.com/hakizimana-fred/reactnatively"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-[color:var(--border-strong)] px-4 text-sm font-medium text-[color:var(--text-primary)] transition-colors hover:bg-[color:var(--glass-subtle)]"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
            </Link>
          </div>

          <div className="mb-7 inline-flex max-w-full items-center gap-3 rounded-lg border border-[color:var(--border-subtle)] bg-[color:var(--code-bg)] px-4 py-3 text-slate-100">
            <span className="select-none font-mono text-sm text-slate-500">$</span>
            <code className="overflow-hidden text-ellipsis whitespace-nowrap font-mono text-sm">
              pnpm add reactnatively
            </code>
            <CopyButton code="pnpm add reactnatively" compact />
          </div>

          <div className="grid gap-2 text-sm text-[color:var(--text-secondary)] sm:grid-cols-3">
            {['Expo SDK 50+', 'TypeScript-first', 'Subpath exports'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 lg:hidden">
            <PreviewPanel />
          </div>
        </div>

        <div className="hidden gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_220px]">
          <div className="min-w-0">
            <CodeBlock
              code={heroCode}
              filename="App.tsx"
              language="tsx"
              showLineNumbers
            />
          </div>
          <PreviewPanel />
        </div>
      </div>

      <div className="border-t border-[color:var(--border-subtle)] bg-[color:var(--surface-1)]/55">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-5 gap-y-3 px-4 py-4 text-sm sm:px-6 lg:px-8">
          <span className="text-[color:var(--text-faint)]">Most used docs</span>
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function PreviewPanel() {
  return (
    <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--glass-subtle)] p-4">
      <div className="mx-auto w-full max-w-[230px] rounded-[34px] border border-white/[0.14] bg-[#080814] p-3 shadow-[0_24px_70px_rgba(0,0,0,0.34)]">
        <div className="relative mb-4">
          <div className="absolute left-3 top-0 text-[9px] font-semibold text-white/68">9:41</div>
          <div className="flex justify-center">
            <div className="h-4 w-16 rounded-full bg-black" />
          </div>
          <div className="absolute right-3 top-0 flex items-center gap-1">
            <div className="h-1.5 w-3 rounded-sm bg-white/55" />
            <div className="h-1.5 w-1.5 rounded-full border border-white/55" />
          </div>
        </div>

        <div className="mb-3 flex items-start justify-between gap-3 px-1">
          <div>
            <div className="text-[13px] font-semibold text-white">Notifications</div>
            <div className="mt-0.5 text-[8px] text-white/42">Settings</div>
          </div>
          <div className="rounded-full border border-[#1f8bca]/25 bg-[#1f8bca]/14 px-2 py-1 text-[8px] font-medium text-[#7dd3fc]">
            3 active
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.10] bg-white/[0.06] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <div className="mb-3 flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1f8bca] text-[12px] font-semibold text-white">
              R
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-medium text-white">Product updates</div>
              <div className="mt-0.5 text-[8px] leading-3 text-white/42">
                Releases, changelogs, and API notes
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {[
              ['Security alerts', 'Important account activity', true],
              ['Quiet hours', 'Pause alerts from 10 PM', false],
              ['Weekly summary', 'Usage and project health', true],
            ].map(([title, subtitle, enabled]) => (
              <div
                key={title as string}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.04] px-3 py-2"
              >
                <div className="min-w-0">
                  <div className="text-[9px] font-medium text-white">{title}</div>
                  <div className="mt-0.5 truncate text-[7px] text-white/38">{subtitle}</div>
                </div>
                <div
                  className={`flex h-4 w-8 shrink-0 items-center rounded-full px-0.5 ${
                    enabled ? 'justify-end bg-[#1f8bca]' : 'justify-start bg-white/12'
                  }`}
                >
                  <div className="h-3 w-3 rounded-full bg-white" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 rounded-xl bg-[color:var(--action-bg)] py-2 text-center text-[10px] font-semibold text-[color:var(--action-fg)] shadow-[0_12px_28px_rgba(31,139,202,0.28)]">
          Save changes
        </div>
        <div className="mt-4 flex items-center justify-around border-t border-white/[0.08] pt-3">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className={`h-1.5 rounded-full ${item === 2 ? 'w-5 bg-[#1f8bca]' : 'w-1.5 bg-white/25'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
