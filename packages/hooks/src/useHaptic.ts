import { useCallback } from 'react';
import { Platform } from 'react-native';

export type HapticImpactStyle = 'light' | 'medium' | 'heavy';
export type HapticNotificationType = 'success' | 'warning' | 'error';

export interface UseHapticReturn {
  /** Trigger an impact haptic feedback. */
  impact: (style?: HapticImpactStyle) => Promise<void>;
  /** Trigger a notification haptic feedback. */
  notification: (type?: HapticNotificationType) => Promise<void>;
  /** Trigger a selection haptic feedback. */
  selection: () => Promise<void>;
}

// Lazily resolved expo-haptics module (null when unavailable)
let expoHaptics: ExpoHapticsModule | null | undefined = undefined;

interface ExpoHapticsModule {
  ImpactFeedbackStyle: {
    Light: string;
    Medium: string;
    Heavy: string;
  };
  NotificationFeedbackType: {
    Success: string;
    Warning: string;
    Error: string;
  };
  impactAsync: (style: string) => Promise<void>;
  notificationAsync: (type: string) => Promise<void>;
  selectionAsync: () => Promise<void>;
}

function loadExpoHaptics(): ExpoHapticsModule | null {
  if (expoHaptics !== undefined) return expoHaptics;
  try {
    // Dynamic require so bundlers can tree-shake when expo-haptics is absent
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = require('expo-haptics') as ExpoHapticsModule;
    expoHaptics = mod;
    return mod;
  } catch {
    expoHaptics = null;
    return null;
  }
}

const noop = () => Promise.resolve();

/**
 * Haptic feedback wrapper.
 * Uses expo-haptics when available; falls back to no-ops gracefully.
 * Haptics are automatically skipped on web where they are unsupported.
 */
export function useHaptic(): UseHapticReturn {
  const impact = useCallback(async (style: HapticImpactStyle = 'medium'): Promise<void> => {
    if (Platform.OS === 'web') return;
    const haptics = loadExpoHaptics();
    if (!haptics) return;

    const styleMap: Record<HapticImpactStyle, string> = {
      light: haptics.ImpactFeedbackStyle.Light,
      medium: haptics.ImpactFeedbackStyle.Medium,
      heavy: haptics.ImpactFeedbackStyle.Heavy,
    };
    await haptics.impactAsync(styleMap[style]);
  }, []);

  const notification = useCallback(
    async (type: HapticNotificationType = 'success'): Promise<void> => {
      if (Platform.OS === 'web') return;
      const haptics = loadExpoHaptics();
      if (!haptics) return;

      const typeMap: Record<HapticNotificationType, string> = {
        success: haptics.NotificationFeedbackType.Success,
        warning: haptics.NotificationFeedbackType.Warning,
        error: haptics.NotificationFeedbackType.Error,
      };
      await haptics.notificationAsync(typeMap[type]);
    },
    [],
  );

  const selection = useCallback(async (): Promise<void> => {
    if (Platform.OS === 'web') return;
    const haptics = loadExpoHaptics();
    if (!haptics) return;
    await haptics.selectionAsync();
  }, []);

  if (Platform.OS === 'web') {
    return { impact: noop, notification: noop, selection: noop };
  }

  return { impact, notification, selection };
}
