import React from 'react';
import { View, StyleSheet } from 'react-native';
import { usePortal } from './usePortal';

/**
 * PortalHost — an additional named host for portals that need to be
 * scoped below the root-level PortalProvider host.
 *
 * The root host is rendered automatically inside PortalProvider.
 * Use PortalHost if you want a secondary portal target inside a specific
 * screen or layout region (e.g. inside a bottom sheet for nested portals).
 *
 * Must be placed inside a PortalProvider.
 */
export const PortalHost = React.memo(() => {
  // Calling usePortal here validates we are inside a PortalProvider.
  // This component itself does not render portal entries — the primary
  // host is owned by PortalProvider. PortalHost serves as a marker /
  // secondary host for advanced scoping patterns.
  usePortal();

  return (
    <View
      style={styles.host}
      pointerEvents="box-none"
    />
  );
});

PortalHost.displayName = 'PortalHost';

const styles = StyleSheet.create({
  host: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
  },
});
