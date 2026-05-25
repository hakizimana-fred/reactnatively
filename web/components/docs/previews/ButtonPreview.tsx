'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ComponentPreview, type PreviewVariant } from '../ComponentPreview';

function RNButton({
  label,
  variant = 'solid',
  color = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
}: {
  label: string;
  variant?: 'solid' | 'outline' | 'ghost' | 'glass' | 'tinted' | 'destructive';
  color?: 'primary' | 'success' | 'error' | 'warning' | 'neutral';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}) {
  const [pressed, setPressed] = useState(false);

  const sizeMap = {
    xs: { px: 'px-3', py: 'py-1', text: 'text-xs', h: 'h-7' },
    sm: { px: 'px-4', py: 'py-1.5', text: 'text-xs', h: 'h-8' },
    md: { px: 'px-5', py: 'py-2', text: 'text-sm', h: 'h-10' },
    lg: { px: 'px-6', py: 'py-2.5', text: 'text-sm', h: 'h-11' },
    xl: { px: 'px-8', py: 'py-3', text: 'text-base', h: 'h-13' },
  };

  const colorMap: Record<string, string> = {
    primary: '#7c3aed',
    success: '#16a34a',
    error: '#dc2626',
    warning: '#d97706',
    neutral: '#4b5563',
  };

  const hex = colorMap[color] ?? colorMap.primary;

  const variantStyles: Record<string, React.CSSProperties> = {
    solid: {
      background: disabled ? '#3f3f46' : hex,
      color: disabled ? '#71717a' : '#fff',
      border: 'none',
    },
    outline: {
      background: 'transparent',
      color: disabled ? '#52525b' : hex,
      border: `1.5px solid ${disabled ? '#3f3f46' : hex}`,
    },
    ghost: {
      background: pressed ? `${hex}22` : 'transparent',
      color: disabled ? '#52525b' : hex,
      border: 'none',
    },
    glass: {
      background: 'rgba(255,255,255,0.08)',
      color: disabled ? '#52525b' : '#fff',
      border: '1px solid rgba(255,255,255,0.14)',
      backdropFilter: 'blur(12px)',
    },
    tinted: {
      background: `${hex}22`,
      color: disabled ? '#52525b' : hex,
      border: 'none',
    },
    destructive: {
      background: disabled ? '#3f3f46' : '#dc2626',
      color: disabled ? '#71717a' : '#fff',
      border: 'none',
    },
  };

  const { px, py, text, h } = sizeMap[size];

  return (
    <motion.button
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      animate={{ scale: pressed && !disabled ? 0.96 : 1, opacity: disabled ? 0.45 : 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={variantStyles[variant]}
      className={`inline-flex items-center justify-center gap-2 font-semibold rounded-xl cursor-pointer select-none ${px} ${py} ${text} ${h} ${disabled ? 'cursor-not-allowed' : ''}`}
    >
      {loading ? (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
        />
      ) : leftIcon}
      {loading ? 'Loading…' : label}
      {!loading && rightIcon}
    </motion.button>
  );
}

const variants: PreviewVariant[] = [
  {
    label: 'Variants',
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <RNButton label="Solid" variant="solid" />
        <RNButton label="Outline" variant="outline" />
        <RNButton label="Ghost" variant="ghost" />
        <RNButton label="Glass" variant="glass" />
        <RNButton label="Tinted" variant="tinted" />
        <RNButton label="Destructive" variant="destructive" />
      </div>
    ),
    filename: 'ActionsRow.tsx',
    code: `import { View, StyleSheet } from 'react-native';
import { Button } from 'reactnatively';

export function ActionsRow() {
  return (
    <View style={styles.row}>
      <Button variant="solid" color="primary" onPress={handleStart}>
        Solid
      </Button>
      <Button variant="outline" color="primary" onPress={handleOutline}>
        Outline
      </Button>
      <Button variant="ghost" color="primary" onPress={handleGhost}>
        Ghost
      </Button>
      <Button variant="glass" onPress={handleGlass}>
        Glass
      </Button>
      <Button variant="tinted" color="primary" onPress={handleTinted}>
        Tinted
      </Button>
      <Button variant="destructive" onPress={handleDelete}>
        Destructive
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, padding: 20 },
});`,
  },
  {
    label: 'Sizes',
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <RNButton label="Extra Small" size="xs" />
        <RNButton label="Small" size="sm" />
        <RNButton label="Medium" size="md" />
        <RNButton label="Large" size="lg" />
        <RNButton label="Extra Large" size="xl" />
      </div>
    ),
    filename: 'SizeDemo.tsx',
    code: `import { View, StyleSheet } from 'react-native';
import { Button } from 'reactnatively';

export function SizeDemo() {
  return (
    <View style={styles.row}>
      <Button size="xs" label="Extra Small" onPress={() => {}} />
      <Button size="sm" label="Small" onPress={() => {}} />
      <Button size="md" label="Medium" onPress={() => {}} />
      <Button size="lg" label="Large" onPress={() => {}} />
      <Button size="xl" label="Extra Large" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 12 },
});`,
  },
  {
    label: 'Colors',
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <RNButton label="Primary" color="primary" />
        <RNButton label="Success" color="success" />
        <RNButton label="Warning" color="warning" />
        <RNButton label="Error" color="error" />
        <RNButton label="Neutral" color="neutral" />
      </div>
    ),
    filename: 'ColorDemo.tsx',
    code: `import { View, StyleSheet } from 'react-native';
import { Button } from 'reactnatively';

export function ColorDemo() {
  return (
    <View style={styles.row}>
      <Button color="primary" label="Primary" onPress={() => {}} />
      <Button color="success" label="Success" onPress={() => {}} />
      <Button color="warning" label="Warning" onPress={() => {}} />
      <Button color="error" label="Error" onPress={() => {}} />
      <Button color="neutral" label="Neutral" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
});`,
  },
  {
    label: 'States',
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <RNButton label="Normal" />
        <RNButton label="Loading" loading />
        <RNButton label="Disabled" disabled />
        <RNButton label="Disabled Outline" variant="outline" disabled />
      </div>
    ),
    filename: 'LoginScreen.tsx',
    code: `import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'reactnatively';

export function LoginScreen() {
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    await signIn();
    setLoading(false);
  }

  return (
    <View style={styles.col}>
      <Button
        variant="solid"
        color="primary"
        size="lg"
        loading={loading}
        fullWidth
        onPress={handleLogin}
      >
        Sign In
      </Button>
      <Button variant="outline" size="lg" disabled fullWidth>
        Disabled
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  col: { gap: 12, padding: 24 },
});`,
  },
];

export function ButtonPreview() {
  return <ComponentPreview variants={variants} minHeight={160} />;
}
