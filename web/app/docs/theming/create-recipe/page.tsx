import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'createRecipe',
  description: 'Build typed variant + state style resolvers for your own components using createRecipe.',
};

export default function CreateRecipePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">createRecipe</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono">createRecipe</code>{' '}
        is a typed variant + state style resolver. It's the same system Reactnatively
        uses internally for all its components. Use it to build your own components that
        support variants, sizes, and interactive states — fully type-safe.
      </p>

      <h2 id="concept" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Concept
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        A recipe defines a component's style in terms of:
      </p>
      <div className="space-y-2 mb-6">
        {[
          { term: 'base', desc: 'Styles shared by all instances, always applied.' },
          { term: 'variants', desc: 'Named style groups (e.g. solid, outline, ghost). Only one applies at a time.' },
          { term: 'sizes', desc: 'Scale modifiers (e.g. sm, md, lg). Only one applies at a time.' },
          { term: 'states', desc: 'Modifier styles for interactive states: pressed, hovered, focused, disabled, loading, invalid.' },
          { term: 'defaults', desc: 'Fallback variant, size, and material when none is provided.' },
        ].map((item) => (
          <div key={item.term} className="flex gap-3 items-start p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <code className="font-mono text-violet-300 text-sm shrink-0">{item.term}</code>
            <span className="text-sm text-white/50">{item.desc}</span>
          </div>
        ))}
      </div>

      <h2 id="basic-usage" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Basic usage
      </h2>
      <CodeBlock
        filename="tagRecipe.ts"
        language="typescript"
        showLineNumbers
        code={`import { createRecipe } from 'reactnatively/theme';

export type TagVariant = 'filled' | 'outline' | 'ghost';
export type TagSize   = 'sm' | 'md' | 'lg';

export const tagRecipe = createRecipe<TagVariant, TagSize>({
  base: {
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  variants: {
    filled:  { backgroundColor: '#6366f1' },
    outline: { borderWidth: 1, borderColor: '#6366f1' },
    ghost:   { backgroundColor: 'rgba(99,102,241,0.12)' },
  },
  sizes: {
    sm: { paddingHorizontal: 8,  paddingVertical: 3,  fontSize: 11 },
    md: { paddingHorizontal: 12, paddingVertical: 5,  fontSize: 13 },
    lg: { paddingHorizontal: 16, paddingVertical: 7,  fontSize: 15 },
  },
  states: {
    disabled: { opacity: 0.4 },
    pressed:  { opacity: 0.75 },
  },
  defaults: {
    variant: 'filled',
    size:    'md',
  },
});`}
      />

      <h2 id="resolving" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Resolving the recipe
      </h2>
      <CodeBlock
        filename="Tag.tsx"
        language="tsx"
        showLineNumbers
        code={`import { tagRecipe, type TagVariant, type TagSize } from './tagRecipe';

interface TagProps {
  variant?: TagVariant;
  size?:    TagSize;
  disabled?: boolean;
  children: React.ReactNode;
}

export function Tag({ variant, size, disabled, children }: TagProps) {
  const resolved = tagRecipe({
    variant,
    size,
    states: disabled ? ['disabled'] : [],
  });

  return (
    <Pressable style={resolved.style}>
      {children}
    </Pressable>
  );
}`}
      />

      <h2 id="extend-recipe" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        extendRecipe
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Extend an existing recipe without rewriting it — useful for brand-specific
        overrides on top of Reactnatively's built-in recipes:
      </p>
      <CodeBlock
        language="typescript"
        code={`import { extendRecipe } from 'reactnatively/theme';
import { tagRecipe } from './tagRecipe';

// Override just the filled variant colors
export const brandTagRecipe = extendRecipe(tagRecipe, {
  variants: {
    filled: { backgroundColor: '#e11d48' },   // brand red
  },
});`}
      />

      <h2 id="recipe-state-types" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        RecipeState values
      </h2>
      <div className="overflow-x-auto rounded-xl border border-white/[0.08] mb-6">
        <table className="w-full text-sm">
          <thead className="border-b border-white/[0.08] bg-white/[0.03]">
            <tr>
              {['State', 'Typical trigger'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider text-white/40 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['base', 'Always applied (same as base style block)'],
              ['pressed', 'onPressIn active'],
              ['hovered', 'Pointer/hover active (web / pointer device)'],
              ['focused', 'Keyboard focus active'],
              ['selected', 'Controlled selected state'],
              ['disabled', 'disabled prop is true'],
              ['loading', 'loading prop is true'],
              ['invalid', 'Form validation error'],
            ].map(([state, trigger]) => (
              <tr key={state} className="border-t border-white/[0.04]">
                <td className="px-4 py-3 font-mono text-violet-300 text-xs">{state}</td>
                <td className="px-4 py-3 text-white/50 text-xs">{trigger}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
