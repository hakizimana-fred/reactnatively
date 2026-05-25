import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Accessibility Overview',
  description: 'How Reactnatively supports screen readers, reduced motion, font scaling, and touch target sizing.',
};

export default function AccessibilityOverviewPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Accessibility</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        Reactnatively is designed with accessibility as a first-class concern — not an
        afterthought. Components ship with sensible defaults for screen readers, touch
        targets, font scaling, and reduced motion. Most of the work is already done.
      </p>

      <h2 id="built-in" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        What's built in
      </h2>
      <div className="space-y-3 mb-6">
        {[
          {
            title: 'Reduced motion',
            desc: 'All Reanimated-powered animations read the OS reduced-motion setting. When enabled, animations snap to their end state with no interpolation. No configuration needed.',
          },
          {
            title: 'Minimum touch targets',
            desc: 'Interactive components maintain at least 44×44pt touch targets per Apple HIG and 48×48dp per Material Design, even when the visible element is smaller.',
          },
          {
            title: 'Font scaling',
            desc: 'Typography components respect the system font scale by default. allowFontScaling can be disabled per-component when the design requires it.',
          },
          {
            title: 'Screen reader labels',
            desc: 'Interactive components accept accessibilityLabel, accessibilityHint, and accessibilityRole props. Form components wire these to native accessibility trees.',
          },
          {
            title: 'Focus management',
            desc: 'Modals, bottom sheets, and dialogs trap focus when open and restore it on close.',
          },
          {
            title: 'High contrast',
            desc: 'Glass surfaces use text contrast ratios that meet WCAG AA regardless of the blur layer beneath them.',
          },
        ].map((item) => (
          <div key={item.title} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="font-medium text-white/80 text-sm mb-1">{item.title}</div>
            <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 id="labels" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Adding accessibility labels
      </h2>
      <CodeBlock
        language="tsx"
        showLineNumbers
        code={`import { Button, IconButton, Switch } from 'reactnatively';

// All interactive components accept standard RN accessibility props
<Button
  accessibilityLabel="Submit form"
  accessibilityHint="Validates and sends your data"
  onPress={handleSubmit}
  label="Submit"
/>

<IconButton
  icon={<SearchIcon />}
  accessibilityLabel="Open search"
  onPress={openSearch}
/>

<Switch
  value={notifications}
  onValueChange={setNotifications}
  accessibilityLabel="Enable push notifications"
/>`}
      />

      <h2 id="roles" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Accessibility roles
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Most components set the correct{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">accessibilityRole</code>{' '}
        automatically. Override when your use case differs from the default:
      </p>
      <CodeBlock
        language="tsx"
        code={`// Button defaults to role="button" — override when used as a link
<Button
  accessibilityRole="link"
  onPress={() => Linking.openURL(url)}
  label="Open docs"
/>

// GlassView is a plain View — set role when meaningful
<GlassView
  accessibilityRole="article"
  accessibilityLabel="News item: Apollo mission"
  elevation={2}
>`}
      />

      <h2 id="reduce-transparency" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Reduce transparency
      </h2>
      <p className="text-white/60 leading-relaxed mb-4">
        iOS users can enable "Reduce Transparency" in Settings. Pass{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">reduceTransparency: true</code>{' '}
        to{' '}
        <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">GlassPlatformProvider</code>{' '}
        to disable all blur and switch to solid surfaces:
      </p>
      <CodeBlock
        language="tsx"
        code={`import { GlassPlatformProvider } from 'reactnatively/glass';
import { AccessibilityInfo } from 'react-native';

const [reduceTransparency, setReduceTransparency] = useState(false);

useEffect(() => {
  AccessibilityInfo.isReduceTransparencyEnabled().then(setReduceTransparency);
}, []);

return (
  <GlassPlatformProvider material={{ reduceTransparency }}>
    <App />
  </GlassPlatformProvider>
);`}
      />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { title: 'AccessibilityProvider', desc: 'Global accessibility context and policy.', href: '/docs/accessibility/provider' },
          { title: 'Reduced Motion', desc: 'How motion hooks handle the OS setting.', href: '/docs/accessibility/reduced-motion' },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] transition-all"
          >
            <div>
              <div className="font-medium text-white text-sm mb-0.5">{link.title}</div>
              <div className="text-xs text-white/40">{link.desc}</div>
            </div>
            <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-all" />
          </Link>
        ))}
      </div>
    </div>
  );
}
