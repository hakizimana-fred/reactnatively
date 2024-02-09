import React from 'react';
import { View, Image } from 'react-native';
import { styles } from '../../styles/global.styles';
const CardImage: React.FC<{ src: string }> = ({ src }) => {
  const source = typeof src === 'string' ? { uri: src } : src;
  return (
    <View style={styles.cardTop}>
      <Image alt="" style={styles.cardImg} resizeMode="cover" source={source} />
    </View>
  );
};

export default CardImage;
