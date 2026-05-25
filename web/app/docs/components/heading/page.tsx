import type { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Heading',
  description: 'Semantic heading component from h1 to h6 with weight and alignment control.',
};

const props = [
  { name: 'level', type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'", default: '"h2"', description: 'Semantic heading level — controls font size.' },
  { name: 'weight', type: "'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold'", default: '"bold"', description: 'Font weight of the heading.' },
  { name: 'color', type: 'string', default: '"#ffffff"', description: 'Text color.' },
  { name: 'align', type: "'left' | 'center' | 'right'", default: '"left"', description: 'Text alignment.' },
  { name: 'style', type: 'StyleProp<TextStyle>', default: 'undefined', description: 'Additional text styles.' },
  { name: 'children', type: 'ReactNode', default: '—', description: 'Heading content.' },
];

export default function HeadingPage() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 mb-5">
        reactnatively
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Heading</h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        A semantic heading component spanning h1–h6 levels with consistent type scale,
        weight, color, and alignment control. Pairs naturally with <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-violet-300 font-mono text-[0.85em]">Text</code> for
        body copy.
      </p>

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock
        language="typescript"
        code={`import { Heading } from 'reactnatively';`}
      />

      <h2 id="type-scale" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Type scale showcase
      </h2>
      <CodeBlock
        filename="TypographyScreen.tsx"
        language="tsx"
        code={`import { ScrollView, StyleSheet } from 'react-native';
import { Heading, Text } from 'reactnatively';

export function TypographyScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Heading level="h1">Heading 1 — Display</Heading>
      <Heading level="h2">Heading 2 — Title</Heading>
      <Heading level="h3">Heading 3 — Section</Heading>
      <Heading level="h4">Heading 4 — Card title</Heading>
      <Heading level="h5" weight="semibold">Heading 5 — Label</Heading>
      <Heading level="h6" weight="medium" color="rgba(255,255,255,0.6)">
        Heading 6 — Caption title
      </Heading>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, gap: 16 },
});`}
        showLineNumbers
      />

      <h2 id="article-layout" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Article layout
      </h2>
      <CodeBlock
        filename="ArticleScreen.tsx"
        language="tsx"
        code={`import { ScrollView, View, StyleSheet } from 'react-native';
import { Heading, Text, Badge } from 'reactnatively';

export function ArticleScreen({ article }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Badge label={article.category} status="primary" variant="subtle" size="sm" style={{ alignSelf: 'flex-start' }} />
      <Heading level="h1" style={styles.title}>{article.title}</Heading>
      <Heading level="h5" weight="medium" color="rgba(255,255,255,0.5)" style={styles.subtitle}>
        {article.subtitle}
      </Heading>
      <View style={styles.meta}>
        <Text variant="xs" color="rgba(255,255,255,0.4)">{article.author}</Text>
        <Text variant="xs" color="rgba(255,255,255,0.3)">·</Text>
        <Text variant="xs" color="rgba(255,255,255,0.4)">{article.readTime} min read</Text>
      </View>
      <Text variant="md" color="rgba(255,255,255,0.7)" style={styles.body}>
        {article.body}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  title: { marginTop: 12, marginBottom: 8 },
  subtitle: { marginBottom: 12 },
  meta: { flexDirection: 'row', gap: 6, marginBottom: 24 },
  body: { lineHeight: 26 },
});`}
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
