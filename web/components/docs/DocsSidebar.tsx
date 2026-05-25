'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { docsNav, type DocNavItem, type DocSection } from '@/lib/docs';

interface SidebarProps {
  className?: string;
}

export function DocsSidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <nav className={cn('py-6 pr-4', className)}>
      {docsNav.map((section) => (
        <SidebarSection key={section.title} section={section} pathname={pathname} />
      ))}
    </nav>
  );
}

function SidebarSection({
  section,
  pathname,
}: {
  section: DocSection;
  pathname: string;
}) {
  return (
    <div className="mb-6">
      <div className="px-3 mb-2 text-[10px] uppercase tracking-[0.12em] text-white/30 font-semibold">
        {section.title}
      </div>
      <ul className="space-y-0.5">
        {section.items.map((item) => (
          <SidebarItem key={item.href} item={item} pathname={pathname} depth={0} />
        ))}
      </ul>
    </div>
  );
}

function SidebarItem({
  item,
  pathname,
  depth,
}: {
  item: DocNavItem;
  pathname: string;
  depth: number;
}) {
  const hasChildren = item.items && item.items.length > 0;
  const isActive = pathname === item.href;
  const isChildActive = hasChildren && item.items!.some((child) => pathname.startsWith(child.href));
  const [expanded, setExpanded] = useState(isChildActive || isActive);
  const isOpen = expanded || isChildActive || isActive;

  const style = depth > 0 ? { paddingLeft: `${12 + depth * 12}px` } : {};

  if (hasChildren) {
    return (
      <li>
        <button
          onClick={() => setExpanded((v) => !v)}
          className={cn(
            'w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-sm transition-all duration-150',
            isActive || isChildActive
              ? 'text-white bg-white/[0.06]'
              : 'text-white/50 hover:text-white/80 hover:bg-white/[0.04]',
          )}
          style={style}
        >
          <span>{item.title}</span>
          <span
            className={cn(
              'transition-transform duration-200',
              isOpen && 'rotate-90',
            )}
          >
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          </span>
        </button>

        {isOpen && (
          <ul className="overflow-hidden mt-0.5 space-y-0.5">
            {item.items!.map((child) => (
              <SidebarItem
                key={child.href}
                item={child}
                pathname={pathname}
                depth={depth + 1}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <Link
        href={item.href}
        className={cn(
          'flex items-center justify-between px-3 py-1.5 rounded-lg text-sm transition-all duration-150',
          isActive
            ? 'text-white bg-white/[0.08] border border-white/[0.08]'
            : 'text-white/50 hover:text-white/80 hover:bg-white/[0.04]',
        )}
        style={style}
      >
        <span>{item.title}</span>
        {item.badge && (
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/20 font-medium uppercase tracking-wide">
            {item.badge}
          </span>
        )}
      </Link>
    </li>
  );
}
