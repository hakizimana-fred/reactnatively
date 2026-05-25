'use client';

import { ComponentPreview, type PreviewVariant } from '../ComponentPreview';

function RNBadge({
  label,
  variant = 'solid',
  color = 'primary',
  dot = false,
  count,
}: {
  label?: string;
  variant?: 'solid' | 'outline' | 'subtle';
  color?: 'primary' | 'success' | 'warning' | 'error' | 'neutral';
  dot?: boolean;
  count?: number;
}) {
  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    primary: { bg: '#7c3aed', text: '#fff', border: '#7c3aed' },
    success: { bg: '#16a34a', text: '#fff', border: '#16a34a' },
    warning: { bg: '#d97706', text: '#fff', border: '#d97706' },
    error: { bg: '#dc2626', text: '#fff', border: '#dc2626' },
    neutral: { bg: '#4b5563', text: '#fff', border: '#4b5563' },
  };

  const c = colorMap[color];

  const bg =
    variant === 'solid' ? c.bg :
    variant === 'subtle' ? `${c.bg}22` :
    'transparent';

  const textColor =
    variant === 'solid' ? c.text :
    variant === 'subtle' ? c.bg :
    c.bg;

  const border =
    variant === 'outline' ? `1px solid ${c.border}` :
    'none';

  if (dot) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%',
          background: c.bg,
          flexShrink: 0,
        }} />
        {label && <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>{label}</span>}
      </div>
    );
  }

  const text = count !== undefined ? String(count > 99 ? '99+' : count) : label ?? '';

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: count !== undefined ? '0 6px' : '2px 8px',
      minWidth: count !== undefined ? 20 : undefined,
      height: count !== undefined ? 20 : undefined,
      borderRadius: count !== undefined ? 10 : 6,
      background: bg,
      color: textColor,
      border,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.02em',
    }}>
      {text}
    </span>
  );
}

const variants: PreviewVariant[] = [
  {
    label: 'Variants',
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-4">
        <RNBadge label="Solid" variant="solid" color="primary" />
        <RNBadge label="Outline" variant="outline" color="primary" />
        <RNBadge label="Subtle" variant="subtle" color="primary" />
        <RNBadge label="Success" variant="solid" color="success" />
        <RNBadge label="Warning" variant="solid" color="warning" />
        <RNBadge label="Error" variant="solid" color="error" />
        <RNBadge label="Neutral" variant="solid" color="neutral" />
      </div>
    ),
    filename: 'BadgeDemo.tsx',
    code: `import { View, StyleSheet } from 'react-native';
import { Badge } from 'reactnatively';

export function BadgeDemo() {
  return (
    <View style={styles.row}>
      <Badge label="Solid" variant="solid" status="primary" />
      <Badge label="Outline" variant="outline" status="primary" />
      <Badge label="Subtle" variant="subtle" status="primary" />
      <Badge label="Success" status="success" />
      <Badge label="Warning" status="warning" />
      <Badge label="Error" status="error" />
      <Badge label="Neutral" status="neutral" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
});`,
  },
  {
    label: 'Count',
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-5">
        <RNBadge count={1} color="primary" />
        <RNBadge count={9} color="error" />
        <RNBadge count={42} color="success" />
        <RNBadge count={100} color="warning" />
      </div>
    ),
    filename: 'NotificationBadge.tsx',
    code: `import { View, StyleSheet } from 'react-native';
import { Badge } from 'reactnatively';

export function NotificationBadge() {
  return (
    <View style={styles.row}>
      <Badge count={1} status="primary" />
      <Badge count={9} status="error" />
      <Badge count={42} status="success" />
      <Badge count={100} status="warning" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 16 },
});`,
  },
  {
    label: 'Dot',
    preview: (
      <div className="flex flex-col items-start gap-3">
        <RNBadge dot label="Online" color="success" />
        <RNBadge dot label="Away" color="warning" />
        <RNBadge dot label="Offline" color="neutral" />
        <RNBadge dot label="Busy" color="error" />
      </div>
    ),
    filename: 'UserStatus.tsx',
    code: `import { View, StyleSheet } from 'react-native';
import { Badge } from 'reactnatively';

export function UserStatus() {
  return (
    <View style={styles.col}>
      <Badge dot label="Online" status="success" />
      <Badge dot label="Away" status="warning" />
      <Badge dot label="Offline" status="neutral" />
      <Badge dot label="Busy" status="error" />
    </View>
  );
}

const styles = StyleSheet.create({
  col: { gap: 10 },
});`,
  },
];

export function BadgePreview() {
  return <ComponentPreview variants={variants} minHeight={120} />;
}
