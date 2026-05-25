import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Chip',
  description: 'Compact label chip with icons, dismiss button, selection state, and glass variant.',
};

const props = [
  { name: 'label', type: 'string', default: '—', description: 'Required. Text displayed inside the chip.' },
  { name: 'avatar', type: 'ReactNode', default: 'undefined', description: 'Avatar element shown at the leading edge.' },
  { name: 'icon', type: 'ReactNode', default: 'undefined', description: 'Leading icon inside the chip.' },
  { name: 'trailingIcon', type: 'ReactNode', default: 'undefined', description: 'Trailing icon inside the chip.' },
  { name: 'onDismiss', type: '() => void', default: 'undefined', description: 'Adds a dismiss (×) button when provided.' },
  { name: 'isSelected', type: 'boolean', default: 'false', description: 'Renders the chip in a selected/active state.' },
  { name: 'onPress', type: '() => void', default: 'undefined', description: 'Called when the chip body is pressed.' },
  { name: 'variant', type: "'solid' | 'outline' | 'subtle' | 'glass'", default: '"subtle"', description: 'Visual style.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: '"md"', description: 'Controls padding and font size.' },
  { name: 'color', type: 'string', default: 'undefined', description: 'Custom accent color for the chip.' },
  { name: 'glass', type: 'boolean', default: 'false', description: 'Shorthand for variant="glass".' },
  { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Prevents interaction and reduces opacity.' },
  { name: 'style', type: 'StyleProp<ViewStyle>', default: 'undefined', description: 'Style applied to the chip container.' },
];

export default function ChipPage() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 mb-5">
        reactnatively
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Chip</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        Compact, interactive label chips for tags, filters, selections, and contact tokens.
        Supports leading avatars, icons, dismiss buttons, and a toggle-style selection state.
      </p>

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock
        language="typescript"
        code={`import { Chip } from 'reactnatively';`}
      />

      <h2 id="filter-row" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Toggleable filter chips
      </h2>
      <CodeBlock
        filename="CategoryFilter.tsx"
        language="tsx"
        code={`import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Chip } from 'reactnatively';

const categories = ['All', 'Design', 'Engineering', 'Marketing', 'Finance', 'Operations'];

export function CategoryFilter() {
  const [selected, setSelected] = useState('All');

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {categories.map((cat) => (
        <Chip
          key={cat}
          label={cat}
          variant="glass"
          size="md"
          isSelected={selected === cat}
          onPress={() => setSelected(cat)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingVertical: 12 },
});`}
        showLineNumbers
      />

      <h2 id="dismissible" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Dismissible tags
      </h2>
      <CodeBlock
        filename="TagInput.tsx"
        language="tsx"
        code={`import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Chip, TextInput, Heading } from 'reactnatively';

export function TagInput() {
  const [tags, setTags] = useState(['react-native', 'expo', 'typescript']);

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  return (
    <View style={styles.container}>
      <Heading level="h5" style={{ marginBottom: 12 }}>Tags</Heading>
      <View style={styles.wrap}>
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            variant="subtle"
            icon={<Ionicons name="pricetag-outline" size={12} color="rgba(255,255,255,0.5)" />}
            onDismiss={() => removeTag(tag)}
            size="sm"
          />
        ))}
      </View>
      <TextInput placeholder="Add tag..." size="sm" style={{ marginTop: 12 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
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
