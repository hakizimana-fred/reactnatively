import React from 'react';
import { Text } from 'react-native';
import type { CardTypographyProps } from '../../lib/types';
import { styles } from '../styles/global.styles';
const CardDescription: React.FC<CardTypographyProps> = ({
  align = 'left',
  text,
}) => {
  return (
    <Text style={{ textAlign: align, ...styles.cardDescription }}>{text}</Text>
  );
};

export default CardDescription;
