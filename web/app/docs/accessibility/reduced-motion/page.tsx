import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Reduced Motion',
  description: 'How Reactnatively handles the OS reduced-motion accessibility setting in all animation hooks.',
};

export default function ReducedMotionPage() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs text-violet-400 mb-5">
        Accessibility
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Reduced Motion</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        All motion hooks in Reactnatively read the OS reduced-motion preference via
        Reanimated's{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono">useReducedMotion</code>.
        When the user has enabled "Reduce Motion" in their OS settings, animations snap
        to their final values without interpolation — automatically, with zero extra
        configuration.
      </p>

      <h2 id="how-it-works" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        How it works
      </h2>
      <div className="space-y-2 mb-6">
        {[
          { hook: 'usePressAnimation', behavior: 'When reduced motion is on, press/release snap to scale/opacity end values with no spring.' },
          { hook: 'useEntranceAnimation', behavior: 'When reduced motion is on, visible=true instantly shows at opacity 1, visible=false instantly hides at opacity 0.' },
          { hook: 'useSpring', behavior: 'Returns a collapsed spring config (very high damping, minimal animation) when reduced motion is on.' },
          { hook: 'useDuration', behavior: 'Returns a reduced duration value (from reducedMotion.duration tokens) when reduced motion is on.' },
          { hook: 'Fade / Scale / Slide / BlurTransition', behavior: 'Transition components use useEntranceAnimation internally and inherit the same behavior.' },
        ].map((item) => (
          <div key={item.hook} className="flex gap-3 items-start p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <code className="font-mono text-violet-300 text-xs shrink-0 mt-0.5">{item.hook}</code>
            <span className="text-sm text-white/50">{item.behavior}</span>
          </div>
        ))}
      </div>

      <h2 id="reading-preference" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Reading the preference
      </h2>
      <CodeBlock
        language="typescript"
        code={`import { useReducedMotion } from 'reactnatively';

function MyComponent() {
  const isReduced = useReducedMotion();

  // Use to conditionally skip decorative animations
  if (isReduced) {
    // render static fallback
  }
}`}
      />

      <h2 id="custom-hooks" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Writing reduced-motion-safe custom hooks
      </h2>
      <CodeBlock
        filename="useMyAnimation.ts"
        language="typescript"
        showLineNumbers
        code={`import { useReducedMotion, SPRING_LIQUID } from 'reactnatively';
import { useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

export function useMyAnimation() {
  const isReduced = useReducedMotion();
  const progress = useSharedValue(0);

  function reveal() {
    'worklet';
    if (isReduced) {
      // Snap immediately
      progress.value = 1;
    } else {
      // Animate with spring
      progress.value = withSpring(1, SPRING_LIQUID);
    }
  }

  return { progress, reveal };
}`}
      />

      <h2 id="override" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Forcing reduced motion
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Force reduced motion in a sub-tree via{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">InteractionProvider</code>{' '}
        — useful for testing or for sections of your app that should never animate:
      </p>
      <CodeBlock
        language="tsx"
        code={`import { InteractionProvider } from 'reactnatively';

// Force reduced motion for this screen
<InteractionProvider policy={{ reduceMotion: true }}>
  <StaticScreen />
</InteractionProvider>`}
      />

      <h2 id="testing" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Testing reduced motion
      </h2>
      <div className="space-y-2 mb-6">
        {[
          { platform: 'iOS', path: 'Settings → Accessibility → Motion → Reduce Motion' },
          { platform: 'Android', path: 'Settings → Accessibility → Remove animations (or similar path, varies by OEM)' },
          { platform: 'Simulator / Emulator', path: 'Toggle the setting in the virtual device OS settings' },
        ].map((item) => (
          <div key={item.platform} className="flex gap-3 items-start p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <span className="text-sm font-medium text-white/70 shrink-0">{item.platform}</span>
            <code className="text-xs font-mono text-white/40">{item.path}</code>
          </div>
        ))}
      </div>
    </div>
  );
}
