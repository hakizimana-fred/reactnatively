'use client';

import { motion } from 'framer-motion';
import { ComponentPreview, type PreviewVariant } from '../ComponentPreview';

function StatNumber({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ color: '#fff', fontSize: 18, fontWeight: 700, margin: 0 }}>{value}</p>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, margin: '2px 0 0 0' }}>{label}</p>
    </div>
  );
}

function GlassCard() {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 20,
        padding: 20,
        backdropFilter: 'blur(20px)',
        width: 280,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 22,
          background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, fontWeight: 700, color: '#fff',
        }}>JD</div>
        <div>
          <p style={{ color: '#fff', fontWeight: 600, margin: 0, fontSize: 14 }}>Jane Doe</p>
          <p style={{ color: 'rgba(255,255,255,0.4)', margin: '2px 0 0 0', fontSize: 12 }}>@janedoe · Pro</p>
        </div>
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        paddingTop: 14,
      }}>
        <StatNumber label="Posts" value="1.2K" />
        <StatNumber label="Followers" value="48K" />
        <StatNumber label="Following" value="312" />
      </div>
    </motion.div>
  );
}

function SolidCard() {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      style={{
        background: '#1a1a2e',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        overflow: 'hidden',
        width: 260,
      }}
    >
      <div style={{
        height: 100,
        background: 'linear-gradient(135deg, #7c3aed22, #3b82f622)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 32,
      }}>
        📦
      </div>
      <div style={{ padding: 16 }}>
        <p style={{ color: '#fff', fontWeight: 600, margin: '0 0 4px', fontSize: 14 }}>Component Package</p>
        <p style={{ color: 'rgba(255,255,255,0.4)', margin: '0 0 14px', fontSize: 12, lineHeight: 1.5 }}>
          80+ ready-to-use React Native components.
        </p>
        <div style={{
          display: 'inline-flex', padding: '4px 10px', borderRadius: 6,
          background: 'rgba(124,58,237,0.15)', color: '#a78bfa', fontSize: 11, fontWeight: 600,
        }}>
          Open Source
        </div>
      </div>
    </motion.div>
  );
}

function OutlineCard() {
  return (
    <motion.div
      whileHover={{ borderColor: 'rgba(124,58,237,0.4)', y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      style={{
        background: 'transparent',
        border: '1.5px solid rgba(255,255,255,0.1)',
        borderRadius: 20,
        padding: 20,
        width: 260,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 22 }}>🚀</span>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>New</span>
      </div>
      <p style={{ color: '#fff', fontWeight: 600, margin: 0, fontSize: 14 }}>Quick Start</p>
      <p style={{ color: 'rgba(255,255,255,0.4)', margin: 0, fontSize: 12, lineHeight: 1.6 }}>
        Get up and running in under 5 minutes with the Expo template.
      </p>
    </motion.div>
  );
}

const variants: PreviewVariant[] = [
  {
    label: 'Glass',
    preview: <GlassCard />,
    filename: 'ProfileCard.tsx',
    code: `import { View, Text, StyleSheet } from 'react-native';
import { Card, Avatar, Badge } from 'reactnatively';

export function ProfileCard({ user }: { user: User }) {
  return (
    <Card variant="glass" elevation={2} borderRadius={20} style={styles.card}>
      <View style={styles.header}>
        <Avatar size="lg" src={{ uri: user.avatar }} name={user.name} />
        <View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.handle}>@{user.handle}</Text>
        </View>
        <Badge label="Pro" status="primary" style={styles.badge} />
      </View>
      <View style={styles.stats}>
        <Stat label="Posts" value={user.posts} />
        <Stat label="Followers" value={user.followers} />
        <Stat label="Following" value={user.following} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { padding: 20, gap: 16 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  name: { color: '#fff', fontWeight: '600', fontSize: 14 },
  handle: { color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 2 },
  badge: { marginLeft: 'auto' },
  stats: { flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)', paddingTop: 14 },
});`,
  },
  {
    label: 'Solid',
    preview: <SolidCard />,
    filename: 'PackageCard.tsx',
    code: `import { View, Text, Image, StyleSheet } from 'react-native';
import { Card, Badge } from 'reactnatively';

export function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <Card variant="solid" borderRadius={20} style={styles.card}>
      <Image source={{ uri: pkg.thumbnail }} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.title}>{pkg.name}</Text>
        <Text style={styles.desc}>{pkg.description}</Text>
        <Badge label={pkg.license} variant="subtle" status="primary" />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { overflow: 'hidden' },
  image: { width: '100%', height: 120 },
  body: { padding: 16, gap: 8 },
  title: { color: '#fff', fontWeight: '600', fontSize: 14 },
  desc: { color: 'rgba(255,255,255,0.4)', fontSize: 12, lineHeight: 18 },
});`,
  },
  {
    label: 'Outline',
    preview: <OutlineCard />,
    filename: 'FeatureCard.tsx',
    code: `import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'reactnatively';
import { Ionicons } from '@expo/vector-icons';

export function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <Card variant="outline" borderRadius={20} style={styles.card}>
      <View style={styles.row}>
        <Ionicons name={feature.icon} size={22} color="#a78bfa" />
        <Text style={styles.tag}>{feature.tag}</Text>
      </View>
      <Text style={styles.title}>{feature.title}</Text>
      <Text style={styles.desc}>{feature.description}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { padding: 20, gap: 12 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  tag: { color: 'rgba(255,255,255,0.3)', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 },
  title: { color: '#fff', fontWeight: '600', fontSize: 14 },
  desc: { color: 'rgba(255,255,255,0.4)', fontSize: 12, lineHeight: 19 },
});`,
  },
];

export function CardPreview() {
  return <ComponentPreview variants={variants} minHeight={200} />;
}
