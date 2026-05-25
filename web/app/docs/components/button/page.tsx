import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { ButtonPreview } from '@/components/docs/previews/ButtonPreview';

export const metadata: Metadata = {
  title: 'Button',
  description: 'Versatile button component with multiple variants, sizes, and states.',
};

const props = [
  { name: 'variant', type: "'solid' | 'outline' | 'ghost' | 'glass' | 'tinted' | 'destructive'", default: '"solid"', description: 'Visual style of the button.' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: '"md"', description: 'Controls padding and font size.' },
  { name: 'color', type: "'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'danger' | 'neutral'", default: '"primary"', description: 'Semantic color token applied to the button.' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Convenience prop for string children — equivalent to passing a string child.' },
  { name: 'children', type: 'ReactNode', default: 'undefined', description: 'Content rendered inside the button.' },
  { name: 'leftIcon', type: 'ReactNode', default: 'undefined', description: 'Icon placed to the left of the label.' },
  { name: 'rightIcon', type: 'ReactNode', default: 'undefined', description: 'Icon placed to the right of the label.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Shows a spinner and disables interaction.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button and reduces opacity.' },
  { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Stretches the button to fill its container.' },
  { name: 'flex', type: 'number', default: 'undefined', description: 'Sets the flex value on the outer container.' },
  { name: 'glass', type: 'GlassButtonConfig', default: 'undefined', description: 'Glass-specific config. Only used when variant="glass".' },
  { name: 'style', type: 'StyleProp<ViewStyle>', default: 'undefined', description: 'Style applied to the outer container.' },
  { name: 'textStyle', type: 'StyleProp<TextStyle>', default: 'undefined', description: 'Style applied to the label text.' },
  { name: 'pressedStyle', type: 'StyleProp<ViewStyle>', default: 'undefined', description: 'Style applied while the button is pressed.' },
  { name: 'accessibilityLabel', type: 'string', default: 'undefined', description: 'Screen-reader label for the button.' },
  { name: 'accessibilityHint', type: 'string', default: 'undefined', description: 'Screen-reader hint describing the action.' },
];

export default function ButtonPage() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 mb-5">
        reactnatively
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Button</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        A fully-featured button with solid, outline, ghost, glass, tinted, and destructive variants.
        Supports icons, loading states, full-width layout, and semantic color tokens out of the box.
      </p>

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock
        language="typescript"
        code={`import { Button } from 'reactnatively';`}
      />

      <h2 id="basic-usage" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Interactive preview
      </h2>
      <ButtonPreview />

      <h2 id="props" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Props
      </h2>
      <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
        <table className="w-full text-sm">
          <thead className="border-b border-white/[0.08] bg-white/[0.03]">
            <tr>
              {['Prop', 'Type', 'Default', 'Description'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider text-white/40 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.map((row) => (
              <tr key={row.name} className="border-t border-white/[0.04]">
                <td className="px-4 py-3 font-mono text-violet-300 text-xs whitespace-nowrap">{row.name}</td>
                <td className="px-4 py-3 font-mono text-blue-300 text-xs">{row.type}</td>
                <td className="px-4 py-3 font-mono text-white/30 text-xs">{row.default}</td>
                <td className="px-4 py-3 text-white/50 text-xs leading-relaxed">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
