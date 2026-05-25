import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Motion Overview',
  description: 'Overview of the Reactnatively motion system — spring presets, hooks, transition components, and InteractionProvider.',
};

export default function MotionOverviewPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Motion</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        Reactnatively's motion system is built on{' '}
        <strong className="text-white/80">react-native-reanimated</strong>. It ships
        pre-configured spring presets, interaction-aware press animations, entrance
        animation hooks, and transition components — all coordinated by the global
        <strong className="text-white/80"> InteractionProvider</strong>.
      </p>

      <h2 id="building-blocks" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Building blocks
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {[
          { title: 'Spring presets', desc: 'SPRING_SNAPPY, SPRING_LIQUID, SPRING_REVEAL, SPRING_BOUNCE, SPRING_PRECISE — ready to pass to withSpring()', href: '/docs/motion/springs' },
          { title: 'usePressAnimation', desc: 'Scale + opacity animation tied to press/release events. Reads intensity from InteractionProvider.', href: '/docs/motion/use-press-animation' },
          { title: 'useEntranceAnimation', desc: 'Entrance variants: fade, scale, slideUp, slideDown. Reduced motion safe.', href: '/docs/motion/use-entrance-animation' },
          { title: 'InteractionProvider', desc: 'Global intensity policy, press scale, default spring, and haptic config.', href: '/docs/motion/interaction-provider' },
          { title: 'Transition components', desc: 'Fade, Scale, Slide, BlurTransition — declarative enter/exit wrappers.', href: '/docs/components/fade' },
          { title: 'MagneticPressable', desc: 'Pressable with magnetic pull-back motion on touch.', href: '/docs/components/magnetic-pressable' },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-start justify-between gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] transition-all"
          >
            <div>
              <div className="font-medium text-white text-sm mb-1">{item.title}</div>
              <div className="text-xs text-white/40 leading-relaxed">{item.desc}</div>
            </div>
            <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/50 shrink-0 mt-0.5 transition-all" />
          </Link>
        ))}
      </div>

      <h2 id="reduced-motion" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Reduced motion
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        All motion hooks read the OS reduced-motion accessibility setting via Reanimated's{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">useReducedMotion</code>.
        When reduced motion is enabled, animations snap to their end state without
        interpolation. No extra configuration needed.
      </p>
      <CodeBlock
        language="typescript"
        code={`import { useReducedMotion } from 'reactnatively';

function MyAnimatedComponent() {
  const isReduced = useReducedMotion();
  // isReduced === true when system setting is on
  // All built-in motion hooks handle this automatically
}`}
      />

      <h2 id="quick-start" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Quick start — press animation
      </h2>
      <CodeBlock
        filename="PressableCard.tsx"
        language="tsx"
        showLineNumbers
        code={`import { usePressAnimation } from 'reactnatively';
import Animated from 'react-native-reanimated';
import { Pressable, Text } from 'react-native';

export function PressableCard() {
  const { animatedStyle, handlers } = usePressAnimation({
    pressedScale:   0.96,  // scale down 4% on press
    pressedOpacity: 0.88,  // reduce opacity on press
  });

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPressIn={handlers.onPressIn}
        onPressOut={handlers.onPressOut}
        style={{ padding: 20, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.06)' }}
      >
        <Text style={{ color: '#fff' }}>Press me</Text>
      </Pressable>
    </Animated.View>
  );
}`}
      />

      <h2 id="quick-start-entrance" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Quick start — entrance animation
      </h2>
      <CodeBlock
        filename="AnimatedCard.tsx"
        language="tsx"
        showLineNumbers
        code={`import { useEntranceAnimation } from 'reactnatively';
import Animated from 'react-native-reanimated';
import { View, Text } from 'react-native';

export function AnimatedCard({ visible }: { visible: boolean }) {
  const style = useEntranceAnimation({
    variant:  'slideUp',   // 'fade' | 'scale' | 'slideUp' | 'slideDown'
    visible,
    delay:    80,          // ms delay before animation starts
  });

  return (
    <Animated.View style={style}>
      <View style={{ padding: 20 }}>
        <Text style={{ color: '#fff' }}>Animated content</Text>
      </View>
    </Animated.View>
  );
}`}
      />

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/docs/motion/springs"
          className="flex items-center gap-2 px-4 h-9 rounded-xl bg-white/[0.08] border border-white/[0.10] text-white text-sm hover:bg-white/[0.12] transition-all"
        >
          Spring presets
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/docs/motion/interaction-provider"
          className="flex items-center gap-2 px-4 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/70 text-sm hover:bg-white/[0.09] transition-all"
        >
          InteractionProvider
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
