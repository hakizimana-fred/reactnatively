'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3')) as HTMLHeadingElement[];
    const seenIds = new Set<string>();
    const items: TocItem[] = [];

    elements.forEach((el) => {
      const id = el.id.trim();
      const text = el.textContent?.trim();

      if (!id || !text || seenIds.has(id)) return;

      seenIds.add(id);
      items.push({
        id,
        text,
        level: parseInt(el.tagName[1]),
      });
    });

    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' },
    );

    elements
      .filter((el) => el.id.trim() && seenIds.has(el.id.trim()))
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24">
      <div className="text-[10px] uppercase tracking-[0.12em] text-white/30 font-semibold mb-3">
        On this page
      </div>
      <ul className="space-y-1">
        {headings.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                'block text-sm transition-all duration-150',
                item.level === 3 && 'pl-3',
                activeId === item.id
                  ? 'text-white'
                  : 'text-white/40 hover:text-white/70',
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
