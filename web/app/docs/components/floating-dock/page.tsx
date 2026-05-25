import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'FloatingDock',
  description: 'macOS-style floating dock with magnification effect and glass surface.',
};

const props = [
  { name: 'items', type: 'Array<{ icon, label, onPress }>', default: '—', description: 'Dock items. Each requires an icon, label, and onPress handler.' },
  { name: 'position', type: "'bottom' | 'top'", default: '"bottom"', description: 'Screen edge where the dock is anchored.' },
  { name: 'glass', type: 'boolean', default: 'true', description: 'Renders the dock on a Liquid Glass surface.' },
  { name: 'magnification', type: 'boolean', default: 'true', description: 'Enables the proximity-based icon magnification effect.' },
  { name: 'style', type: 'StyleProp<ViewStyle>', default: 'undefined', description: 'Style applied to the dock container.' },
];

export default function FloatingDockPage() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 mb-5">
        reactnatively
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">FloatingDock</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        A macOS-inspired floating dock for quick actions. Icons magnify as your finger
        approaches them — the same physics used in macOS Dock. Built on Liquid Glass by default.
      </p>

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock
        language="typescript"
        code={`import { FloatingDock } from 'reactnatively';`}
      />

      <h2 id="tablet-toolbar" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        iPad quick-action dock
      </h2>
      <CodeBlock
        filename="TabletDock.tsx"
        language="tsx"
        code={`import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FloatingDock } from 'reactnatively';

const dockItems = [
  {
    icon: <Ionicons name="home" size={26} color="#fff" />,
    label: 'Home',
    onPress: () => navigation.navigate('Home'),
  },
  {
    icon: <Ionicons name="search" size={26} color="#fff" />,
    label: 'Search',
    onPress: () => navigation.navigate('Search'),
  },
  {
    icon: <Ionicons name="add-circle" size={28} color="#6366f1" />,
    label: 'Create',
    onPress: () => navigation.navigate('Create'),
  },
  {
    icon: <Ionicons name="notifications" size={26} color="#fff" />,
    label: 'Alerts',
    onPress: () => navigation.navigate('Notifications'),
  },
  {
    icon: <Ionicons name="person" size={26} color="#fff" />,
    label: 'Profile',
    onPress: () => navigation.navigate('Profile'),
  },
];

export function TabletLayout({ children }) {
  return (
    <View style={styles.root}>
      {children}
      <FloatingDock
        items={dockItems}
        position="bottom"
        glass
        magnification
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});`}
        showLineNumbers
      />

      <h2 id="no-magnification" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Static dock (no magnification)
      </h2>
      <CodeBlock
        filename="EditorDock.tsx"
        language="tsx"
        code={`import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FloatingDock } from 'reactnatively';

const tools = [
  { icon: <Ionicons name="text" size={22} color="#fff" />, label: 'Text', onPress: () => selectTool('text') },
  { icon: <Ionicons name="image-outline" size={22} color="#fff" />, label: 'Image', onPress: () => selectTool('image') },
  { icon: <Ionicons name="shapes-outline" size={22} color="#fff" />, label: 'Shape', onPress: () => selectTool('shape') },
  { icon: <Ionicons name="color-palette-outline" size={22} color="#fff" />, label: 'Color', onPress: () => selectTool('color') },
  { icon: <Ionicons name="layers-outline" size={22} color="#fff" />, label: 'Layers', onPress: () => openLayers() },
];

export function EditorCanvas({ children }) {
  return (
    <View style={styles.root}>
      {children}
      <FloatingDock
        items={tools}
        position="top"
        glass
        magnification={false}
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
