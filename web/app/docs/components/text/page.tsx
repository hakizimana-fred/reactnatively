import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Text',
  description: 'Body text component with size variants, weight, color, and decoration props.',
};

const props = [
  { name: 'variant', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'", default: '"md"', description: 'Font size using the theme type scale.' },
  { name: 'weight', type: "'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold'", default: '"regular"', description: 'Font weight.' },
  { name: 'color', type: 'string', default: '"#ffffff"', description: 'Text color.' },
  { name: 'align', type: "'left' | 'center' | 'right' | 'justify'", default: '"left"', description: 'Text alignment.' },
  { name: 'italic', type: 'boolean', default: 'false', description: 'Renders text in italic style.' },
  { name: 'underline', type: 'boolean', default: 'false', description: 'Adds underline decoration.' },
  { name: 'strikethrough', type: 'boolean', default: 'false', description: 'Adds strikethrough decoration.' },
  { name: 'numberOfLines', type: 'number', default: 'undefined', description: 'Clamps text to N lines with an ellipsis.' },
  { name: 'style', type: 'StyleProp<TextStyle>', default: 'undefined', description: 'Additional text styles.' },
  { name: 'children', type: 'ReactNode', default: '—', description: 'Text content.' },
];

export default function TextPage() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 mb-5">
        reactnatively
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Text</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        The core body text primitive. Provides a consistent type scale from{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">xs</code> to{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">2xl</code>,
        weight, color, alignment, and decoration — without needing StyleSheet for common text patterns.
      </p>

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock
        language="typescript"
        code={`import { Text } from 'reactnatively';`}
      />

      <h2 id="variants" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Size variants
      </h2>
      <CodeBlock
        filename="TextShowcase.tsx"
        language="tsx"
        code={`import { View, StyleSheet } from 'react-native';
import { Text } from 'reactnatively';

export function TextShowcase() {
  return (
    <View style={styles.container}>
      <Text variant="2xl" weight="bold">2XL — Display text</Text>
      <Text variant="xl" weight="semibold">XL — Large body</Text>
      <Text variant="lg">LG — Default reading size</Text>
      <Text variant="md" color="rgba(255,255,255,0.7)">MD — Secondary body</Text>
      <Text variant="sm" color="rgba(255,255,255,0.5)">SM — Caption / helper text</Text>
      <Text variant="xs" color="rgba(255,255,255,0.4)" weight="medium">XS — Fine print</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, gap: 12 },
});`}
        showLineNumbers
      />

      <h2 id="product-description" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Product description card
      </h2>
      <CodeBlock
        filename="ProductDetail.tsx"
        language="tsx"
        code={`import { View, StyleSheet } from 'react-native';
import { Text, Heading, Badge, LiquidCard, LiquidCardBody } from 'reactnatively';

export function ProductDetail({ product }) {
  return (
    <LiquidCard elevation={2} borderRadius={20}>
      <LiquidCardBody>
        <View style={styles.priceRow}>
          <Text variant="2xl" weight="bold">\${product.price}</Text>
          <Text variant="md" color="rgba(255,255,255,0.4)" strikethrough>
            \${product.originalPrice}
          </Text>
          <Badge label="-20%" status="success" variant="subtle" size="sm" />
        </View>
        <Heading level="h3" style={{ marginBottom: 8 }}>{product.name}</Heading>
        <Text
          variant="md"
          color="rgba(255,255,255,0.6)"
          numberOfLines={3}
          style={{ lineHeight: 24 }}
        >
          {product.description}
        </Text>
        <Text variant="xs" color="rgba(255,255,255,0.35)" italic style={{ marginTop: 12 }}>
          Free shipping on orders over \$50
        </Text>
      </LiquidCardBody>
    </LiquidCard>
  );
}

const styles = StyleSheet.create({
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
});`}
        showLineNumbers
      />

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
