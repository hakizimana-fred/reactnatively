'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

interface SearchResult {
  title: string;
  category: string;
  href: string;
  description: string;
}

export function DocsSearch({ results }: { results: SearchResult[] }) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return results.slice(0, 24);

    return results.filter((result) =>
      [result.title, result.category, result.description, result.href]
        .join(' ')
        .toLowerCase()
        .includes(normalized),
    );
  }, [query, results]);

  return (
    <div>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search components, guides, APIs..."
        className="h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#1f8bca]/60"
        aria-label="Search documentation"
      />
      <div className="mt-5 grid gap-3">
        {filtered.map((result) => (
          <Link
            key={`${result.category}-${result.href}`}
            href={result.href}
            className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.06]"
          >
            <div className="text-xs font-medium uppercase tracking-[0.12em] text-white/32">{result.category}</div>
            <h2 className="mt-1 font-semibold text-white">{result.title}</h2>
            <p className="mt-1 text-sm leading-6 text-white/52">{result.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
