import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'usePressAnimation',
  description: 'Scale and opacity press animation hook for React Native components using Reanimated.',
};

export default function UsePressAnimationPage() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs text-violet-400 mb-5">
        Motion
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">usePressAnimation</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        A Reanimated hook that returns an animated style and press handlers for scale +
        opacity feedback. Reads the current interaction intensity from{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono">InteractionProvider</code>{' '}
        and respects the OS reduced-motion setting.
      </p>

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock language="typescript" code={`import { usePressAnimation } from 'reactnatively';
// or
import { usePressAnimation } from 'reactnatively/animations';`} />

      <h2 id="signature" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Signature
      </h2>
      <CodeBlock
        language="typescript"
        code={`function usePressAnimation(config?: PressAnimationConfig): PressAnimationResult

interface PressAnimationConfig {
  pressedScale?:   number;  // default 0.96 — target scale on press
  pressedOpacity?: number;  // default 0.88 — target opacity on press
  disabled?:       boolean; // default false — skip animation when true
}

interface PressAnimationResult {
  animatedStyle: AnimatedStyle<ViewStyle>;
  handlers: {
    onPressIn:  () => void;
    onPressOut: () => void;
  };
}`}
      />

      <h2 id="basic-usage" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Basic usage
      </h2>
      <CodeBlock
        filename="ActionButton.tsx"
        language="tsx"
        showLineNumbers
        code={`import { usePressAnimation } from 'reactnatively';
import Animated from 'react-native-reanimated';
import { Pressable, Text, StyleSheet } from 'react-native';

export function ActionButton({ label, onPress }: { label: string; onPress: () => void }) {
  const { animatedStyle, handlers } = usePressAnimation();

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={onPress}
        onPressIn={handlers.onPressIn}
        onPressOut={handlers.onPressOut}
        style={styles.button}
      >
        <Text style={styles.label}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#6366f1',
    alignItems: 'center',
  },
  label: { color: '#fff', fontWeight: '600', fontSize: 15 },
});`}
      />

      <h2 id="custom-config" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Custom config
      </h2>
      <CodeBlock
        filename="SoftPressable.tsx"
        language="tsx"
        code={`const { animatedStyle, handlers } = usePressAnimation({
  pressedScale:   0.98,   // subtler scale — good for large surfaces
  pressedOpacity: 0.92,   // subtler opacity reduction
});

// Disable animation entirely (e.g. when disabled prop is true)
const { animatedStyle } = usePressAnimation({ disabled: true });`}
      />

      <h2 id="interaction-provider" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        InteractionProvider influence
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        The hook reads the intensity from the nearest{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">InteractionProvider</code>{' '}
        and scales the press values accordingly:
      </p>
      <div className="overflow-x-auto rounded-xl border border-white/[0.08] mb-6">
        <table className="w-full text-sm">
          <thead className="border-b border-white/[0.08] bg-white/[0.03]">
            <tr>
              {['Intensity', 'Scale scalar', 'Effect'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider text-white/40 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { intensity: 'subtle', scalar: '0.5×', effect: 'Minimal motion. Press is barely noticeable.' },
              { intensity: 'standard', scalar: '1.0×', effect: 'Default. Your pressedScale value is used as-is.' },
              { intensity: 'expressive', scalar: '1.25×', effect: 'Amplified. Scale delta is 25% larger.' },
            ].map((row) => (
              <tr key={row.intensity} className="border-t border-white/[0.04]">
                <td className="px-4 py-3 font-mono text-violet-300 text-xs">{row.intensity}</td>
                <td className="px-4 py-3 font-mono text-white/60 text-xs">{row.scalar}</td>
                <td className="px-4 py-3 text-white/50 text-xs">{row.effect}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="with-glass" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Combined with glass surfaces
      </h2>
      <CodeBlock
        filename="GlassCard.tsx"
        language="tsx"
        showLineNumbers
        code={`import { usePressAnimation } from 'reactnatively';
import { GlassView } from 'reactnatively';
import Animated from 'react-native-reanimated';
import { Pressable, Text } from 'react-native';

export function GlassCard({ title, onPress }: { title: string; onPress: () => void }) {
  const { animatedStyle, handlers } = usePressAnimation({ pressedScale: 0.97 });

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={onPress}
        onPressIn={handlers.onPressIn}
        onPressOut={handlers.onPressOut}
      >
        <GlassView
          elevation={2}
          borderRadius={20}
          contentStyle={{ padding: 20 }}
        >
          <Text style={{ color: '#fff', fontWeight: '600', fontSize: 17 }}>{title}</Text>
        </GlassView>
      </Pressable>
    </Animated.View>
  );
}`}
      />
    </div>
  );
}
