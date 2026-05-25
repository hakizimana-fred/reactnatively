import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Quick Start',
  description: 'Build your first glass-native UI with Reactnatively.',
};

export default function QuickStartPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Quick Start</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        Build your first glass-native UI in under 5 minutes.
      </p>

      <h2 id="your-first-glass-component" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Your first glass component
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        After{' '}
        <Link href="/docs/getting-started/installation" className="text-violet-400 hover:text-violet-300 underline underline-offset-2 decoration-violet-400/40 transition-colors">
          installing Reactnatively
        </Link>
        , create a simple glass card:
      </p>
      <CodeBlock
        filename="screens/HomeScreen.tsx"
        language="tsx"
        code={`import { View, Text } from 'react-native';
import { GlassView } from 'reactnatively';

export function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#060610' }}>
      {/* Frosted glass card */}
      <GlassView
        elevation={2}
        variant="surface"
        borderRadius={20}
        style={{
          margin: 20,
          padding: 20,
        }}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>
          Liquid Glass 🪟
        </Text>
        <Text style={{ color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>
          Adaptive blur, native depth.
        </Text>
      </GlassView>
    </View>
  );
}`}
        showLineNumbers
      />

      <h2 id="adding-motion" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Adding motion
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Use <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">usePressAnimation</code>{' '}
        to add spring-physics press feedback:
      </p>
      <CodeBlock
        filename="components/GlassButton.tsx"
        language="tsx"
        code={`import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
import { GlassView, usePressAnimation, SPRING_LIQUID } from 'reactnatively';

export function GlassButton({ onPress, children }) {
  const { animatedStyle, handlers } = usePressAnimation({
    scaleDown: 0.95,
    config: SPRING_LIQUID,
  });

  return (
    <Pressable onPress={onPress} {...handlers}>
      <Animated.View style={animatedStyle}>
        <GlassView elevation={2} borderRadius={14} style={{ padding: 16 }}>
          {children}
        </GlassView>
      </Animated.View>
    </Pressable>
  );
}`}
        showLineNumbers
      />

      <h2 id="using-the-theme" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Using the theme
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Access design tokens via the <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">useTheme</code> hook:
      </p>
      <CodeBlock
        language="tsx"
        code={`import { useTheme, useIsDark } from 'reactnatively';

function Component() {
  const { colors, spacing, glass } = useTheme();
  const isDark = useIsDark();

  return (
    <View
      style={{
        backgroundColor: isDark
          ? colors.background
          : colors.backgroundLight,
        padding: spacing[4],
      }}
    />
  );
}`}
      />

      <h2 id="next-steps" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Next steps
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { title: 'Glass Engine', desc: 'Deep dive into the blur system', href: '/docs/glass-engine' },
          { title: 'Components', desc: 'Explore all 80+ components', href: '/docs/components/layout' },
          { title: 'Theming', desc: 'Customize tokens and materials', href: '/docs/theming/overview' },
          { title: 'Motion', desc: 'Spring physics and animation hooks', href: '/docs/motion/overview' },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all"
          >
            <div>
              <div className="text-sm font-medium text-white">{link.title}</div>
              <div className="text-xs text-white/40 mt-0.5">{link.desc}</div>
            </div>
            <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all" />
          </Link>
        ))}
      </div>
    </div>
  );
}
