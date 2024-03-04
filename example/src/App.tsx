import * as React from 'react';
import { Text, View } from 'react-native';
import { Heading, Wrapper, Avatar, Button } from 'reactnatively';

export default function App() {
  return (
    <>
      <Wrapper>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 13,
          }}
        >
          <Avatar size={42} src={require('../assets/icon.png')} />
          <Text>welcome Fred!</Text>
        </View>
        <View style={{ paddingVertical: 20 }}>
          <Heading align="center" variant="h3">
            Hi! welcome to {new Date().getFullYear()}
          </Heading>
        </View>
        {/* <TextTabs
          tabs={[{ name: 'Post' }, { name: 'Settings' }, { name: 'Upload' }]}
        /> */}
        <Button size="lg" bg="black" color="white">
          hi
        </Button>
      </Wrapper>
    </>
  );
}
