import { CodeBlock } from '@/components/ui/CodeBlock';
import { cn } from '@/lib/utils';

function extractText(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(extractText).join('');
  return '';
}

export const mdxComponents = {
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-3xl font-bold text-white mb-4 mt-8 tracking-tight"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      id={id}
      className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      id={id}
      className="text-base font-semibold text-white/90 mb-2 mt-6"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-white/60 leading-relaxed mb-4" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="space-y-2 mb-4 pl-4" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="space-y-2 mb-4 pl-4 list-decimal" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-white/60 flex items-start gap-2" {...props}>
      <span className="mt-2 w-1 h-1 rounded-full bg-white/30 shrink-0 block" />
      <span>{children}</span>
    </li>
  ),
  a: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      href={href}
      className="text-violet-400 hover:text-violet-300 underline underline-offset-2 decoration-violet-400/40 transition-colors"
      {...props}
    >
      {children}
    </a>
  ),
  code: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const isBlock = className?.startsWith('language-');
    if (isBlock) {
      const lang = className?.replace('language-', '') || 'text';
      const code = extractText(children);
      return <CodeBlock code={code} language={lang} className="my-5" />;
    }
    return (
      <code
        className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }: React.HTMLAttributes<HTMLPreElement>) => (
    <>{children}</>
  ),
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className="my-5 pl-4 border-l-2 border-violet-500/40 text-white/50 italic"
      {...props}
    >
      {children}
    </blockquote>
  ),
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-5 overflow-x-auto rounded-xl border border-white/[0.08]">
      <table className="w-full text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="border-b border-white/[0.08] bg-white/[0.03]" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="px-4 py-3 text-left text-xs uppercase tracking-wider text-white/40 font-semibold"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3 border-t border-white/[0.04] text-white/60" {...props}>
      {children}
    </td>
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-white/[0.08]" {...props} />
  ),

  // Custom MDX components
  Callout: ({
    children,
    type = 'info',
  }: {
    children: React.ReactNode;
    type?: 'info' | 'warning' | 'tip' | 'danger';
  }) => {
    const styles = {
      info: { border: 'border-blue-500/20', bg: 'bg-blue-500/[0.05]', icon: 'ℹ', color: 'text-blue-400' },
      warning: { border: 'border-yellow-500/20', bg: 'bg-yellow-500/[0.05]', icon: '⚠', color: 'text-yellow-400' },
      tip: { border: 'border-emerald-500/20', bg: 'bg-emerald-500/[0.05]', icon: '✦', color: 'text-emerald-400' },
      danger: { border: 'border-red-500/20', bg: 'bg-red-500/[0.05]', icon: '✕', color: 'text-red-400' },
    };
    const s = styles[type];
    return (
      <div className={cn('my-5 p-4 rounded-xl border flex gap-3', s.border, s.bg)}>
        <span className={cn('shrink-0 mt-0.5 text-sm', s.color)}>{s.icon}</span>
        <div className="text-sm text-white/60 leading-relaxed">{children}</div>
      </div>
    );
  },

  PropTable: ({
    props: tableProps,
  }: {
    props: Array<{ name: string; type: string; default?: string; description: string }>;
  }) => (
    <div className="my-5 overflow-x-auto rounded-xl border border-white/[0.08]">
      <table className="w-full text-sm">
        <thead className="border-b border-white/[0.08] bg-white/[0.03]">
          <tr>
            {['Prop', 'Type', 'Default', 'Description'].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider text-white/40 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableProps.map((row) => (
            <tr key={row.name} className="border-t border-white/[0.04]">
              <td className="px-4 py-3 font-mono text-violet-300 text-xs">{row.name}</td>
              <td className="px-4 py-3 font-mono text-blue-300 text-xs">{row.type}</td>
              <td className="px-4 py-3 font-mono text-white/30 text-xs">{row.default ?? '—'}</td>
              <td className="px-4 py-3 text-white/50">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};
