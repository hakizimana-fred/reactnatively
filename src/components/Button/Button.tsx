import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { ButtonProps } from '../../../lib/types';
import { colors, styles } from '../../styles/global.styles';

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
          <Text style={styles.btnLgText}>{children}</Text>
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
