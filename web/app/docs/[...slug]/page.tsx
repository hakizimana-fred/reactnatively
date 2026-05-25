import type { Metadata } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import { AutoComponentPreview } from '@/components/docs/AutoComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { docsNav } from '@/lib/docs';
import { absoluteUrl, jsonLd, siteName, seoKeywords } from '@/lib/seo';

interface PropRow {
  name: string;
  type: string;
  default: string;
  description: string;
  options?: string[];
}

interface ComponentDoc {
  name: string;
  slug: string;
  category: string;
  description: string;
  props: PropRow[];
}

interface SourceEntry {
  filePath: string;
  source: string;
}

const packagesRoot = path.join(/* turbopackIgnore: true */ process.cwd(), '..', 'packages');
const packageSourceRoots = [
  path.join(packagesRoot, 'core', 'src', 'components'),
  path.join(packagesRoot, 'glass', 'src', 'components'),
  path.join(packagesRoot, 'primitives', 'src'),
];

let sourceEntriesCache: SourceEntry[] | undefined;

const descriptions: Record<string, string> = {
  BlurTransition: 'Smooth blur-based animated transition component.',
  BlurSurface: 'Glass-aware blur surface for elevated, translucent UI regions.',
  FrostPanel: 'Full-width glass panel for bottom sheets, headers, and anchored surfaces.',
  GlassPressable: 'Pressable primitive with glass-aware interaction styling.',
  GlassText: 'Theme-aware text primitive for glass and high-contrast surfaces.',
  Portal: 'Portal primitive for rendering content outside the current tree.',
  PortalHost: 'Portal mount point for overlay and floating UI content.',
  PortalProvider: 'Provider that coordinates portal entries across the app.',
  Slot: 'Composition primitive for passing behavior into a child element.',
  AccessibilityProvider: 'Provider for shared accessibility and interaction policies.',
  VisuallyHidden: 'Accessibility primitive for content available to assistive technologies.',
  PasswordInput: 'Secure text field with built-in password visibility controls.',
  SearchBar: 'Search input optimized for filtering lists, commands, and content.',
  TextArea: 'Multiline text input for longer form values.',
  Checkbox: 'Binary selection control for forms and settings.',
  Radio: 'Single-choice selection control for grouped options.',
  RadioGroup: 'Grouped radio control for choosing one option from a set.',
  Slider: 'Single-value range control for numeric input.',
  RangeSlider: 'Dual-thumb range control for selecting minimum and maximum values.',
  Select: 'Menu-based single selection control.',
  MultiSelect: 'Menu-based multi-selection control.',
  OTPInput: 'One-time password input with segmented entry fields.',
  DatePicker: 'Date selection control with typed React Native props.',
  TimePicker: 'Time selection control with typed React Native props.',
  FormControl: 'Shared form wrapper for labels, helper text, errors, and required state.',
  HStack: 'Horizontal stack layout primitive with consistent spacing.',
  VStack: 'Vertical stack layout primitive with consistent spacing.',
  Grid: 'Responsive layout primitive for structured two-dimensional placement.',
  Flex: 'Flexible layout primitive for row and column composition.',
  Center: 'Layout primitive that centers children on both axes.',
  Container: 'Content-width layout primitive with responsive max widths.',
  Surface: 'Theme-aware surface primitive for elevated panels and glass layers.',
  Divider: 'Visual separator for lists, sections, and stacked content.',
  Spacer: 'Layout utility for adding predictable spacing.',
  AspectRatio: 'Layout primitive that preserves a fixed width-to-height ratio.',
  Paragraph: 'Readable body text primitive with theme-aware sizing.',
  Caption: 'Compact supporting text for metadata and annotations.',
  GradientText: 'Text primitive with gradient styling.',
  Code: 'Inline code typography primitive.',
  Link: 'Text link primitive with accessible press states.',
  Accordion: 'Expandable content sections for dense information displays.',
  List: 'Structured list display with optional sections and item metadata.',
  ListItem: 'Structured list row with labels, metadata, icons, and actions.',
  StatsCard: 'Metric card for dashboards and analytical summaries.',
  Table: 'Tabular data display with typed columns.',
  Timeline: 'Chronological event display for activity and process history.',
  Carousel: 'Swipeable display for grouped cards or media.',
  TopNavigation: 'Top app navigation bar for titles, actions, and routes.',
  Drawer: 'Side navigation panel for app-level destinations.',
  Sidebar: 'Side navigation component for nested app destinations.',
  SegmentedTabs: 'Segmented control for switching between related views.',
  Breadcrumb: 'Hierarchical navigation trail.',
  Stepper: 'Multi-step progress and workflow navigation component.',
  Alert: 'Inline feedback message for status and validation states.',
  ProgressBar: 'Linear progress indicator for determinate and indeterminate work.',
  Skeleton: 'Loading placeholder for pending content.',
  Snackbar: 'Transient bottom feedback message system.',
  Tooltip: 'Small contextual overlay for explaining controls.',
  Popover: 'Anchored floating content panel.',
  Banner: 'Prominent page-level message for announcements and warnings.',
  EmptyState: 'Helpful empty-content state with actions and supporting copy.',
  Modal: 'Blocking overlay dialog for focused tasks.',
  ActionSheet: 'Mobile-friendly sheet for action lists.',
  ContextMenu: 'Contextual menu for secondary actions.',
  CommandPalette: 'Keyboard-friendly command search overlay.',
  HoverCard: 'Hover-triggered floating panel for contextual details.',
  Fade: 'Opacity-based entrance and exit transition component.',
  Scale: 'Scale-based entrance and exit transition component.',
  Slide: 'Directional slide transition component.',
  MagneticPressable: 'Pressable interaction component with magnetic motion feedback.',
  GlassNavbar: 'Glass-styled navigation bar for immersive interfaces.',
  GlassSidebar: 'Glass-styled side navigation for app shells.',
  FloatingMediaPanel: 'Floating glass media control panel.',
  MorphingContainer: 'Animated container that transitions between shapes.',
  InteractiveGlassSurface: 'Interactive glass surface with pointer-aware feedback.',
};

const defaultExamplesByCategory: Record<string, string> = {
  Forms: 'value={value} onChangeText={setValue}',
  Inputs: 'onPress={() => console.log("Pressed")}',
  Feedback: 'status="info"',
  Navigation: 'items={items}',
  'Data Display': 'children="Reactnatively"',
  Layout: 'padding="md"',
  Typography: 'children="Reactnatively"',
  Motion: 'in',
  'Advanced Glass': 'glass={{ intensity: 0.7 }}',
  'Glass Engine': 'elevation={2}',
  Primitives: 'style={{ padding: 16 }}',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pathSlug = slug.join('/');
  const componentName = toComponentName(slug[slug.length - 1]);
  const componentDoc = getComponentDoc(componentName, pathSlug);
  const title = `${componentDoc.name} - React Native ${componentDoc.category} Component`;
  const description = `${componentDoc.description} Learn how to use ${componentDoc.name} in React Native and Expo apps with TypeScript props, accessibility notes, examples, and theme support.`;
  const canonical = `/docs/${pathSlug}`;
  const componentKeywords = [
    `React Native ${componentDoc.name}`,
    `Expo ${componentDoc.name}`,
    `React Native ${componentName} component`,
    `Reactnatively ${componentName}`,
    ...seoKeywords,
  ];

  return {
    title,
    description,
    keywords: componentKeywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(canonical),
      type: 'article',
      siteName,
      images: [absoluteUrl('/opengraph-image')],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl('/opengraph-image')],
    },
  };
}

export function generateStaticParams() {
  const params = docsNav.flatMap((section) =>
    section.items.flatMap((item) => [
      item.href,
      ...(item.items?.map((child) => child.href) ?? []),
    ]),
  );

  return params.flatMap((href) => {
    if (!href.startsWith('/docs/') || href === '/docs/search') return [];
    return [{ slug: href.replace('/docs/', '').split('/') }];
  });
}

export default async function CatchAllDocsPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const componentName = toComponentName(slug[slug.length - 1]);
  const componentDoc = getComponentDoc(componentName, slug.join('/'));
  const canonical = `/docs/${componentDoc.slug}`;
  const docJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `${componentDoc.name} React Native component`,
    description: componentDoc.description,
    url: absoluteUrl(canonical),
    about: [
      'React Native UI component',
      componentDoc.category,
      'Expo UI framework',
      'Reactnatively documentation',
    ],
    mainEntityOfPage: absoluteUrl(canonical),
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: absoluteUrl('/'),
    },
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(docJsonLd)} />
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs text-violet-400 mb-5">
        {componentDoc.category}
      </div>
      <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">
        {componentDoc.name}
      </h1>
      <p className="text-lg text-white/60 leading-relaxed mb-8">
        {componentDoc.description}
      </p>

      <h2 id="import" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Import
      </h2>
      <CodeBlock
        language="typescript"
        code={`import { ${componentDoc.name} } from 'reactnatively';`}
      />

      <h2 id="installation" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Installation
      </h2>
      <p className="text-sm text-white/55 leading-relaxed mb-4">
        Install Reactnatively once in your React Native or Expo application, then import
        {` ${componentDoc.name} `}from the framework package.
      </p>
      <CodeBlock language="bash" code="pnpm add reactnatively" />

      <h2 id="preview" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Interactive preview
      </h2>
      <AutoComponentPreview
        name={componentDoc.name}
        category={componentDoc.category}
        description={componentDoc.description}
        props={componentDoc.props}
        basicCode={basicUsage(componentDoc)}
      />

      <h2 id="basic-usage" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        React Native usage example
      </h2>
      <CodeBlock
        language="tsx"
        filename={`${componentDoc.name}Example.tsx`}
        showLineNumbers
        code={basicUsage(componentDoc)}
      />

      <h2 id="props" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Props
      </h2>
      <PropsTable props={componentDoc.props} />

      <h2 id="variants" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Variants and examples
      </h2>
      <div className="grid gap-4">
        {variantExamples(componentDoc).map((example) => (
          <div key={example.title}>
            <h3 className="text-sm font-semibold text-white/80 mb-2">{example.title}</h3>
            <CodeBlock
              language="tsx"
              filename={example.filename}
              showLineNumbers
              code={example.code}
            />
          </div>
        ))}
      </div>

      <h2 id="typescript" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        TypeScript IntelliSense
      </h2>
      <p className="text-sm text-white/55 leading-relaxed mb-4">
        The component exports typed props, so editors can autocomplete prop names, union values,
        callbacks, and theme-aware style objects as you type.
      </p>
      <CodeBlock
        language="tsx"
        filename={`${componentDoc.name}.types-example.tsx`}
        showLineNumbers
        code={intelliSenseExample(componentDoc)}
      />

      <h2 id="theme-support" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Theme support
      </h2>
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 text-sm text-white/55 leading-relaxed">
        <p>
          {componentDoc.name} participates in the Reactnatively theme system through semantic
          colors, spacing, radii, typography, motion, and glass tokens where those props apply.
          Wrap your app in <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] text-violet-300 font-mono text-[0.85em]">ReactnativelyProvider</code>
          {' '}or <code className="px-1.5 py-0.5 rounded-md bg-white/[0.08] text-violet-300 font-mono text-[0.85em]">ThemeProvider</code>
          {' '}to keep light mode, dark mode, density, and custom tokens consistent.
        </p>
      </div>

      <h2 id="accessibility" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Accessibility
      </h2>
      <p className="text-sm text-white/55 leading-relaxed mb-4">
        Use accessible labels, hints, roles, and focus behavior when {componentDoc.name}
        is interactive. Reactnatively components are designed for React Native apps that
        need screen-reader support, reduced-motion handling, and consistent touch targets.
      </p>

      <h2 id="expo-compatibility" className="text-xl font-semibold text-white mb-3 mt-10 pt-2 border-t border-white/[0.06]">
        Expo compatibility
      </h2>
      <p className="text-sm text-white/55 leading-relaxed">
        {componentDoc.name} can be used in Expo apps with TypeScript. Glass and blur
        behavior depends on platform capability, so production interfaces should keep
        text contrast and fallback tinting readable when native blur is unavailable.
      </p>
    </article>
  );
}

function PropsTable({ props }: { props: PropRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
      <table className="w-full text-sm">
        <thead className="border-b border-white/[0.08] bg-white/[0.03]">
          <tr>
            {['Prop', 'Type', 'Default', 'Description'].map((heading) => (
              <th key={heading} className="px-4 py-3 text-left text-xs uppercase tracking-wider text-white/40 font-semibold">
                {heading}
              </th>
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
  );
}

function getComponentDoc(name: string, slug: string): ComponentDoc {
  const category = getCategory(name, slug);
  const props = readProps(name);

  return {
    name,
    slug,
    category,
    description: descriptions[name] ?? `${name} component with typed React Native props and theme-aware styling.`,
    props: props.length ? props : fallbackProps(category),
  };
}

function readProps(componentName: string): PropRow[] {
  return readInterfaceProps(propsInterfaceName(componentName), new Set()).slice(0, 24);
}

function propsInterfaceName(componentName: string): string {
  const aliases: Record<string, string> = {
    HStack: 'StackProps',
    VStack: 'StackProps',
    Card: 'LiquidCardProps',
  };

  return aliases[componentName] ?? `${componentName}Props`;
}

function readInterfaceProps(interfaceName: string, visited: Set<string>): PropRow[] {
  if (visited.has(interfaceName)) return [];
  visited.add(interfaceName);

  const sourceEntry = findSourceEntryForInterface(interfaceName);
  if (!sourceEntry) return [];

  const source = sourceEntry.source;
  const aliases = parseTypeAliases(source);
  const parsed = parseInterface(source, interfaceName);
  if (!parsed) return [];

  const inherited = parseInheritedProps(parsed.extendsClause, visited);
  const ownProps = parseProps(parsed.body, aliases);
  const omitted = parseOmittedProps(parsed.extendsClause);

  return [...inherited.filter((prop) => !omitted.has(prop.name)), ...ownProps];
}

function parseInterface(source: string, interfaceName: string) {
  const propsInterface = new RegExp(
    `export\\s+interface\\s+${interfaceName}(?:\\s+extends\\s+([^\\{]+))?\\s*\\{([\\s\\S]*?)\\n\\}`,
    'm',
  ).exec(source);

  if (!propsInterface) return undefined;

  return {
    extendsClause: propsInterface[1]?.trim(),
    body: propsInterface[2],
  };
}

function parseInheritedProps(extendsClause: string | undefined, visited: Set<string>): PropRow[] {
  if (!extendsClause) return [];

  const match = extendsClause.match(/(\w+Props)/);
  if (!match) return [];

  return readInterfaceProps(match[1], visited);
}

function parseOmittedProps(extendsClause: string | undefined): Set<string> {
  const omitted = new Set<string>();
  const omitMatch = extendsClause?.match(/Omit<[^,]+,\s*([^>]+)>/);
  if (!omitMatch) return omitted;

  omitMatch[1]
    .split('|')
    .map((value) => value.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean)
    .forEach((value) => omitted.add(value));

  return omitted;
}

function findSourceEntryForInterface(interfaceName: string): SourceEntry | undefined {
  return getSourceEntries().find(({ source }) =>
    source.includes(`interface ${interfaceName}`) || source.includes(`type ${interfaceName}`),
  );
}

function getSourceEntries(): SourceEntry[] {
  if (sourceEntriesCache) return sourceEntriesCache;

  sourceEntriesCache = packageSourceRoots.flatMap((root) => {
    if (!fs.existsSync(root)) return [];

    return findFiles(root, (filePath) => /\.(types\.)?tsx?$/.test(filePath)).map((filePath) => ({
      filePath,
      source: fs.readFileSync(filePath, 'utf8'),
    }));
  });

  return sourceEntriesCache;
}

function findFiles(directory: string, predicate: (filePath: string) => boolean): string[] {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const matches: string[] = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      matches.push(...findFiles(entryPath, predicate));
    } else if (predicate(entryPath)) {
      matches.push(entryPath);
    }
  }

  return matches;
}

function parseTypeAliases(source: string): Record<string, string[]> {
  const aliases: Record<string, string[]> = {};
  const aliasPattern = /export\s+type\s+(\w+)\s*=\s*([^;]+);/g;
  let match: RegExpExecArray | null;

  while ((match = aliasPattern.exec(source)) !== null) {
    aliases[match[1]] = extractUnionValues(match[2]);
  }

  return aliases;
}

function parseProps(body: string, aliases: Record<string, string[]>): PropRow[] {
  const rows: PropRow[] = [];
  const propPattern = /(?:\/\*\*([\s\S]*?)\*\/\s*)?([A-Za-z_$][\w$]*)\??:\s*([^;]+);/g;
  let match: RegExpExecArray | null;

  while ((match = propPattern.exec(body)) !== null) {
    const type = normalizeType(match[3]);
    const options = extractUnionValues(type);

    rows.push({
      name: match[2],
      type,
      default: inferDefault(match[1]),
      description: normalizeDescription(match[1], match[2]),
      options: options.length ? options : aliases[type],
    });
  }

  return rows;
}

function normalizeType(type: string): string {
  return type.replace(/\s+/g, ' ').trim();
}

function inferDefault(comment?: string): string {
  const defaultMatch = comment?.match(/Default\s+([^.\n]+)/i);
  return defaultMatch ? defaultMatch[1].trim() : 'undefined';
}

function normalizeDescription(comment: string | undefined, propName: string): string {
  const cleaned = comment
    ?.split('\n')
    .map((line) => line.replace(/^\s*\*\s?/, '').trim())
    .filter(Boolean)
    .join(' ')
    .replace(/Default\s+[^.]+\.?/i, '')
    .trim();

  return cleaned || propDescriptions[propName] || `Controls the ${propName} behavior for this component.`;
}

const propDescriptions: Record<string, string> = {
  children: 'Content rendered inside the component.',
  style: 'Style applied to the outer container.',
  textStyle: 'Style applied to rendered text.',
  variant: 'Visual style of the component.',
  size: 'Controls component scale and spacing.',
  color: 'Semantic color token applied to the component.',
  disabled: 'Disables interaction and applies disabled styling.',
  loading: 'Shows a loading state where supported.',
  value: 'Controlled value.',
  defaultValue: 'Initial uncontrolled value.',
  onChange: 'Called when the value changes.',
  onChangeText: 'Called when the text value changes.',
  onPress: 'Called when the component is pressed.',
  accessibilityLabel: 'Screen-reader label for the component.',
  accessibilityHint: 'Screen-reader hint describing the action.',
};

function fallbackProps(category: string): PropRow[] {
  const rows: PropRow[] = [
    { name: 'children', type: 'ReactNode', default: 'undefined', description: 'Content rendered inside the component.' },
    { name: 'style', type: 'StyleProp<ViewStyle>', default: 'undefined', description: 'Style applied to the outer container.' },
    { name: 'testID', type: 'string', default: 'undefined', description: 'Identifier used by tests and automation.' },
    { name: 'accessibilityLabel', type: 'string', default: 'undefined', description: 'Screen-reader label for the component.' },
  ];

  if (category === 'Forms') {
    rows.unshift(
      { name: 'value', type: 'string', default: 'undefined', description: 'Controlled field value.' },
      { name: 'onChangeText', type: '(value: string) => void', default: 'undefined', description: 'Called when the text value changes.' },
    );
  }

  return rows;
}

function getCategory(componentName: string, slug: string): string {
  for (const section of docsNav) {
    const item = section.items.find((navItem) => navItem.href.endsWith(`/${slug.split('/').pop()}`));
    if (item) return section.title;
  }

  if (['GlassPressable', 'GlassText', 'FrostPanel', 'Portal', 'PortalHost', 'PortalProvider', 'Slot', 'AccessibilityProvider', 'VisuallyHidden'].includes(componentName)) {
    return 'Primitives';
  }
  if (componentName.includes('Glass')) return 'Advanced Glass';
  return 'Components';
}

function toComponentName(slug: string): string {
  const overrides: Record<string, string> = {
    fab: 'FAB',
    'otp-input': 'OTPInput',
    'h-stack': 'HStack',
    'v-stack': 'VStack',
    'radio-group': 'RadioGroup',
    'list-item': 'ListItem',
    'portal-host': 'PortalHost',
    'portal-provider': 'PortalProvider',
    'glass-pressable': 'GlassPressable',
    'glass-text': 'GlassText',
    'accessibility-provider': 'AccessibilityProvider',
    'visually-hidden': 'VisuallyHidden',
  };

  if (overrides[slug]) return overrides[slug];

  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function basicUsage(doc: ComponentDoc): string {
  const imports = snippetImports(doc);
  const setup = snippetSetup(doc);
  const props = snippetProps(doc);
  const body = props ? ` ${props}` : '';
  const child = snippetChild(doc, '      ');
  const renderedComponent = child
    ? `<${doc.name}${body}>\n${child}\n    </${doc.name}>`
    : `<${doc.name}${body} />`;

  return `${imports}

export function Example() {
${setup}  return (
    ${renderedComponent}
  );
}`;
}

function variantExamples(doc: ComponentDoc) {
  const examples = [
    {
      title: 'Default',
      filename: `${doc.name}Default.tsx`,
      code: inlinePreviewCode(doc),
    },
  ];

  const variantProp = doc.props.find((prop) => ['variant', 'size', 'color', 'status', 'direction', 'placement', 'position'].includes(prop.name));

  if (variantProp) {
    examples.push({
      title: `${capitalize(variantProp.name)} options`,
      filename: `${doc.name}${capitalize(variantProp.name)}s.tsx`,
      code: optionExample(doc, variantProp),
    });
  } else {
    examples.push({
      title: 'Composed example',
      filename: `${doc.name}Composed.tsx`,
      code: composedExample(doc),
    });
  }

  return examples;
}

function inlinePreviewCode(doc: ComponentDoc): string {
  const imports = snippetImports(doc);
  const setup = snippetSetup(doc);
  const props = snippetProps(doc);
  const body = props ? ` ${props}` : '';
  const child = snippetChild(doc, '      ');
  const renderedComponent = child
    ? `<${doc.name}${body}>\n${child}\n    </${doc.name}>`
    : `<${doc.name}${body} />`;

  return `${imports}

export function Preview() {
${setup}  return (
    ${renderedComponent}
  );
}`;
}

function optionExample(doc: ComponentDoc, prop: PropRow): string {
  const options = (prop.options ?? extractUnionValues(prop.type)).slice(0, 4);
  const values = options.length ? options : ['primary', 'secondary', 'neutral'];
  const needsText = !isTextPrimitive(doc.name) && acceptsChildren(doc);

  return `${needsText ? "import { Text } from 'react-native';\n" : ''}import { ${doc.name}, Stack } from 'reactnatively';

export function ${doc.name}${capitalize(prop.name)}s() {
  return (
    <Stack gap="sm">
${values.map((value) => {
  if (!acceptsChildren(doc)) return `      <${doc.name} ${prop.name}="${value}" />`;
  const child = needsText ? `<Text>${value}</Text>` : value;
  return `      <${doc.name} ${prop.name}="${value}">${child}</${doc.name}>`;
}).join('\n')}
    </Stack>
  );
}`;
}

function composedExample(doc: ComponentDoc): string {
  const needsText = needsReactNativeText(doc);
  const child = snippetChild(doc, '        ');

  return `${needsText ? "import { Text } from 'react-native';\n" : ''}import { ${doc.name}, Box } from 'reactnatively';

export function ${doc.name}Composed() {
  return (
    <Box padding="md">
      <${doc.name}>
${child}
      </${doc.name}>
    </Box>
  );
}`;
}

function intelliSenseExample(doc: ComponentDoc): string {
  const exampleProps = doc.props
    .filter((prop) => prop.name !== 'children')
    .slice(0, 4);

  return `import type { ComponentProps } from 'react';
import { ${doc.name} } from 'reactnatively';

type ${doc.name}Props = ComponentProps<typeof ${doc.name}>;

const exampleProps: ${doc.name}Props = {
${exampleProps.map((prop) => `  ${prop.name}: ${sampleValue(prop)},`).join('\n')}
};

export function Typed${doc.name}() {
  return <${doc.name} {...exampleProps} />;
}`;
}

function extractUnionValues(type: string): string[] {
  return type
    .split('|')
    .map((value) => value.trim().replace(/^['"]|['"]$/g, ''))
    .filter((value) => /^[a-z][\w-]*$/i.test(value));
}

function sampleValue(prop: PropRow): string {
  if (prop.type.includes('boolean')) return 'true';
  if (prop.type.includes('number')) return '0';
  if (prop.type.includes('=>')) return '() => {}';
  if (prop.type.includes('ReactNode')) return 'null';
  if (prop.type.includes('string')) return `"${sampleString(prop.name)}"`;

  const unionValue = extractUnionValues(prop.type)[0];
  if (unionValue) return `"${unionValue}"`;
  if (prop.options?.[0]) return `"${prop.options[0]}"`;

  return 'undefined';
}

function snippetImports(doc: ComponentDoc): string {
  const imports = new Set([doc.name]);
  if (usesStackItems(doc)) imports.add('Stack');

  const reactImports = requiresState(doc) ? "import { useState } from 'react';\n" : '';
  const nativeImports = needsReactNativeText(doc) ? "import { Text } from 'react-native';\n" : '';

  return `${reactImports}${nativeImports}import { ${Array.from(imports).join(', ')} } from 'reactnatively';`;
}

function snippetSetup(doc: ComponentDoc): string {
  if (doc.props.some((prop) => prop.name === 'value') && doc.props.some((prop) => prop.name === 'onChangeText')) {
    return `  const [value, setValue] = useState('');\n\n`;
  }

  if (doc.category === 'Navigation' && doc.props.some((prop) => prop.name === 'items')) {
    return `  const [value, setValue] = useState('home');\n  const items = [\n    { value: 'home', label: 'Home', icon: <Text>H</Text> },\n    { value: 'search', label: 'Search', icon: <Text>S</Text> },\n    { value: 'profile', label: 'Profile', icon: <Text>P</Text> },\n  ];\n\n`;
  }

  return '';
}

function snippetProps(doc: ComponentDoc): string {
  if (doc.props.some((prop) => prop.name === 'items')) {
    return 'items={items} value={value} onChange={setValue}';
  }

  if (doc.props.some((prop) => prop.name === 'value') && doc.props.some((prop) => prop.name === 'onChangeText')) {
    return 'value={value} onChangeText={setValue}';
  }

  if (doc.props.some((prop) => prop.name === 'icon')) {
    return 'icon={<Text>+</Text>} onPress={() => {}} accessibilityLabel="Create item"';
  }

  return defaultExamplesByCategory[doc.category] ?? '';
}

function snippetChild(doc: ComponentDoc, indent: string): string {
  const label = doc.category === 'Typography' ? `${doc.name} text` : `${doc.name} content`;

  if (!acceptsChildren(doc)) return '';
  if (doc.category === 'Forms' || doc.category === 'Navigation') return '';
  if (usesStackItems(doc)) {
    return `${indent}<Text>First item</Text>\n${indent}<Text>Second item</Text>\n${indent}<Text>Third item</Text>`;
  }
  if (isTextPrimitive(doc.name)) return `${indent}${label}`;

  return `${indent}<Text>${label}</Text>`;
}

function usesStackItems(doc: ComponentDoc): boolean {
  return ['Stack', 'HStack', 'VStack', 'Flex', 'Grid'].includes(doc.name);
}

function requiresState(doc: ComponentDoc): boolean {
  return (
    doc.props.some((prop) => prop.name === 'value' && prop.type.includes('string')) &&
    doc.props.some((prop) => prop.name === 'onChangeText')
  ) || (doc.category === 'Navigation' && doc.props.some((prop) => prop.name === 'items'));
}

function needsReactNativeText(doc: ComponentDoc): boolean {
  return !isTextPrimitive(doc.name) && (snippetChild(doc, '').includes('<Text>') || snippetProps(doc).includes('<Text>'));
}

function isTextPrimitive(name: string): boolean {
  return ['Text', 'Heading', 'Paragraph', 'Caption', 'Code', 'Link', 'GradientText', 'Button', 'Badge', 'Chip'].includes(name);
}

function acceptsChildren(doc: ComponentDoc): boolean {
  return doc.props.some((prop) => prop.name === 'children') || isTextPrimitive(doc.name);
}

function sampleString(propName: string): string {
  if (propName === 'accessibilityLabel') return 'Example control';
  if (propName === 'placeholder') return 'Enter a value';
  if (propName === 'testID') return 'reactnatively-example';
  if (propName === 'label') return 'Reactnatively';
  return 'Reactnatively';
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
