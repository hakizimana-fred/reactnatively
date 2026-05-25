'use client';

import { motion } from 'framer-motion';
import { ComponentPreview, type PreviewVariant } from './ComponentPreview';

export interface AutoDocProp {
  name: string;
  type: string;
  options?: string[];
}

export interface AutoComponentPreviewProps {
  name: string;
  category: string;
  description: string;
  props: AutoDocProp[];
  basicCode: string;
}

const toneByCategory: Record<string, { accent: string; label: string }> = {
  Forms: { accent: '#38bdf8', label: 'Form field' },
  Inputs: { accent: '#8b5cf6', label: 'Action control' },
  Layout: { accent: '#22c55e', label: 'Layout primitive' },
  Typography: { accent: '#f59e0b', label: 'Type primitive' },
  'Data Display': { accent: '#06b6d4', label: 'Data surface' },
  Navigation: { accent: '#ec4899', label: 'Navigation UI' },
  Feedback: { accent: '#f97316', label: 'Feedback state' },
  Overlays: { accent: '#a855f7', label: 'Overlay layer' },
  Motion: { accent: '#84cc16', label: 'Motion primitive' },
  'Advanced Glass': { accent: '#60a5fa', label: 'Glass surface' },
  'Glass Engine': { accent: '#60a5fa', label: 'Glass primitive' },
  Primitives: { accent: '#14b8a6', label: 'Base primitive' },
};

export function AutoComponentPreview({
  name,
  category,
  description,
  props,
  basicCode,
}: AutoComponentPreviewProps) {
  const interactiveProps = props.filter((prop) =>
    ['variant', 'size', 'color', 'status', 'direction', 'placement', 'position', 'orientation', 'state'].includes(prop.name) &&
    prop.options &&
    prop.options.length > 0,
  );

  const variants: PreviewVariant[] = [
    {
      label: 'Preview',
      preview: <PreviewCard name={name} category={category} description={description} props={props} />,
      filename: `${name}Example.tsx`,
      code: basicCode,
    },
    ...interactiveProps.slice(0, 3).map((prop) => ({
      label: titleCase(prop.name),
      preview: <OptionsPreview name={name} category={category} prop={prop} />,
      filename: `${name}${titleCase(prop.name)}s.tsx`,
      code: optionCode(name, prop, props),
    })),
    {
      label: 'States',
      preview: <StatesPreview name={name} category={category} props={props} />,
      filename: `${name}States.tsx`,
      code: statesCode(name, props),
    },
  ];

  return <ComponentPreview variants={variants} minHeight={220} />;
}

function PreviewCard({
  name,
  category,
  description,
  props,
}: {
  name: string;
  category: string;
  description: string;
  props: AutoDocProp[];
}) {
  const tone = toneByCategory[category] ?? { accent: '#8b5cf6', label: 'Component' };
  const primaryProps = props.slice(0, 5);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
      className="w-full max-w-md rounded-2xl border border-white/[0.10] bg-white/[0.06] p-5 shadow-2xl"
      style={{ boxShadow: `0 24px 80px ${tone.accent}22` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.16em] text-white/35">{tone.label}</div>
          <div className="mt-1 text-xl font-semibold text-white">{name}</div>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/45">{description}</p>
        </div>
        <div
          className="h-11 w-11 shrink-0 rounded-xl border border-white/[0.12]"
          style={{ background: `linear-gradient(135deg, ${tone.accent}55, rgba(255,255,255,0.08))` }}
        />
      </div>

      <div className="mt-5 grid gap-2">
        <div className="h-11 rounded-xl border border-white/[0.10] bg-white/[0.08]" />
        <div className="grid grid-cols-3 gap-2">
          <div className="h-8 rounded-lg bg-white/[0.06]" />
          <div className="h-8 rounded-lg bg-white/[0.04]" />
          <div className="h-8 rounded-lg bg-white/[0.04]" />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {primaryProps.map((prop) => (
          <span
            key={prop.name}
            className="rounded-full border border-white/[0.10] bg-white/[0.05] px-2.5 py-1 text-xs text-white/45"
          >
            {prop.name}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function OptionsPreview({
  name,
  category,
  prop,
}: {
  name: string;
  category: string;
  prop: AutoDocProp;
}) {
  const tone = toneByCategory[category] ?? { accent: '#8b5cf6', label: 'Component' };
  const options = prop.options?.slice(0, 6) ?? [];

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3">
      {options.map((option, index) => (
        <motion.div
          key={option}
          whileHover={{ scale: 1.03 }}
          className="rounded-xl border px-4 py-3 text-sm font-medium"
          style={{
            minWidth: 112,
            textAlign: 'center',
            color: index === 0 ? '#fff' : 'rgba(255,255,255,0.7)',
            borderColor: index === 0 ? `${tone.accent}66` : 'rgba(255,255,255,0.10)',
            background: index === 0 ? `${tone.accent}26` : 'rgba(255,255,255,0.05)',
          }}
        >
          <div>{option}</div>
          <div className="mt-1 text-[10px] font-normal uppercase tracking-[0.12em] text-white/30">
            {prop.name}
          </div>
        </motion.div>
      ))}
      {options.length === 0 && (
        <PreviewCard name={name} category={category} description={`${name} preview`} props={[prop]} />
      )}
    </div>
  );
}

function StatesPreview({
  name,
  category,
  props,
}: {
  name: string;
  category: string;
  props: AutoDocProp[];
}) {
  const tone = toneByCategory[category] ?? { accent: '#8b5cf6', label: 'Component' };
  const supportedStates = [
    props.some((prop) => prop.name === 'disabled') ? 'disabled' : undefined,
    props.some((prop) => prop.name === 'loading') ? 'loading' : undefined,
    props.some((prop) => prop.name === 'error' || prop.name === 'isInvalid') ? 'error' : undefined,
    props.some((prop) => prop.name === 'required' || prop.name === 'isRequired') ? 'required' : undefined,
  ].filter(Boolean);

  const states = supportedStates.length ? supportedStates : ['default', 'pressed', 'focused'];

  return (
    <div className="grid w-full max-w-lg grid-cols-1 gap-3 sm:grid-cols-3">
      {states.map((state, index) => (
        <div
          key={state}
          className="rounded-xl border border-white/[0.10] bg-white/[0.05] p-4 text-center"
          style={{ opacity: state === 'disabled' ? 0.45 : 1 }}
        >
          <div
            className="mx-auto mb-3 h-10 w-10 rounded-xl border border-white/[0.12]"
            style={{
              background: index === 0 ? `${tone.accent}44` : 'rgba(255,255,255,0.08)',
            }}
          />
          <div className="text-sm font-medium text-white">{name}</div>
          <div className="mt-1 text-xs text-white/35">{state}</div>
        </div>
      ))}
    </div>
  );
}

function optionCode(name: string, prop: AutoDocProp, props: AutoDocProp[]): string {
  const options = prop.options?.slice(0, 5) ?? [];
  const hasChildren = props.some((item) => item.name === 'children') || isTextPrimitive(name);
  const needsText = hasChildren && !isTextPrimitive(name);

  return `import { ${needsText ? 'Text, ' : ''}View, StyleSheet } from 'react-native';
import { ${name} } from 'reactnatively';

export function ${name}${titleCase(prop.name)}s() {
  return (
    <View style={styles.row}>
${options.map((option) => {
  if (!hasChildren) return `      <${name} ${prop.name}="${option}" />`;
  const child = needsText ? `<Text>${option}</Text>` : option;
  return `      <${name} ${prop.name}="${option}">${child}</${name}>`;
}).join('\n')}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
});`;
}

function statesCode(name: string, props: AutoDocProp[]): string {
  const stateProps = [
    props.some((prop) => prop.name === 'loading') ? 'loading' : undefined,
    props.some((prop) => prop.name === 'disabled') ? 'disabled' : undefined,
  ].filter(Boolean);

  const extra = stateProps.length ? ` ${stateProps.join(' ')}` : '';
  const hasChildren = props.some((prop) => prop.name === 'children') || isTextPrimitive(name);
  const needsText = hasChildren && !isTextPrimitive(name);
  const defaultChild = needsText ? '<Text>Default</Text>' : 'Default';
  const stateChild = needsText ? '<Text>State example</Text>' : 'State example';
  const defaultExample = hasChildren ? `<${name}>${defaultChild}</${name}>` : `<${name} />`;
  const stateExample = hasChildren ? `<${name}${extra}>${stateChild}</${name}>` : `<${name}${extra} />`;

  return `import { ${needsText ? 'Text, ' : ''}View, StyleSheet } from 'react-native';
import { ${name} } from 'reactnatively';

export function ${name}States() {
  return (
    <View style={styles.column}>
      ${defaultExample}
      ${stateExample}
    </View>
  );
}

const styles = StyleSheet.create({
  column: { gap: 12 },
});`;
}

function titleCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function isTextPrimitive(name: string): boolean {
  return ['Text', 'Heading', 'Paragraph', 'Caption', 'Code', 'Link', 'GradientText', 'Button', 'Badge', 'Chip'].includes(name);
}
