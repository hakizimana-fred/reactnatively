'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ComponentPreview, type PreviewVariant } from '../ComponentPreview';

function RNSwitch({
  value,
  onChange,
  color = 'primary',
  disabled = false,
  size = 'md',
}: {
  value: boolean;
  onChange: (v: boolean) => void;
  color?: 'primary' | 'success' | 'error';
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) {
  const colorMap = { primary: '#7c3aed', success: '#16a34a', error: '#dc2626' };
  const hex = colorMap[color];

  const sizeMap = {
    sm: { w: 36, h: 20, thumb: 14, pad: 3 },
    md: { w: 48, h: 28, thumb: 20, pad: 4 },
    lg: { w: 60, h: 34, thumb: 26, pad: 4 },
  };
  const { w, h, thumb, pad } = sizeMap[size];

  return (
    <motion.button
      type="button"
      role="switch"
      aria-checked={value}
      onClick={() => !disabled && onChange(!value)}
      animate={{
        backgroundColor: value ? hex : 'rgba(255,255,255,0.12)',
        opacity: disabled ? 0.4 : 1,
      }}
      transition={{ duration: 0.2 }}
      style={{
        width: w, height: h, borderRadius: h / 2,
        padding: pad, display: 'flex', alignItems: 'center',
        border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
        flexShrink: 0,
      }}
    >
      <motion.span
        animate={{ x: value ? w - thumb - pad * 2 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{
          width: thumb, height: thumb, borderRadius: thumb / 2,
          background: '#fff',
          display: 'block',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
        }}
      />
    </motion.button>
  );
}

function SettingsRow({ label, sub, color }: { label: string; sub?: string; color?: 'primary' | 'success' | 'error' }) {
  const [on, setOn] = useState(true);
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, width: '100%' }}>
      <div>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: 500, margin: 0 }}>{label}</p>
        {sub && <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, margin: '2px 0 0 0' }}>{sub}</p>}
      </div>
      <RNSwitch value={on} onChange={setOn} color={color} />
    </div>
  );
}

function SizesDemo() {
  const [sm, setSm] = useState(true);
  const [md, setMd] = useState(true);
  const [lg, setLg] = useState(true);
  return (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <RNSwitch value={sm} onChange={setSm} size="sm" />
        <span className="text-xs text-white/40">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <RNSwitch value={md} onChange={setMd} size="md" />
        <span className="text-xs text-white/40">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <RNSwitch value={lg} onChange={setLg} size="lg" />
        <span className="text-xs text-white/40">lg</span>
      </div>
    </div>
  );
}

const variants: PreviewVariant[] = [
  {
    label: 'Settings',
    preview: (
      <div
        style={{
          display: 'flex', flexDirection: 'column', gap: 16,
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16, padding: '16px 20px', width: '100%', maxWidth: 320,
        }}
      >
        <SettingsRow label="Push Notifications" sub="Receive alerts on your device" />
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
        <SettingsRow label="Dark Mode" sub="Switch to dark theme" color="success" />
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
        <SettingsRow label="Location Access" sub="Allow location tracking" color="error" />
      </div>
    ),
    filename: 'SettingsScreen.tsx',
    code: `import { View, Text, StyleSheet } from 'react-native';
import { Switch, GlassView } from 'reactnatively';

const settings = [
  { key: 'notifications', label: 'Push Notifications', sub: 'Receive alerts on your device' },
  { key: 'darkMode', label: 'Dark Mode', sub: 'Switch to dark theme' },
  { key: 'location', label: 'Location Access', sub: 'Allow location tracking' },
];

export function SettingsScreen() {
  const [prefs, setPrefs] = useState({
    notifications: true,
    darkMode: true,
    location: false,
  });

  return (
    <GlassView elevation={1} borderRadius={16} style={styles.card}>
      {settings.map((s, i) => (
        <View key={s.key}>
          {i > 0 && <View style={styles.divider} />}
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>{s.label}</Text>
              <Text style={styles.sub}>{s.sub}</Text>
            </View>
            <Switch
              value={prefs[s.key as keyof typeof prefs]}
              onValueChange={(v) => setPrefs((p) => ({ ...p, [s.key]: v }))}
            />
          </View>
        </View>
      ))}
    </GlassView>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, gap: 0 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 },
  label: { color: 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: '500' },
  sub: { color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 2 },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.06)' },
});`,
  },
  {
    label: 'Sizes',
    preview: <SizesDemo />,
    filename: 'SwitchSizes.tsx',
    code: `import { View, StyleSheet } from 'react-native';
import { Switch } from 'reactnatively';

export function SwitchSizes() {
  const [sm, setSm] = useState(true);
  const [md, setMd] = useState(true);
  const [lg, setLg] = useState(true);

  return (
    <View style={styles.row}>
      <Switch size="sm" value={sm} onValueChange={setSm} />
      <Switch size="md" value={md} onValueChange={setMd} />
      <Switch size="lg" value={lg} onValueChange={setLg} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 24 },
});`,
  },
];

export function SwitchPreview() {
  return <ComponentPreview variants={variants} minHeight={160} />;
}
