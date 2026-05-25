import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { CardPreview } from '@/components/docs/previews/CardPreview';

export const metadata: Metadata = {
  title: 'Card (LiquidCard)',
  description: 'Glass-surfaced card with header, body, footer, and image sub-components.',
};

const props = [
  { name: 'elevation', type: '0 | 1 | 2 | 3 | 4 | 5', default: '2', description: 'Glass depth level controlling blur, shadow, and tint.' },
  { name: 'variant', type: "'ultraThin' | 'thin' | 'surface' | 'elevated' | 'overlay' | 'frosted' | 'tinted'", default: '"surface"', description: 'Glass tint preset.' },
  { name: 'borderRadius', type: 'number', default: '20', description: 'Corner radius in logical pixels.' },
  { name: 'glow', type: "{ color: string; radius?: number; opacity?: number } | false", default: 'undefined', description: 'Outer glow effect. iOS-only.' },
  { name: 'border', type: 'boolean', default: 'true', description: 'Glass edge border ring.' },
  { name: 'pressable', type: 'boolean', default: 'false', description: 'Makes the card respond to touch with a press animation.' },
  { name: 'onPress', type: '() => void', default: 'undefined', description: 'Called when the card is pressed (requires pressable).' },
  { name: 'onLongPress', type: '() => void', default: 'undefined', description: 'Called on long press.' },
  { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Stretches the card to fill its container width.' },
  { name: 'style', type: 'StyleProp<ViewStyle>', default: 'undefined', description: 'Style applied to the outer container.' },
  { name: 'contentStyle', type: 'StyleProp<ViewStyle>', default: 'undefined', description: 'Style applied to the inner content wrapper.' },
  { name: 'children', type: 'ReactNode', default: 'undefined', description: 'Card content — use sub-components for structure.' },
];

export default function CardPage() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 mb-5">
        reactnatively
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Card (LiquidCard)</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        A glass-surfaced container built on the Liquid Glass engine. Compose structured
        layouts using <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">LiquidCardHeader</code>,{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">LiquidCardBody</code>,{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">LiquidCardFooter</code>, and{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">LiquidCardImage</code>.
      </p>

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock
        language="typescript"
        code={`import {
  LiquidCard,
  LiquidCardHeader,
  LiquidCardBody,
  LiquidCardFooter,
  LiquidCardImage,
} from 'reactnatively';`}
      />

      <h2 id="preview" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Interactive preview
      </h2>
      <CardPreview />

      <h2 id="product-card" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Product card
      </h2>
      <CodeBlock
        filename="ProductCard.tsx"
        language="tsx"
        code={`import { View, StyleSheet } from 'react-native';
import {
  LiquidCard,
  LiquidCardImage,
  LiquidCardBody,
  LiquidCardFooter,
  Heading,
  Text,
  Button,
  Badge,
} from 'reactnatively';

export function ProductCard({ product }) {
  return (
    <LiquidCard elevation={2} borderRadius={20} pressable onPress={() => openProduct(product.id)}>
      <LiquidCardImage source={{ uri: product.imageUrl }} height={180} rounded />
      <LiquidCardBody>
        <View style={styles.titleRow}>
          <Heading level="h4">{product.name}</Heading>
          <Badge label="New" status="success" variant="subtle" size="sm" />
        </View>
        <Text variant="sm" color="rgba(255,255,255,0.5)" numberOfLines={2}>
          {product.description}
        </Text>
        <Text variant="lg" weight="bold">\${product.price}</Text>
      </LiquidCardBody>
      <LiquidCardFooter bordered>
        <Button variant="solid" color="primary" fullWidth onPress={() => addToCart(product.id)}>
          Add to Cart
        </Button>
      </LiquidCardFooter>
    </LiquidCard>
  );
}

const styles = StyleSheet.create({
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
});`}
        showLineNumbers
      />

      <h2 id="stat-cards" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Dashboard stats
      </h2>
      <CodeBlock
        filename="StatsGrid.tsx"
        language="tsx"
        code={`import { View, StyleSheet } from 'react-native';
import { LiquidCard, LiquidCardBody, Heading, Text } from 'reactnatively';

const stats = [
  { label: 'Revenue', value: '\$48,200', trend: '+12%', color: '#4ade80' },
  { label: 'Users', value: '14.3K', trend: '+8%', color: '#60a5fa' },
  { label: 'Orders', value: '1,204', trend: '-3%', color: '#f87171' },
  { label: 'Retention', value: '87%', trend: '+2%', color: '#a78bfa' },
];

export function StatsGrid() {
  return (
    <View style={styles.grid}>
      {stats.map((stat) => (
        <LiquidCard key={stat.label} elevation={1} borderRadius={16} style={styles.card}>
          <LiquidCardBody compact>
            <Text variant="xs" color="rgba(255,255,255,0.4)">{stat.label}</Text>
            <Heading level="h3" style={{ marginTop: 4 }}>{stat.value}</Heading>
            <Text variant="sm" color={stat.color}>{stat.trend}</Text>
          </LiquidCardBody>
        </LiquidCard>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, padding: 16 },
  card: { width: '47%' },
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
