import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'AccessibilityProvider',
  description: 'Shared accessibility policy context for font scaling, touch targets, and contrast in Reactnatively.',
};

export default function AccessibilityProviderPage() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs text-violet-400 mb-5">
        Accessibility
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">AccessibilityProvider</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        A React context provider that shares accessibility policies across all components
        in its tree — font scaling behavior, minimum touch target sizes, contrast mode, and
        haptic intent resolution.
      </p>

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock language="typescript" code={`import { AccessibilityProvider, useAccessibilityPolicy } from 'reactnatively';
// or
import { AccessibilityProvider, useAccessibilityPolicy } from 'reactnatively/primitives';`} />

      <h2 id="setup" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Setup
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">ReactnativelyProvider</code>{' '}
        wraps your app in{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">AccessibilityProvider</code>{' '}
        automatically. Use it standalone only when you need a different policy in a
        sub-tree:
      </p>
      <CodeBlock
        filename="app/_layout.tsx"
        language="tsx"
        code={`import { ReactnativelyProvider } from 'reactnatively';

export default function RootLayout() {
  return (
    <ReactnativelyProvider
      accessibility={{
        allowFontScaling: true,      // true = respect system font size
        minimumTouchTarget: 44,      // 44pt minimum touch area (Apple HIG)
      }}
    >
      <App />
    </ReactnativelyProvider>
  );
}`}
      />

      <h2 id="standalone" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Standalone usage
      </h2>
      <CodeBlock
        filename="KioskMode.tsx"
        language="tsx"
        code={`import { AccessibilityProvider } from 'reactnatively';

// Kiosk mode: larger touch targets, no font scaling
export function KioskShell({ children }: { children: React.ReactNode }) {
  return (
    <AccessibilityProvider policy={{ allowFontScaling: false, minimumTouchTarget: 56 }}>
      {children}
    </AccessibilityProvider>
  );
}`}
      />

      <h2 id="use-policy" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        useAccessibilityPolicy
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Read the active accessibility policy in your own components:
      </p>
      <CodeBlock
        filename="CustomButton.tsx"
        language="tsx"
        showLineNumbers
        code={`import { useAccessibilityPolicy } from 'reactnatively';
import { Text, Pressable, View } from 'react-native';

export function CustomButton({ label, onPress }: { label: string; onPress: () => void }) {
  const { allowFontScaling, minimumTouchTarget } = useAccessibilityPolicy();

  return (
    <Pressable
      onPress={onPress}
      style={{ minWidth: minimumTouchTarget, minHeight: minimumTouchTarget }}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text allowFontScaling={allowFontScaling} style={{ color: '#fff', fontWeight: '600' }}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}`}
      />

      <h2 id="visually-hidden" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        VisuallyHidden
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Use{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">VisuallyHidden</code>{' '}
        to render content that is visible to screen readers but not on screen:
      </p>
      <CodeBlock
        language="tsx"
        code={`import { VisuallyHidden } from 'reactnatively';

// Icon button where the visible icon has no text label
<Pressable accessibilityRole="button">
  <SearchIcon />
  <VisuallyHidden>
    <Text>Search</Text>
  </VisuallyHidden>
</Pressable>`}
      />
    </div>
  );
}
