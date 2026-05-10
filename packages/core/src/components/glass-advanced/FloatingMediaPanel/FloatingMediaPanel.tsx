import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { GlassView } from 'reactnatively-glass';
import { useTheme } from 'reactnatively-theme';
import { SPRING_BOUNCE, usePressAnimation } from 'reactnatively-animations';
import type { FloatingMediaPanelProps, MediaPanelState } from './FloatingMediaPanel.types';

const MINI_HEIGHT     = 56;
const EXPANDED_HEIGHT = 420;
const DRAG_THRESHOLD  = 40;

// ─── Control button ───────────────────────────────────────────────────────────

interface ControlButtonProps {
  label: string;
  onPress?: () => void;
  size?: number;
}

const ControlButton = React.memo<ControlButtonProps>(({ label, onPress, size = 24 }) => {
  const { animatedStyle, handlers } = usePressAnimation({ pressedScale: 0.88 });
  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlers.onPressIn}
      onPressOut={handlers.onPressOut}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={12}
    >
      <Animated.View style={animatedStyle}>
        <Text style={{ fontSize: size, lineHeight: size + 4 }}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
});

ControlButton.displayName = 'FloatingMediaPanel.ControlButton';

// ─── FloatingMediaPanel ───────────────────────────────────────────────────────

/**
 * FloatingMediaPanel — glass panel that morphs between a slim mini bar and a
 * full expanded player. Drag up to expand, drag down to minimise.
 */
export const FloatingMediaPanel = React.memo<FloatingMediaPanelProps>(
  ({
    state: controlledState,
    defaultState = 'mini',
    onStateChange,
    artwork,
    title,
    subtitle,
    isPlaying = false,
    onPlayPause,
    onNext,
    onPrevious,
    progress = 0,
    style,
  }) => {
    const { theme } = useTheme();
    const [internalState, setInternalState] = useState<MediaPanelState>(defaultState);
    const activeState = controlledState !== undefined ? controlledState : internalState;

    const animHeight = useSharedValue(activeState === 'mini' ? MINI_HEIGHT : EXPANDED_HEIGHT);
    const dragStartY = useRef(0);

    const setActiveState = useCallback(
      (next: MediaPanelState) => {
        if (controlledState === undefined) setInternalState(next);
        onStateChange?.(next);
      },
      [controlledState, onStateChange],
    );

    useEffect(() => {
      animHeight.value = withSpring(
        activeState === 'mini' ? MINI_HEIGHT : EXPANDED_HEIGHT,
        SPRING_BOUNCE,
      );
    }, [activeState]);

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: (e) => {
          dragStartY.current = e.nativeEvent.pageY;
        },
        onPanResponderRelease: (e) => {
          const dy = dragStartY.current - e.nativeEvent.pageY; // positive = dragged up
          if (dy > DRAG_THRESHOLD) {
            setActiveState('expanded');
          } else if (dy < -DRAG_THRESHOLD) {
            setActiveState('mini');
          }
        },
      }),
    ).current;

    const animatedStyle = useAnimatedStyle(() => ({
      height: animHeight.value,
      overflow: 'hidden' as const,
    }));

    const clampedProgress = Math.max(0, Math.min(1, progress));

    return (
      <Animated.View style={[styles.wrapper, animatedStyle, style]}>
        <GlassView
          elevation={3}
          variant="surface"
          borderRadius={20}
          style={StyleSheet.absoluteFill}
        />

        {/* Drag handle */}
        <View style={styles.dragArea} {...panResponder.panHandlers}>
          <View style={[styles.dragHandle, { backgroundColor: theme.colors.border }]} />
        </View>

        {/* ── Mini bar ──────────────────────────────────────────── */}
        {activeState === 'mini' && (
          <Pressable
            style={styles.miniBar}
            onPress={() => setActiveState('expanded')}
            accessibilityRole="button"
            accessibilityLabel="Open media player"
          >
            {/* Artwork thumbnail */}
            {artwork != null && (
              <View style={styles.miniArtwork}>{artwork}</View>
            )}

            {/* Title */}
            <View style={styles.miniText}>
              <Text style={[styles.miniTitle, { color: theme.colors.text }]} numberOfLines={1}>
                {title ?? 'Not playing'}
              </Text>
              {subtitle != null && (
                <Text
                  style={[styles.miniSubtitle, { color: theme.colors.textSecondary }]}
                  numberOfLines={1}
                >
                  {subtitle}
                </Text>
              )}
            </View>

            {/* Play/pause */}
            <ControlButton
              label={isPlaying ? '⏸' : '▶'}
              onPress={onPlayPause}
              size={20}
            />
          </Pressable>
        )}

        {/* ── Expanded panel ─────────────────────────────────────── */}
        {activeState === 'expanded' && (
          <View style={styles.expanded}>
            {/* Large artwork */}
            {artwork != null && (
              <View style={styles.expandedArtwork}>{artwork}</View>
            )}

            {/* Title + subtitle */}
            <View style={styles.expandedText}>
              <Text
                style={[styles.expandedTitle, { color: theme.colors.text }]}
                numberOfLines={1}
              >
                {title ?? 'Not playing'}
              </Text>
              {subtitle != null && (
                <Text
                  style={[styles.expandedSubtitle, { color: theme.colors.textSecondary }]}
                  numberOfLines={1}
                >
                  {subtitle}
                </Text>
              )}
            </View>

            {/* Progress bar */}
            <View style={[styles.progressTrack, { backgroundColor: theme.colors.border }]}>
              <View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: theme.colors.primary,
                    width: `${clampedProgress * 100}%`,
                  },
                ]}
              />
            </View>

            {/* Controls row */}
            <View style={styles.controls}>
              <ControlButton label="⏮" onPress={onPrevious} size={28} />
              <ControlButton label={isPlaying ? '⏸' : '▶'} onPress={onPlayPause} size={36} />
              <ControlButton label="⏭" onPress={onNext} size={28} />
            </View>

            {/* Collapse button */}
            <Pressable
              onPress={() => setActiveState('mini')}
              style={styles.collapseBtn}
              accessibilityRole="button"
              accessibilityLabel="Collapse media player"
            >
              <Text style={[styles.collapseLabel, { color: theme.colors.textSecondary }]}>
                ∨
              </Text>
            </Pressable>
          </View>
        )}
      </Animated.View>
    );
  },
);

FloatingMediaPanel.displayName = 'FloatingMediaPanel';

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  dragArea: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 4,
  },
  dragHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
  },
  // ── Mini ──────────────────────────────────────────────────────────────────
  miniBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
  },
  miniArtwork: {
    width: 36,
    height: 36,
    borderRadius: 8,
    overflow: 'hidden',
  },
  miniText: {
    flex: 1,
  },
  miniTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  miniSubtitle: {
    fontSize: 12,
    marginTop: 1,
  },
  // ── Expanded ──────────────────────────────────────────────────────────────
  expanded: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
    gap: 16,
  },
  expandedArtwork: {
    width: 220,
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  expandedText: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  expandedTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  expandedSubtitle: {
    fontSize: 15,
    marginTop: 4,
    textAlign: 'center',
  },
  progressTrack: {
    alignSelf: 'stretch',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    borderRadius: 2,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 36,
  },
  collapseBtn: {
    marginTop: 4,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  collapseLabel: {
    fontSize: 20,
    fontWeight: '300',
  },
});
