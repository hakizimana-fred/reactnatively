import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { toast } from './toast-api';
import { Toast } from './Toast';
import type { ToastItem } from './Toast.types';

export interface ToastProviderProps {
  children: React.ReactNode;
  maxToasts?: number;
  // Safe area top/bottom offsets — pass values from useSafeAreaInsets() if available
  safeAreaTop?:    number;
  safeAreaBottom?: number;
}

export function ToastProvider({
  children,
  maxToasts       = 3,
  safeAreaTop     = Platform.OS === 'ios' ? 44 : 24,
  safeAreaBottom  = Platform.OS === 'ios' ? 34 : 16,
}: ToastProviderProps) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const addToast = useCallback((item: ToastItem) => {
    setItems((prev) => [item, ...prev].slice(0, maxToasts));
  }, [maxToasts]);

  const removeToast = useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    const unsubShow    = toast._onShow(addToast);
    const unsubDismiss = toast._onDismiss(removeToast);
    return () => {
      unsubShow();
      unsubDismiss();
    };
  }, [addToast, removeToast]);

  const topItems    = useMemo(() => items.filter((i) => i.position === 'top'),    [items]);
  const bottomItems = useMemo(() => items.filter((i) => i.position === 'bottom'), [items]);

  return (
    <>
      {children}

      {topItems.length > 0 && (
        <View
          style={[styles.container, styles.top, { top: safeAreaTop + 8 }]}
          pointerEvents="box-none"
        >
          {topItems.map((item) => (
            <Toast key={item.id} item={item} onDismiss={removeToast} />
          ))}
        </View>
      )}

      {bottomItems.length > 0 && (
        <View
          style={[styles.container, styles.bottom, { bottom: safeAreaBottom + 8 }]}
          pointerEvents="box-none"
        >
          {bottomItems.map((item) => (
            <Toast key={item.id} item={item} onDismiss={removeToast} />
          ))}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left:     0,
    right:    0,
    zIndex:   9999,
  },
  top:    { top: 0 },
  bottom: { bottom: 0 },
});
