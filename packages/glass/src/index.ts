// Glass Engine
export { resolveGlass } from './engine/GlassEngine';
export type { GlassConfig, ResolvedGlassStyle, GlassCapability } from './engine/GlassEngine.types';
export {
  GlassPlatformProvider,
  useGlassPlatform,
  useBlurSurfaceBudget,
} from './engine/GlassMaterialProvider';
export type {
  GlassMaterialPolicy,
  RenderBudgetPolicy,
  GlassPlatformProviderProps,
  GlassQuality,
  GlassPowerMode,
  GlassSurfacePriority,
} from './engine/GlassMaterialProvider';
export {
  GLASS_CAPABILITY,
  SUPPORTS_BLUR,
  IS_FULL_GLASS,
  IS_PARTIAL_GLASS,
  IS_NO_GLASS,
  adjustBlurForCapability,
} from './engine/CapabilityDetector';

// Components
export { GlassView } from './components/GlassView';
export type { GlassViewProps } from './components/GlassView';
export { FrostPanel } from './components/FrostPanel';
export type { FrostPanelProps } from './components/FrostPanel';

// Hooks
export { useGlassStyle } from './hooks/useGlassStyle';
