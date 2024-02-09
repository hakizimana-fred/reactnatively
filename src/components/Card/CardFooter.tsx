import React from 'react';
import { View } from 'react-native';
import { styles } from '../../styles/global.styles';

export const CardFooter: React.FC<{ children: unknown }> = ({ children }) => {
  return <View style={styles.cardFooter}>{children}</View>;
};

export default CardFooter;
