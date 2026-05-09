import { useState, useEffect, useRef } from 'react';
import { Keyboard, Animated, Platform } from 'react-native';
import type { KeyboardEvent } from 'react-native';

export interface KeyboardState {
  /** Whether the keyboard is currently visible. */
  isVisible: boolean;
  /** Current keyboard height in logical pixels. */
  height: number;
  /** Animated.Value tracking keyboard height — animates in sync with the keyboard. */
  keyboardHeight: Animated.Value;
}

/**
 * Tracks keyboard visibility and height.
 * Uses React Native's built-in Keyboard API and Animated for smooth transitions.
 * On web, keyboard events are not available — isVisible and height remain at defaults.
 */
export function useKeyboard(): KeyboardState {
  const [isVisible, setIsVisible] = useState(false);
  const [height, setHeight] = useState(0);
  const keyboardHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Web does not support Keyboard events in RN
    if (Platform.OS === 'web') return;

    function handleShow(event: KeyboardEvent) {
      const keyHeight = event.endCoordinates.height;
      setIsVisible(true);
      setHeight(keyHeight);
      Animated.timing(keyboardHeight, {
        toValue: keyHeight,
        duration: event.duration ?? 250,
        useNativeDriver: false,
      }).start();
    }

    function handleHide(event: KeyboardEvent) {
      setIsVisible(false);
      setHeight(0);
      Animated.timing(keyboardHeight, {
        toValue: 0,
        duration: event.duration ?? 200,
        useNativeDriver: false,
      }).start();
    }

    // iOS uses keyboardWillShow/Hide for smooth animation;
    // Android uses keyboardDidShow/Hide.
    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, handleShow);
    const hideSub = Keyboard.addListener(hideEvent, handleHide);

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [keyboardHeight]);

  return { isVisible, height, keyboardHeight };
}
