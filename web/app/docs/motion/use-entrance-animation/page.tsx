import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'useEntranceAnimation',
  description: 'Animate component entrance and exit with fade, scale, slideUp, and slideDown variants using Reanimated.',
};

export default function UseEntranceAnimationPage() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs text-violet-400 mb-5">
        Motion
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">useEntranceAnimation</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        A Reanimated hook for entrance and exit animations. Returns an{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono">AnimatedStyle</code>{' '}
        driven by a{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono">visible</code>{' '}
        boolean. Automatically respects the OS reduced-motion setting.
      </p>

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock language="typescript" code={`import { useEntranceAnimation } from 'reactnatively';
// or
import { useEntranceAnimation } from 'reactnatively/animations';`} />

      <h2 id="signature" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Signature
      </h2>
      <CodeBlock
        language="typescript"
        code={`function useEntranceAnimation(config?: EntranceAnimationConfig): AnimatedStyle<ViewStyle>

interface EntranceAnimationConfig {
  variant?:     EntranceVariant;  // default 'fade'
  delay?:       number;           // ms before animation starts, default 0
  slideOffset?: number;           // px slide distance, default 20
  visible?:     boolean;          // drives in/out, default true
}

type EntranceVariant = 'fade' | 'slideUp' | 'slideDown' | 'scale' | 'none';`}
      />

      <h2 id="variants" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Variants
      </h2>
      <div className="overflow-x-auto rounded-xl border border-white/[0.08] mb-6">
        <table className="w-full text-sm">
          <thead className="border-b border-white/[0.08] bg-white/[0.03]">
            <tr>
              {['Variant', 'Entrance', 'Exit', 'Best for'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider text-white/40 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { v: 'fade', enter: 'opacity 0→1', exit: 'opacity 1→0', use: 'General purpose. Subtle and versatile.' },
              { v: 'scale', enter: 'scale 0.92→1 + fade', exit: 'scale 1→0.92 + fade', use: 'Modals, popovers, tooltips.' },
              { v: 'slideUp', enter: 'translateY +offset→0 + fade', exit: 'translateY 0→+offset + fade', use: 'Bottom sheets, cards appearing from below.' },
              { v: 'slideDown', enter: 'translateY -offset→0 + fade', exit: 'translateY 0→-offset + fade', use: 'Dropdowns, menus appearing from above.' },
              { v: 'none', enter: 'instant', exit: 'instant', use: 'Skip animation (override for specific elements).' },
            ].map((row) => (
              <tr key={row.v} className="border-t border-white/[0.04]">
                <td className="px-4 py-3 font-mono text-violet-300 text-xs">{row.v}</td>
                <td className="px-4 py-3 text-white/50 text-xs font-mono">{row.enter}</td>
                <td className="px-4 py-3 text-white/50 text-xs font-mono">{row.exit}</td>
                <td className="px-4 py-3 text-white/40 text-xs">{row.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="basic-usage" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Basic usage
      </h2>
      <CodeBlock
        filename="AnimatedPanel.tsx"
        language="tsx"
        showLineNumbers
        code={`import { useState } from 'react';
import { useEntranceAnimation } from 'reactnatively';
import Animated from 'react-native-reanimated';
import { Pressable, Text, View } from 'react-native';

export function AnimatedPanel() {
  const [visible, setVisible] = useState(false);

  const style = useEntranceAnimation({
    variant: 'slideUp',
    visible,
    delay:   50,
  });

  return (
    <View>
      <Pressable onPress={() => setVisible((v) => !v)}>
        <Text style={{ color: '#fff' }}>Toggle panel</Text>
      </Pressable>

      <Animated.View style={style}>
        <View style={{ padding: 20, marginTop: 12, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.08)' }}>
          <Text style={{ color: '#fff' }}>Animated panel</Text>
        </View>
      </Animated.View>
    </View>
  );
}`}
      />

      <h2 id="staggered" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Staggered list animation
      </h2>
      <CodeBlock
        filename="StaggeredList.tsx"
        language="tsx"
        showLineNumbers
        code={`import { useEntranceAnimation } from 'reactnatively';
import Animated from 'react-native-reanimated';
import { View, Text } from 'react-native';

const items = ['Dashboard', 'Analytics', 'Settings', 'Profile'];

function ListRow({ label, index }: { label: string; index: number }) {
  const style = useEntranceAnimation({
    variant: 'slideUp',
    visible: true,
    delay:   index * 60,   // stagger by 60ms per item
  });

  return (
    <Animated.View style={style}>
      <View style={{ padding: 16, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.05)', marginBottom: 8 }}>
        <Text style={{ color: '#fff', fontWeight: '500' }}>{label}</Text>
      </View>
    </Animated.View>
  );
}

export function StaggeredList() {
  return (
    <View style={{ padding: 16 }}>
      {items.map((item, i) => (
        <ListRow key={item} label={item} index={i} />
      ))}
    </View>
  );
}`}
      />
    </div>
  );
}
