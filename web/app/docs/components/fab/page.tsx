import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'FAB',
  description: 'Floating action button with label, size, glass variant, and corner placement.',
};

const props = [
  { name: 'icon', type: 'ReactNode', default: '—', description: 'Required. Icon displayed inside the button.' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Optional text label rendered beside the icon (extended FAB).' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: '"md"', description: 'Controls the diameter and icon size.' },
  { name: 'variant', type: "'solid' | 'glass'", default: '"solid"', description: 'Visual style.' },
  { name: 'color', type: 'string', default: 'undefined', description: 'Custom background color.' },
  { name: 'position', type: "'bottomRight' | 'bottomLeft' | 'bottomCenter' | 'topRight'", default: '"bottomRight"', description: 'Screen-corner positioning (uses absolute layout).' },
  { name: 'onPress', type: '(e) => void', default: 'undefined', description: 'Called when the FAB is pressed.' },
  { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Prevents interaction.' },
  { name: 'style', type: 'StyleProp<ViewStyle>', default: 'undefined', description: 'Style applied to the outer container.' },
];

export default function FabPage() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 mb-5">
        reactnatively
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">FAB</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        A floating action button for the primary action on a screen. Supports solid and glass
        variants, optional text labels for extended FAB patterns, and built-in corner positioning.
      </p>

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock
        language="typescript"
        code={`import { FAB } from 'reactnatively';`}
      />

      <h2 id="feed-screen" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Feed screen with compose FAB
      </h2>
      <CodeBlock
        filename="FeedScreen.tsx"
        language="tsx"
        code={`import { View, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FAB } from 'reactnatively';
import { PostCard } from './PostCard';

export function FeedScreen({ posts, onCompose }) {
  return (
    <View style={styles.root}>
      <FlatList
        data={posts}
        keyExtractor={(p) => p.id}
        renderItem={({ item }) => <PostCard post={item} />}
        contentContainerStyle={styles.list}
      />
      <FAB
        icon={<Ionicons name="create-outline" size={24} color="#fff" />}
        label="New Post"
        variant="solid"
        color="#6366f1"
        position="bottomRight"
        onPress={onCompose}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  list: { padding: 16, paddingBottom: 100 },
});`}
        showLineNumbers
      />

      <h2 id="glass-fab" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Glass variant
      </h2>
      <CodeBlock
        filename="MapScreen.tsx"
        language="tsx"
        code={`import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FAB } from 'reactnatively';

export function MapScreen() {
  return (
    <View style={styles.root}>
      {/* Map component here */}
      <FAB
        icon={<Ionicons name="locate" size={22} color="#fff" />}
        variant="glass"
        size="md"
        position="bottomRight"
        onPress={() => console.log('Locate current position')}
      />
      <FAB
        icon={<Ionicons name="layers-outline" size={22} color="#fff" />}
        variant="glass"
        size="sm"
        position="topRight"
        onPress={() => console.log('Toggle map layers')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
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
