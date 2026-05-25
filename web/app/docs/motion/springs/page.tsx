import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Spring Presets',
  description: 'Pre-configured Reanimated spring configs — SPRING_SNAPPY, SPRING_LIQUID, SPRING_REVEAL, SPRING_BOUNCE, SPRING_PRECISE.',
};

const presets = [
  {
    name: 'SPRING_SNAPPY',
    damping: 28,
    stiffness: 340,
    use: 'Press/release interactions, toggles, quick UI feedback',
    feel: 'Fast and decisive. Snaps into place.',
  },
  {
    name: 'SPRING_LIQUID',
    damping: 24,
    stiffness: 260,
    use: 'Floating panels, glass surfaces, page transitions',
    feel: 'Smooth and organic. Feels like fluid motion.',
  },
  {
    name: 'SPRING_REVEAL',
    damping: 22,
    stiffness: 200,
    use: 'Entrance animations, modals appearing, content reveal',
    feel: 'Deliberate arrival with slight settle.',
  },
  {
    name: 'SPRING_BOUNCE',
    damping: 14,
    stiffness: 280,
    use: 'Playful UI elements, celebration states, FAB press',
    feel: 'Bouncy overshoot. Expressive and fun.',
  },
  {
    name: 'SPRING_PRECISE',
    damping: 36,
    stiffness: 400,
    use: 'Value sliders, precise positioning, charts',
    feel: 'Near-instant, minimal overshoot. Very controlled.',
  },
];

export default function SpringsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Spring Presets</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        Five spring configurations tuned for specific interaction types. Each preset is a{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono">WithSpringConfig</code>{' '}
        — pass it directly to Reanimated's{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono">withSpring</code>.
      </p>

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock
        language="typescript"
        code={`import {
  SPRING_SNAPPY,
  SPRING_LIQUID,
  SPRING_REVEAL,
  SPRING_BOUNCE,
  SPRING_PRECISE,
} from 'reactnatively';
// or from 'reactnatively/animations'`}
      />

      <h2 id="presets" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Preset reference
      </h2>
      <div className="space-y-3 mb-6">
        {presets.map((preset) => (
          <div key={preset.name} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="flex items-center gap-3 mb-2">
              <code className="text-violet-300 font-mono text-sm font-bold">{preset.name}</code>
              <span className="text-xs text-white/30 font-mono">
                {`{ damping: ${preset.damping}, stiffness: ${preset.stiffness} }`}
              </span>
            </div>
            <p className="text-sm text-white/55 mb-1">{preset.feel}</p>
            <p className="text-xs text-white/30">Best for: {preset.use}</p>
          </div>
        ))}
      </div>

      <h2 id="usage" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Usage with withSpring
      </h2>
      <CodeBlock
        language="typescript"
        showLineNumbers
        code={`import { useSharedValue, withSpring } from 'react-native-reanimated';
import { SPRING_LIQUID, SPRING_SNAPPY } from 'reactnatively';

const scale = useSharedValue(1);
const opacity = useSharedValue(1);

function onPressIn() {
  'worklet';
  scale.value   = withSpring(0.96, SPRING_SNAPPY);
  opacity.value = withSpring(0.88, SPRING_SNAPPY);
}

function onReveal() {
  'worklet';
  scale.value = withSpring(1, SPRING_LIQUID);
}`}
      />

      <h2 id="use-spring-hook" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        useSpring — reduced-motion aware
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Use the{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">useSpring</code>{' '}
        hook instead of importing a preset directly when you want reduced-motion
        handling — it returns a collapsed spring when the OS setting is on:
      </p>
      <CodeBlock
        language="typescript"
        code={`import { useSpring } from 'reactnatively';

// Returns reducedMotion-safe spring
const springConfig = useSpring('liquid');`}
      />

      <h2 id="custom-springs" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Custom springs
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Create your own spring configs by extending a preset:
      </p>
      <CodeBlock
        language="typescript"
        code={`import { SPRING_LIQUID } from 'reactnatively';
import type { WithSpringConfig } from 'react-native-reanimated';

// Slower, heavier liquid — for large panels
const SPRING_HEAVY: WithSpringConfig = {
  ...SPRING_LIQUID,
  damping: 30,
  stiffness: 200,
};`}
      />
    </div>
  );
}
