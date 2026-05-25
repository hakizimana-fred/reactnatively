import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Stack',
  description: 'Flexbox layout primitive for vertical and horizontal stacking with spacing tokens.',
};

const props = [
  { name: 'direction', type: "'vertical' | 'horizontal'", default: '"vertical"', description: 'Flex direction of the stack.' },
  { name: 'gap', type: 'SpacingKey | number', default: 'undefined', description: 'Space between children using a spacing token or pixel value.' },
  { name: 'align', type: "ViewStyle['alignItems']", default: 'undefined', description: 'Cross-axis alignment (alignItems).' },
  { name: 'justify', type: "ViewStyle['justifyContent']", default: 'undefined', description: 'Main-axis alignment (justifyContent).' },
  { name: 'flex', type: 'number', default: 'undefined', description: 'Sets the flex value on the container.' },
  { name: 'wrap', type: 'boolean', default: 'false', description: 'Allows children to wrap onto multiple lines.' },
  { name: 'divider', type: 'boolean', default: 'false', description: 'Renders a subtle separator line between children.' },
  { name: 'style', type: 'StyleProp<ViewStyle>', default: 'undefined', description: 'Additional styles applied to the container.' },
  { name: 'children', type: 'ReactNode', default: '—', description: 'Content to stack.' },
];

export default function StackPage() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 mb-5">
        reactnatively
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Stack</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        A lightweight layout primitive for composing vertical and horizontal flex stacks
        with consistent spacing. Replaces repetitive <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">View + StyleSheet</code> boilerplate.
      </p>

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock
        language="typescript"
        code={`import { Stack } from 'reactnatively';`}
      />

      <h2 id="form-layout" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Form layout
      </h2>
      <CodeBlock
        filename="EditProfileForm.tsx"
        language="tsx"
        code={`import { Stack, TextInput, Button, Heading, Avatar } from 'reactnatively';

export function EditProfileForm() {
  return (
    <Stack direction="vertical" gap={20} style={{ padding: 24 }}>
      <Stack direction="horizontal" align="center" gap={16}>
        <Avatar src={{ uri: user.avatar }} size="xl" bordered />
        <Stack direction="vertical" gap={4}>
          <Heading level="h4">{user.name}</Heading>
          <Button variant="ghost" size="xs">Change photo</Button>
        </Stack>
      </Stack>

      <TextInput label="Display Name" defaultValue={user.name} />
      <TextInput label="Username" defaultValue={user.username} />
      <TextInput label="Bio" defaultValue={user.bio} />

      <Stack direction="horizontal" gap={12}>
        <Button variant="outline" flex={1} onPress={handleCancel}>Cancel</Button>
        <Button variant="solid" color="primary" flex={1} onPress={handleSave}>Save</Button>
      </Stack>
    </Stack>
  );
}`}
        showLineNumbers
      />

      <h2 id="tag-cloud" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Wrapping chip cloud
      </h2>
      <CodeBlock
        filename="TagCloud.tsx"
        language="tsx"
        code={`import { Stack, Chip, Heading } from 'reactnatively';

const interests = ['Design', 'React Native', 'TypeScript', 'iOS', 'Android', 'Figma', 'Web3', 'AI'];

export function TagCloud() {
  return (
    <Stack direction="vertical" gap={12} style={{ padding: 20 }}>
      <Heading level="h4">Interests</Heading>
      <Stack direction="horizontal" wrap gap={8}>
        {interests.map((tag) => (
          <Chip key={tag} label={tag} variant="glass" size="sm" />
        ))}
      </Stack>
    </Stack>
  );
}`}
        showLineNumbers
      />

      <h2 id="menu-list" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Menu list with dividers
      </h2>
      <CodeBlock
        filename="SettingsMenu.tsx"
        language="tsx"
        code={`import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, Text, LiquidCard, LiquidCardBody } from 'reactnatively';

const items = [
  { icon: 'person-outline', label: 'Account' },
  { icon: 'shield-outline', label: 'Privacy' },
  { icon: 'notifications-outline', label: 'Notifications' },
  { icon: 'help-circle-outline', label: 'Help & Support' },
];

export function SettingsMenu() {
  return (
    <LiquidCard elevation={1} borderRadius={16} style={{ margin: 16 }}>
      <LiquidCardBody>
        <Stack direction="vertical" divider>
          {items.map((item) => (
            <TouchableOpacity key={item.label}>
              <Stack direction="horizontal" align="center" justify="space-between" gap={12} style={{ paddingVertical: 14 }}>
                <Stack direction="horizontal" align="center" gap={12}>
                  <Ionicons name={item.icon as any} size={20} color="rgba(255,255,255,0.6)" />
                  <Text variant="md">{item.label}</Text>
                </Stack>
                <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.3)" />
              </Stack>
            </TouchableOpacity>
          ))}
        </Stack>
      </LiquidCardBody>
    </LiquidCard>
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
