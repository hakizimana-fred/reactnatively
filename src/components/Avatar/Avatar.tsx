import React from 'react';
import { Image } from 'react-native';
import type { AvatarProps } from '../../../lib/types';
const Avatar: React.FC<AvatarProps> = ({ size, src }) => {
  const source = typeof src === 'string' ? { uri: src } : src;
  return (
    <Image
      style={{
        width: size,
        height: size,
        borderRadius: 9999,
      }}
      source={source}
    />
  );
};

export default Avatar;
