'use client';

import { useEffect, useState } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

const options = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={cn('h-8 w-[104px] rounded-xl bg-[color:var(--glass-subtle)]', className)} />;
  }

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-xl bg-[color:var(--glass-subtle)] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl',
        className,
      )}
      aria-label={`Theme: ${theme === 'system' ? `system (${resolvedTheme})` : theme}`}
    >
      {options.map((option) => {
        const Icon = option.icon;
        const active = (theme ?? 'system') === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setTheme(option.value)}
            aria-pressed={active}
            className={cn(
              'flex h-6 w-7 items-center justify-center rounded-lg transition-all duration-200',
              active
                ? 'bg-[color:var(--surface-elevated)] text-[color:var(--text-primary)] shadow-[0_4px_14px_rgba(0,0,0,0.10)]'
                : 'text-[color:var(--text-faint)] hover:bg-[color:var(--glass-panel)] hover:text-[color:var(--text-primary)]',
            )}
            aria-label={`${option.label} theme`}
            title={`${option.label} theme`}
          >
            <Icon className="h-3.5 w-3.5" strokeWidth={2.1} />
          </button>
        );
      })}
    </div>
  );
}
