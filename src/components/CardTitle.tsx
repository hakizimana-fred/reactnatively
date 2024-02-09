import React from 'react';
import type { CardTypographyProps } from '../../lib/types';
import { Text } from 'react-native';
import { styles } from '../styles/global.styles';

const CardTitle: React.FC<CardTypographyProps> = ({ text, align = 'left' }) => {
  return <Text style={{ textAlign: align, ...styles.cardTitle }}>{text}</Text>;
};

export default CardTitle;
