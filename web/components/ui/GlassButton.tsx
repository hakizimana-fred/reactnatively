'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'glass' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
}

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    { className, variant = 'glass', size = 'md', glow = false, children, ...props },
    ref,
  ) => {
    const base =
      'relative inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 disabled:pointer-events-none disabled:opacity-50 select-none overflow-hidden';

    const variants = {
      primary:
        'border border-[color:var(--action-border)] bg-[color:var(--action-bg)] text-[color:var(--action-fg)] shadow-[var(--action-shadow)] hover:bg-[color:var(--action-bg-hover)] active:scale-[0.98]',
      glass:
        'bg-[color:var(--glass-panel)] backdrop-blur-md border border-[color:var(--border-subtle)] text-[color:var(--text-primary)] hover:bg-[color:var(--glass-elevated)] hover:border-[color:var(--border-strong)] active:scale-[0.98]',
      ghost:
        'bg-transparent text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--glass-subtle)] active:scale-[0.98]',
      outline:
        'bg-transparent border border-[color:var(--border-strong)] text-[color:var(--text-primary)] hover:bg-[color:var(--glass-subtle)] active:scale-[0.98]',
    };

    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-5 text-sm',
      lg: 'h-12 px-7 text-base',
    };

    const glowClass =
      glow && variant === 'primary'
        ? 'shadow-[0_0_30px_rgba(99,102,241,0.25)]'
        : '';

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], glowClass, className)}
        {...props}
      >
        {variant !== 'ghost' && (
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/45"
            aria-hidden
          />
        )}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    );
  },
);

GlassButton.displayName = 'GlassButton';
