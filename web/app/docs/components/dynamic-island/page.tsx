import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'DynamicIsland',
  description: 'Adaptive iPhone Dynamic Island component with compact, expanded, and minimal states.',
};

const props = [
  { name: 'state', type: "'compact' | 'expanded' | 'minimal'", default: 'undefined', description: 'Controlled display state.' },
  { name: 'defaultState', type: "'compact' | 'expanded' | 'minimal'", default: '"compact"', description: 'Initial state for uncontrolled usage.' },
  { name: 'onStateChange', type: '(state) => void', default: 'undefined', description: 'Called when state transitions.' },
  { name: 'compactContent', type: 'ReactNode', default: 'undefined', description: 'Content rendered in compact state (pill shape).' },
  { name: 'expandedContent', type: 'ReactNode', default: 'undefined', description: 'Content rendered in expanded state (large island).' },
  { name: 'minimalContent', type: 'ReactNode', default: 'undefined', description: 'Content rendered in minimal state (dot).' },
  { name: 'onPress', type: '() => void', default: 'undefined', description: 'Called when the island is tapped.' },
  { name: 'style', type: 'StyleProp<ViewStyle>', default: 'undefined', description: 'Style applied to the outer container.' },
];

export default function DynamicIslandPage() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 mb-5">
        reactnatively
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">DynamicIsland</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        An animated Dynamic Island component for iPhone 14 Pro and later. Smoothly transitions
        between compact, expanded, and minimal states to surface Live Activity content at the
        top of the screen.
      </p>

      <div className="my-5 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/[0.05] flex gap-3">
        <span className="shrink-0 mt-0.5 text-sm text-yellow-400">⚠</span>
        <div className="text-sm text-white/60 leading-relaxed">
          DynamicIsland renders only on iOS 16+ devices with a Dynamic Island cutout.
          On unsupported devices the component renders{' '}
          <code className="px-1 py-0.5 rounded bg-white/[0.06] text-violet-300 font-mono text-xs">null</code>.
          Use{' '}
          <code className="px-1 py-0.5 rounded bg-white/[0.06] text-violet-300 font-mono text-xs">DynamicIsland.isSupported</code>{' '}
          to gate rendering where needed.
        </div>
      </div>

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock
        language="typescript"
        code={`import { DynamicIsland } from 'reactnatively';`}
      />

      <h2 id="now-playing" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Now playing indicator
      </h2>
      <CodeBlock
        filename="NowPlayingIsland.tsx"
        language="tsx"
        code={`import { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DynamicIsland, Text, IconButton } from 'reactnatively';

export function NowPlayingIsland({ track, isPlaying, onPlayPause }) {
  const [state, setState] = useState<'compact' | 'expanded'>('compact');

  return (
    <DynamicIsland
      state={state}
      onPress={() => setState(state === 'compact' ? 'expanded' : 'compact')}
      compactContent={
        <View style={styles.compact}>
          <Ionicons name="musical-note" size={14} color="#fff" />
          <Text variant="xs" weight="semibold" numberOfLines={1} style={styles.compactTitle}>
            {track.title}
          </Text>
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={14}
            color="#fff"
          />
        </View>
      }
      expandedContent={
        <View style={styles.expanded}>
          <Image source={{ uri: track.albumArt }} style={styles.art} />
          <View style={styles.info}>
            <Text variant="sm" weight="bold">{track.title}</Text>
            <Text variant="xs" color="rgba(255,255,255,0.5)">{track.artist}</Text>
          </View>
          <View style={styles.controls}>
            <IconButton
              icon={<Ionicons name="play-skip-back" size={18} color="#fff" />}
              accessibilityLabel="Previous"
              variant="ghost"
              size="sm"
            />
            <IconButton
              icon={<Ionicons name={isPlaying ? 'pause' : 'play'} size={20} color="#fff" />}
              accessibilityLabel={isPlaying ? 'Pause' : 'Play'}
              variant="ghost"
              size="md"
              onPress={onPlayPause}
            />
            <IconButton
              icon={<Ionicons name="play-skip-forward" size={18} color="#fff" />}
              accessibilityLabel="Next"
              variant="ghost"
              size="sm"
            />
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  compact: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 8 },
  compactTitle: { maxWidth: 100 },
  expanded: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12 },
  art: { width: 48, height: 48, borderRadius: 8 },
  info: { flex: 1 },
  controls: { flexDirection: 'row', alignItems: 'center', gap: 4 },
});`}
        showLineNumbers
      />

      <h2 id="call-indicator" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Incoming call
      </h2>
      <CodeBlock
        filename="CallIsland.tsx"
        language="tsx"
        code={`import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DynamicIsland, Avatar, Text, IconButton } from 'reactnatively';

export function CallIsland({ caller, onAccept, onDecline }) {
  return (
    <DynamicIsland
      defaultState="expanded"
      expandedContent={
        <View style={styles.row}>
          <Avatar src={{ uri: caller.avatar }} size="sm" online="online" />
          <View style={styles.info}>
            <Text variant="xs" color="rgba(255,255,255,0.5)">Incoming call</Text>
            <Text variant="sm" weight="semibold">{caller.name}</Text>
          </View>
          <View style={styles.actions}>
            <IconButton
              icon={<Ionicons name="call" size={18} color="#fff" />}
              accessibilityLabel="Accept call"
              variant="solid"
              color="success"
              size="sm"
              borderRadius={20}
              onPress={onAccept}
            />
            <IconButton
              icon={<Ionicons name="call" size={18} color="#fff" />}
              accessibilityLabel="Decline call"
              variant="solid"
              color="error"
              size="sm"
              borderRadius={20}
              onPress={onDecline}
            />
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10 },
  info: { flex: 1 },
  actions: { flexDirection: 'row', gap: 8 },
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
