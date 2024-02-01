import * as React from 'react';
import { Text, View } from 'react-native';
import {
  Card,
  Heading,
  Wrapper,
  CardTitle,
  CardContent,
  CardDescription,
  Avatar,
} from 'reactnatively';

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
        <View
          style={{
            width: 500,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {[...Array(5)].map(() => (
            <View style={{ flex: 1, flexWrap: 'wrap' }}>
              <Card>
                <CardTitle text="Looking for cheap car?" align="center" />
                <CardContent>
                  <CardDescription
                    text="
                    hello there
            "
                  />
                </CardContent>
              </Card>
            </View>
          ))}
        </View>
      </Wrapper>
    </>
  );
}
