import React from 'react';
import { View } from 'react-native';
import type { IChildren } from '../../../lib/types';
import { styles } from '../../styles/global.styles';

const Card: React.FC<IChildren> = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

export default Card;
