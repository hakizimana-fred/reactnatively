import React from 'react';
import type { TextAvatarProps } from '../../../lib/types';
import { Text, View } from 'react-native';
import { colors } from '../../styles/global.styles';
const TextAvatar: React.FC<TextAvatarProps> = ({
  size,
  text,
  bg = '#d1d5db',
}) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: 9999,
        backgroundColor: bg,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          fontSize: fontAdjuster(size),
          color: colors.black,
          fontWeight: '700',
        }}
      >
        {text}
      </Text>
    </View>
  );
};

function fontAdjuster(size: number): number {
  let initialFont = 13;
  switch (size) {
    case 34:
      break;
    case 42:
      initialFont += 4;
      break;

    case 50:
      initialFont += 9;
      break;

    case 58:
      initialFont += 12;
      break;
    case 66:
      initialFont += 14;
      break;

    default:
      break;
  }
  return initialFont;
}

export default TextAvatar;
