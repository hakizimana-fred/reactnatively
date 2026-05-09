import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import {
  GlassView,
  FrostPanel,
  Button,
  LiquidCard,
  Avatar,
  Badge,
  Tabs,
  SegmentedTabs,
  Stack,
  HStack,
  VStack,
  Center,
  Spacer,
  Text as Typography,
  Heading,
  GradientText,
  IconButton,
  FAB,
  ProgressBar,
  Skeleton,
} from '@reactnatively/core';
import { useTheme } from '@reactnatively/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ShowcaseScreen() {
  const isDark = useColorScheme() === 'dark';
  const { colorScheme } = useTheme();
  const [activeTab, setActiveTab] = useState('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0.67);

  // Simulate progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev + 0.01) % 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const bgGradient = isDark
    ? ['#0a0a1a', '#0f0f24', '#130d2e', '#1a0b2e'] as const
    : ['#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1'] as const;

  const accentColor = isDark ? '#6366f1' : '#4f46e5';

  return (
    <LinearGradient colors={bgGradient} style={styles.gradient}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        {/* Floating Navigation Header */}
        <FrostPanel
          elevation={4}
          style={styles.header}
          edges={['top']}
          borderRadius={0}
        >
          <HStack align="center" justify="space-between" style={styles.headerContent}>
            <HStack align="center" gap={12}>
              <GlassView
                elevation={2}
                borderRadius={12}
                style={styles.logoContainer}
                glow={{ color: accentColor, radius: 16, opacity: 0.3 }}
              >
                <Typography variant="h4" weight="bold" style={{ color: accentColor }}>
                  Æ
                </Typography>
              </GlassView>
              <VStack gap={2}>
                <Typography variant="h3" weight="bold" style={styles.appTitle}>
                  Aether
                </Typography>
                <Typography variant="caption" style={styles.appSubtitle}>
                  Neural Interface
                </Typography>
              </VStack>
            </HStack>

            <HStack align="center" gap={8}>
              <IconButton
                name="search"
                size="sm"
                variant="ghost"
                style={styles.iconButton}
              />
              <Avatar
                name="Alex Chen"
                size="sm"
                bordered
                fallbackBg={accentColor}
              />
            </HStack>
          </HStack>
        </FrostPanel>

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <VStack gap={24} style={styles.heroSection}>
            <Center>
              <VStack gap={16} align="center">
                <GlassView
                  elevation={5}
                  borderRadius={32}
                  style={styles.heroCard}
                  glow={{ color: accentColor, radius: 32, opacity: 0.25 }}
                >
                  <VStack gap={20} align="center" style={styles.heroContent}>
                    <GlassView
                      elevation={3}
                      borderRadius={24}
                      style={styles.albumArt}
                      glow={{ color: '#ec4899', radius: 20, opacity: 0.4 }}
                    >
                      <Center style={styles.albumCenter}>
                        <Typography variant="h1" style={styles.albumEmoji}>
                          🌊
                        </Typography>
                      </Center>
                    </GlassView>

                    <VStack gap={8} align="center">
                      <GradientText
                        variant="h2"
                        weight="bold"
                        colors={[accentColor, '#ec4899', '#8b5cf6']}
                        style={styles.songTitle}
                      >
                        Liquid Dreams
                      </GradientText>
                      <Typography variant="body" style={styles.artistName}>
                        Neural Waves • 2026
                      </Typography>
                    </VStack>

                    <VStack gap={12} style={styles.controlsSection}>
                      <ProgressBar
                        progress={progress}
                        height={4}
                        variant="glass"
                        style={styles.progressBar}
                      />

                      <HStack align="center" justify="space-between" style={styles.timeLabels}>
                        <Typography variant="caption" style={styles.timeText}>
                          2:34
                        </Typography>
                        <Typography variant="caption" style={styles.timeText}>
                          4:12
                        </Typography>
                      </HStack>

                      <HStack align="center" justify="center" gap={24}>
                        <IconButton
                          name="skip-previous"
                          size="lg"
                          variant="ghost"
                          style={styles.controlButton}
                        />
                        <GlassView
                          elevation={4}
                          borderRadius={28}
                          style={styles.playButton}
                          glow={isPlaying ? { color: '#10b981', radius: 24, opacity: 0.5 } : undefined}
                        >
                          <IconButton
                            name={isPlaying ? "pause" : "play"}
                            size="xl"
                            variant="ghost"
                            onPress={() => setIsPlaying(!isPlaying)}
                            style={styles.playIcon}
                          />
                        </GlassView>
                        <IconButton
                          name="skip-next"
                          size="lg"
                          variant="ghost"
                          style={styles.controlButton}
                        />
                      </HStack>
                    </VStack>
                  </VStack>
                </GlassView>

                <Typography variant="body" style={styles.heroDescription}>
                  Immerse yourself in crystalline soundscapes crafted by AI neural networks
                </Typography>
              </VStack>
            </Center>
          </VStack>

          {/* Quick Actions */}
          <VStack gap={16} style={styles.quickActions}>
            <Typography variant="h4" weight="bold" style={styles.sectionTitle}>
              Quick Actions
            </Typography>

            <HStack gap={12} style={styles.actionGrid}>
              {[
                { icon: '🎵', label: 'Discover', color: '#6366f1' },
                { icon: '❤️', label: 'Favorites', color: '#ec4899' },
                { icon: '📊', label: 'Analytics', color: '#10b981' },
                { icon: '⚙️', label: 'Settings', color: '#f59e0b' },
              ].map((action, index) => (
                <GlassView
                  key={index}
                  elevation={2}
                  borderRadius={16}
                  style={styles.actionCard}
                  glow={{ color: action.color, radius: 12, opacity: 0.2 }}
                >
                  <VStack gap={8} align="center">
                    <GlassView
                      elevation={1}
                      borderRadius={12}
                      style={styles.actionIcon}
                      tintOverride={action.color + '20'}
                    >
                      <Typography variant="h3" style={styles.actionEmoji}>
                        {action.icon}
                      </Typography>
                    </GlassView>
                    <Typography variant="caption" weight="medium" style={styles.actionLabel}>
                      {action.label}
                    </Typography>
                  </VStack>
                </GlassView>
              ))}
            </HStack>
          </VStack>

          {/* Recent Sessions */}
          <VStack gap={16} style={styles.recentSection}>
            <HStack align="center" justify="space-between">
              <Typography variant="h4" weight="bold" style={styles.sectionTitle}>
                Recent Sessions
              </Typography>
              <Button label="View All" variant="ghost" size="sm" />
            </HStack>

            <Stack gap={12}>
              {[
                {
                  title: 'Deep Focus',
                  artist: 'Mind Waves',
                  duration: '45 min',
                  progress: 0.8,
                  color: '#6366f1'
                },
                {
                  title: 'Creative Flow',
                  artist: 'Synapse Beats',
                  duration: '32 min',
                  progress: 0.6,
                  color: '#ec4899'
                },
                {
                  title: 'Meditation',
                  artist: 'Zen Harmonics',
                  duration: '20 min',
                  progress: 0.9,
                  color: '#10b981'
                },
              ].map((session, index) => (
                <GlassView
                  key={index}
                  elevation={2}
                  borderRadius={16}
                  style={styles.sessionCard}
                  glow={{ color: session.color, radius: 16, opacity: 0.15 }}
                >
                  <HStack align="center" gap={12}>
                    <GlassView
                      elevation={1}
                      borderRadius={12}
                      style={styles.sessionIcon}
                      tintOverride={session.color + '15'}
                    >
                      <Typography variant="h4" style={styles.sessionEmoji}>
                        🎵
                      </Typography>
                    </GlassView>

                    <VStack gap={4} flex={1}>
                      <Typography variant="body" weight="medium" style={styles.sessionTitle}>
                        {session.title}
                      </Typography>
                      <Typography variant="caption" style={styles.sessionArtist}>
                        {session.artist} • {session.duration}
                      </Typography>
                      <ProgressBar
                        progress={session.progress}
                        height={2}
                        variant="glass"
                        style={styles.sessionProgress}
                      />
                    </VStack>

                    <IconButton
                      name="play"
                      size="sm"
                      variant="ghost"
                      style={styles.sessionPlay}
                    />
                  </HStack>
                </GlassView>
              ))}
            </Stack>
          </VStack>

          {/* Neural Insights */}
          <VStack gap={16} style={styles.insightsSection}>
            <Typography variant="h4" weight="bold" style={styles.sectionTitle}>
              Neural Insights
            </Typography>

            <HStack gap={12} style={styles.insightsGrid}>
              {[
                { value: '94%', label: 'Focus Score', color: '#10b981', icon: '🎯' },
                { value: '2.3h', label: 'Today', color: '#6366f1', icon: '⏰' },
                { value: '12', label: 'Sessions', color: '#ec4899', icon: '📈' },
              ].map((insight, index) => (
                <GlassView
                  key={index}
                  elevation={3}
                  borderRadius={16}
                  style={styles.insightCard}
                  glow={{ color: insight.color, radius: 20, opacity: 0.2 }}
                >
                  <VStack gap={8} align="center">
                    <GlassView
                      elevation={2}
                      borderRadius={12}
                      style={styles.insightIcon}
                      tintOverride={insight.color + '20'}
                    >
                      <Typography variant="h2" style={styles.insightEmoji}>
                        {insight.icon}
                      </Typography>
                    </GlassView>
                    <Typography variant="h2" weight="bold" style={[styles.insightValue, { color: insight.color }]}>
                      {insight.value}
                    </Typography>
                    <Typography variant="caption" weight="medium" style={styles.insightLabel}>
                      {insight.label}
                    </Typography>
                  </VStack>
                </GlassView>
              ))}
            </HStack>
          </VStack>

          {/* Bottom Spacing */}
          <View style={{ height: 120 }} />
        </ScrollView>

        {/* Floating Action Button */}
        <FAB
          icon="plus"
          position="bottom-right"
          elevation={4}
          glow={{ color: accentColor, radius: 24, opacity: 0.4 }}
          style={styles.fab}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  header: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  headerContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logoContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    color: '#f1f5f9',
    marginTop: 2,
  },
  appSubtitle: {
    color: '#94a3b8',
    opacity: 0.8,
  },
  iconButton: {
    opacity: 0.8,
  },
  scroll: {
    paddingHorizontal: 20,
  },
  heroSection: {
    marginTop: 8,
  },
  heroCard: {
    padding: 24,
    width: SCREEN_WIDTH - 40,
    maxWidth: 400,
  },
  heroContent: {
    width: '100%',
  },
  albumArt: {
    width: 120,
    height: 120,
    alignSelf: 'center',
  },
  albumCenter: {
    width: '100%',
    height: '100%',
  },
  albumEmoji: {
    color: '#6366f1',
  },
  songTitle: {
    textAlign: 'center',
  },
  artistName: {
    color: '#94a3b8',
    textAlign: 'center',
  },
  controlsSection: {
    width: '100%',
  },
  progressBar: {
    marginHorizontal: 8,
  },
  timeLabels: {
    marginHorizontal: 8,
  },
  timeText: {
    color: '#94a3b8',
    fontSize: 12,
  },
  controlButton: {
    opacity: 0.8,
  },
  playButton: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    marginLeft: 2,
  },
  heroDescription: {
    color: '#94a3b8',
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: 20,
  },
  quickActions: {
    marginTop: 8,
  },
  sectionTitle: {
    color: '#f1f5f9',
    marginBottom: 4,
  },
  actionGrid: {
    flexWrap: 'wrap',
  },
  actionCard: {
    width: (SCREEN_WIDTH - 40 - 24) / 2,
    padding: 16,
    alignItems: 'center',
  },
  actionIcon: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionEmoji: {
    color: '#6366f1',
  },
  actionLabel: {
    color: '#f1f5f9',
    textAlign: 'center',
  },
  recentSection: {
    marginTop: 32,
  },
  sessionCard: {
    padding: 16,
  },
  sessionIcon: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sessionEmoji: {
    color: '#6366f1',
  },
  sessionTitle: {
    color: '#f1f5f9',
  },
  sessionArtist: {
    color: '#94a3b8',
  },
  sessionProgress: {
    marginTop: 4,
  },
  sessionPlay: {
    opacity: 0.8,
  },
  insightsSection: {
    marginTop: 32,
  },
  insightsGrid: {
    flexWrap: 'wrap',
  },
  insightCard: {
    flex: 1,
    minWidth: (SCREEN_WIDTH - 40 - 24) / 3,
    padding: 16,
    alignItems: 'center',
  },
  insightIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  insightEmoji: {
    color: '#6366f1',
  },
  insightValue: {
    textAlign: 'center',
  },
  insightLabel: {
    color: '#94a3b8',
    textAlign: 'center',
  },
  fab: {
    marginBottom: 100,
    marginRight: 20,
  },
});