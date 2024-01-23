import React from 'react';
import { SafeAreaView } from 'react-native';

interface IChildren {
  children: React.ReactNode | React.ReactNode[];
}

const Wrapper: React.FC<IChildren> = ({ children }) => {
  return <SafeAreaView>{children}</SafeAreaView>;
};

export default Wrapper;
