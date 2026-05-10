import { IS_IOS, IS_ANDROID, IS_WEB, getAndroidVersion } from 'reactnatively-utils';

export type GlassCapability = 'full' | 'partial' | 'none';

function detectCapability(): GlassCapability {
  if (IS_IOS) return 'full';
  if (IS_ANDROID) {
    const version = getAndroidVersion();
    return version >= 31 ? 'partial' : 'none';
  }
  if (IS_WEB) return 'partial';
  return 'none';
}

export const GLASS_CAPABILITY: GlassCapability = detectCapability();
export const SUPPORTS_BLUR: boolean = GLASS_CAPABILITY !== 'none';
export const IS_FULL_GLASS: boolean = GLASS_CAPABILITY === 'full';
export const IS_PARTIAL_GLASS: boolean = GLASS_CAPABILITY === 'partial';
export const IS_NO_GLASS: boolean = GLASS_CAPABILITY === 'none';

export function adjustBlurForCapability(intensity: number): number {
  if (GLASS_CAPABILITY === 'full') return intensity;
  if (GLASS_CAPABILITY === 'partial') return Math.round(intensity * 0.65);
  return 0;
}

export const ANDROID_BLUR_METHOD = IS_ANDROID ? 'dimezisBlurView' : undefined;
