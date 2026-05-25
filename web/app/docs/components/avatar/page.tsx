import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { AvatarPreview } from '@/components/docs/previews/AvatarPreview';

export const metadata: Metadata = {
  title: 'Avatar',
  description: 'Image avatar with initials fallback, presence indicators, and group layout.',
};

const props = [
  { name: 'src', type: '{ uri: string } | number', default: 'undefined', description: 'Image source — a URI object or a local require().' },
  { name: 'name', type: 'string', default: 'undefined', description: 'Fallback name used to derive initials when no image is available.' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number", default: '"md"', description: 'Avatar diameter. Use a preset or an exact pixel value.' },
  { name: 'online', type: "boolean | 'online' | 'offline' | 'busy' | 'away'", default: 'undefined', description: 'Presence indicator dot. true maps to "online".' },
  { name: 'bordered', type: 'boolean', default: 'false', description: 'Renders a glass border ring around the avatar.' },
  { name: 'borderColor', type: 'string', default: 'undefined', description: 'Custom color for the border ring.' },
  { name: 'fallbackBg', type: 'string', default: 'undefined', description: 'Background color of the initials fallback.' },
  { name: 'fallbackColor', type: 'string', default: 'undefined', description: 'Text color of the initials fallback.' },
  { name: 'style', type: 'StyleProp<ViewStyle>', default: 'undefined', description: 'Style applied to the outer container.' },
  { name: 'imageStyle', type: 'StyleProp<ImageStyle>', default: 'undefined', description: 'Style applied directly to the Image element.' },
];

const groupProps = [
  { name: 'children', type: 'ReactNode', default: '—', description: 'Avatar elements to stack.' },
  { name: 'max', type: 'number', default: 'undefined', description: 'Maximum visible avatars. Remainder shown as "+N" chip.' },
  { name: 'size', type: 'string | number', default: '"md"', description: 'Uniform size applied to all children.' },
  { name: 'overlap', type: 'number', default: '8', description: 'Pixel overlap between adjacent avatars.' },
  { name: 'style', type: 'StyleProp<ViewStyle>', default: 'undefined', description: 'Style applied to the group row.' },
];

export default function AvatarPage() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 mb-5">
        reactnatively
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Avatar</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        Display user profile images with automatic initials fallback, presence status
        indicators, and a group component for stacked avatar rows.
      </p>

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock
        language="typescript"
        code={`import { Avatar, AvatarGroup } from 'reactnatively';`}
      />

      <h2 id="preview" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Interactive preview
      </h2>
      <AvatarPreview />

      <h2 id="basic-usage" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Basic usage
      </h2>
      <CodeBlock
        filename="ProfileHeader.tsx"
        language="tsx"
        code={`import { View, StyleSheet } from 'react-native';
import { Avatar, Text } from 'reactnatively';

export function ProfileHeader() {
  return (
    <View style={styles.row}>
      {/* With image */}
      <Avatar
        src={{ uri: 'https://example.com/alice.jpg' }}
        size="xl"
        online="online"
        bordered
      />
      {/* Initials fallback */}
      <Avatar name="Bob Martin" size="xl" online="busy" />
      {/* Local asset */}
      <Avatar src={require('./assets/carol.png')} size="xl" online="away" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 16, alignItems: 'center', padding: 20 },
});`}
        showLineNumbers
      />

      <h2 id="chat-screen" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Chat list screen
      </h2>
      <CodeBlock
        filename="ChatListScreen.tsx"
        language="tsx"
        code={`import { FlatList, View, StyleSheet } from 'react-native';
import { Avatar, Text, Heading } from 'reactnatively';

const chats = [
  { id: '1', name: 'Alice Wong', message: 'See you tomorrow!', online: true },
  { id: '2', name: 'Dev Team', message: 'PR is ready for review', online: false },
  { id: '3', name: 'Bob Martin', message: 'Thanks for the update', online: 'busy' as const },
];

export function ChatListScreen() {
  return (
    <FlatList
      data={chats}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Avatar name={item.name} size="lg" online={item.online} bordered />
          <View style={styles.content}>
            <Heading level="h4">{item.name}</Heading>
            <Text variant="sm" color="rgba(255,255,255,0.5)" numberOfLines={1}>
              {item.message}
            </Text>
          </View>
        </View>
      )}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  row: { flexDirection: 'row', gap: 12, alignItems: 'center', paddingVertical: 10 },
  content: { flex: 1 },
});`}
        showLineNumbers
      />

      <h2 id="avatar-group" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        AvatarGroup
      </h2>
      <CodeBlock
        filename="CollaboratorRow.tsx"
        language="tsx"
        code={`import { View, StyleSheet } from 'react-native';
import { Avatar, AvatarGroup, Text } from 'reactnatively';

export function CollaboratorRow() {
  return (
    <View style={styles.container}>
      <Text variant="sm" color="rgba(255,255,255,0.5)">Shared with</Text>
      <AvatarGroup max={4} size="sm" overlap={10}>
        <Avatar src={{ uri: 'https://i.pravatar.cc/40?u=1' }} />
        <Avatar src={{ uri: 'https://i.pravatar.cc/40?u=2' }} />
        <Avatar src={{ uri: 'https://i.pravatar.cc/40?u=3' }} />
        <Avatar name="Dan A" />
        <Avatar name="Eve B" />
        <Avatar name="Frank C" />
      </AvatarGroup>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 },
});`}
        showLineNumbers
      />

      <h2 id="props" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Avatar props
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

      <h2 id="group-props" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        AvatarGroup props
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
            {groupProps.map((row) => (
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
