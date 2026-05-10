import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text as RNText,
  View,
  useColorScheme,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Stack, HStack, VStack,
  Heading, Text as RNLText, GradientText,
  Button, IconButton, FAB,
  SearchBar, Switch, Checkbox, SegmentedTabs,
  Avatar, Badge, Chip, Accordion, LiquidCard,
  Alert, ProgressBar,
  Tabs,
  Fade, Scale,
} from 'reactnatively';
import { GlassView } from 'reactnatively';

export default function ShowcaseScreen() {
  const isDark = useColorScheme() === 'dark';

  const bg = isDark
    ? ['#07070f', '#0d0d1f', '#110d26'] as const
    : ['#f0f4ff', '#e8edf8', '#dde3f0'] as const;

  const text    = isDark ? '#f1f5f9' : '#0f172a';
  const subtext = isDark ? '#94a3b8' : '#64748b';

  return (
    <LinearGradient colors={bg} style={styles.root}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

          <RNText style={[styles.pageTitle, { color: text }]}>Showcase</RNText>
          <RNText style={[styles.pageSub, { color: subtext }]}>Component library test harness</RNText>

          {/* ── Typography ─────────────────────────────────────────────────── */}
          <Section title="Typography" color={subtext} />
          <GlassView elevation={1} borderRadius={16} style={styles.card}>
            <VStack gap={10}>
              <Heading level="h1" style={{ color: text }}>Heading H1</Heading>
              <Heading level="h2" style={{ color: text }}>Heading H2</Heading>
              <Heading level="h3" style={{ color: text }}>Heading H3</Heading>
              <Heading level="h4" style={{ color: text }}>Heading H4</Heading>
              <RNLText variant="lg" weight="semibold" style={{ color: text }}>Body Large Semibold</RNLText>
              <RNLText variant="md" style={{ color: subtext }}>Body Medium — default weight</RNLText>
              <RNLText variant="sm" style={{ color: subtext }}>Small text for captions and hints</RNLText>
              <GradientText
                colors={['#6366f1', '#8b5cf6', '#ec4899']}
                style={{ fontSize: 22, fontWeight: '700' }}
              >
                Gradient Text
              </GradientText>
            </VStack>
          </GlassView>

          {/* ── Buttons ────────────────────────────────────────────────────── */}
          <Section title="Buttons" color={subtext} />
          <GlassView elevation={1} borderRadius={16} style={styles.card}>
            <VStack gap={10}>
              <HStack gap={8} wrap>
                {(['solid', 'outline', 'ghost', 'tinted', 'glass'] as const).map((v) => (
                  <Button key={v} label={v} variant={v} size="sm" />
                ))}
              </HStack>
              <HStack gap={8} wrap>
                {(['primary', 'secondary', 'success', 'warning', 'error'] as const).map((c) => (
                  <Button key={c} label={c} color={c} size="sm" />
                ))}
              </HStack>
              <HStack gap={8}>
                <Button label="Loading" loading size="sm" flex={1} />
                <Button label="Disabled" disabled size="sm" flex={1} />
              </HStack>
              <HStack gap={8} align="center">
                <IconButton
                  icon={<RNText style={{ fontSize: 18 }}>★</RNText>}
                  size="md"
                  variant="ghost"
                  accessibilityLabel="Favourite"
                />
                <IconButton
                  icon={<RNText style={{ fontSize: 18 }}>⚙</RNText>}
                  size="md"
                  variant="outline"
                  color="secondary"
                  accessibilityLabel="Settings"
                />
                <IconButton
                  icon={<RNText style={{ fontSize: 18 }}>♥</RNText>}
                  size="md"
                  variant="solid"
                  color="error"
                  accessibilityLabel="Like"
                />
                <IconButton
                  icon={<RNText style={{ fontSize: 16 }}>◈</RNText>}
                  variant="glass"
                  size="md"
                  accessibilityLabel="Glass"
                />
              </HStack>
            </VStack>
          </GlassView>

          {/* ── Forms ──────────────────────────────────────────────────────── */}
          <Section title="Forms" color={subtext} />
          <FormSection subtext={subtext} />

          {/* ── Segmented Tabs ─────────────────────────────────────────────── */}
          <Section title="Segmented Tabs" color={subtext} />
          <SegmentedTabsDemo />

          {/* ── Compound Tabs ──────────────────────────────────────────────── */}
          <Section title="Tabs" color={subtext} />
          <TabsDemo text={text} subtext={subtext} />

          {/* ── Avatar + Badge + Chip ──────────────────────────────────────── */}
          <Section title="Avatar · Badge · Chip" color={subtext} />
          <GlassView elevation={1} borderRadius={16} style={styles.card}>
            <VStack gap={14}>
              <HStack gap={10} align="center">
                {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
                  <Avatar key={s} name="Fred H" size={s} />
                ))}
              </HStack>
              <HStack gap={10} align="center">
                <Avatar name="Alice B" size="lg" online bordered fallbackBg="#6366f1" />
                <Avatar name="Bob S"   size="lg" online="busy" bordered fallbackBg="#ec4899" />
                <Avatar name="Carol W" size="lg" online="away" bordered fallbackBg="#f59e0b" />
                <Avatar name="Dan J"   size="lg" online="offline" bordered />
              </HStack>
              <HStack gap={6} wrap>
                {(['primary', 'success', 'warning', 'error', 'neutral'] as const).map((s) => (
                  <Badge key={s} label={s} status={s} />
                ))}
              </HStack>
              <HStack gap={6} wrap>
                {(['primary', 'success', 'warning', 'error'] as const).map((s) => (
                  <Badge key={s} label={s} status={s} variant="outline" />
                ))}
              </HStack>
              <HStack gap={8} wrap>
                <Chip label="Design" variant="solid" />
                <Chip label="React Native" variant="outline" />
                <Chip label="Selected" variant="solid" isSelected />
                <Chip label="Closeable" variant="solid" onDismiss={() => {}} />
              </HStack>
            </VStack>
          </GlassView>

          {/* ── Progress + Alert ─────────────────────────────────────────────── */}
          <Section title="Progress · Alert" color={subtext} />
          <GlassView elevation={1} borderRadius={16} style={styles.card}>
            <VStack gap={16}>
              <VStack gap={8}>
                <Label text="PROGRESS BARS" color={subtext} />
                <ProgressBar value={75} variant="solid"    height={8} />
                <ProgressBar value={55} variant="gradient" height={8} color="#6366f1" />
                <ProgressBar value={88} variant="glass"    height={10} color="#10b981" />
                <ProgressBar indeterminate               height={6}  color="#ec4899" />
              </VStack>
              <VStack gap={8}>
                <Label text="ALERTS" color={subtext} />
                <Alert status="info"    title="Information" description="Here is some helpful context." />
                <Alert status="success" title="Saved!" description="Your changes have been committed." />
                <Alert status="warning" title="Low storage" description="Less than 500 MB remaining." isDismissible />
                <Alert status="error"   variant="solid" title="Error" description="Connection timed out." />
              </VStack>
            </VStack>
          </GlassView>

          {/* ── Accordion ──────────────────────────────────────────────────── */}
          <Section title="Accordion" color={subtext} />
          <Accordion defaultValue={['arch']}>
            <Accordion.Item value="arch" title="Architecture" icon={<RNText>◈</RNText>}>
              <RNText style={{ color: subtext, lineHeight: 22, fontSize: 14 }}>
                Strict acyclic dependency graph: core → primitives → glass → animations → theme → utils.
                Each package ships sideEffects: false with dual CJS/ESM bundles.
              </RNText>
            </Accordion.Item>
            <Accordion.Item value="glass" title="Glass Engine" icon={<RNText>◉</RNText>}>
              <RNText style={{ color: subtext, lineHeight: 22, fontSize: 14 }}>
                5-layer rendering stack: shadow shell, clip shell, native BlurView, tint overlay,
                highlight gradient, border ring, children. Adapts per device capability at startup.
              </RNText>
            </Accordion.Item>
            <Accordion.Item value="motion" title="Motion System" icon={<RNText>⟳</RNText>}>
              <RNText style={{ color: subtext, lineHeight: 22, fontSize: 14 }}>
                All animations run as Reanimated v3 worklets on the UI thread.
                Spring physics via SPRING_SNAPPY, SPRING_LIQUID, SPRING_BOUNCE, SPRING_PRECISE.
              </RNText>
            </Accordion.Item>
          </Accordion>

          {/* ── Motion ─────────────────────────────────────────────────────── */}
          <Section title="Motion — Fade · Scale" color={subtext} />
          <MotionDemo text={text} subtext={subtext} />

          {/* ── LiquidCard ─────────────────────────────────────────────────── */}
          <Section title="LiquidCard" color={subtext} />
          <VStack gap={12}>
            <LiquidCard>
              <LiquidCard.Header>
                <RNText style={[styles.cardTitle, { color: text }]}>Solid Card</RNText>
                <RNText style={{ color: subtext, fontSize: 12, marginTop: 2 }}>elevation=2 · no glass</RNText>
              </LiquidCard.Header>
              <LiquidCard.Body>
                <RNText style={{ color: subtext, lineHeight: 22, fontSize: 14 }}>
                  Default card — solid surface, border, shadow. Compound sub-components.
                </RNText>
              </LiquidCard.Body>
              <LiquidCard.Footer>
                <HStack gap={8} justify="flex-end">
                  <Button label="Cancel" variant="ghost" size="sm" />
                  <Button label="Confirm" size="sm" />
                </HStack>
              </LiquidCard.Footer>
            </LiquidCard>

            <LiquidCard elevation={4} variant="elevated" glow={{ color: '#6366f1', radius: 24, opacity: 0.3 }}>
              <LiquidCard.Header bordered>
                <RNText style={[styles.cardTitle, { color: text }]}>Glass Card + Glow</RNText>
                <RNText style={{ color: subtext, fontSize: 12, marginTop: 2 }}>elevation=4 · variant=elevated</RNText>
              </LiquidCard.Header>
              <LiquidCard.Body>
                <RNText style={{ color: subtext, lineHeight: 22, fontSize: 14 }}>
                  Full glass card. Blur intensity scales with elevation token. Glow halo via shadow.
                </RNText>
              </LiquidCard.Body>
            </LiquidCard>

            <LiquidCard pressable onPress={() => {}}>
              <LiquidCard.Header>
                <RNText style={[styles.cardTitle, { color: text }]}>Pressable Card</RNText>
                <RNText style={{ color: subtext, fontSize: 12, marginTop: 2 }}>Spring-driven press animation</RNText>
              </LiquidCard.Header>
            </LiquidCard>
          </VStack>

          <View style={{ height: 80 }} />
        </ScrollView>

        <FAB
          icon={<RNText style={{ fontSize: 24, color: '#fff' }}>+</RNText>}
          position="bottomRight"
          variant="solid"
          color="#6366f1"
          style={styles.fab}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

// ── Form section ──────────────────────────────────────────────────────────────

function FormSection({ subtext }: { subtext: string }) {
  const [sw1, setSw1] = useState(true);
  const [sw2, setSw2] = useState(false);
  const [cb1, setCb1] = useState(true);
  const [cb2, setCb2] = useState(false);
  const [search, setSearch] = useState('');

  return (
    <GlassView elevation={1} borderRadius={16} style={styles.card}>
      <VStack gap={14}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search components…"
          size="md"
        />
        <VStack gap={10}>
          <Switch checked={sw1} onChange={setSw1} label="Notifications enabled" color="primary" />
          <Switch checked={sw2} onChange={setSw2} label="Dark mode override"    color="success" />
          <Switch checked={false} label="Disabled switch" isDisabled />
        </VStack>
        <VStack gap={8}>
          <Checkbox checked={cb1} onChange={setCb1} label="Accept terms and conditions" />
          <Checkbox checked={cb2} onChange={setCb2} label="Subscribe to updates" size="sm" />
          <Checkbox checked={false} label="Disabled option" isDisabled />
        </VStack>
      </VStack>
    </GlassView>
  );
}

// ── SegmentedTabs demo ────────────────────────────────────────────────────────

function SegmentedTabsDemo() {
  const [view, setView] = useState('grid');

  return (
    <GlassView elevation={1} borderRadius={16} style={styles.card}>
      <VStack gap={12}>
        <SegmentedTabs
          options={[
            { label: 'Day',   value: 'day'   },
            { label: 'Week',  value: 'week'  },
            { label: 'Month', value: 'month' },
          ]}
          defaultValue="day"
          size="md"
        />
        <SegmentedTabs
          options={[
            { label: 'Grid', value: 'grid' },
            { label: 'List', value: 'list' },
            { label: 'Map',  value: 'map'  },
          ]}
          value={view}
          onChange={setView}
          glass
          size="sm"
        />
      </VStack>
    </GlassView>
  );
}

// ── Compound Tabs demo ────────────────────────────────────────────────────────

function TabsDemo({ text, subtext }: { text: string; subtext: string }) {
  return (
    <GlassView elevation={1} borderRadius={16} style={styles.card}>
      <VStack gap={16}>
        <Tabs defaultValue="overview" variant="pills">
          <Tabs.List>
            <Tabs.Tab value="overview" label="Overview" />
            <Tabs.Tab value="metrics"  label="Metrics"  />
            <Tabs.Tab value="logs"     label="Logs"     />
          </Tabs.List>
          <Tabs.Panel value="overview">
            <View style={styles.panel}>
              <RNText style={{ color: text, fontWeight: '600' }}>Overview panel</RNText>
              <RNText style={{ color: subtext, fontSize: 13, marginTop: 4 }}>Pill variant · spring indicator</RNText>
            </View>
          </Tabs.Panel>
          <Tabs.Panel value="metrics">
            <View style={styles.panel}>
              <RNText style={{ color: text, fontWeight: '600' }}>Metrics panel</RNText>
            </View>
          </Tabs.Panel>
          <Tabs.Panel value="logs">
            <View style={styles.panel}>
              <RNText style={{ color: text, fontWeight: '600' }}>Logs panel</RNText>
            </View>
          </Tabs.Panel>
        </Tabs>

        <Tabs defaultValue="a" variant="line">
          <Tabs.List>
            <Tabs.Tab value="a" label="Alpha" />
            <Tabs.Tab value="b" label="Beta" />
            <Tabs.Tab value="c" label="Gamma" isDisabled />
          </Tabs.List>
          <Tabs.Panel value="a">
            <View style={styles.panel}>
              <RNText style={{ color: text, fontWeight: '600' }}>Alpha content</RNText>
              <RNText style={{ color: subtext, fontSize: 13, marginTop: 4 }}>Line variant · animated indicator</RNText>
            </View>
          </Tabs.Panel>
          <Tabs.Panel value="b">
            <View style={styles.panel}>
              <RNText style={{ color: text, fontWeight: '600' }}>Beta content</RNText>
            </View>
          </Tabs.Panel>
        </Tabs>
      </VStack>
    </GlassView>
  );
}

// ── Motion demo ───────────────────────────────────────────────────────────────

function MotionDemo({ text, subtext }: { text: string; subtext: string }) {
  const [show, setShow] = useState(true);

  return (
    <GlassView elevation={1} borderRadius={16} style={styles.card}>
      <VStack gap={12}>
        <Button
          label={show ? 'Hide' : 'Show'}
          variant="outline"
          size="sm"
          onPress={() => setShow((v) => !v)}
        />
        <Fade in={show} duration={350}>
          <GlassView elevation={2} borderRadius={12} style={styles.motionBox}>
            <RNText style={{ color: text, fontWeight: '600' }}>Fade</RNText>
            <RNText style={{ color: subtext, fontSize: 13 }}>opacity · 350ms timing</RNText>
          </GlassView>
        </Fade>
        <Scale in={show} from={0.8}>
          <GlassView elevation={2} borderRadius={12} style={styles.motionBox}>
            <RNText style={{ color: text, fontWeight: '600' }}>Scale</RNText>
            <RNText style={{ color: subtext, fontSize: 13 }}>scale from 0.8 · spring physics</RNText>
          </GlassView>
        </Scale>
      </VStack>
    </GlassView>
  );
}

// ── Tiny helpers ──────────────────────────────────────────────────────────────

function Section({ title, color }: { title: string; color: string }) {
  return <RNText style={[styles.sectionTitle, { color }]}>{title.toUpperCase()}</RNText>;
}

function Label({ text, color }: { text: string; color: string }) {
  return <RNText style={{ color, fontSize: 11, fontWeight: '700', letterSpacing: 1.2 }}>{text}</RNText>;
}

const styles = StyleSheet.create({
  root:         { flex: 1 },
  safe:         { flex: 1 },
  scroll:       { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 20 },
  pageTitle:    { fontSize: 28, fontWeight: '800', letterSpacing: -0.8 },
  pageSub:      { fontSize: 14, fontWeight: '500', marginTop: 4, marginBottom: 4 },
  sectionTitle: { fontSize: 11, fontWeight: '700', letterSpacing: 1.4, marginTop: 24, marginBottom: 10 },
  card:         { padding: 16, marginBottom: 2 },
  cardTitle:    { fontSize: 16, fontWeight: '700' },
  panel:        { paddingTop: 14, paddingHorizontal: 4 },
  motionBox:    { padding: 16 },
  fab:          { marginBottom: 24, marginRight: 24 },
});
