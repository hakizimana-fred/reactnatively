'use client';

import { motion } from 'framer-motion';
import { ComponentPreview, type PreviewVariant } from '../ComponentPreview';

function RNSpinner({
  size = 'md',
  color = 'primary',
  variant = 'circular',
}: {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'white' | 'success' | 'error';
  variant?: 'circular' | 'dots' | 'pulse';
}) {
  const colorMap = {
    primary: '#7c3aed',
    white: 'rgba(255,255,255,0.8)',
    success: '#16a34a',
    error: '#dc2626',
  };
  const hex = colorMap[color];

  const sizeMap = { xs: 16, sm: 20, md: 28, lg: 36, xl: 48 };
  const px = sizeMap[size];

  if (variant === 'dots') {
    return (
      <div style={{ display: 'flex', gap: px * 0.3 }}>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
            style={{
              width: px * 0.35, height: px * 0.35, borderRadius: '50%',
              background: hex, display: 'block',
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <motion.span
        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0.3, 0.7] }}
        transition={{ duration: 1.2, repeat: Infinity }}
        style={{
          width: px, height: px, borderRadius: '50%',
          background: hex, display: 'block',
        }}
      />
    );
  }

  return (
    <motion.span
      animate={{ rotate: 360 }}
      transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
      style={{
        width: px, height: px, display: 'block',
        border: `${Math.max(2, px * 0.1)}px solid ${hex}33`,
        borderTop: `${Math.max(2, px * 0.1)}px solid ${hex}`,
        borderRadius: '50%',
      }}
    />
  );
}

const variants: PreviewVariant[] = [
  {
    label: 'Sizes',
    preview: (
      <div className="flex items-center gap-8">
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
          <div key={size} className="flex flex-col items-center gap-3">
            <RNSpinner size={size} />
            <span className="text-xs text-white/30">{size}</span>
          </div>
        ))}
      </div>
    ),
    filename: 'SpinnerSizes.tsx',
    code: `import { View, StyleSheet } from 'react-native';
import { Spinner } from 'reactnatively';

export function SpinnerSizes() {
  return (
    <View style={styles.row}>
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 24 },
});`,
  },
  {
    label: 'Colors',
    preview: (
      <div className="flex items-center gap-8">
        {(['primary', 'success', 'error', 'white'] as const).map((color) => (
          <div key={color} className="flex flex-col items-center gap-3">
            <RNSpinner color={color} size="lg" />
            <span className="text-xs text-white/30">{color}</span>
          </div>
        ))}
      </div>
    ),
    filename: 'SpinnerColors.tsx',
    code: `import { View, StyleSheet } from 'react-native';
import { Spinner } from 'reactnatively';

export function SpinnerColors() {
  return (
    <View style={styles.row}>
      <Spinner color="primary" size="lg" />
      <Spinner color="success" size="lg" />
      <Spinner color="error" size="lg" />
      <Spinner color="white" size="lg" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 24 },
});`,
  },
  {
    label: 'Variants',
    preview: (
      <div className="flex items-center gap-10">
        <div className="flex flex-col items-center gap-3">
          <RNSpinner variant="circular" size="lg" />
          <span className="text-xs text-white/30">circular</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <RNSpinner variant="dots" size="lg" />
          <span className="text-xs text-white/30">dots</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <RNSpinner variant="pulse" size="lg" />
          <span className="text-xs text-white/30">pulse</span>
        </div>
      </div>
    ),
    filename: 'SpinnerVariants.tsx',
    code: `import { View, StyleSheet } from 'react-native';
import { Spinner } from 'reactnatively';

export function SpinnerVariants() {
  return (
    <View style={styles.row}>
      <Spinner variant="circular" size="lg" />
      <Spinner variant="dots" size="lg" />
      <Spinner variant="pulse" size="lg" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 32 },
});`,
  },
];

export function SpinnerPreview() {
  return <ComponentPreview variants={variants} minHeight={120} />;
}
