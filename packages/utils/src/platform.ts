import { Platform } from 'react-native';

export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';
export const IS_WEB = Platform.OS === 'web';
export const IS_NATIVE = IS_IOS || IS_ANDROID;

export function getAndroidVersion(): number {
  if (!IS_ANDROID) return 0;
  return typeof Platform.Version === 'number'
    ? Platform.Version
    : parseInt(Platform.Version as string, 10);
}

export function platformSelect<T>(options: {
  ios?: T;
  android?: T;
  web?: T;
  default: T;
}): T {
  if (IS_IOS && options.ios !== undefined) return options.ios;
  if (IS_ANDROID && options.android !== undefined) return options.android;
  if (IS_WEB && options.web !== undefined) return options.web;
  return options.default;
}
