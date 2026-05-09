import { useCallback } from 'react';
import { useControllable } from './useControllable';

export interface UseDisclosureOptions {
  /** Initial open state for uncontrolled mode. */
  defaultIsOpen?: boolean;
  /** Controlled open state. */
  isOpen?: boolean;
  /** Called when the open state changes in controlled mode. */
  onChange?: (isOpen: boolean) => void;
}

export interface UseDisclosureReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

/**
 * Manages open/close/toggle state for modals, drawers, menus, etc.
 * Supports both controlled (external isOpen + onChange) and uncontrolled modes.
 */
export function useDisclosure(options: UseDisclosureOptions = {}): UseDisclosureReturn {
  const { defaultIsOpen = false, isOpen: controlledIsOpen, onChange } = options;

  const [isOpen, setIsOpen] = useControllable<boolean>({
    value: controlledIsOpen,
    defaultValue: defaultIsOpen,
    onChange,
  });

  const resolvedIsOpen = isOpen ?? false;

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onToggle = useCallback(() => {
    setIsOpen(!resolvedIsOpen);
  }, [setIsOpen, resolvedIsOpen]);

  return { isOpen: resolvedIsOpen, onOpen, onClose, onToggle };
}
