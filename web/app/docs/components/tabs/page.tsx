import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { TabsPreview } from '@/components/docs/previews/TabsPreview';

export const metadata: Metadata = {
  title: 'Tabs',
  description: 'Segmented tab navigation with line, enclosed, pills, and glass variants.',
};

const props = [
  { name: 'value', type: 'string', default: 'undefined', description: 'Controlled active tab value.' },
  { name: 'defaultValue', type: 'string', default: 'undefined', description: 'Initial active tab for uncontrolled usage.' },
  { name: 'onChange', type: '(value: string) => void', default: 'undefined', description: 'Called when the active tab changes.' },
  { name: 'variant', type: "'line' | 'enclosed' | 'pills' | 'glass'", default: '"line"', description: 'Visual style of the tab strip.' },
  { name: 'orientation', type: "'horizontal' | 'vertical'", default: '"horizontal"', description: 'Layout direction of the tab list.' },
  { name: 'glass', type: 'boolean', default: 'false', description: 'Shorthand for variant="glass".' },
  { name: 'children', type: 'ReactNode', default: '—', description: 'Should contain TabList and TabPanel components.' },
  { name: 'style', type: 'StyleProp<ViewStyle>', default: 'undefined', description: 'Style applied to the outer container.' },
];

const tabProps = [
  { name: 'value', type: 'string', default: '—', description: 'Unique identifier for this tab.' },
  { name: 'label', type: 'string', default: '—', description: 'Display text for the tab.' },
  { name: 'icon', type: 'ReactNode', default: 'undefined', description: 'Icon shown beside the label.' },
  { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Prevents the tab from being selected.' },
];

export default function TabsPage() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 mb-5">
        reactnatively
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Tabs</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        A composable tab system with <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">TabList</code>,{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">Tab</code>, and{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">TabPanel</code>{' '}
        sub-components. Four visual variants, horizontal and vertical orientation, and optional glass rendering.
      </p>

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock
        language="typescript"
        code={`import { Tabs, TabList, Tab, TabPanel } from 'reactnatively';`}
      />

      <h2 id="preview" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Interactive preview
      </h2>
      <TabsPreview />

      <h2 id="profile-tabs" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Profile screen tabs
      </h2>
      <CodeBlock
        filename="ProfileScreen.tsx"
        language="tsx"
        code={`import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Tabs, TabList, Tab, TabPanel, Text } from 'reactnatively';

export function ProfileScreen() {
  return (
    <View style={styles.root}>
      <Tabs defaultValue="posts" variant="line">
        <TabList>
          <Tab
            value="posts"
            label="Posts"
            icon={<Ionicons name="grid-outline" size={16} color="currentColor" />}
          />
          <Tab
            value="reels"
            label="Reels"
            icon={<Ionicons name="film-outline" size={16} color="currentColor" />}
          />
          <Tab
            value="saved"
            label="Saved"
            icon={<Ionicons name="bookmark-outline" size={16} color="currentColor" />}
          />
        </TabList>
        <TabPanel value="posts">
          <Text variant="sm" color="rgba(255,255,255,0.5)" style={{ padding: 20 }}>
            User posts grid
          </Text>
        </TabPanel>
        <TabPanel value="reels">
          <Text variant="sm" color="rgba(255,255,255,0.5)" style={{ padding: 20 }}>
            User reels feed
          </Text>
        </TabPanel>
        <TabPanel value="saved">
          <Text variant="sm" color="rgba(255,255,255,0.5)" style={{ padding: 20 }}>
            Saved items
          </Text>
        </TabPanel>
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});`}
        showLineNumbers
      />

      <h2 id="glass-pills" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Glass pills variant
      </h2>
      <CodeBlock
        filename="FilterTabs.tsx"
        language="tsx"
        code={`import { View, StyleSheet } from 'react-native';
import { Tabs, TabList, Tab, TabPanel, Text } from 'reactnatively';

export function FilterTabs() {
  return (
    <View style={styles.root}>
      <Tabs defaultValue="all" variant="glass">
        <TabList style={styles.list}>
          <Tab value="all" label="All" />
          <Tab value="active" label="Active" />
          <Tab value="draft" label="Draft" />
          <Tab value="archived" label="Archived" isDisabled />
        </TabList>
        <TabPanel value="all">
          <Text variant="sm" color="rgba(255,255,255,0.5)" style={{ padding: 20 }}>
            All items
          </Text>
        </TabPanel>
        <TabPanel value="active">
          <Text variant="sm" color="rgba(255,255,255,0.5)" style={{ padding: 20 }}>
            Active items only
          </Text>
        </TabPanel>
        <TabPanel value="draft">
          <Text variant="sm" color="rgba(255,255,255,0.5)" style={{ padding: 20 }}>
            Drafts
          </Text>
        </TabPanel>
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 16 },
  list: { marginBottom: 12 },
});`}
        showLineNumbers
      />

      <h2 id="props" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Tabs props
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

      <h2 id="tab-props" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Tab props
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
            {tabProps.map((row) => (
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
