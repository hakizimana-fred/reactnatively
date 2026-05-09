import type { StyleProp, ImageStyle, ViewStyle } from 'react-native';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;

export interface AvatarProps {
  // Image source — string URI or require()
  src?:       { uri: string } | number;
  // Fallback name — generates initials if src is absent/fails
  name?:      string;
  size?:      AvatarSize;
  // Online indicator
  online?:    boolean | 'online' | 'offline' | 'busy' | 'away';
  // Glass border ring
  bordered?:  boolean;
  borderColor?: string;
  // Fallback background color (for initials avatar)
  fallbackBg?:    string;
  fallbackColor?: string;

  style?:      StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  testID?:     string;
}

export interface AvatarGroupProps {
  children:     React.ReactNode;
  max?:         number;
  size?:        AvatarSize;
  overlap?:     number;
  style?:       StyleProp<ViewStyle>;
}
