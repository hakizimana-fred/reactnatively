import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'IconButton',
  description: 'Square or circular icon-only button with solid, outline, ghost, and glass variants.',
};

const props = [
  { name: 'icon', type: 'ReactNode', default: '—', description: 'Required. The icon element to render.' },
  { name: 'accessibilityLabel', type: 'string', default: '—', description: 'Required. Screen-reader label describing the action.' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: '"md"', description: 'Controls the button diameter.' },
  { name: 'variant', type: "'solid' | 'outline' | 'ghost' | 'glass'", default: '"ghost"', description: 'Visual style.' },
  { name: 'color', type: "'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'danger' | 'neutral'", default: '"neutral"', description: 'Semantic color token.' },
  { name: 'isDisabled', type: 'boolean', default: 'false', description: 'Prevents interaction and reduces opacity.' },
  { name: 'isLoading', type: 'boolean', default: 'false', description: 'Shows a spinner in place of the icon.' },
  { name: 'onPress', type: '(e) => void', default: 'undefined', description: 'Called when the button is pressed.' },
  { name: 'borderRadius', type: 'number', default: 'undefined', description: 'Custom corner radius. Defaults to circular.' },
  { name: 'glass', type: 'boolean', default: 'false', description: 'Shorthand for variant="glass".' },
  { name: 'style', type: 'StyleProp<ViewStyle>', default: 'undefined', description: 'Style applied to the outer container.' },
];

export default function IconButtonPage() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 mb-5">
        reactnatively
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">IconButton</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        An icon-only button with consistent tap targets across all sizes. Requires{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">accessibilityLabel</code> for
        screen-reader compliance. Pairs well with toolbar and header layouts.
      </p>

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock
        language="typescript"
        code={`import { IconButton } from 'reactnatively';`}
      />

      <h2 id="header-toolbar" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Header toolbar
      </h2>
      <CodeBlock
        filename="ScreenHeader.tsx"
        language="tsx"
        code={`import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IconButton, Heading } from 'reactnatively';

export function ScreenHeader({ title, onBack, onShare, onMore }) {
  return (
    <View style={styles.header}>
      <IconButton
        icon={<Ionicons name="arrow-back" size={22} color="#fff" />}
        accessibilityLabel="Go back"
        variant="ghost"
        onPress={onBack}
      />
      <Heading level="h5" style={{ flex: 1, textAlign: 'center' }}>{title}</Heading>
      <View style={styles.actions}>
        <IconButton
          icon={<Ionicons name="share-outline" size={22} color="#fff" />}
          accessibilityLabel="Share"
          variant="ghost"
          onPress={onShare}
        />
        <IconButton
          icon={<Ionicons name="ellipsis-horizontal" size={22} color="#fff" />}
          accessibilityLabel="More options"
          variant="ghost"
          onPress={onMore}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', padding: 12, gap: 4 },
  actions: { flexDirection: 'row', gap: 4 },
});`}
        showLineNumbers
      />

      <h2 id="player-controls" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Media player controls
      </h2>
      <CodeBlock
        filename="PlayerControls.tsx"
        language="tsx"
        code={`import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IconButton, GlassView } from 'reactnatively';

export function PlayerControls({ isPlaying, onPlay, onPrev, onNext, onLike, liked }) {
  return (
    <GlassView elevation={2} borderRadius={32} style={styles.bar}>
      <IconButton
        icon={<Ionicons name={liked ? 'heart' : 'heart-outline'} size={22} color={liked ? '#ef4444' : '#fff'} />}
        accessibilityLabel={liked ? 'Unlike' : 'Like'}
        variant="ghost"
        onPress={onLike}
      />
      <IconButton
        icon={<Ionicons name="play-skip-back" size={24} color="#fff" />}
        accessibilityLabel="Previous track"
        variant="ghost"
        size="lg"
        onPress={onPrev}
      />
      <IconButton
        icon={<Ionicons name={isPlaying ? 'pause' : 'play'} size={28} color="#fff" />}
        accessibilityLabel={isPlaying ? 'Pause' : 'Play'}
        variant="solid"
        color="primary"
        size="xl"
        onPress={onPlay}
      />
      <IconButton
        icon={<Ionicons name="play-skip-forward" size={24} color="#fff" />}
        accessibilityLabel="Next track"
        variant="ghost"
        size="lg"
        onPress={onNext}
      />
      <IconButton
        icon={<Ionicons name="shuffle" size={22} color="#fff" />}
        accessibilityLabel="Shuffle"
        variant="ghost"
        onPress={() => {}}
      />
    </GlassView>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, margin: 20 },
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
