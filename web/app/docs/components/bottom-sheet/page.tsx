import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'BottomSheet',
  description: 'Gesture-driven bottom sheet with snap points, glass surface, and dismissal control.',
};

const props = [
  { name: 'isOpen', type: 'boolean', default: '—', description: 'Controls whether the sheet is visible.' },
  { name: 'onClose', type: '() => void', default: '—', description: 'Called when the sheet is dismissed.' },
  { name: 'snapPoints', type: 'number[]', default: '[50]', description: 'Array of snap percentages (e.g. [50, 90]). Sheet snaps to these heights.' },
  { name: 'initialSnap', type: 'number', default: '0', description: 'Index into snapPoints for the initial open height.' },
  { name: 'title', type: 'string', default: 'undefined', description: 'Optional title rendered in the sheet header.' },
  { name: 'children', type: 'ReactNode', default: 'undefined', description: 'Content rendered inside the sheet.' },
  { name: 'isDismissible', type: 'boolean', default: 'true', description: 'When false, prevents backdrop tap and swipe-down dismissal.' },
  { name: 'showHandle', type: 'boolean', default: 'true', description: 'Shows the drag handle pill at the top of the sheet.' },
  { name: 'glass', type: 'boolean', default: 'false', description: 'Renders the sheet surface with Liquid Glass.' },
  { name: 'style', type: 'StyleProp<ViewStyle>', default: 'undefined', description: 'Style applied to the sheet container.' },
];

export default function BottomSheetPage() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 mb-5">
        reactnatively
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">BottomSheet</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        A gesture-driven bottom sheet with configurable snap points, backdrop dismissal,
        and an optional glass surface. Ideal for action menus, filters, and contextual detail panels.
      </p>

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock
        language="typescript"
        code={`import { BottomSheet } from 'reactnatively';`}
      />

      <h2 id="action-sheet" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Action sheet
      </h2>
      <CodeBlock
        filename="PostActions.tsx"
        language="tsx"
        code={`import { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheet, Text, Button } from 'reactnatively';

const actions = [
  { icon: 'share-social-outline', label: 'Share post' },
  { icon: 'bookmark-outline', label: 'Save' },
  { icon: 'copy-outline', label: 'Copy link' },
  { icon: 'flag-outline', label: 'Report' },
];

export function PostActions() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" onPress={() => setOpen(true)}>
        More options
      </Button>
      <BottomSheet
        isOpen={open}
        onClose={() => setOpen(false)}
        snapPoints={[45]}
        title="Post actions"
        glass
      >
        <View style={styles.list}>
          {actions.map((action) => (
            <TouchableOpacity key={action.label} style={styles.row} onPress={() => setOpen(false)}>
              <Ionicons name={action.icon as any} size={22} color="rgba(255,255,255,0.7)" />
              <Text variant="md">{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 20, paddingBottom: 32 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 14 },
});`}
        showLineNumbers
      />

      <h2 id="multi-snap" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Multi-snap detail panel
      </h2>
      <CodeBlock
        filename="PlaceDetail.tsx"
        language="tsx"
        code={`import { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { BottomSheet, Heading, Text, Button, LiquidCardImage } from 'reactnatively';

export function MapWithSheet({ place }) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.root}>
      {/* Map renders here */}
      <Button
        variant="glass"
        style={styles.trigger}
        onPress={() => setOpen(true)}
      >
        View Details
      </Button>

      <BottomSheet
        isOpen={open}
        onClose={() => setOpen(false)}
        snapPoints={[40, 85]}
        initialSnap={0}
        glass
        showHandle
      >
        <ScrollView contentContainerStyle={styles.content}>
          <LiquidCardImage source={{ uri: place.photo }} height={180} rounded />
          <Heading level="h3" style={{ marginTop: 16 }}>{place.name}</Heading>
          <Text variant="sm" color="rgba(255,255,255,0.5)" style={{ marginTop: 4 }}>
            {place.address}
          </Text>
          <Text variant="md" color="rgba(255,255,255,0.7)" style={{ marginTop: 16, lineHeight: 24 }}>
            {place.description}
          </Text>
          <Button variant="solid" color="primary" fullWidth style={{ marginTop: 24 }}>
            Get Directions
          </Button>
        </ScrollView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  trigger: { position: 'absolute', bottom: 24, alignSelf: 'center' },
  content: { padding: 20, paddingBottom: 40 },
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
