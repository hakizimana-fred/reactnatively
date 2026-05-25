import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { SpinnerPreview } from '@/components/docs/previews/SpinnerPreview';

export const metadata: Metadata = {
  title: 'Spinner',
  description: 'Animated loading spinner with size, color, track, thickness, and label props.',
};

const props = [
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: '"md"', description: 'Diameter of the spinner.' },
  { name: 'color', type: 'string', default: '"#6366f1"', description: 'Color of the active arc.' },
  { name: 'trackColor', type: 'string', default: '"rgba(255,255,255,0.1)"', description: 'Color of the background track ring.' },
  { name: 'thickness', type: 'number', default: 'undefined', description: 'Stroke width of the arc. Derived from size if omitted.' },
  { name: 'duration', type: 'number', default: '1000', description: 'Duration of one full rotation in milliseconds.' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Accessibility and visual label shown below the spinner.' },
  { name: 'style', type: 'StyleProp<ViewStyle>', default: 'undefined', description: 'Style applied to the outer container.' },
];

export default function SpinnerPage() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 mb-5">
        reactnatively
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Spinner</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        A smooth animated loading indicator. Customize size, arc color, track color,
        stroke thickness, and rotation speed. Use the optional{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">label</code> prop for
        informative loading messages.
      </p>

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock
        language="typescript"
        code={`import { Spinner } from 'reactnatively';`}
      />

      <h2 id="preview" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Interactive preview
      </h2>
      <SpinnerPreview />

      <h2 id="loading-states" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Loading states
      </h2>
      <CodeBlock
        filename="LoadingStates.tsx"
        language="tsx"
        code={`import { View, StyleSheet } from 'react-native';
import { Spinner } from 'reactnatively';

export function LoadingStates() {
  return (
    <View style={styles.row}>
      <Spinner size="xs" color="#6366f1" />
      <Spinner size="sm" color="#22d3ee" />
      <Spinner size="md" color="#4ade80" />
      <Spinner size="lg" color="#f59e0b" />
      <Spinner size="xl" color="#f43f5e" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 20, padding: 24 },
});`}
        showLineNumbers
      />

      <h2 id="full-screen-loading" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Full-screen loading overlay
      </h2>
      <CodeBlock
        filename="LoadingOverlay.tsx"
        language="tsx"
        code={`import { View, StyleSheet } from 'react-native';
import { Spinner, GlassView, Text } from 'reactnatively';

export function LoadingOverlay({ label = 'Loading...' }) {
  return (
    <View style={styles.overlay}>
      <GlassView elevation={3} borderRadius={24} style={styles.card}>
        <Spinner
          size="xl"
          color="#6366f1"
          trackColor="rgba(255,255,255,0.08)"
          thickness={4}
          label={label}
        />
      </GlassView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 100,
  },
  card: { padding: 40, alignItems: 'center' },
});`}
        showLineNumbers
      />

      <h2 id="inline-spinner" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Inline list loading
      </h2>
      <CodeBlock
        filename="InfiniteList.tsx"
        language="tsx"
        code={`import { FlatList, View, StyleSheet } from 'react-native';
import { Spinner, Text } from 'reactnatively';

export function InfiniteList({ data, isFetchingMore, onEndReached }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <View style={styles.item}><Text>{item.title}</Text></View>}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.3}
      ListFooterComponent={
        isFetchingMore ? (
          <View style={styles.footer}>
            <Spinner size="sm" color="#6366f1" />
            <Text variant="sm" color="rgba(255,255,255,0.4)">Loading more...</Text>
          </View>
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  item: { padding: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 24 },
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
