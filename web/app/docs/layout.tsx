'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Navigation } from '@/components/shared/Navigation';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { TableOfContents } from '@/components/docs/TableOfContents';
import { BrandMark } from '@/components/shared/BrandMark';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Navigation />
      <div className="min-h-screen site-bg lg:flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 xl:w-72 fixed top-16 bottom-0 left-0 overflow-y-auto border-r border-[color:var(--border-subtle)] bg-[rgb(var(--background-rgb)/0.80)] backdrop-blur-xl">
          <DocsSidebar />
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <>
            <button
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close docs menu"
              type="button"
            />
            <aside className="fixed top-0 left-0 bottom-0 z-50 w-[min(18rem,86vw)] bg-[color:var(--surface-1)] border-r border-[color:var(--border-subtle)] overflow-y-auto lg:hidden">
              <div className="flex items-center justify-between p-4 border-b border-[color:var(--border-subtle)]">
                <Link href="/" className="flex items-center gap-2">
                  <BrandMark size={28} className="rounded-lg" />
                  <span className="font-semibold text-[color:var(--text-primary)] text-sm">reactnatively</span>
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 rounded-lg text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--glass-subtle)]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <DocsSidebar />
            </aside>
          </>
        )}

        {/* Main content */}
        <main className="min-w-0 w-full flex-1 lg:ml-64 xl:ml-72">
          {/* Mobile sidebar toggle */}
          <div className="lg:hidden sticky top-16 z-30 flex items-center gap-3 px-4 py-2.5 bg-[rgb(var(--background-rgb)/0.90)] backdrop-blur-xl border-b border-[color:var(--border-subtle)]">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2 text-sm text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] transition-colors"
            >
              <Menu className="w-4 h-4" />
              Menu
            </button>
          </div>

          <div className="flex w-full max-w-full">
            {/* Doc content */}
            <article className="min-w-0 w-full px-4 py-8 sm:px-6 lg:px-10 xl:px-16 max-w-full xl:max-w-3xl">
              {children}
            </article>

            {/* Table of contents */}
            <div className="hidden xl:block w-56 shrink-0 pt-12 pr-6">
              <TableOfContents />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
