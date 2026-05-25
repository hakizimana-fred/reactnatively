import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'InteractionProvider',
  description: 'Configure global interaction intensity, press scale, haptic policy, and default spring with InteractionProvider.',
};

export default function InteractionProviderPage() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs text-violet-400 mb-5">
        Motion
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">InteractionProvider</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        The global interaction policy controller. It governs how pronounced press animations
        feel, which spring preset runs by default, and whether haptics are enabled. All
        motion hooks read from this context — one config controls your entire app's feel.
      </p>

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock language="typescript" code={`import { InteractionProvider, useInteraction } from 'reactnatively';
// or
import { InteractionProvider, useInteraction } from 'reactnatively/animations';`} />

      <h2 id="setup" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Setup
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">ReactnativelyProvider</code>{' '}
        already wraps your app in <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">InteractionProvider</code>.
        Pass the{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">interaction</code>{' '}
        prop to configure it:
      </p>
      <CodeBlock
        filename="app/_layout.tsx"
        language="tsx"
        code={`import { ReactnativelyProvider } from 'reactnatively';

export default function RootLayout() {
  return (
    <ReactnativelyProvider
      interaction={{
        intensity:     'standard',  // 'subtle' | 'standard' | 'expressive'
        enableHaptics: true,
        defaultSpring: 'snappy',    // 'snappy' | 'liquid' | 'reveal' | 'bounce' | 'precise'
      }}
    >
      <App />
    </ReactnativelyProvider>
  );
}`}
      />

      <h2 id="policy-props" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Policy props
      </h2>
      <div className="overflow-x-auto rounded-xl border border-white/[0.08] mb-6">
        <table className="w-full text-sm">
          <thead className="border-b border-white/[0.08] bg-white/[0.03]">
            <tr>
              {['Prop', 'Type', 'Default', 'Description'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider text-white/40 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { p: 'intensity', t: "'subtle' | 'standard' | 'expressive'", d: '"standard"', desc: 'Scales the press delta. subtle=0.5×, standard=1×, expressive=1.25×.' },
              { p: 'enableHaptics', t: 'boolean', d: 'true', desc: 'When false, resolveHaptic() returns null for all intents.' },
              { p: 'pressScale', t: 'number', d: '0.96', desc: 'Default target scale on press (before intensity scaling).' },
              { p: 'pressOpacity', t: 'number', d: '0.88', desc: 'Default target opacity on press (before intensity scaling).' },
              { p: 'defaultSpring', t: 'string', d: '"snappy"', desc: 'Which spring preset motion hooks use when no spring is explicitly passed.' },
              { p: 'reduceMotion', t: 'boolean', d: 'undefined', desc: 'Override to force reduced motion regardless of OS setting.' },
            ].map((row) => (
              <tr key={row.p} className="border-t border-white/[0.04]">
                <td className="px-4 py-3 font-mono text-violet-300 text-xs whitespace-nowrap">{row.p}</td>
                <td className="px-4 py-3 font-mono text-blue-300 text-xs">{row.t}</td>
                <td className="px-4 py-3 font-mono text-white/30 text-xs">{row.d}</td>
                <td className="px-4 py-3 text-white/50 text-xs leading-relaxed">{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="use-interaction" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        useInteraction
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Read and use the interaction policy in your own components:
      </p>
      <CodeBlock
        filename="CustomPressable.tsx"
        language="tsx"
        showLineNumbers
        code={`import { useInteraction } from 'reactnatively';
import { withSpring, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

export function CustomPressable() {
  const interaction = useInteraction();
  const pressed = useSharedValue(0);

  const spring = interaction.resolveSpring('snappy');
  const { scale, opacity } = interaction.resolvePress(0.95, 0.85);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: pressed.value === 1 ? scale : 1 }],
    opacity:   pressed.value === 1 ? opacity : 1,
  }));

  return (
    // ... Pressable using spring and style
  );
}`}
      />

      <h2 id="nested-providers" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Nested providers
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Nest a second{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">InteractionProvider</code>{' '}
        to change intensity in a specific screen or section — for example, making a game
        screen more expressive without affecting the rest of the app:
      </p>
      <CodeBlock
        language="tsx"
        code={`import { InteractionProvider } from 'reactnatively';

export function GameScreen() {
  return (
    <InteractionProvider policy={{ intensity: 'expressive', defaultSpring: 'bounce' }}>
      <GameUI />
    </InteractionProvider>
  );
}`}
      />
    </div>
  );
}
