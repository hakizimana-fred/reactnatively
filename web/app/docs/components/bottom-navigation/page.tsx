import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { BottomNavigationPreview } from '@/components/docs/previews/BottomNavigationPreview';

export const metadata: Metadata = {
  title: 'BottomNavigation',
  description: 'App-shell bottom tab bar with icon, label, badge support, and glass surface.',
};

const props = [
  { name: 'items', type: 'Array<{ label, icon, activeIcon?, value, badge? }>', default: '—', description: 'Tab definitions. Each item requires label, icon, and value.' },
  { name: 'value', type: 'string', default: 'undefined', description: 'Controlled active tab value.' },
  { name: 'defaultValue', type: 'string', default: 'undefined', description: 'Initial active tab for uncontrolled usage.' },
  { name: 'onChange', type: '(value: string) => void', default: 'undefined', description: 'Called when a tab is pressed.' },
  { name: 'glass', type: 'boolean', default: 'false', description: 'Renders the bar on a Liquid Glass surface.' },
  { name: 'showLabel', type: 'boolean', default: 'true', description: 'Toggles visibility of tab labels.' },
  { name: 'style', type: 'StyleProp<ViewStyle>', default: 'undefined', description: 'Style applied to the bar container.' },
];

export default function BottomNavigationPage() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 mb-5">
        reactnatively
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">BottomNavigation</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        A bottom tab bar for primary app navigation. Supports custom active icons,
        notification badges per tab, glass surface rendering, and label toggling.
      </p>

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock
        language="typescript"
        code={`import { BottomNavigation } from 'reactnatively';`}
      />

      <h2 id="preview" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Interactive preview
      </h2>
      <BottomNavigationPreview />

      <h2 id="app-shell" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        App shell
      </h2>
      <CodeBlock
        filename="AppShell.tsx"
        language="tsx"
        code={`import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomNavigation } from 'reactnatively';

const tabs = [
  {
    value: 'home',
    label: 'Home',
    icon: <Ionicons name="home-outline" size={24} color="currentColor" />,
    activeIcon: <Ionicons name="home" size={24} color="currentColor" />,
  },
  {
    value: 'search',
    label: 'Search',
    icon: <Ionicons name="search-outline" size={24} color="currentColor" />,
    activeIcon: <Ionicons name="search" size={24} color="currentColor" />,
  },
  {
    value: 'inbox',
    label: 'Inbox',
    icon: <Ionicons name="mail-outline" size={24} color="currentColor" />,
    activeIcon: <Ionicons name="mail" size={24} color="currentColor" />,
    badge: 5,
  },
  {
    value: 'profile',
    label: 'Profile',
    icon: <Ionicons name="person-outline" size={24} color="currentColor" />,
    activeIcon: <Ionicons name="person" size={24} color="currentColor" />,
  },
];

export function AppShell() {
  const [active, setActive] = useState('home');

  const screens: Record<string, string> = {
    home: 'Home',
    search: 'Search',
    inbox: 'Inbox',
    profile: 'Profile',
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <Text>{screens[active]}</Text>
      </View>
      <BottomNavigation
        items={tabs}
        value={active}
        onChange={setActive}
        glass
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { flex: 1 },
});`}
        showLineNumbers
      />

      <h2 id="icon-only" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Icon-only mode
      </h2>
      <CodeBlock
        filename="CompactNav.tsx"
        language="tsx"
        code={`import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { BottomNavigation } from 'reactnatively';

const items = [
  { value: 'feed', label: 'Feed', icon: <Ionicons name="layers-outline" size={24} color="currentColor" /> },
  { value: 'explore', label: 'Explore', icon: <Ionicons name="compass-outline" size={24} color="currentColor" /> },
  { value: 'create', label: 'Create', icon: <Ionicons name="add-circle-outline" size={26} color="currentColor" /> },
  { value: 'alerts', label: 'Alerts', icon: <Ionicons name="notifications-outline" size={24} color="currentColor" />, badge: 12 },
  { value: 'me', label: 'Me', icon: <Ionicons name="person-circle-outline" size={24} color="currentColor" /> },
];

export function CompactNav() {
  const [tab, setTab] = useState('feed');
  return (
    <BottomNavigation
      items={items}
      value={tab}
      onChange={setTab}
      showLabel={false}
      glass
    />
  );
}`}
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
