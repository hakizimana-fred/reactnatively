import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { BadgePreview } from '@/components/docs/previews/BadgePreview';

export const metadata: Metadata = {
  title: 'Badge',
  description: 'Numeric count, dot indicator, or label badge with absolute positioning over children.',
};

const props = [
  { name: 'count', type: 'number', default: 'undefined', description: 'Numeric count displayed inside the badge.' },
  { name: 'dot', type: 'boolean', default: 'false', description: 'Renders a small dot indicator instead of a label.' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Text label displayed inside the badge.' },
  { name: 'status', type: "'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral'", default: '"primary"', description: 'Semantic color token for the badge.' },
  { name: 'variant', type: "'solid' | 'outline' | 'subtle' | 'glass'", default: '"solid"', description: 'Visual style of the badge.' },
  { name: 'maxCount', type: 'number', default: '99', description: 'Cap for the count value. Displays "99+" when exceeded.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: '"md"', description: 'Controls padding and font size.' },
  { name: 'children', type: 'ReactNode', default: 'undefined', description: 'When provided, badge is positioned absolutely over this child.' },
  { name: 'placement', type: "'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft'", default: '"topRight"', description: 'Corner position when wrapping a child element.' },
  { name: 'style', type: 'StyleProp<ViewStyle>', default: 'undefined', description: 'Style applied to the badge container.' },
];

export default function BadgePage() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 mb-5">
        reactnatively
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Badge</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        Overlay numeric counts, dot indicators, or text labels on any element.
        Supports absolute positioning over children with configurable corner placement.
      </p>

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock
        language="typescript"
        code={`import { Badge } from 'reactnatively';`}
      />

      <h2 id="preview" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Interactive preview
      </h2>
      <BadgePreview />

      <h2 id="notification-icons" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Notification icons
      </h2>
      <CodeBlock
        filename="TabBar.tsx"
        language="tsx"
        code={`import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from 'reactnatively';

export function TabBar() {
  return (
    <View style={styles.bar}>
      <Badge count={3} status="error">
        <TouchableOpacity>
          <Ionicons name="chatbubble" size={28} color="#fff" />
        </TouchableOpacity>
      </Badge>

      <Badge count={128} maxCount={99} status="primary">
        <TouchableOpacity>
          <Ionicons name="notifications" size={28} color="#fff" />
        </TouchableOpacity>
      </Badge>

      <Badge dot status="success">
        <TouchableOpacity>
          <Ionicons name="person" size={28} color="#fff" />
        </TouchableOpacity>
      </Badge>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', justifyContent: 'space-around', padding: 16 },
});`}
        showLineNumbers
      />

      <h2 id="inline-labels" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Inline status labels
      </h2>
      <CodeBlock
        filename="StatusRow.tsx"
        language="tsx"
        code={`import { View, StyleSheet } from 'react-native';
import { Badge, Text } from 'reactnatively';

export function StatusRow() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text variant="sm">Order status:</Text>
        <Badge label="Delivered" status="success" variant="subtle" size="sm" />
      </View>
      <View style={styles.row}>
        <Text variant="sm">Payment:</Text>
        <Badge label="Pending" status="warning" variant="outline" size="sm" />
      </View>
      <View style={styles.row}>
        <Text variant="sm">Account:</Text>
        <Badge label="Suspended" status="error" variant="solid" size="sm" />
      </View>
      <View style={styles.row}>
        <Text variant="sm">Plan:</Text>
        <Badge label="Pro" status="primary" variant="glass" size="md" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 12 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
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
