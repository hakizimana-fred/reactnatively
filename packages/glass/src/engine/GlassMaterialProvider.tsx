import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

export type GlassQuality = 'full' | 'balanced' | 'efficient' | 'off';
export type GlassPowerMode = 'normal' | 'save';
export type GlassSurfacePriority = 'low' | 'normal' | 'high' | 'critical';

export interface GlassMaterialPolicy {
  quality: GlassQuality;
  powerMode: GlassPowerMode;
  tintDensity: number;
  reduceTransparency: boolean;
  nestedGlassIntensity: number;
}

export interface RenderBudgetPolicy {
  maxBlurSurfaces: number;
  degradeStrategy: 'disable-low-priority-blur' | 'reduce-all-blur';
}

export interface GlassPlatformContextValue {
  material: GlassMaterialPolicy;
  budget: RenderBudgetPolicy;
  activeBlurSurfaces: number;
  adjustBlur: (blur: number, priority?: GlassSurfacePriority) => number;
  canUseBlur: (priority?: GlassSurfacePriority) => boolean;
  registerBlurSurface: () => () => void;
}

const defaultMaterial: GlassMaterialPolicy = {
  quality: 'balanced',
  powerMode: 'normal',
  tintDensity: 1,
  reduceTransparency: false,
  nestedGlassIntensity: 0.72,
};

const defaultBudget: RenderBudgetPolicy = {
  maxBlurSurfaces: 8,
  degradeStrategy: 'reduce-all-blur',
};

const GlassPlatformContext = createContext<GlassPlatformContextValue | null>(null);

export interface GlassPlatformProviderProps {
  material?: Partial<GlassMaterialPolicy>;
  budget?: Partial<RenderBudgetPolicy>;
  children: ReactNode;
}

export function GlassPlatformProvider({
  material,
  budget,
  children,
}: GlassPlatformProviderProps) {
  const [activeBlurSurfaces, setActiveBlurSurfaces] = useState(0);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const resolvedMaterial = useMemo<GlassMaterialPolicy>(
    () => ({ ...defaultMaterial, ...material }),
    [material],
  );

  const resolvedBudget = useMemo<RenderBudgetPolicy>(
    () => ({ ...defaultBudget, ...budget }),
    [budget],
  );

  const canUseBlur = useCallback(
    (priority: GlassSurfacePriority = 'normal') => {
      if (resolvedMaterial.quality === 'off' || resolvedMaterial.reduceTransparency) {
        return false;
      }
      if (priority === 'critical' || priority === 'high') return true;
      return activeBlurSurfaces < resolvedBudget.maxBlurSurfaces;
    },
    [activeBlurSurfaces, resolvedBudget.maxBlurSurfaces, resolvedMaterial],
  );

  const adjustBlur = useCallback(
    (blur: number, priority: GlassSurfacePriority = 'normal') => {
      if (!canUseBlur(priority)) return 0;

      const qualityScalar =
        resolvedMaterial.quality === 'full'
          ? 1
          : resolvedMaterial.quality === 'balanced'
            ? 0.82
            : resolvedMaterial.quality === 'efficient'
              ? 0.55
              : 0;

      const powerScalar = resolvedMaterial.powerMode === 'save' ? 0.68 : 1;
      const budgetScalar =
        resolvedBudget.degradeStrategy === 'reduce-all-blur' &&
        activeBlurSurfaces > resolvedBudget.maxBlurSurfaces
          ? resolvedBudget.maxBlurSurfaces / Math.max(activeBlurSurfaces, 1)
          : 1;

      return Math.round(blur * qualityScalar * powerScalar * budgetScalar);
    },
    [activeBlurSurfaces, canUseBlur, resolvedBudget, resolvedMaterial],
  );

  const registerBlurSurface = useCallback(() => {
    setActiveBlurSurfaces((count) => count + 1);
    return () => {
      if (!mounted.current) return;
      setActiveBlurSurfaces((count) => Math.max(0, count - 1));
    };
  }, []);

  const value = useMemo<GlassPlatformContextValue>(
    () => ({
      material: resolvedMaterial,
      budget: resolvedBudget,
      activeBlurSurfaces,
      adjustBlur,
      canUseBlur,
      registerBlurSurface,
    }),
    [
      activeBlurSurfaces,
      adjustBlur,
      canUseBlur,
      registerBlurSurface,
      resolvedBudget,
      resolvedMaterial,
    ],
  );

  return (
    <GlassPlatformContext.Provider value={value}>
      {children}
    </GlassPlatformContext.Provider>
  );
}

export function useGlassPlatform(): GlassPlatformContextValue {
  const ctx = useContext(GlassPlatformContext);
  if (ctx) return ctx;

  return {
    material: defaultMaterial,
    budget: defaultBudget,
    activeBlurSurfaces: 0,
    adjustBlur: (blur) => blur,
    canUseBlur: () => true,
    registerBlurSurface: () => () => {},
  };
}

export function useBlurSurfaceBudget(priority: GlassSurfacePriority = 'normal'): boolean {
  const { canUseBlur, registerBlurSurface } = useGlassPlatform();

  useEffect(() => registerBlurSurface(), [registerBlurSurface]);

  return canUseBlur(priority);
}
