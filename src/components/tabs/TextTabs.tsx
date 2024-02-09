import React, { useState } from 'react';
import type { ITextTabs } from '../../../lib/types';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { styles } from '../../styles/global.styles';

const TextTabs: React.FC<ITextTabs> = ({ tabs }) => {
  const [value, setValue] = useState<number>(0);

  return (
    <View style={styles.textTabs}>
      {Array.isArray(tabs) &&
        tabs.length > 0 &&
        tabs.map((item, index) => {
          const isActive = index === value;
          console.log(index, 'isActive');
          return (
            <View key={item.name} style={{ flex: 1 }}>
              <TouchableWithoutFeedback onPress={() => setValue(index)}>
                <View
                  style={[
                    styles.textTabItem,
                    isActive && { borderBottomColor: 'green' },
                  ]}
                >
                  <Text style={styles.textTabItemText}>{item.name}</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          );
        })}
    </View>
  );
};

export default TextTabs;
