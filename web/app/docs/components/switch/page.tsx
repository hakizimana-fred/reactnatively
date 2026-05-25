import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { SwitchPreview } from '@/components/docs/previews/SwitchPreview';

export const metadata: Metadata = {
  title: 'Switch',
  description: 'Animated toggle switch with label, glass style, and semantic color tokens.',
};

const props = [
  { name: 'checked', type: 'boolean', default: 'undefined', description: 'Controlled checked state.' },
  { name: 'defaultChecked', type: 'boolean', default: 'false', description: 'Initial checked state for uncontrolled usage.' },
  { name: 'onChange', type: '(checked: boolean) => void', default: 'undefined', description: 'Called when the switch value changes.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: '"md"', description: 'Controls the physical size of the toggle.' },
  { name: 'color', type: "'primary' | 'success' | 'warning' | 'error'", default: '"primary"', description: 'Track color when the switch is on.' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Text label rendered alongside the switch.' },
  { name: 'labelPosition', type: "'left' | 'right'", default: '"right"', description: 'Position of the label relative to the switch.' },
  { name: 'glass', type: 'boolean', default: 'false', description: 'Renders the track with a glass surface.' },
  { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Prevents interaction and reduces opacity.' },
  { name: 'style', type: 'StyleProp<ViewStyle>', default: 'undefined', description: 'Style applied to the outer row container.' },
];

export default function SwitchPage() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 mb-5">
        reactnatively
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Switch</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        An animated toggle switch supporting controlled and uncontrolled usage,
        inline labels, glass track style, and semantic color tokens.
      </p>

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock
        language="typescript"
        code={`import { Switch } from 'reactnatively';`}
      />

      <h2 id="preview" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Interactive preview
      </h2>
      <SwitchPreview />

      <h2 id="settings-screen" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Settings screen
      </h2>
      <CodeBlock
        filename="NotificationsSettings.tsx"
        language="tsx"
        code={`import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Switch, LiquidCard, LiquidCardBody, Text, Heading } from 'reactnatively';

export function NotificationsSettings() {
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(false);
  const [sms, setSms] = useState(false);
  const [marketing, setMarketing] = useState(false);

  return (
    <View style={styles.root}>
      <Heading level="h3" style={{ marginBottom: 16 }}>Notifications</Heading>
      <LiquidCard elevation={1} borderRadius={16}>
        <LiquidCardBody>
          <View style={styles.row}>
            <Text variant="md">Push notifications</Text>
            <Switch checked={push} onChange={setPush} color="primary" />
          </View>
          <View style={styles.row}>
            <Text variant="md">Email digest</Text>
            <Switch checked={email} onChange={setEmail} color="success" />
          </View>
          <View style={styles.row}>
            <Text variant="md">SMS alerts</Text>
            <Switch checked={sms} onChange={setSms} color="warning" />
          </View>
          <View style={styles.row}>
            <Text variant="md" color="rgba(255,255,255,0.5)">Marketing (disabled)</Text>
            <Switch checked={marketing} onChange={setMarketing} isDisabled />
          </View>
        </LiquidCardBody>
      </LiquidCard>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 },
});`}
        showLineNumbers
      />

      <h2 id="glass-switches" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Glass switches with labels
      </h2>
      <CodeBlock
        filename="QuickToggles.tsx"
        language="tsx"
        code={`import { View, StyleSheet } from 'react-native';
import { Switch } from 'reactnatively';

export function QuickToggles() {
  return (
    <View style={styles.container}>
      <Switch
        defaultChecked
        label="Dark Mode"
        labelPosition="left"
        glass
        size="lg"
        color="primary"
      />
      <Switch
        label="Haptic Feedback"
        labelPosition="left"
        glass
        size="lg"
        color="success"
      />
      <Switch
        defaultChecked
        label="Auto-lock"
        labelPosition="left"
        glass
        size="lg"
        color="warning"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 20, padding: 24 },
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
