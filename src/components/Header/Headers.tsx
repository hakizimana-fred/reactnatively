import React from 'react';
import type { HeadingProps } from '../../../lib/types';
import { Text } from 'react-native';
import { styles } from '../../styles/global.styles';

export const fontSizes = {
  h1: 56,
  h2: 40,
  h3: 28,
  h4: 20,
} as const;

const Heading: React.FC<HeadingProps> = ({
  children,
  variant = 'h1',
  size,
  color,
  align,
}) => {
  return (
    <Text
      style={{
        color: color && color,
        fontSize: size ? size : fontSizes[variant],
        textAlign: align && align,
        ...styles.heading,
      }}
    >
      {children}
    </Text>
  );
};

export default Heading;
