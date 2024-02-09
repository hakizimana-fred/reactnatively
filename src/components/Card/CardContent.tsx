import React from 'react';
import { View } from 'react-native';
import { styles } from '../../styles/global.styles';
export const CardContent: React.FC<{ children: unknown }> = ({ children }) => {
  return <View style={styles.cardContent}>{children}</View>;
};
