import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'subtle' | 'bordered';
  glow?: boolean;
  hover?: boolean;
  highlight?: boolean;
  as?: 'div' | 'article' | 'section';
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      variant = 'default',
      glow = false,
      hover = false,
      highlight = true,
      children,
      ...props
    },
    ref,
  ) => {
    const base =
      'relative rounded-2xl overflow-hidden transition-all duration-300';

    const variants = {
      default: 'bg-[color:var(--glass-panel)] backdrop-blur-xl border border-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.055)]',
      elevated: 'bg-[color:var(--glass-elevated)] backdrop-blur-2xl border border-transparent shadow-[var(--shadow-soft),inset_0_1px_0_rgba(255,255,255,0.07)]',
      subtle: 'bg-[color:var(--glass-subtle)] backdrop-blur-lg border border-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.045)]',
      bordered:
        'bg-transparent backdrop-blur-lg border border-[color:var(--border-subtle)]',
    };

    const glowClass = glow
      ? 'shadow-[0_0_40px_rgba(99,102,241,0.12),0_0_80px_rgba(99,102,241,0.06)]'
      : '';

    const hoverClass = hover
      ? 'hover:bg-[color:var(--glass-elevated)] hover:shadow-[var(--shadow-soft)] cursor-pointer'
      : '';

    return (
      <div
        ref={ref}
        className={cn(base, variants[variant], glowClass, hoverClass, className)}
        {...props}
      >
        {highlight && (
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
            aria-hidden
          />
        )}
        {highlight && (
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-white/[0.05] to-transparent"
            aria-hidden
          />
        )}
        <div className="relative z-10">{children}</div>
      </div>
    );
  },
);

GlassCard.displayName = 'GlassCard';
