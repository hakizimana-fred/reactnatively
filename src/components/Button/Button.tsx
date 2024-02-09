import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { ButtonProps } from '../../../lib/types';
import { styles } from '../../styles/global.styles';
import {
  btnFontAdjuster,
  btnLineHeightAdjuster,
} from '../../../lib/font.adjuster';

export const Button: React.FC<ButtonProps> = ({
  children,
  bg,
  color,
  size,
  ...props
}) => {
  if (size === 'sm') {
    return (
      <TouchableOpacity onPress={props.onPress}>
        <View
          style={{
            ...styles.btnSM,
            ...styles.btn,
            backgroundColor: bg ? bg : styles.btnLarge.backgroundColor,
          }}
        >
          <Text
            style={{
              ...styles.btnText,
              color: color ? color : styles.btnText.color,
              fontSize: btnFontAdjuster(size),
              lineHeight: btnLineHeightAdjuster(size),
            }}
          >
            {children}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  if (size === 'md') {
    return (
      <TouchableOpacity onPress={props.onPress}>
        <View
          style={{
            ...styles.btnMD,
            ...styles.btn,
            backgroundColor: bg ? bg : styles.btnLarge.backgroundColor,
          }}
        >
          <Text
            style={{
              ...styles.btnText,
              color: color ? color : styles.btnText.color,
              fontSize: btnFontAdjuster(size),
              lineHeight: btnLineHeightAdjuster(size),
            }}
          >
            {children}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

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
              ...styles.btnText,
              fontSize: btnFontAdjuster(size),
              lineHeight: btnLineHeightAdjuster(size),
            }}
          >
            {children}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  if (size === 'xl') {
    return (
      <TouchableOpacity onPress={props.onPress}>
        <View
          style={{
            ...styles.btnXL,
            ...styles.btn,
            backgroundColor: bg ? bg : styles.btnLarge.backgroundColor,
          }}
        >
          <Text
            style={{
              ...styles.btnText,
              fontSize: btnFontAdjuster(size),
              lineHeight: btnLineHeightAdjuster(size),
              color: color,
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
          ...styles.btnXS,
          ...styles.btn,
          backgroundColor: bg ? bg : styles.btnLarge.backgroundColor,
        }}
      >
        <Text
          style={{
            ...styles.btnText,
            fontSize: btnFontAdjuster('xs'),
            lineHeight: btnLineHeightAdjuster('xs'),
          }}
        >
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
