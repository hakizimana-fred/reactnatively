import { useContext } from 'react';
import { PortalContext } from './portal-context';
import type { PortalContextValue } from './portal-context';

/**
 * usePortal — access the portal mount/unmount/update API.
 *
 * @throws if called outside a PortalProvider.
 */
export function usePortal(): PortalContextValue {
  const ctx = useContext(PortalContext);
  if (ctx === null) {
    throw new Error(
      '[Reactnatively] usePortal must be used inside a <PortalProvider>. ' +
      'Wrap your app root with <PortalProvider> to enable the portal system.',
    );
  }
  return ctx;
}
