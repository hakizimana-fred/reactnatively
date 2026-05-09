import { useEffect, useId, type ReactNode } from 'react';
import { usePortal } from './usePortal';

interface PortalProps {
  children: ReactNode;
}

/**
 * Portal — mounts its children into the PortalProvider's host layer.
 *
 * Renders nothing at its own position in the tree; the children appear
 * above all other content at zIndex 9999 via the PortalProvider.
 *
 * Usage:
 * ```tsx
 * <Portal>
 *   <ModalContent />
 * </Portal>
 * ```
 *
 * Lifecycle:
 *   - mount   → registers children in the portal registry
 *   - update  → keeps the portal in sync when children change
 *   - unmount → removes children from the registry
 */
export function Portal({ children }: PortalProps): null {
  const ctx = usePortal();
  // useId produces a stable, unique key scoped to this component instance
  const key = useId();

  useEffect(() => {
    ctx.mount(key, children);
    return () => {
      ctx.unmount(key);
    };
    // mount/unmount are stable (useCallback in PortalProvider)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    ctx.update(key, children);
    // update fires whenever children reference changes
  }, [ctx, key, children]);

  return null;
}

Portal.displayName = 'Portal';
