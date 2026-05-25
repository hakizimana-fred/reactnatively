'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CodeBlock } from '@/components/ui/CodeBlock';

export interface PreviewVariant {
  label: string;
  preview: React.ReactNode;
  code: string;
  filename?: string;
  language?: string;
}

interface ComponentPreviewProps {
  variants: PreviewVariant[];
  minHeight?: number;
}

export function ComponentPreview({ variants, minHeight = 200 }: ComponentPreviewProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = variants[activeIdx];

  return (
    <div className="rounded-2xl border border-white/[0.08] overflow-hidden mb-8 max-w-full">
      {/* Variant tabs */}
      {variants.length > 1 && (
        <div className="flex items-center gap-1 overflow-x-auto px-3 pt-3 pb-0 bg-white/[0.02] border-b border-white/[0.06] sm:px-4">
          {variants.map((v, i) => (
            <button
              key={v.label}
              onClick={() => setActiveIdx(i)}
              className="relative shrink-0 px-3 py-2 text-xs font-medium transition-colors rounded-t-lg"
              style={{ color: i === activeIdx ? 'rgba(167,139,250,1)' : 'rgba(255,255,255,0.4)' }}
            >
              {i === activeIdx && (
                <motion.span
                  layoutId="activePreviewTab"
                  className="absolute inset-0 bg-white/[0.06] rounded-t-lg border-t border-l border-r border-white/[0.08]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">{v.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Preview area */}
      <div
        className="flex items-center justify-center p-4 bg-[#070714] sm:p-8"
        style={{
          minHeight,
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(120,80,255,0.06) 0%, transparent 70%)',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="flex items-center justify-center w-full"
          >
            {active.preview}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Code block */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`code-${activeIdx}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <CodeBlock
            code={active.code}
            language={active.language ?? 'tsx'}
            filename={active.filename}
            className="!rounded-none !border-0 !border-t border-white/[0.06]"
            showLineNumbers
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
