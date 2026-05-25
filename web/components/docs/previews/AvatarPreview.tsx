'use client';

import { ComponentPreview, type PreviewVariant } from '../ComponentPreview';

function RNAvatar({
  src,
  initials,
  size = 'md',
  status,
  badge,
}: {
  src?: string;
  initials?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  status?: 'online' | 'offline' | 'away' | 'busy';
  badge?: number;
}) {
  const sizeMap = {
    xs: 24, sm: 32, md: 40, lg: 48, xl: 56, '2xl': 72,
  };
  const px = sizeMap[size];

  const statusColor = {
    online: '#22c55e',
    offline: '#6b7280',
    away: '#f59e0b',
    busy: '#ef4444',
  };

  const dotSize = px <= 32 ? 8 : px <= 48 ? 10 : 12;

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div
        style={{
          width: px,
          height: px,
          borderRadius: '50%',
          background: src ? 'transparent' : 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          border: '2px solid rgba(255,255,255,0.12)',
          fontSize: px * 0.36,
          fontWeight: 700,
          color: '#fff',
          letterSpacing: '0.02em',
        }}
      >
        {src ? (
          <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          initials ?? '?'
        )}
      </div>
      {status && (
        <span
          style={{
            position: 'absolute',
            bottom: 1,
            right: 1,
            width: dotSize,
            height: dotSize,
            borderRadius: '50%',
            background: statusColor[status],
            border: '2px solid #070714',
          }}
        />
      )}
      {badge !== undefined && badge > 0 && (
        <span
          style={{
            position: 'absolute',
            top: -4,
            right: -4,
            minWidth: 18,
            height: 18,
            borderRadius: 9,
            background: '#ef4444',
            color: '#fff',
            fontSize: 10,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 4px',
            border: '2px solid #070714',
          }}
        >
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </div>
  );
}

const variants: PreviewVariant[] = [
  {
    label: 'Initials',
    preview: (
      <div className="flex items-center gap-4">
        {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
          <RNAvatar key={size} initials="JD" size={size} />
        ))}
      </div>
    ),
    filename: 'AvatarSizes.tsx',
    code: `import { View, StyleSheet } from 'react-native';
import { Avatar } from 'reactnatively';

export function AvatarSizes() {
  return (
    <View style={styles.row}>
      <Avatar size="xs" initials="JD" />
      <Avatar size="sm" initials="JD" />
      <Avatar size="md" initials="JD" />
      <Avatar size="lg" initials="JD" />
      <Avatar size="xl" initials="JD" />
      <Avatar size="2xl" initials="JD" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
});`,
  },
  {
    label: 'Status',
    preview: (
      <div className="flex items-center gap-5">
        <div className="flex flex-col items-center gap-2">
          <RNAvatar initials="AL" size="lg" status="online" />
          <span className="text-xs text-white/40">online</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <RNAvatar initials="BK" size="lg" status="away" />
          <span className="text-xs text-white/40">away</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <RNAvatar initials="CM" size="lg" status="busy" />
          <span className="text-xs text-white/40">busy</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <RNAvatar initials="DN" size="lg" status="offline" />
          <span className="text-xs text-white/40">offline</span>
        </div>
      </div>
    ),
    filename: 'TeamList.tsx',
    code: `import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'reactnatively';

const members = [
  { name: 'Alice', initials: 'AL', status: 'online' as const },
  { name: 'Bob', initials: 'BK', status: 'away' as const },
  { name: 'Carol', initials: 'CM', status: 'busy' as const },
  { name: 'Dave', initials: 'DN', status: 'offline' as const },
];

export function TeamList() {
  return (
    <View style={styles.row}>
      {members.map((m) => (
        <View key={m.name} style={styles.item}>
          <Avatar size="lg" initials={m.initials} status={m.status} />
          <Text style={styles.name}>{m.name}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 20 },
  item: { alignItems: 'center', gap: 6 },
  name: { color: 'rgba(255,255,255,0.5)', fontSize: 12 },
});`,
  },
  {
    label: 'Badge',
    preview: (
      <div className="flex items-center gap-6">
        <RNAvatar initials="AB" size="xl" badge={3} />
        <RNAvatar initials="CD" size="xl" badge={12} />
        <RNAvatar initials="EF" size="xl" badge={100} />
      </div>
    ),
    filename: 'NotificationAvatars.tsx',
    code: `import { View, StyleSheet } from 'react-native';
import { Avatar } from 'reactnatively';

export function NotificationAvatars() {
  return (
    <View style={styles.row}>
      <Avatar size="xl" initials="AB" badgeCount={3} />
      <Avatar size="xl" initials="CD" badgeCount={12} />
      <Avatar size="xl" initials="EF" badgeCount={100} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 24 },
});`,
  },
];

export function AvatarPreview() {
  return <ComponentPreview variants={variants} minHeight={140} />;
}
