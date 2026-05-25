import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Dialog',
  description: 'Modal dialog with title, description, action buttons, and glass surface.',
};

const props = [
  { name: 'isOpen', type: 'boolean', default: '—', description: 'Controls dialog visibility.' },
  { name: 'onClose', type: '() => void', default: '—', description: 'Called when the dialog is dismissed.' },
  { name: 'title', type: 'string', default: 'undefined', description: 'Dialog heading text.' },
  { name: 'description', type: 'string', default: 'undefined', description: 'Secondary description text below the title.' },
  { name: 'children', type: 'ReactNode', default: 'undefined', description: 'Custom content rendered inside the dialog.' },
  { name: 'actions', type: "Array<{ label, onPress, variant?, color?, isDestructive? }>", default: 'undefined', description: 'Action buttons rendered in the dialog footer.' },
  { name: 'isDismissible', type: 'boolean', default: 'true', description: 'When false, prevents backdrop tap from closing.' },
  { name: 'glass', type: 'boolean', default: 'false', description: 'Renders the dialog surface with Liquid Glass.' },
  { name: 'size', type: "'sm' | 'md' | 'lg' | 'full'", default: '"md"', description: 'Controls the maximum width of the dialog.' },
  { name: 'style', type: 'StyleProp<ViewStyle>', default: 'undefined', description: 'Style applied to the dialog panel.' },
];

export default function DialogPage() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 mb-5">
        reactnatively
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Dialog</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        A modal dialog for confirmations, alerts, and short forms. Configurable with
        preset action buttons, optional glass surface, and controlled or backdrop dismissal.
      </p>

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock
        language="typescript"
        code={`import { Dialog } from 'reactnatively';`}
      />

      <h2 id="confirm-delete" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Confirm delete
      </h2>
      <CodeBlock
        filename="DeleteConfirm.tsx"
        language="tsx"
        code={`import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Dialog, Button } from 'reactnatively';

export function DeleteConfirm({ itemName, onDelete }) {
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    setOpen(false);
    await onDelete();
  }

  return (
    <View>
      <Button variant="outline" color="error" onPress={() => setOpen(true)}>
        Delete item
      </Button>
      <Dialog
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Delete item?"
        description={\`"\${itemName}" will be permanently removed. This action cannot be undone.\`}
        glass
        actions={[
          { label: 'Cancel', onPress: () => setOpen(false), variant: 'ghost' },
          { label: 'Delete', onPress: handleDelete, color: 'error', isDestructive: true },
        ]}
      />
    </View>
  );
}`}
        showLineNumbers
      />

      <h2 id="custom-content" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Custom content dialog
      </h2>
      <CodeBlock
        filename="RenameDialog.tsx"
        language="tsx"
        code={`import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Dialog, TextInput, Button, Text } from 'reactnatively';

export function RenameDialog({ isOpen, currentName, onClose, onRename }) {
  const [name, setName] = useState(currentName);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Rename file"
      glass
      size="sm"
    >
      <View style={styles.body}>
        <Text variant="sm" color="rgba(255,255,255,0.5)" style={{ marginBottom: 12 }}>
          Enter a new name for the file.
        </Text>
        <TextInput
          label="File name"
          value={name}
          onChangeText={setName}
          autoFocus
          clearable
        />
        <View style={styles.footer}>
          <Button variant="ghost" flex={1} onPress={onClose}>Cancel</Button>
          <Button
            variant="solid"
            color="primary"
            flex={1}
            onPress={() => { onRename(name); onClose(); }}
            disabled={!name.trim()}
          >
            Rename
          </Button>
        </View>
      </View>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  body: { paddingHorizontal: 4 },
  footer: { flexDirection: 'row', gap: 12, marginTop: 20 },
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
