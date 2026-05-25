import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Toast',
  description: 'Imperative toast notifications with type variants, position, and action support.',
};

const methods = [
  { name: 'toast.show(opts)', type: 'ToastOptions', default: '—', description: 'Show a toast with full options.' },
  { name: 'toast.success(msg, opts?)', type: 'string, Partial<ToastOptions>', default: '—', description: 'Shorthand for type="success".' },
  { name: 'toast.error(msg, opts?)', type: 'string, Partial<ToastOptions>', default: '—', description: 'Shorthand for type="error".' },
  { name: 'toast.warning(msg, opts?)', type: 'string, Partial<ToastOptions>', default: '—', description: 'Shorthand for type="warning".' },
  { name: 'toast.info(msg, opts?)', type: 'string, Partial<ToastOptions>', default: '—', description: 'Shorthand for type="info".' },
];

const options = [
  { name: 'message', type: 'string', default: '—', description: 'The toast message text.' },
  { name: 'type', type: "'success' | 'error' | 'warning' | 'info' | 'default'", default: '"default"', description: 'Semantic variant controlling icon and color.' },
  { name: 'duration', type: 'number', default: '3000', description: 'Milliseconds before auto-dismiss. 0 = persistent.' },
  { name: 'position', type: "'top' | 'bottom'", default: '"bottom"', description: 'Screen edge where toasts appear.' },
  { name: 'icon', type: 'ReactNode', default: 'undefined', description: 'Custom icon overriding the default type icon.' },
  { name: 'action', type: '{ label: string; onPress: () => void }', default: 'undefined', description: 'Inline action button inside the toast.' },
  { name: 'glass', type: 'boolean', default: 'false', description: 'Renders the toast on a glass surface.' },
];

export default function ToastPage() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 mb-5">
        reactnatively
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Toast</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        An imperative toast notification system. Call <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">toast.show()</code> or
        the typed shorthands from anywhere in your app. Add{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">{'<ToastProvider />'}</code> once at the root.
      </p>

      <h2 id="setup" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Setup
      </h2>
      <CodeBlock
        filename="App.tsx"
        language="tsx"
        code={`import { ToastProvider } from 'reactnatively';
import { RootNavigator } from './navigation';

export default function App() {
  return (
    <ToastProvider>
      <RootNavigator />
    </ToastProvider>
  );
}`}
      />

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock
        language="typescript"
        code={`import { toast } from 'reactnatively';`}
      />

      <h2 id="basic-usage" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Basic usage
      </h2>
      <CodeBlock
        filename="SaveButton.tsx"
        language="tsx"
        code={`import { View, StyleSheet } from 'react-native';
import { toast, Button } from 'reactnatively';

export function SaveButton({ onSave }) {
  async function handleSave() {
    try {
      await onSave();
      toast.success('Changes saved!', { position: 'top' });
    } catch {
      toast.error('Failed to save. Try again.', {
        duration: 5000,
        action: { label: 'Retry', onPress: handleSave },
      });
    }
  }

  return (
    <Button variant="solid" color="primary" onPress={handleSave}>
      Save Changes
    </Button>
  );
}`}
        showLineNumbers
      />

      <h2 id="full-example" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        All variants
      </h2>
      <CodeBlock
        filename="ToastShowcase.tsx"
        language="tsx"
        code={`import { View, StyleSheet } from 'react-native';
import { toast, Button, Stack } from 'reactnatively';

export function ToastShowcase() {
  return (
    <Stack direction="vertical" gap={12} style={styles.container}>
      <Button variant="solid" color="success" onPress={() => toast.success('File uploaded successfully')}>
        Success toast
      </Button>
      <Button variant="solid" color="error" onPress={() => toast.error('Payment declined')}>
        Error toast
      </Button>
      <Button variant="solid" color="warning" onPress={() => toast.warning('Storage almost full')}>
        Warning toast
      </Button>
      <Button variant="outline" onPress={() => toast.info('New version available')}>
        Info toast
      </Button>
      <Button
        variant="glass"
        onPress={() =>
          toast.show({
            message: 'Message sent',
            type: 'success',
            glass: true,
            position: 'top',
            duration: 4000,
            action: { label: 'Undo', onPress: () => toast.info('Message unsent') },
          })
        }
      >
        Glass toast with action
      </Button>
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
});`}
        showLineNumbers
      />

      <h2 id="api" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        API methods
      </h2>
      <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
        <table className="w-full text-sm">
          <thead className="border-b border-white/[0.08] bg-white/[0.03]">
            <tr>
              {['Method', 'Arguments', 'Default', 'Description'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider text-white/40 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {methods.map((row) => (
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

      <h2 id="options" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        ToastOptions
      </h2>
      <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
        <table className="w-full text-sm">
          <thead className="border-b border-white/[0.08] bg-white/[0.03]">
            <tr>
              {['Option', 'Type', 'Default', 'Description'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider text-white/40 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {options.map((row) => (
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
