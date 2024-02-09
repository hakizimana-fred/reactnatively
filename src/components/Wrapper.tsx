import React from 'react';
import { SafeAreaView, View } from 'react-native';
import type { IChildren } from '../../lib/types';
import { styles } from '../styles/global.styles';

const Wrapper: React.FC<IChildren> = ({ children, bg }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

export default Wrapper;
