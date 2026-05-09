import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import type { ReactNode } from 'react';
import { PortalContext } from './portal-context';
import type { PortalEntry, PortalContextValue } from './portal-context';

interface PortalProviderProps {
  children: ReactNode;
}

/**
 * PortalProvider — must wrap the root of your app (alongside ThemeProvider).
 *
 * Maintains the registry of active portal entries and renders them in a
 * full-screen host view layered above all other content (zIndex 9999).
 *
 * Architecture:
 *   - entries state holds { key, element }[] — a plain array so React
 *     reconciles portal renders without needing forceUpdate hacks.
 *   - mount/update/unmount are stable references via useCallback.
 */
export const PortalProvider = React.memo<PortalProviderProps>(({ children }) => {
  const [entries, setEntries] = useState<PortalEntry[]>([]);

  const mount = useCallback((key: string, element: ReactNode) => {
    setEntries((prev) => {
      // Avoid duplicate mounts for the same key
      if (prev.some((e) => e.key === key)) {
        return prev.map((e) => (e.key === key ? { key, element } : e));
      }
      return [...prev, { key, element }];
    });
  }, []);

  const unmount = useCallback((key: string) => {
    setEntries((prev) => prev.filter((e) => e.key !== key));
  }, []);

  const update = useCallback((key: string, element: ReactNode) => {
    setEntries((prev) =>
      prev.map((e) => (e.key === key ? { key, element } : e)),
    );
  }, []);

  const contextValue = useMemo<PortalContextValue>(
    () => ({ mount, unmount, update }),
    [mount, unmount, update],
  );

  return (
    <PortalContext.Provider value={contextValue}>
      {children}
      {/* Portal host — renders above all children, passes touches through when empty */}
      <View
        style={styles.host}
        pointerEvents="box-none"
      >
        {entries.map(({ key, element }) => (
          <React.Fragment key={key}>{element}</React.Fragment>
        ))}
      </View>
    </PortalContext.Provider>
  );
});

PortalProvider.displayName = 'PortalProvider';

const styles = StyleSheet.create({
  host: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
  },
});
