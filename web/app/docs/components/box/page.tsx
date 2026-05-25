import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Box',
  description: 'Universal layout primitive with spacing, sizing, and flex shorthand props.',
};

const props = [
  { name: 'p / px / py / pt / pb / pl / pr', type: 'SpacingKey | number', default: 'undefined', description: 'Padding shorthand props. SpacingKey maps to theme spacing tokens.' },
  { name: 'm / mx / my / mt / mb / ml / mr', type: 'SpacingKey | number', default: 'undefined', description: 'Margin shorthand props.' },
  { name: 'flex', type: 'number', default: 'undefined', description: 'Flex grow/shrink factor.' },
  { name: 'direction', type: 'FlexDirection', default: 'undefined', description: 'Flex direction (row, column, etc.).' },
  { name: 'align', type: 'FlexAlign', default: 'undefined', description: 'alignItems value.' },
  { name: 'justify', type: 'FlexJustify', default: 'undefined', description: 'justifyContent value.' },
  { name: 'wrap', type: 'FlexWrap', default: 'undefined', description: 'flexWrap value.' },
  { name: 'gap', type: 'SpacingKey | number', default: 'undefined', description: 'Gap between flex children.' },
  { name: 'width / height', type: 'number | string', default: 'undefined', description: 'Explicit dimensions.' },
  { name: 'minWidth / maxWidth / minHeight / maxHeight', type: 'number | string', default: 'undefined', description: 'Size constraints.' },
  { name: 'bg', type: 'string', default: 'undefined', description: 'Background color.' },
  { name: 'borderRadius', type: 'RadiiKey | number', default: 'undefined', description: 'Corner radius using a theme token or pixel value.' },
  { name: 'overflow', type: "'visible' | 'hidden' | 'scroll'", default: 'undefined', description: 'Overflow behaviour.' },
  { name: 'opacity', type: 'number', default: 'undefined', description: 'Opacity (0–1).' },
  { name: 'position', type: "'relative' | 'absolute'", default: 'undefined', description: 'CSS-style position.' },
  { name: 'top / right / bottom / left / zIndex', type: 'number', default: 'undefined', description: 'Position offset and z-index.' },
  { name: 'style', type: 'StyleProp<ViewStyle>', default: 'undefined', description: 'Escape hatch for arbitrary styles.' },
  { name: 'children', type: 'ReactNode', default: 'undefined', description: 'Content rendered inside the box.' },
];

export default function BoxPage() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 mb-5">
        reactnatively
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Box</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        The universal layout primitive. Express spacing, sizing, flex, and position
        constraints directly as props — eliminating most <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">StyleSheet</code> boilerplate for
        structural layout.
      </p>

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock
        language="typescript"
        code={`import { Box } from 'reactnatively';`}
      />

      <h2 id="hero-section" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Hero section layout
      </h2>
      <CodeBlock
        filename="HeroSection.tsx"
        language="tsx"
        code={`import { Box, Heading, Text, Button } from 'reactnatively';

export function HeroSection() {
  return (
    <Box flex={1} justify="center" align="center" px={24} py={48}>
      <Box
        bg="rgba(139,92,246,0.15)"
        borderRadius={16}
        px={12}
        py={6}
        mb={20}
      >
        <Text variant="xs" color="#a78bfa" weight="semibold">
          New in 2.0
        </Text>
      </Box>

      <Heading level="h1" align="center" style={{ marginBottom: 16 }}>
        Build faster with Glass
      </Heading>

      <Text variant="lg" align="center" color="rgba(255,255,255,0.5)" style={{ marginBottom: 32 }}>
        Production-ready components for React Native and Expo
      </Text>

      <Box direction="row" gap={12}>
        <Button variant="solid" color="primary" size="lg">Get Started</Button>
        <Button variant="glass" size="lg">View Docs</Button>
      </Box>
    </Box>
  );
}`}
        showLineNumbers
      />

      <h2 id="card-layout" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Card with absolute badge
      </h2>
      <CodeBlock
        filename="NotificationCard.tsx"
        language="tsx"
        code={`import { Box, Text, Heading } from 'reactnatively';

export function NotificationCard({ unread, title, body }) {
  return (
    <Box
      bg="rgba(255,255,255,0.05)"
      borderRadius={16}
      p={20}
      mb={12}
      position="relative"
      overflow="hidden"
    >
      {unread && (
        <Box
          position="absolute"
          top={16}
          right={16}
          width={8}
          height={8}
          borderRadius={4}
          bg="#6366f1"
        />
      )}
      <Heading level="h5" style={{ marginBottom: 6 }}>{title}</Heading>
      <Text variant="sm" color="rgba(255,255,255,0.5)" numberOfLines={2}>
        {body}
      </Text>
    </Box>
  );
}`}
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
