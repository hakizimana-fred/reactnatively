'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, Heart, Star, ChevronRight, X } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { CodeBlock } from '@/components/ui/CodeBlock';

type Tab = 'buttons' | 'cards' | 'inputs' | 'overlays';

const tabs: { id: Tab; label: string }[] = [
  { id: 'buttons', label: 'Buttons' },
  { id: 'cards', label: 'Cards' },
  { id: 'inputs', label: 'Forms' },
  { id: 'overlays', label: 'Sheets' },
];

const tabCode: Record<Tab, { filename: string; code: string }> = {
  buttons: {
    filename: 'screens/HomeScreen.tsx',
    code: `import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, IconButton, FAB } from 'reactnatively';

export function ActionBar({ onNotify, onCreate }) {
  return (
    <View style={styles.row}>
      <Button variant="solid" color="primary" size="lg">
        Get Started
      </Button>

      <Button variant="glass" size="lg">
        Learn More
      </Button>

      <Button variant="outline" size="lg">
        Cancel
      </Button>

      <IconButton
        icon={<Ionicons name="notifications-outline" size={20} color="#fff" />}
        variant="glass"
        onPress={onNotify}
        accessibilityLabel="Open notifications"
      />

      <FAB
        icon={<Ionicons name="add" size={24} color="#fff" />}
        color="#6366f1"
        onPress={onCreate}
      />
    </View>
  );
}`,
  },
  cards: {
    filename: 'screens/ProfileScreen.tsx',
    code: `import { View, StyleSheet } from 'react-native';
import { GlassView, Avatar, Heading, Text, Badge } from 'reactnatively';

export function ProfileCard({ user }) {
  return (
    <GlassView
      elevation={3}
      variant="elevated"
      borderRadius={24}
      style={styles.card}
    >
      <Avatar
        src={{ uri: user.avatarUrl }}
        size="xl"
        bordered
        borderColor="#8b5cf6"
      />
      <Heading level="h3" style={styles.name}>
        {user.displayName}
      </Heading>
      <Badge variant="glass" status="primary" label="Premium" />
      <Text variant="md" color="rgba(255,255,255,0.68)" style={styles.bio}>
        {user.bio}
      </Text>
    </GlassView>
  );
}`,
  },
  inputs: {
    filename: 'screens/AuthScreen.tsx',
    code: `import { View, StyleSheet } from 'react-native';
import {
  GlassView,
  TextInput,
  PasswordInput,
  Switch,
  Button,
  OTPInput,
} from 'reactnatively';

export function LoginForm({ onSubmit }) {
  return (
    <GlassView elevation={2} borderRadius={20} style={styles.form}>
      <TextInput
        label="Email"
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <PasswordInput
        label="Password"
        placeholder="••••••••"
      />
      <Switch label="Remember me" />
      <Button
        variant="solid"
        color="primary"
        size="lg"
        onPress={onSubmit}
      >
        Sign In
      </Button>
    </GlassView>
  );
}`,
  },
  overlays: {
    filename: 'components/CheckoutSheet.tsx',
    code: `import { View, StyleSheet } from 'react-native';
import {
  BottomSheet,
  Heading,
  Text,
  Button,
  Divider,
} from 'reactnatively';

export function CheckoutSheet({ visible, onClose, onConfirm }) {
  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      snapPoints={['50%', '90%']}
      variant="glass"
    >
      <Heading level="h3">Complete Purchase</Heading>
      <Text variant="md" color="rgba(255,255,255,0.68)">
        Review your order before confirming.
      </Text>
      <Divider style={styles.divider} />
      <Button variant="solid" color="primary" size="lg" onPress={onConfirm}>
        Confirm — $49.99
      </Button>
      <Button variant="ghost" onPress={onClose}>
        Cancel
      </Button>
    </BottomSheet>
  );
}`,
  },
};

export function ComponentShowcase() {
  const [activeTab, setActiveTab] = useState<Tab>('buttons');

  return (
    <section className="relative overflow-hidden py-24 section-bg">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs text-white/50 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Components
          </div>
          <h2 className="text-4xl sm:text-5xl font-semibold text-[color:var(--text-primary)] mb-4 tracking-tight">
            Components shown as product surfaces,{' '}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              not isolated decorations.
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-[color:var(--text-muted)] text-lg">
            Explore real app compositions for actions, profile surfaces, forms,
            and sheets. Each preview is paired with React Native code.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="inline-flex p-1 rounded-xl bg-[color:var(--glass-subtle)] border border-[color:var(--border-subtle)] backdrop-blur-md">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
              >
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-white/[0.10] border border-white/[0.12]"
                    layoutId="activeTab"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors ${
                    activeTab === tab.id ? 'text-[color:var(--text-primary)]' : 'text-[color:var(--text-muted)]'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Preview + code panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {/* Visual preview */}
          <GlassCard variant="elevated" className="min-h-[360px] p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {activeTab === 'buttons' && <ButtonsPreview />}
                {activeTab === 'cards' && <CardsPreview />}
                {activeTab === 'inputs' && <InputsPreview />}
                {activeTab === 'overlays' && <OverlaysPreview />}
              </motion.div>
            </AnimatePresence>
          </GlassCard>

          {/* RN code panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + '-code'}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <CodeBlock
                code={tabCode[activeTab].code}
                language="tsx"
                filename={tabCode[activeTab].filename}
                showLineNumbers
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ButtonsPreview() {
  return (
    <div className="space-y-8">
      <PreviewLabel>Button Variants</PreviewLabel>
      <div className="flex flex-wrap items-center gap-4">
        <motion.button
          className="px-5 h-10 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-violet-600 shadow-lg relative overflow-hidden"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="absolute inset-x-0 top-0 h-px bg-white/30" />
          Primary
        </motion.button>

        <motion.button
          className="px-5 h-10 rounded-xl text-sm font-medium text-white bg-white/[0.08] border border-white/[0.12] backdrop-blur-md relative overflow-hidden"
          whileHover={{ scale: 1.02, y: -1, backgroundColor: 'rgba(255,255,255,0.12)' }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="absolute inset-x-0 top-0 h-px bg-white/20" />
          Glass
        </motion.button>

        <motion.button
          className="px-5 h-10 rounded-xl text-sm font-medium text-white border border-white/[0.15]"
          whileHover={{ scale: 1.02, y: -1, backgroundColor: 'rgba(255,255,255,0.06)' }}
          whileTap={{ scale: 0.97 }}
        >
          Outline
        </motion.button>

        <motion.button
          className="px-5 h-10 rounded-xl text-sm font-medium text-white/60"
          whileHover={{ scale: 1.02, color: 'rgba(255,255,255,0.9)', backgroundColor: 'rgba(255,255,255,0.05)' }}
          whileTap={{ scale: 0.97 }}
        >
          Ghost
        </motion.button>

        <motion.button
          className="w-10 h-10 rounded-xl text-white bg-white/[0.08] border border-white/[0.12] flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
        >
          <Bell className="w-4 h-4" />
        </motion.button>

        <motion.button
          className="w-14 h-14 rounded-2xl text-white flex items-center justify-center shadow-xl relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="absolute inset-x-0 top-0 h-px bg-white/30" />
          <Star className="w-6 h-6" />
        </motion.button>
      </div>

      <PreviewLabel>Sizes</PreviewLabel>
      <div className="flex flex-wrap items-center gap-3">
        {['xs', 'sm', 'md', 'lg', 'xl'].map((size, i) => (
          <motion.button
            key={size}
            className="rounded-xl text-white bg-white/[0.06] border border-white/[0.10] font-medium"
            style={{
              padding: `${4 + i * 2}px ${10 + i * 4}px`,
              fontSize: `${11 + i}px`,
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {size.toUpperCase()}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function CardsPreview() {
  return (
    <div className="space-y-6">
      <PreviewLabel>Card Variants</PreviewLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            title: 'Surface',
            subtitle: 'elevation: 2',
            blur: 'backdrop-blur-xl',
            bg: 'bg-white/[0.06]',
            border: 'border-white/[0.10]',
          },
          {
            title: 'Elevated',
            subtitle: 'elevation: 3',
            blur: 'backdrop-blur-2xl',
            bg: 'bg-white/[0.10]',
            border: 'border-white/[0.15]',
          },
          {
            title: 'Frosted',
            subtitle: 'variant: frosted',
            blur: 'backdrop-blur-3xl',
            bg: 'bg-white/[0.08]',
            border: 'border-white/[0.12]',
          },
        ].map((card) => (
          <motion.div
            key={card.title}
            className={`relative rounded-xl overflow-hidden p-4 border ${card.bg} ${card.blur} ${card.border}`}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/[0.04] to-transparent" />
            <div className="relative z-10">
              <div className="font-medium text-white mb-1">{card.title}</div>
              <div className="text-xs text-white/40 font-mono">{card.subtitle}</div>
              <div className="mt-3 h-1 w-3/4 rounded-full bg-white/10" />
              <div className="mt-1.5 h-1 w-1/2 rounded-full bg-white/[0.06]" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function InputsPreview() {
  return (
    <div className="space-y-6 max-w-md">
      <PreviewLabel>Input Components</PreviewLabel>
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search components..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.10] text-white placeholder-white/30 text-sm focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.08] transition-all backdrop-blur-md"
            readOnly
          />
        </div>

        <input
          type="text"
          placeholder="Text input"
          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.10] text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-500/50 transition-all backdrop-blur-md"
          readOnly
        />

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              className="w-10 h-10 text-center rounded-lg bg-white/[0.06] border border-white/[0.10] text-white font-mono text-lg focus:outline-none focus:border-violet-500/50 transition-all"
              readOnly
              value={i < 4 ? '•' : ''}
            />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-white/60">Notifications</span>
          <motion.div
            className="relative w-11 h-6 rounded-full bg-violet-500 cursor-pointer"
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-white shadow-sm"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function OverlaysPreview() {
  return (
    <div className="space-y-6">
      <PreviewLabel>Overlay Components</PreviewLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Toast */}
        <motion.div
          className="relative rounded-xl overflow-hidden p-4 bg-white/[0.08] border border-white/[0.12] backdrop-blur-xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white mb-0.5">Component rendered</div>
              <div className="text-xs text-white/50">Glass surface is ready</div>
            </div>
            <button className="text-white/30 hover:text-white/60">
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Badge cluster */}
        <div className="relative rounded-xl overflow-hidden p-4 bg-white/[0.05] border border-white/[0.08]">
          <div className="flex flex-wrap gap-2">
            {['glass', 'motion', 'expo', 'native', 'blur', 'v1.0'].map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/[0.06] border border-white/[0.10] text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom sheet preview */}
        <motion.div
          className="relative rounded-xl overflow-hidden bg-white/[0.06] border border-white/[0.10] backdrop-blur-xl sm:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="p-4">
            <div className="mx-auto w-8 h-1 rounded-full bg-white/20 mb-4" />
            <div className="text-sm font-medium text-white mb-1">Bottom Sheet</div>
            <div className="text-xs text-white/40">Smooth spring-physics drag to dismiss</div>
            <div className="mt-3 flex gap-2">
              {['Cancel', 'Confirm'].map((btn, i) => (
                <motion.button
                  key={btn}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                    i === 1
                      ? 'bg-gradient-to-r from-blue-500 to-violet-600 text-white'
                      : 'bg-white/[0.06] border border-white/[0.10] text-white/60'
                  }`}
                  whileTap={{ scale: 0.97 }}
                >
                  {btn}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function PreviewLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs text-white/30 uppercase tracking-widest font-medium">
      {children}
    </div>
  );
}
