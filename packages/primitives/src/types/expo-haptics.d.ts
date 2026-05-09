/**
 * Minimal type stub for expo-haptics.
 * Full types are available when expo-haptics is installed as a peer dependency.
 * This stub prevents TypeScript errors in environments where the package is
 * absent; the runtime try/catch in GlassPressable handles the actual absence.
 */
declare module 'expo-haptics' {
  export enum ImpactFeedbackStyle {
    Light  = 'impactLight',
    Medium = 'impactMedium',
    Heavy  = 'impactHeavy',
  }

  export enum NotificationFeedbackType {
    Success = 'notificationSuccess',
    Warning = 'notificationWarning',
    Error   = 'notificationError',
  }

  export enum SelectionFeedbackType {
    Selection = 'selection',
  }

  export function impactAsync(style?: ImpactFeedbackStyle): Promise<void>;
  export function notificationAsync(type?: NotificationFeedbackType): Promise<void>;
  export function selectionAsync(): Promise<void>;
}
