import { useState, useEffect } from 'react';
import { AccessibilityInfo, Platform } from 'react-native';

export interface AccessibilityState {
  /** Whether the user has requested reduced motion. */
  isReducedMotion: boolean;
  /** Whether a screen reader (VoiceOver / TalkBack) is active. */
  isScreenReader: boolean;
  /** Whether bold text is enabled (iOS only; false on Android/Web). */
  isBoldText: boolean;
  /** Whether grayscale mode is enabled (iOS only; false on Android/Web). */
  isGrayscale: boolean;
  /** Whether colour inversion is enabled (iOS only; false on Android/Web). */
  isInvertColors: boolean;
}

const defaults: AccessibilityState = {
  isReducedMotion: false,
  isScreenReader: false,
  isBoldText: false,
  isGrayscale: false,
  isInvertColors: false,
};

/**
 * Subscribes to AccessibilityInfo and returns live accessibility flags.
 * Handles graceful degradation: iOS-only flags always return false on Android/Web.
 */
export function useAccessibility(): AccessibilityState {
  const [state, setState] = useState<AccessibilityState>(defaults);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      const [
        isReducedMotion,
        isScreenReader,
        isBoldText,
        isGrayscale,
        isInvertColors,
      ] = await Promise.all([
        AccessibilityInfo.isReduceMotionEnabled(),
        AccessibilityInfo.isScreenReaderEnabled(),
        Platform.OS === 'ios'
          ? AccessibilityInfo.isBoldTextEnabled()
          : Promise.resolve(false),
        Platform.OS === 'ios'
          ? AccessibilityInfo.isGrayscaleEnabled()
          : Promise.resolve(false),
        Platform.OS === 'ios'
          ? AccessibilityInfo.isInvertColorsEnabled()
          : Promise.resolve(false),
      ]);

      if (!cancelled) {
        setState({ isReducedMotion, isScreenReader, isBoldText, isGrayscale, isInvertColors });
      }
    }

    void init();

    const reduceMotionSub = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      (isReducedMotion) => setState((prev) => ({ ...prev, isReducedMotion })),
    );

    const screenReaderSub = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      (isScreenReader) => setState((prev) => ({ ...prev, isScreenReader })),
    );

    // iOS-only events — addEventListener returns undefined for unknown events on Android
    const boldTextSub =
      Platform.OS === 'ios'
        ? AccessibilityInfo.addEventListener('boldTextChanged', (isBoldText) =>
            setState((prev) => ({ ...prev, isBoldText })),
          )
        : null;

    const grayscaleSub =
      Platform.OS === 'ios'
        ? AccessibilityInfo.addEventListener('grayscaleChanged', (isGrayscale) =>
            setState((prev) => ({ ...prev, isGrayscale })),
          )
        : null;

    const invertColorsSub =
      Platform.OS === 'ios'
        ? AccessibilityInfo.addEventListener('invertColorsChanged', (isInvertColors) =>
            setState((prev) => ({ ...prev, isInvertColors })),
          )
        : null;

    return () => {
      cancelled = true;
      reduceMotionSub.remove();
      screenReaderSub.remove();
      boldTextSub?.remove();
      grayscaleSub?.remove();
      invertColorsSub?.remove();
    };
  }, []);

  return state;
}
