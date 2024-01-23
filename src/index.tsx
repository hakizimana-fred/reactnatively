import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, View } from 'react-native';

interface IChildren {
  children: React.ReactNode | React.ReactNode[];
  bg?: string;
}

export const Wrapper: React.FC<IChildren> = ({ children, bg }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
