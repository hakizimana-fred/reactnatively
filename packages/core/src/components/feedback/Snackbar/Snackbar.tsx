import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { GlassView } from 'reactnatively-glass';
import { useIsDark } from 'reactnatively-theme';
import { SPRING_SNAPPY, TIMING_EXIT } from 'reactnatively-animations';
import { snackbar, type SnackbarOptions } from './snackbar-api';
import type { SnackbarProviderProps } from './Snackbar.types';

// ─── Internal Snackbar bar ────────────────────────────────────────────────────

interface SnackbarBarProps {
  opts: SnackbarOptions;
  onHide: () => void;
}

const SnackbarBar = React.memo<SnackbarBarProps>(({ opts, onHide }) => {
  const isDark      = useIsDark();
  const opacity     = useSharedValue(0);
  const translateY  = useSharedValue(opts.position === 'top' ? -60 : 60);
  const isHiding    = useRef(false);

  const doHide = useCallback(() => {
    if (isHiding.current) return;
    isHiding.current = true;
    opacity.value    = withTiming(0, TIMING_EXIT, () => runOnJS(onHide)());
    translateY.value = withTiming(
      opts.position === 'top' ? -60 : 60,
      TIMING_EXIT,
    );
  }, [opacity, translateY, onHide, opts.position]);

  useEffect(() => {
    opacity.value    = withSpring(1, SPRING_SNAPPY);
    translateY.value = withSpring(0, SPRING_SNAPPY);
  }, []);

  useEffect(() => {
    const dur = opts.duration ?? 3000;
    if (dur <= 0) return;
    const t = setTimeout(() => doHide(), dur);
    return () => clearTimeout(t);
  }, [opts.duration, doHide]);

  const animStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      opacity:   opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  const bg    = isDark ? '#1e293b' : '#1a1a2e';
  const inner = (
    <View style={styles.snackInner}>
      <Text style={styles.message} numberOfLines={2}>{opts.message}</Text>
      {opts.action != null && (
        <Pressable
          onPress={() => { opts.action!.onPress(); doHide(); }}
          style={styles.actionBtn}
          accessibilityRole="button"
        >
          <Text style={styles.actionText}>{opts.action.label}</Text>
        </Pressable>
      )}
    </View>
  );

  return (
    <Animated.View style={[styles.snack, animStyle]}>
      {opts.glass ? (
        <GlassView elevation={3} borderRadius={12}>
          {inner}
        </GlassView>
      ) : (
        <View style={[styles.solidSnack, { backgroundColor: bg }]}>
          {inner}
        </View>
      )}
    </Animated.View>
  );
});

SnackbarBar.displayName = 'SnackbarBar';

// ─── Provider ─────────────────────────────────────────────────────────────────

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [current, setCurrent] = useState<SnackbarOptions | null>(null);
  const keyRef = useRef(0);
  const [key, setKey] = useState(0);

  const handleShow = useCallback((opts: SnackbarOptions) => {
    keyRef.current += 1;
    setKey(keyRef.current);
    setCurrent(opts);
  }, []);

  const handleHide = useCallback(() => {
    setCurrent(null);
  }, []);

  useEffect(() => {
    return snackbar._register(handleShow, handleHide);
  }, [handleShow, handleHide]);

  const position  = current?.position ?? 'bottom';
  const topOff    = Platform.OS === 'ios' ? 52 : 28;
  const botOff    = Platform.OS === 'ios' ? 40 : 20;

  return (
    <>
      {children}
      {current != null && (
        <View
          style={[
            styles.container,
            position === 'top'
              ? { top: topOff }
              : { bottom: botOff },
          ]}
          pointerEvents="box-none"
        >
          <SnackbarBar
            key={key}
            opts={current}
            onHide={handleHide}
          />
        </View>
      )}
    </>
  );
}

SnackbarProvider.displayName = 'SnackbarProvider';

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    position:         'absolute',
    left:             16,
    right:            16,
    zIndex:           9999,
    pointerEvents:    'box-none',
  } as any,
  snack: {
    width: '100%',
  },
  solidSnack: {
    borderRadius:  12,
    shadowColor:   '#000',
    shadowOffset:  { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius:  12,
    elevation:     6,
  },
  snackInner: {
    flexDirection:     'row',
    alignItems:        'center',
    paddingHorizontal: 16,
    paddingVertical:   12,
    minHeight:         48,
  },
  message: {
    flex:       1,
    fontSize:   14,
    fontWeight: '500',
    color:      '#fff',
    lineHeight: 20,
    marginRight: 8,
  },
  actionBtn: {
    paddingVertical:   4,
    paddingHorizontal: 8,
    marginLeft:        4,
  },
  actionText: {
    fontSize:   13,
    fontWeight: '700',
    color:      '#a5b4fc',
  },
});
