import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { ButtonProps } from '../../../lib/types';
import { colors, styles } from '../../styles/global.styles';
import { btnFontAdjuster } from '../../../lib/font.adjuster';

export const Button: React.FC<ButtonProps> = ({
  children,
  bg,
  size,
  ...props
}) => {
  if (size === 'lg') {
    return (
      <TouchableOpacity onPress={props.onPress}>
        <View
          style={{
            ...styles.btnLarge,
            ...styles.btn,
            backgroundColor: bg ? bg : styles.btnLarge.backgroundColor,
          }}
        >
          <Text
            style={{
              ...styles.btnLgText,
              fontSize: btnFontAdjuster(size),
            }}
          >
            {children}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity>
      <View
        style={{
          backgroundColor: bg ? bg : colors.primary,
        }}
      >
        <Text>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};
