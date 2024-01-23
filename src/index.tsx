import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView, View } from 'react-native';

interface IChildren {
  children: React.ReactNode | React.ReactNode[];
  bg?: string;
  variant?: string;
}

const fontSizes = {
  h1: 56,
  h2: 40,
  h3: 28,
  h4: 20,
} as const;

interface HeadingProps extends IChildren {
  variant?: keyof typeof fontSizes;
}

export const Wrapper: React.FC<IChildren> = ({ children, bg }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

export const Heading: React.FC<HeadingProps> = ({
  children,
  variant = 'h1',
}) => {
  return (
    <Text style={{ fontSize: fontSizes[variant], ...styles.heading }}>
      {children}
    </Text>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  heading: {
    fontWeight: 'bold',
  },
});
